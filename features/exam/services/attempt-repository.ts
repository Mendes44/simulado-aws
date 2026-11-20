import type { ExamAttempt, RankingEntry } from '../types';
import { getSupabaseClient, ensureStudySession } from '../../../lib/supabase/client';

interface AttemptRow {
  id: string;
  client_attempt_id: string | null;
  candidate_name: string;
  aws_score: number;
  correct_count: number;
  total_questions: number;
  passed: boolean;
  time_seconds: number;
  domain_filter: ExamAttempt['domainFilter'];
  bank_id: ExamAttempt['bankId'];
  mode: ExamAttempt['mode'];
  time_limit_seconds?: number;
  timed_out?: boolean;
  created_at: string;
  completed_at?: string;
  answers?: ExamAttempt['answers'];
  is_own?: boolean;
}

function fromRow(row: AttemptRow): ExamAttempt {
  return {
    id: row.client_attempt_id ?? row.id, candidateName: row.candidate_name, awsScore: row.aws_score,
    correctCount: row.correct_count, totalQuestions: row.total_questions, passed: row.passed,
    timeSeconds: row.time_seconds, domainFilter: row.domain_filter, bankId: row.bank_id,
    mode: row.mode, timeLimitSeconds: row.time_limit_seconds ?? undefined, timedOut: row.timed_out ?? false,
    createdAt: row.completed_at ?? row.created_at, answers: row.answers ?? [],
  };
}

export async function fetchOwnAttempts(): Promise<ExamAttempt[]> {
  await ensureStudySession();
  const rows: AttemptRow[] = [];
  // Paginação evita perder o histórico quando passar do limite padrão da API.
  for (let offset = 0; ; offset += 100) {
    const { data, error } = await getSupabaseClient().from('exam_attempts').select('*').order('completed_at', { ascending: false }).order('id').range(offset, offset + 99);
    if (error) throw error;
    rows.push(...data as AttemptRow[]);
    if (data.length < 100) break;
  }
  return rows.map(fromRow);
}

export async function saveCloudAttempt(attempt: ExamAttempt): Promise<ExamAttempt> {
  await ensureStudySession();
  // Não envia nota, gabarito ou isCorrect: o PostgreSQL deriva esses valores.
  const { data, error } = await getSupabaseClient().rpc('submit_exam_attempt', { p_attempt: {
    id: attempt.id, candidateName: attempt.candidateName, timeSeconds: attempt.timeSeconds,
    domainFilter: attempt.domainFilter, bankId: attempt.bankId ?? 'all', mode: attempt.mode ?? 'practice',
    timedOut: attempt.timedOut ?? false, createdAt: attempt.createdAt,
    answers: attempt.answers.map((answer) => ({ questionId: answer.questionId, selectedIndices: answer.selectedIndices })),
  } });
  if (error) throw error;
  if (!data?.[0]) throw new Error('O banco não confirmou a gravação da tentativa.');
  return fromRow(data[0] as AttemptRow);
}

export async function fetchGlobalRanking(ownAttempts: ExamAttempt[]): Promise<RankingEntry[]> {
  const { data, error } = await getSupabaseClient().rpc('exam_leaderboard');
  if (error) throw error;
  const own = new Map(ownAttempts.map((attempt) => [attempt.id, attempt]));
  return (data as AttemptRow[]).map((row) => {
    const details = row.is_own && row.client_attempt_id ? own.get(row.client_attempt_id) : undefined;
    return { ...fromRow(row), id: row.id, answers: details?.answers, canReview: Boolean(details), detailId: details?.id };
  });
}
