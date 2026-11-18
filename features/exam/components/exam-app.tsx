'use client';

import { useExam } from '../hooks/use-exam';
import { ExamHeader } from './exam-header';
import { ExamSetup } from './exam-setup';
import { ExamSession } from './exam-session';
import { ExamResult } from './exam-result';
import { Ranking } from './ranking';
import { AttemptHistory } from './attempt-history';
import { ExitDialog } from './exit-dialog';

// Monta as telas sobre uma única sessão compartilhada.
export function ExamApp() {
  const controller = useExam();
  const { activeTab } = controller;
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col font-sans selection:bg-orange-500/30 selection:text-orange-200">
      {/* CABEÇALHO GLOBAL                                                   */}
      <ExamHeader controller={controller} />
      {/* CONTEÚDO PRINCIPAL                                                 */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* ABA 1: SIMULADO                                                  */}
        {activeTab === 'simulado' && (
          <>
            {/* FASE 1: TELA INICIAL E CONFIGURAÇÃO */}
            <ExamSetup controller={controller} />

            {/* FASE 2: SIMULADO EM ANDAMENTO */}
            <ExamSession controller={controller} />

            {/* FASE 3: RESULTADO FINAL (ESCALA AWS 100-1000) */}
            <ExamResult controller={controller} />
          </>
        )}
        {/* ABA 2: RANKING (LEADERBOARD)                                     */}
        <Ranking controller={controller} />
        {/* ABA 3: HISTÓRICO DE GABARITOS                                    */}
        <AttemptHistory controller={controller} />
      </main>
      {/* MODAL DE CONFIRMAÇÃO DE SAÍDA                                      */}
      <ExitDialog controller={controller} />

      {/* Rodapé */}
      <footer className="border-t border-slate-800/80 py-4 text-center text-xs text-slate-500">
        Simulado Preparatório AWS Certified Solutions Architect – Associate (SAA-C03) • Bons
        estudos!
      </footer>
    </div>
  );
}
