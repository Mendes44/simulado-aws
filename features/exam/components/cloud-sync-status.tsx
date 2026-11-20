import type { ExamController } from '../hooks/use-exam';

// O aviso distingue uma cópia local de uma tentativa confirmada pelo Supabase.
export function CloudSyncStatus({ controller }: { controller: Pick<ExamController, 'cloudStatus' | 'cloudError' | 'pendingCount' | 'refreshRanking'> }) {
  const { cloudStatus, cloudError, pendingCount, refreshRanking } = controller;
  const labels = {
    connecting: 'Conectando ao ranking compartilhado…',
    syncing: 'Sincronizando suas tentativas…',
    ready: 'Conectado · Ranking compartilhado e histórico privado',
    offline: 'Sem conexão · Suas novas tentativas serão sincronizadas ao reconectar',
    error: 'Sincronização pendente · O simulado continua disponível',
  };
  return (
    <aside aria-label="Sincronização do histórico" className="mb-6 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-xs text-slate-300">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p role="status">{labels[cloudStatus]}{pendingCount > 0 ? ` · ${pendingCount} pendente(s)` : ''}</p>
        <button type="button" onClick={() => { void refreshRanking(); }} disabled={cloudStatus === 'connecting' || cloudStatus === 'syncing'} className="cursor-pointer font-bold text-sky-300 underline underline-offset-2 disabled:cursor-wait disabled:opacity-50">Atualizar ranking</button>
      </div>
      {cloudError && <p className="mt-2 text-amber-300">{cloudError}</p>}
    </aside>
  );
}
