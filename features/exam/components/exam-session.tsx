'use client';

import { Clock, ChevronRight, ChevronLeft, CheckCircle2, XCircle } from 'lucide-react';
import { OPTION_LETTERS } from '../constants';
import { formatTime, arraysEqual } from '../utils';
import { QuestionOrigin } from './question-origin';
import { QuestionExplanation } from './question-explanation';
import { QuestionReferences } from './question-references';
import type { ExamController } from '../hooks/use-exam';

const primaryButton = 'rounded-xl bg-[#FF9900] px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer';
const secondaryButton = 'rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer';

// A mesma questão atende aos dois modos. Gabarito e comentários só são revelados no treino.
export function ExamSession({ controller }: { controller: ExamController }) {
  const { quizPhase, currentQuestion, currentIdx, quizQuestions, selectedOptions, isConfirmed, isExamMode,
    elapsedSeconds, remainingSeconds, answeredCount, answeredQuestionIds, userAnswers,
    setShowExitModal, setShowFinishModal, handleToggleOption, handleConfirmAnswer, handleNextOrFinish, handleGoToQuestion } = controller;
  if (quizPhase !== 'playing' || !currentQuestion) return null;
  const revealAnswer = isConfirmed && !isExamMode;
  const correct = arraysEqual(selectedOptions, currentQuestion.correctIndices);

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-slate-700 bg-slate-800/80 p-4 sm:p-5" aria-label="Progresso e tempo">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-extrabold text-white">Questão {currentIdx + 1} de {quizQuestions.length}</p>
            <p className="mt-1 text-xs text-slate-400">{isExamMode ? `Modo prova · ${answeredCount} respondidas` : 'Modo treino · Correção imediata'}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div role="timer" aria-label={isExamMode ? 'Tempo restante' : 'Tempo decorrido'} className={`flex items-center gap-2 rounded-xl border px-3 py-2 font-mono font-bold ${isExamMode && remainingSeconds <= 300 ? 'border-red-400 text-red-300' : 'border-slate-600 text-orange-400'}`}>
              <Clock className="h-4 w-4" />
              <span className="text-xs font-sans">{isExamMode ? 'Restante' : 'Decorrido'}</span>
              {formatTime(isExamMode ? remainingSeconds : elapsedSeconds)}
            </div>
            {isExamMode && <button type="button" onClick={() => setShowFinishModal(true)} className={secondaryButton}>Entregar prova</button>}
            <button type="button" onClick={() => setShowExitModal(true)} className={secondaryButton}>Sair</button>
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-900">
          <div className="h-full bg-orange-500 transition-all" style={{ width: `${(isExamMode ? answeredCount : currentIdx + (isConfirmed ? 1 : 0)) / quizQuestions.length * 100}%` }} />
        </div>
        {isExamMode && <p className="mt-3 text-xs text-slate-400">Revise ou pule questões livremente. O gabarito aparece após a entrega; ao zerar o tempo, suas respostas são entregues automaticamente.</p>}
      </section>

      {isExamMode && (
        <details className="rounded-2xl border border-slate-700 bg-slate-800/60 p-4">
          <summary className="cursor-pointer text-sm font-bold text-slate-200">Navegar pelas 65 questões · {quizQuestions.length - answeredCount} pendentes</summary>
          <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-10">
            {quizQuestions.map((question, index) => (
              <button type="button" key={question.id} onClick={() => handleGoToQuestion(index)} aria-label={`Ir para questão ${index + 1}${answeredQuestionIds.has(question.id) ? ', respondida' : ', pendente'}`} aria-current={index === currentIdx ? 'step' : undefined}
                className={`rounded-lg border py-2 text-sm font-bold cursor-pointer ${index === currentIdx ? 'border-orange-400 bg-orange-500 text-slate-950' : answeredQuestionIds.has(question.id) ? 'border-sky-500/50 bg-sky-500/15 text-sky-200' : 'border-slate-600 bg-slate-900 text-slate-300'}`}>
                {index + 1}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-400">Laranja: atual · Azul: respondida · Cinza: pendente</p>
        </details>
      )}

      <section className="rounded-2xl border border-slate-700 bg-slate-800/75 p-5 shadow-xl sm:p-7" aria-label="Questão atual">
        <QuestionOrigin question={currentQuestion} />
        <p className="mb-2 text-xs font-semibold text-orange-300">{currentQuestion.domain}</p>
        <h2 className="mb-3 text-base font-semibold leading-relaxed text-white sm:text-lg">{currentQuestion.question}</h2>
        <p className="mb-5 text-sm text-slate-400">Selecione {currentQuestion.requiredCount} {currentQuestion.requiredCount > 1 ? 'alternativas' : 'alternativa'} · {selectedOptions.length} selecionada(s)</p>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const selected = selectedOptions.includes(index);
            const right = currentQuestion.correctIndices.includes(index);
            const tone = revealAnswer ? right ? 'border-emerald-500 bg-emerald-500/15 text-emerald-50' : selected ? 'border-red-500 bg-red-500/15 text-red-100' : 'border-slate-700 bg-slate-900/50 text-slate-400'
              : selected ? 'border-orange-400 bg-orange-500/15 text-white' : 'border-slate-700 bg-slate-900/70 text-slate-200 hover:border-slate-500';
            return (
              <button type="button" key={index} aria-pressed={selected} disabled={revealAnswer} onClick={() => handleToggleOption(index)} className={`flex w-full items-start gap-3 rounded-xl border-2 p-4 text-left text-sm leading-relaxed transition cursor-pointer disabled:cursor-default sm:text-base ${tone}`}>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-950/40 text-xs font-bold">{OPTION_LETTERS[index]}</span>
                <span className="flex-1">{option}</span>
                {revealAnswer && (right ? <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" /> : selected ? <XCircle className="h-5 w-5 shrink-0 text-red-400" /> : null)}
              </button>
            );
          })}
        </div>

        {revealAnswer && (
          <div className={`mt-6 rounded-2xl border p-4 sm:p-5 ${correct ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-red-500/40 bg-red-500/10'}`}>
            <p className={`mb-3 font-extrabold ${correct ? 'text-emerald-400' : 'text-red-400'}`}>{correct ? 'Resposta Correta!' : 'Resposta Incorreta — Veja o porquê:'}</p>
            <p className="mb-3 text-xs font-semibold text-orange-300">{currentQuestion.keyword}</p>
            <QuestionExplanation question={currentQuestion} />
            <QuestionReferences question={currentQuestion} />
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-700 pt-5">
          {isExamMode ? (
            <>
              <button type="button" disabled={currentIdx === 0} onClick={() => handleGoToQuestion(currentIdx - 1)} className={secondaryButton}><ChevronLeft className="mr-1 inline h-4 w-4" />Anterior</button>
              <button type="button" onClick={handleNextOrFinish} className={primaryButton}>{currentIdx + 1 < quizQuestions.length ? 'Salvar e avançar' : 'Revisar e entregar'}<ChevronRight className="ml-1 inline h-4 w-4" /></button>
            </>
          ) : (
            <>
              <span className="text-xs text-slate-400">{isConfirmed ? `Acertos até agora: ${userAnswers.filter((answer) => answer.isCorrect).length} de ${userAnswers.length}` : 'Confirme sua seleção para ver os comentários.'}</span>
              {!isConfirmed ? <button type="button" onClick={handleConfirmAnswer} disabled={selectedOptions.length !== currentQuestion.requiredCount} className={primaryButton}>Confirmar Resposta</button>
                : <button type="button" onClick={handleNextOrFinish} className={primaryButton}>{currentIdx + 1 < quizQuestions.length ? 'Próxima Questão' : 'Finalizar Simulado'}</button>}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
