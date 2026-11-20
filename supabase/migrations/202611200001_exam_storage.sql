-- Tentativas privadas e ranking público resumido para o simulado DevMendes.
-- Execute antes do arquivo de gabaritos. Não altera tabelas já existentes de outros aplicativos.
begin;
create schema if not exists exam_private;
revoke all on schema exam_private from public, anon, authenticated;

create table if not exists exam_private.question_keys (
  question_id integer primary key,
  domain text not null,
  correct_indices integer[] not null,
  required_count integer not null check (required_count > 0),
  option_count integer not null check (option_count >= required_count)
);

alter table exam_private.question_keys enable row level security;

create table if not exists public.exam_attempts (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  client_attempt_id text not null check (length(client_attempt_id) between 1 and 120),
  candidate_name text not null check (length(candidate_name) between 1 and 45),
  aws_score integer not null check (aws_score between 100 and 1000),
  correct_count integer not null,
  total_questions integer not null check (total_questions between 1 and 500),
  passed boolean not null,
  time_seconds integer not null check (time_seconds between 0 and 604800),
  domain_filter text not null,
  bank_id text not null,
  mode text not null check (mode in ('exam', 'practice')),
  time_limit_seconds integer,
  timed_out boolean not null default false,
  created_at timestamptz not null default now(),
  completed_at timestamptz not null,
  answers jsonb not null,
  unique (owner_id, client_attempt_id),
  check (correct_count between 0 and total_questions),
  check (mode <> 'exam' or (total_questions = 65 and time_seconds <= 7800 and time_limit_seconds = 7800))
);
create index if not exists exam_attempts_ranking_idx on public.exam_attempts (aws_score desc, time_seconds, created_at desc);
create index if not exists exam_attempts_owner_idx on public.exam_attempts (owner_id, created_at desc);
alter table public.exam_attempts enable row level security;
revoke all on public.exam_attempts from anon, authenticated;
grant select on public.exam_attempts to authenticated;
create policy "exam_attempts_read_own" on public.exam_attempts for select to authenticated using (owner_id = (select auth.uid()));

create table if not exists public.exam_profiles (
  owner_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (length(display_name) between 1 and 45),
  updated_at timestamptz not null default now()
);
alter table public.exam_profiles enable row level security;
revoke all on public.exam_profiles from anon, authenticated;
grant select, insert, update on public.exam_profiles to authenticated;
create policy "exam_profiles_read_own" on public.exam_profiles for select to authenticated using (owner_id = (select auth.uid()));
create policy "exam_profiles_insert_own" on public.exam_profiles for insert to authenticated with check (owner_id = (select auth.uid()));
create policy "exam_profiles_update_own" on public.exam_profiles for update to authenticated using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()));

-- Só esta função grava tentativas. Nota, acertos, domínio e gabarito são calculados no PostgreSQL.
create or replace function public.submit_exam_attempt(p_attempt jsonb)
returns setof public.exam_attempts
language plpgsql security definer set search_path = '' as $$
declare
  v_owner uuid := auth.uid();
  v_client_id text := p_attempt->>'id';
  v_name text := trim(p_attempt->>'candidateName');
  v_mode text := coalesce(p_attempt->>'mode', 'practice');
  v_time integer;
  v_total integer;
  v_correct integer := 0;
  v_score integer;
  v_answer jsonb;
  v_question exam_private.question_keys%rowtype;
  v_indices integer[];
  v_seen integer[] := '{}';
  v_answers jsonb := '[]';
  v_is_correct boolean;
begin
  if v_owner is null then raise exception 'Sessão autenticada necessária.' using errcode = '42501'; end if;
  if v_client_id is null or length(v_client_id) not between 1 and 120 or v_name is null or length(v_name) not between 1 and 45 then
    raise exception 'Identificação da tentativa inválida.' using errcode = '22023';
  end if;
  -- Reenviar uma tentativa já salva não duplica o resultado nem permite reescrevê-lo.
  if exists (select 1 from public.exam_attempts where owner_id = v_owner and client_attempt_id = v_client_id) then
    return query select * from public.exam_attempts where owner_id = v_owner and client_attempt_id = v_client_id;
    return;
  end if;
  if jsonb_typeof(p_attempt->'answers') is distinct from 'array' then raise exception 'Respostas inválidas.' using errcode = '22023'; end if;
  v_total := jsonb_array_length(p_attempt->'answers');
  v_time := (p_attempt->>'timeSeconds')::integer;
  if v_total not between 1 and 500 or v_time is null or v_time not between 0 and 604800 or v_mode not in ('exam','practice') then
    raise exception 'Parâmetros da tentativa inválidos.' using errcode = '22023';
  end if;
  if v_mode = 'exam' and (v_total <> 65 or v_time > 7800) then raise exception 'Prova completa deve ter 65 questões e no máximo 130 minutos.' using errcode = '22023'; end if;
  if coalesce(p_attempt->>'domainFilter','Todos') not in ('Todos','Segurança','Resiliência','Alto Desempenho','Otimização de Custos')
     or coalesce(p_attempt->>'bankId','all') not in ('all','base','dpcn-1','dpcn-2','dpcn-3','dpcn-4','dpcn-5') then
    raise exception 'Filtro inválido.' using errcode = '22023';
  end if;
  for v_answer in select value from jsonb_array_elements(p_attempt->'answers') loop
    select * into v_question from exam_private.question_keys where question_id = (v_answer->>'questionId')::integer;
    if not found or v_question.question_id = any(v_seen) then raise exception 'Questão desconhecida ou repetida.' using errcode = '22023'; end if;
    v_seen := array_append(v_seen,v_question.question_id);
    if jsonb_typeof(v_answer->'selectedIndices') is distinct from 'array' then raise exception 'Alternativas inválidas.' using errcode = '22023'; end if;
    if exists (select 1 from jsonb_array_elements(v_answer->'selectedIndices') x where jsonb_typeof(x) <> 'number' or x::text !~ '^[0-9]+$') then
      raise exception 'Índice de alternativa inválido.' using errcode = '22023';
    end if;
    select coalesce(array_agg(x::text::integer order by x::text::integer),'{}') into v_indices from jsonb_array_elements(v_answer->'selectedIndices') x;
    if cardinality(v_indices) > v_question.required_count or cardinality(v_indices) <> (select count(distinct x) from unnest(v_indices) x)
       or exists (select 1 from unnest(v_indices) x where x < 0 or x >= v_question.option_count) then
      raise exception 'Seleção de alternativas inválida.' using errcode = '22023';
    end if;
    v_is_correct := v_indices = v_question.correct_indices;
    if v_is_correct then v_correct := v_correct + 1; end if;
    v_answers := v_answers || jsonb_build_array(jsonb_build_object('questionId',v_question.question_id,'domain',v_question.domain,
      'selectedIndices',to_jsonb(v_indices),'correctIndices',to_jsonb(v_question.correct_indices),'isCorrect',v_is_correct));
  end loop;
  v_score := round(100 + 900.0 * v_correct / v_total);
  insert into public.exam_attempts(owner_id,client_attempt_id,candidate_name,aws_score,correct_count,total_questions,passed,time_seconds,
    domain_filter,bank_id,mode,time_limit_seconds,timed_out,completed_at,answers)
  values(v_owner,v_client_id,v_name,v_score,v_correct,v_total,v_score >= 720,v_time,
    case when v_mode='exam' then 'Todos' else coalesce(p_attempt->>'domainFilter','Todos') end,
    case when v_mode='exam' then 'all' else coalesce(p_attempt->>'bankId','all') end,v_mode,
    case when v_mode='exam' then 7800 else null end,v_mode='exam' and coalesce((p_attempt->>'timedOut')::boolean,false),
    greatest('2000-01-01'::timestamptz,least(now(),coalesce((p_attempt->>'createdAt')::timestamptz,now()))),v_answers)
  on conflict(owner_id,client_attempt_id) do nothing;
  insert into public.exam_profiles(owner_id,display_name) values(v_owner,v_name)
  on conflict(owner_id) do update set display_name=excluded.display_name,updated_at=now();
  return query select * from public.exam_attempts where owner_id=v_owner and client_attempt_id=v_client_id;
end;
$$;
revoke all on function public.submit_exam_attempt(jsonb) from public, anon;
grant execute on function public.submit_exam_attempt(jsonb) to authenticated;

-- Publica apenas o resumo do ranking, nunca o owner_id nem as alternativas escolhidas.
create or replace function public.exam_leaderboard()
returns table(id text,client_attempt_id text,candidate_name text,aws_score integer,correct_count integer,total_questions integer,passed boolean,time_seconds integer,
  domain_filter text,bank_id text,mode text,created_at timestamptz,is_own boolean)
language sql stable security definer set search_path = '' as $$
  select id::text,case when owner_id=auth.uid() then client_attempt_id else null end,candidate_name,aws_score,correct_count,total_questions,passed,time_seconds,domain_filter,bank_id,mode,completed_at,
    coalesce(owner_id=auth.uid(),false)
  from public.exam_attempts order by aws_score desc,time_seconds,created_at desc limit 100;
$$;
revoke all on function public.exam_leaderboard() from public;
grant execute on function public.exam_leaderboard() to anon, authenticated;
commit;
