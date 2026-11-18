'use client';

import { History, ChevronRight, Search } from 'lucide-react';
import { formatTime, formatDate, scrollToTop } from '../utils';
import { DetailedReviewSection } from './detailed-review-section';

import type { ExamController } from '../hooks/use-exam';

// Busca, filtros e revisão das tentativas salvas no navegador.
export function AttemptHistory({ controller }: { controller: Pick<ExamController, 'loadingHistory' | 'activeTab' | 'historySearch' | 'setHistorySearch' | 'historyStatusFilter' | 'setHistoryStatusFilter' | 'inspectingAttempt' | 'setInspectingAttempt' | 'filteredHistory' | 'openAttemptInspection'> }) {
  const { loadingHistory, activeTab, historySearch, setHistorySearch, historyStatusFilter, setHistoryStatusFilter, inspectingAttempt, setInspectingAttempt, filteredHistory, openAttemptInspection } = controller;
  return (<>{activeTab === 'historico' && (
          <div className="space-y-6">
            {inspectingAttempt ? (
              <DetailedReviewSection
                answers={inspectingAttempt.answers}
                headerInfo={inspectingAttempt}
                onBack={() => {
                  setInspectingAttempt(null);
                  scrollToTop();
                }}
              />
            ) : (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
                      <History className="w-7 h-7 text-[#FF9900]" />
                      Histórico de Gabaritos
                    </h2>
                    <p className="text-sm text-slate-400 mt-0.5">
                      Clique em qualquer tentativa para revisar o que foi marcado em cada questão.
                    </p>
                  </div>
                </div>

                {/* Busca e Filtros */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={historySearch}
                      onChange={(e) => setHistorySearch(e.target.value)}
                      placeholder="Buscar por nome do candidato..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#FF9900]"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    {(
                      [
                        { id: 'all', label: 'Todos' },
                        { id: 'passed', label: 'Aprovados' },
                        { id: 'failed', label: 'Reprovados' }
                      ] as const
                    ).map((btn) => (
                      <button
                        key={btn.id}
                        type="button"
                        onClick={() => setHistoryStatusFilter(btn.id)}
                        className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          historyStatusFilter === btn.id
                            ? 'bg-[#FF9900] text-slate-950'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lista de Tentativas */}
                {loadingHistory ? (
                  <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-10 text-center text-slate-400">
                    Carregando histórico...
                  </div>
                ) : filteredHistory.length === 0 ? (
                  <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-10 text-center space-y-2">
                    <History className="w-12 h-12 text-slate-600 mx-auto" />
                    <h3 className="text-lg font-bold text-white">Nenhuma tentativa encontrada</h3>
                    <p className="text-sm text-slate-400">
                      Conclua um simulado ou ajuste os filtros de busca.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredHistory.map((att) => (
                      <button
                        key={att.id}
                        type="button"
                        onClick={() => openAttemptInspection(att)}
                        className="text-left bg-slate-800/75 hover:bg-slate-800 border border-slate-700/80 hover:border-[#FF9900]/60 rounded-2xl p-5 transition-all group cursor-pointer"
                      >
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div>
                            <div className="font-extrabold text-white text-base group-hover:text-[#FF9900] transition-colors">
                              {att.candidateName}
                            </div>
                            <div className="text-xs text-slate-400 mt-0.5">
                              {formatDate(att.createdAt)} • Domínio: {att.domainFilter}
                            </div>
                          </div>
                          <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${
                              att.passed
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}
                          >
                            {att.passed ? 'APROVADO' : 'REPROVADO'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-700/60">
                          <div className="flex items-center gap-4 text-xs">
                            <div>
                              <span className="text-slate-400">Nota: </span>
                              <strong className="text-[#FF9900] text-sm">{att.awsScore}</strong>
                            </div>
                            <div>
                              <span className="text-slate-400">Acertos: </span>
                              <strong className="text-white">
                                {att.correctCount}/{att.totalQuestions}
                              </strong>
                            </div>
                            <div>
                              <span className="text-slate-400">Tempo: </span>
                              <strong className="text-slate-200 font-mono">
                                {formatTime(att.timeSeconds)}
                              </strong>
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#FF9900]">
                            Revisar <ChevronRight className="w-4 h-4" />
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}</>);
}
