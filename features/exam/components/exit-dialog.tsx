'use client';

import { AlertCircle } from 'lucide-react';

import type { ExamController } from '../hooks/use-exam';

// Confirmação antes de descartar a sessão em andamento.
export function ExitDialog({ controller }: { controller: Pick<ExamController, 'showExitModal' | 'setShowExitModal' | 'confirmExitQuiz'> }) {
  const { showExitModal, setShowExitModal, confirmExitQuiz } = controller;
  return (<>{showExitModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-red-500/15 text-red-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-white">Sair do Simulado?</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Se você sair agora, o progresso deste simulado em andamento será perdido e não será
              registrado no Ranking.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowExitModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold transition-colors cursor-pointer"
              >
                Continuar Prova
              </button>
              <button
                type="button"
                onClick={confirmExitQuiz}
                className="px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors cursor-pointer"
              >
                Sim, Encerrar
              </button>
            </div>
          </div>
        </div>
      )}</>);
}
