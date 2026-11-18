'use client';

import { CheckCircle2, XCircle, Trophy, RotateCcw, BarChart3 } from 'lucide-react';
import { formatTime, scrollToTop } from '../utils';
import { DomainIcon } from './domain-icon';
import { DetailedReviewSection } from './detailed-review-section';

import type { ExamController } from '../hooks/use-exam';

// Resultado final, desempenho por domínio e revisão da tentativa.
export function ExamResult({ controller }: { controller: Pick<ExamController, 'saveSuccess' | 'quizPhase' | 'setQuizPhase' | 'latestResult' | 'domainBreakdown' | 'handleSwitchTab'> }) {
  const { saveSuccess, quizPhase, setQuizPhase, latestResult, domainBreakdown, handleSwitchTab } = controller;
  return (<>{quizPhase === 'result' && latestResult && (
              <div className="space-y-6">
                {/* Card Principal de Resultado */}
                <div
                  className={`relative overflow-hidden rounded-3xl border-2 p-6 sm:p-8 shadow-2xl ${
                    latestResult.passed
                      ? 'bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-900 border-emerald-500/50'
                      : 'bg-gradient-to-br from-red-950/70 via-slate-900 to-slate-900 border-red-500/50'
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                      <div className="inline-flex items-center gap-2 mb-3">
                        <span
                          className={`px-4 py-1.5 rounded-full text-sm font-extrabold tracking-wider uppercase flex items-center gap-2 ${
                            latestResult.passed
                              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30'
                              : 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                          }`}
                        >
                          {latestResult.passed ? (
                            <>
                              <CheckCircle2 className="w-4 h-4" /> APROVADO NA AWS SAA-C03
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4" /> REPROVADO (CORTE: 720)
                            </>
                          )}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                        {latestResult.passed
                          ? `Parabéns, ${latestResult.candidateName}!`
                          : `Continue treinando, ${latestResult.candidateName}!`}
                      </h2>
                      <p className="text-slate-300 text-sm mt-1.5">
                        {latestResult.passed
                          ? 'Você atingiu a pontuação mínima exigida no exame oficial da AWS.'
                          : 'Revise os erros no gabarito abaixo usando os resumos de fixação e tente novamente.'}
                      </p>
                      <div className="mt-3 flex items-center justify-center md:justify-start gap-2 text-xs">
                        {saveSuccess && (
                          <span className="text-emerald-400 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Resultado salvo no Ranking e
                            Histórico!
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Placar AWS 100 - 1000 */}
                    <div className="bg-slate-950/80 border border-slate-700/80 rounded-2xl p-6 text-center min-w-[200px] shrink-0">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Pontuação AWS
                      </div>
                      <div
                        className={`text-5xl font-black mt-1 ${
                          latestResult.passed ? 'text-emerald-400' : 'text-red-400'
                        }`}
                      >
                        {latestResult.awsScore}
                      </div>
                      <div className="text-xs text-slate-400 font-semibold mt-1">
                        de 1000 pontos (Corte: 720)
                      </div>
                    </div>
                  </div>

                  {/* Métricas Rápidas */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800">
                    <div className="bg-slate-900/70 rounded-xl p-3.5 border border-slate-800">
                      <div className="text-xs text-slate-400">Taxa de Acerto</div>
                      <div className="text-xl font-extrabold text-white mt-0.5">
                        {Math.round(
                          (latestResult.correctCount / latestResult.totalQuestions) * 100
                        )}
                        %
                      </div>
                    </div>
                    <div className="bg-slate-900/70 rounded-xl p-3.5 border border-slate-800">
                      <div className="text-xs text-slate-400">Acertos</div>
                      <div className="text-xl font-extrabold text-emerald-400 mt-0.5">
                        {latestResult.correctCount} / {latestResult.totalQuestions}
                      </div>
                    </div>
                    <div className="bg-slate-900/70 rounded-xl p-3.5 border border-slate-800">
                      <div className="text-xs text-slate-400">Erros</div>
                      <div className="text-xl font-extrabold text-red-400 mt-0.5">
                        {latestResult.totalQuestions - latestResult.correctCount}
                      </div>
                    </div>
                    <div className="bg-slate-900/70 rounded-xl p-3.5 border border-slate-800">
                      <div className="text-xs text-slate-400">Tempo Total</div>
                      <div className="text-xl font-extrabold text-[#FF9900] mt-0.5 font-mono">
                        {formatTime(latestResult.timeSeconds)}
                      </div>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setQuizPhase('setup');
                        scrollToTop();
                      }}
                      className="px-5 py-3 rounded-xl bg-[#FF9900] hover:bg-amber-400 text-slate-950 font-extrabold text-sm transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Fazer Novo Simulado
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSwitchTab('ranking')}
                      className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Trophy className="w-4 h-4 text-[#FF9900]" />
                      Ver Ranking Geral
                    </button>
                  </div>
                </div>

                {/* Desempenho por Domínio */}
                <div className="bg-slate-800/75 border border-slate-700/80 rounded-2xl p-6">
                  <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#FF9900]" />
                    Desempenho por Domínio SAA-C03
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {domainBreakdown.map((item) => (
                      <div
                        key={item.domain}
                        className="bg-slate-900/70 border border-slate-700/70 rounded-xl p-4"
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`p-1.5 rounded-lg ${item.meta.bg} ${item.meta.color}`}>
                              <DomainIcon domain={item.domain} className="w-4 h-4" />
                            </span>
                            <div>
                              <div className="text-sm font-bold text-white">{item.meta.label}</div>
                              <div className="text-[11px] text-slate-400">
                                Peso oficial: {item.meta.weight}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            {item.total > 0 ? (
                              <>
                                <div className="text-sm font-extrabold text-white">{item.pct}%</div>
                                <div className="text-[11px] text-slate-400">
                                  {item.correct}/{item.total} acertos
                                </div>
                              </>
                            ) : (
                              <span className="text-xs text-slate-500">Não incluído</span>
                            )}
                          </div>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-500 ${
                              item.meta.barColor || 'bg-orange-500'
                            }`}
                            style={{ width: `${item.pct ?? 0}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gabarito Detalhado da Tentativa */}
                <DetailedReviewSection answers={latestResult.answers} />
              </div>
            )}</>);
}
