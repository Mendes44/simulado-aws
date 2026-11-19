import type { Question } from '../types';
import { OPTION_LETTERS } from '../constants';

// Reutilizado na resposta imediata e no histórico para manter o mesmo gabarito comentado.
export function QuestionExplanation({ question }: { question: Question }) {
  return (
    <div className="space-y-3">
      {question.optionExplanations ? (
        <>
          <p className="text-xs font-semibold text-slate-400">Gabarito comentado do material fornecido</p>
          {question.optionExplanations.map((explanation, index) => {
            const correct = question.correctIndices.includes(index);
            return (
              <div key={index} className="rounded-xl border border-slate-700/70 bg-slate-900/50 p-3">
                <p className={correct ? 'text-sm font-bold text-emerald-400' : 'text-sm font-bold text-red-400'}>
                  {OPTION_LETTERS[index]} — {correct ? 'CORRETA' : 'ERRADA'}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">{explanation}</p>
              </div>
            );
          })}
        </>
      ) : (
        <p className="text-sm leading-relaxed text-slate-300">{question.summary}</p>
      )}
      {question.studyNotes?.map((note) => (
        <aside key={note.url} className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-amber-100">
          <p className="font-bold">Nota de estudo</p>
          <p className="mt-1 leading-relaxed">{note.text}</p>
          <a href={note.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block underline underline-offset-2">{note.title}</a>
        </aside>
      ))}
    </div>
  );
}
