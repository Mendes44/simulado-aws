'use client';

import type React from 'react';
import { Trophy, Play, Eye } from 'lucide-react';
import { formatTime, formatDate, scrollToTop } from '../utils';

import type { ExamController } from '../hooks/use-exam';

// Classificação das tentativas por pontuação e tempo.
export function Ranking({ controller }: { controller: Pick<ExamController, 'loadingHistory' | 'activeTab' | 'setActiveTab' | 'setQuizPhase' | 'rankedAttempts' | 'openAttemptInspection'> }) {
  const { loadingHistory, activeTab, setActiveTab, setQuizPhase, rankedAttempts, openAttemptInspection } = controller;
  return (<>{activeTab === 'ranking' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
                  <Trophy className="w-7 h-7 text-[#FF9900]" />
                  Ranking dos Candidatos
                </h2>
                <p className="text-sm text-slate-400 mt-0.5">
                  Ordenado por maior pontuação AWS (desempate por menor tempo).
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('simulado');
                  setQuizPhase('setup');
                  scrollToTop();
                }}
                className="px-4 py-2.5 rounded-xl bg-[#FF9900] hover:bg-amber-400 text-slate-950 font-extrabold text-sm transition-all inline-flex items-center gap-2 self-start sm:self-auto cursor-pointer"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                Fazer Simulado
              </button>
            </div>

            {loadingHistory ? (
              <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-10 text-center text-slate-400">
                Carregando ranking...
              </div>
            ) : rankedAttempts.length === 0 ? (
              <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-10 text-center space-y-3">
                <Trophy className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">Nenhum simulado registrado ainda</h3>
                <p className="text-sm text-slate-400">
                  Seja o primeiro a concluir um simulado e entrar no topo do Ranking!
                </p>
              </div>
            ) : (
              <div className="bg-slate-800/75 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900/90 border-b border-slate-700/80 text-xs uppercase tracking-wider text-slate-400">
                        <th className="py-3.5 px-4 font-bold">Pos.</th>
                        <th className="py-3.5 px-4 font-bold">Candidato</th>
                        <th className="py-3.5 px-4 font-bold">Nota AWS</th>
                        <th className="py-3.5 px-4 font-bold">Acertos</th>
                        <th className="py-3.5 px-4 font-bold">Tempo</th>
                        <th className="py-3.5 px-4 font-bold">Status</th>
                        <th className="py-3.5 px-4 font-bold text-right">Gabarito</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/60 text-sm">
                      {rankedAttempts.map((att, index) => {
                        const pos = index + 1;
                        let medal: React.ReactNode = (
                          <span className="text-slate-400 font-bold pl-1.5">#{pos}</span>
                        );
                        if (pos === 1) {
                          medal = (
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 font-black">
                              🥇
                            </span>
                          );
                        } else if (pos === 2) {
                          medal = (
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-300/20 text-slate-200 border border-slate-300/40 font-black">
                              🥈
                            </span>
                          );
                        } else if (pos === 3) {
                          medal = (
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-700/30 text-orange-300 border border-orange-500/40 font-black">
                              🥉
                            </span>
                          );
                        }

                        return (
                          <tr
                            key={att.id}
                            className="hover:bg-slate-700/30 transition-colors"
                          >
                            <td className="py-3.5 px-4 whitespace-nowrap">{medal}</td>
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-white">{att.candidateName}</div>
                              <div className="text-[11px] text-slate-400">
                                {formatDate(att.createdAt)} • {att.domainFilter}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="text-base font-black text-[#FF9900]">
                                {att.awsScore}
                              </span>
                              <span className="text-xs text-slate-500">/1000</span>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap font-semibold text-slate-200">
                              {att.correctCount}/{att.totalQuestions}
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap font-mono text-slate-300">
                              {formatTime(att.timeSeconds)}
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                                  att.passed
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                }`}
                              >
                                {att.passed ? 'APROVADO' : 'REPROVADO'}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap text-right">
                              <button
                                type="button"
                                onClick={() => openAttemptInspection(att)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700/70 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5 text-[#FF9900]" />
                                Ver
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}</>);
}
