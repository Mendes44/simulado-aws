import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Credenciais públicas: identificam o aplicativo. O acesso aos dados é controlado pelo Auth e pelo RLS.
// Variáveis de ambiente permitem apontar uma cópia do projeto para outro banco.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://scvbvpthipervnghtpsp.supabase.co';
const publicKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_ugydfTxHt6HmsGLxzeiK2Q__voBYFkX';
let client: SupabaseClient | null = null;
let sessionRequest: Promise<string> | null = null;

export function getSupabaseClient(): SupabaseClient {
  client ??= createClient(url, publicKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
    global: { fetch: (input, init) => fetch(input, { ...init, signal: init?.signal ?? AbortSignal.timeout(15000) }) },
  });
  return client;
}

// Compartilha a criação da sessão entre chamadas simultâneas e mantém o usuário sem tela de login.
export function ensureStudySession(): Promise<string> {
  sessionRequest ??= (async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    if (data.session) return data.session.user.id;
    const result = await supabase.auth.signInAnonymously();
    if (result.error) throw result.error;
    if (!result.data.user) throw new Error('Não foi possível criar a sessão de estudo.');
    return result.data.user.id;
  })().finally(() => { sessionRequest = null; });
  return sessionRequest;
}
