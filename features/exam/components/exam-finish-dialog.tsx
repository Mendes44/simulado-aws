'use client';

import { useEffect, useRef } from 'react';
import type { ExamController } from '../hooks/use-exam';

// O diálogo nativo mantém o foco na confirmação e permite voltar com Escape.
export function ExamFinishDialog({ controller }: { controller: ExamController }) {
  const ref = useRef<HTMLDialogElement>(null);
  const { showFinishModal, setShowFinishModal, answeredCount, quizQuestions, finishQuiz } = controller;
  useEffect(() => {
    if (showFinishModal) ref.current?.showModal();
  }, [showFinishModal]);
  if (!showFinishModal) return null;
  return (
    <dialog ref={ref} aria-labelledby="finish-title" onCancel={() => setShowFinishModal(false)} className="m-auto w-[calc(100%_-_2rem)] max-w-md rounded-2xl border border-slate-600 bg-slate-800 p-6 text-slate-100 shadow-2xl backdrop:bg-slate-950/80">
      <h2 id="finish-title" className="text-xl font-extrabold">Entregar a prova?</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-300">Você respondeu {answeredCount} de {quizQuestions.length} questões. As não respondidas ou incompletas contarão como erros no simulado.</p>
      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <button type="button" onClick={() => setShowFinishModal(false)} className="cursor-pointer rounded-xl bg-slate-700 px-4 py-3 text-sm font-bold">Continuar prova</button>
        <button type="button" onClick={() => finishQuiz()} className="cursor-pointer rounded-xl bg-orange-500 px-4 py-3 text-sm font-extrabold text-slate-950">Entregar e ver resultado</button>
      </div>
    </dialog>
  );
}
