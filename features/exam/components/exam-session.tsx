'use client';

import type React from 'react';
import { Award, CheckCircle2, XCircle, Clock, ChevronRight, Sparkles, Check, KeyRound } from 'lucide-react';
import { getDomainMeta } from '../data/domains';
import { OPTION_LETTERS } from '../constants';
import { formatTime, arraysEqual } from '../utils';
import { DomainIcon } from './domain-icon';

import type { ExamController } from '../hooks/use-exam';

// Questão atual, seleção de alternativas e correção imediata.
export function ExamSession({ controller }: { controller: Pick<ExamController, 'quizPhase' | 'quizQuestions' | 'currentIdx' | 'selectedOptions' | 'isConfirmed' | 'userAnswers' | 'elapsedSeconds' | 'setShowExitModal' | 'currentQuestion' | 'handleToggleOption' | 'handleConfirmAnswer' | 'handleNextOrFinish'> }) {
  const { quizPhase, quizQuestions, currentIdx, selectedOptions, isConfirmed, userAnswers, elapsedSeconds, setShowExitModal, currentQuestion, handleToggleOption, handleConfirmAnswer, handleNextOrFinish } = controller;
  return (<>{quizPhase === 'playing' && currentQuestion && (
              <div className="space-y-5">
                {/* Barra Superior de Progresso e Cronômetro */}
                <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-sm font-extrabold text-white">
                        Questão {currentIdx + 1}{' '}
                        <span className="text-slate-400 font-medium">
                          de {quizQuestions.length}
                        </span>
                      </span>
                      {(() => {
                        const meta = getDomainMeta(currentQuestion.domain);
                        return (
                          <span
                            className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg border ${meta.bg} ${meta.color} ${meta.border}`}
                          >
                            <DomainIcon domain={currentQuestion.domain} className="w-3.5 h-3.5" />
                            {currentQuestion.domain}
                          </span>
                        );
                      })()}
                      {currentQuestion.multiSelect && (
                        <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40">
                          Escolha {currentQuestion.requiredCount} alternativas
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-sm font-mono font-bold text-[#FF9900]">
                        <Clock className="w-4 h-4" />
                        {formatTime(elapsedSeconds)}
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowExitModal(true)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                      >
                        Sair
                      </button>
                    </div>
                  </div>

                  {/* Barra de progresso */}
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FF9900] to-amber-400 transition-all duration-300"
                      style={{
                        width: `${((currentIdx + (isConfirmed ? 1 : 0)) / quizQuestions.length) * 100}%`
                      }}
                    />
                  </div>
                </div>

                {/* Cartão da Questão */}
                <div className="bg-slate-800/75 border border-slate-700/80 rounded-2xl p-5 sm:p-7 shadow-xl">
                  <p className="text-base sm:text-lg font-semibold text-white leading-relaxed mb-6">
                    {currentQuestion.question}
                  </p>

                  {/* Alternativas */}
                  <div className="space-y-3">
                    {currentQuestion.options.map((optText, optIdx) => {
                      const isSelected = selectedOptions.includes(optIdx);
                      const isCorrectOpt = currentQuestion.correctIndices.includes(optIdx);

                      let cardClass =
                        'bg-slate-900/70 border-slate-700 hover:border-slate-500 text-slate-200';
                      let badgeClass = 'bg-slate-800 text-slate-300 border-slate-600';
                      let statusIcon: React.ReactNode = null;

                      if (!isConfirmed) {
                        if (isSelected) {
                          cardClass =
                            'bg-orange-500/15 border-[#FF9900] text-white shadow-md shadow-orange-500/10';
                          badgeClass = 'bg-[#FF9900] text-slate-950 border-[#FF9900]';
                        }
                      } else {
                        if (isCorrectOpt) {
                          cardClass =
                            'bg-emerald-500/15 border-emerald-500 text-emerald-50 shadow-md shadow-emerald-500/10';
                          badgeClass = 'bg-emerald-500 text-slate-950 border-emerald-400';
                          statusIcon = (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                          );
                        } else if (isSelected && !isCorrectOpt) {
                          cardClass =
                            'bg-red-500/15 border-red-500 text-red-50 shadow-md shadow-red-500/10';
                          badgeClass = 'bg-red-500 text-white border-red-400';
                          statusIcon = (
                            <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                          );
                        } else {
                          cardClass =
                            'bg-slate-900/40 border-slate-800 text-slate-500 opacity-75';
                          badgeClass = 'bg-slate-800/70 text-slate-500 border-slate-700';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          disabled={isConfirmed}
                          onClick={() => handleToggleOption(optIdx)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3.5 ${cardClass} ${
                            isConfirmed ? 'cursor-default' : 'cursor-pointer'
                          }`}
                        >
                          <span
                            className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5 transition-colors ${badgeClass}`}
                          >
                            {OPTION_LETTERS[optIdx]}
                          </span>
                          <span className="flex-1 text-sm sm:text-base leading-relaxed">
                            {optText}
                          </span>
                          {statusIcon}
                        </button>
                      );
                    })}
                  </div>

                  {/* Resumo para Fixação (aparece após confirmar) */}
                  {isConfirmed && (
                    <div
                      className={`mt-6 rounded-2xl border p-5 transition-all ${
                        arraysEqual(selectedOptions, currentQuestion.correctIndices)
                          ? 'bg-emerald-500/10 border-emerald-500/40'
                          : 'bg-red-500/10 border-red-500/40'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          {arraysEqual(selectedOptions, currentQuestion.correctIndices) ? (
                            <>
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                              <span className="font-extrabold text-emerald-400">
                                Resposta Correta!
                              </span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-5 h-5 text-red-400" />
                              <span className="font-extrabold text-red-400">
                                Resposta Incorreta — Veja o porquê:
                              </span>
                            </>
                          )}
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-orange-500/20 text-[#FF9900] border border-orange-500/40">
                          <KeyRound className="w-3.5 h-3.5" />
                          Palavra-chave: {currentQuestion.keyword}
                        </span>
                      </div>

                      <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-700/70">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#FF9900]" />
                          Resumo para Fixação na Prova
                        </div>
                        <p className="text-sm text-slate-200 leading-relaxed">
                          {currentQuestion.summary}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Botões de Ação */}
                  <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-slate-700/70">
                    <div className="text-xs text-slate-400">
                      {!isConfirmed ? (
                        currentQuestion.multiSelect ? (
                          <span>
                            Selecionadas:{' '}
                            <strong className="text-white">
                              {selectedOptions.length}/{currentQuestion.requiredCount}
                            </strong>
                          </span>
                        ) : (
                          <span>Selecione 1 alternativa para confirmar</span>
                        )
                      ) : (
                        <span>
                          Acertos até agora:{' '}
                          <strong className="text-emerald-400">
                            {userAnswers.filter((a) => a.isCorrect).length}
                          </strong>{' '}
                          de {userAnswers.length}
                        </span>
                      )}
                    </div>

                    {!isConfirmed ? (
                      <button
                        type="button"
                        onClick={handleConfirmAnswer}
                        disabled={selectedOptions.length !== currentQuestion.requiredCount}
                        className={`px-6 py-3 rounded-xl font-extrabold text-sm transition-all flex items-center gap-2 ${
                          selectedOptions.length === currentQuestion.requiredCount
                            ? 'bg-[#FF9900] hover:bg-amber-400 text-slate-950 shadow-lg shadow-orange-500/20 cursor-pointer'
                            : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <Check className="w-4 h-4" />
                        Confirmar Resposta
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleNextOrFinish}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF9900] to-amber-500 hover:from-amber-400 hover:to-[#FF9900] text-slate-950 font-extrabold text-sm shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2 cursor-pointer"
                      >
                        {currentIdx + 1 < quizQuestions.length ? (
                          <>
                            Próxima Questão <ChevronRight className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            Finalizar Simulado <Award className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}</>);
}
