'use client';

import { Award, CheckCircle2, Play, Filter, User, AlertCircle, BarChart3 } from 'lucide-react';
import { QUESTIONS_DB } from '../data/questions';
import { DOMAINS } from '../data/domains';
import { DomainIcon } from './domain-icon';

import type { ExamController } from '../hooks/use-exam';

// Configuração do candidato, domínio e quantidade de questões.
export function ExamSetup({ controller }: { controller: Pick<ExamController, 'nameInputRef' | 'candidateName' | 'setCandidateName' | 'nameError' | 'setNameError' | 'questionCount' | 'setQuestionCount' | 'selectedDomain' | 'setSelectedDomain' | 'quizPhase' | 'availableQuestionsForDomain' | 'handleStartQuiz'> }) {
  const { nameInputRef, candidateName, setCandidateName, nameError, setNameError, questionCount, setQuestionCount, selectedDomain, setSelectedDomain, quizPhase, availableQuestionsForDomain, handleStartQuiz } = controller;
  return (<>{quizPhase === 'setup' && (
              <div className="space-y-6">
                {/* Banner Hero */}
                <div className="relative overflow-hidden bg-gradient-to-br from-slate-800/90 via-slate-900 to-[#0B1120] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl">
                  <div className="absolute -right-12 -top-12 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="relative z-10 max-w-2xl">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-orange-500/15 text-[#FF9900] border border-orange-500/30 mb-3">
                      <Award className="w-3.5 h-3.5" /> Preparatório Certificação Oficial
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                      AWS Certified Solutions Architect – Associate{' '}
                      <span className="text-[#FF9900]">(SAA-C03)</span>
                    </h2>
                    <p className="text-slate-300 text-sm sm:text-base mt-2.5 leading-relaxed">
                      Treine com questões reais no padrão do exame, receba correção imediata com
                      resumo técnico para fixação e descubra sua nota na escala oficial da AWS (100
                      a 1000 pontos).
                    </p>
                  </div>
                </div>

                {/* Formulário de Configuração */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-slate-800/70 border border-slate-700/80 rounded-2xl p-6 space-y-6">
                    {/* Nome do Candidato */}
                    <div>
                      <label
                        htmlFor="candidateName"
                        className="text-sm font-bold text-slate-200 mb-2 flex items-center gap-2"
                      >
                        <User className="w-4 h-4 text-[#FF9900]" />
                        Seu Nome (para o Ranking e Histórico) <span className="text-red-400">*</span>
                      </label>
                      <input
                        ref={nameInputRef}
                        id="candidateName"
                        type="text"
                        value={candidateName}
                        onChange={(e) => {
                          setCandidateName(e.target.value);
                          if (nameError) setNameError('');
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleStartQuiz();
                        }}
                        placeholder="Ex: Maria Silva, João Pedro..."
                        maxLength={45}
                        className={`w-full px-4 py-3.5 rounded-xl bg-slate-900 border text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                          nameError
                            ? 'border-red-500 focus:ring-red-500/40'
                            : 'border-slate-700 focus:border-[#FF9900] focus:ring-orange-500/30'
                        }`}
                      />
                      {nameError && (
                        <p className="text-xs text-red-400 mt-2 flex items-center gap-1.5 font-medium">
                          <AlertCircle className="w-4 h-4 shrink-0" /> {nameError}
                        </p>
                      )}
                    </div>

                    {/* Tamanho do Simulado */}
                    <div>
                      <label className="text-sm font-bold text-slate-200 mb-2.5 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-[#FF9900]" />
                        Tamanho do Simulado
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { count: 10, label: 'Rápido', desc: '10 questões' },
                          { count: 20, label: 'Intermediário', desc: '20 questões' },
                          { count: 30, label: 'Completo', desc: '30 questões' }
                        ].map((opt) => {
                          const isSelected = questionCount === opt.count;
                          return (
                            <button
                              key={opt.count}
                              type="button"
                              onClick={() => setQuestionCount(opt.count)}
                              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-orange-500/15 border-[#FF9900] shadow-lg shadow-orange-500/10'
                                  : 'bg-slate-900/70 border-slate-700 hover:border-slate-500'
                              }`}
                            >
                              <div
                                className={`text-lg font-extrabold ${
                                  isSelected ? 'text-[#FF9900]' : 'text-white'
                                }`}
                              >
                                {opt.count}
                              </div>
                              <div className="text-xs font-bold text-slate-200">{opt.label}</div>
                              <div className="text-[11px] text-slate-400">{opt.desc}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Filtro por Domínio */}
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
                          <Filter className="w-4 h-4 text-[#FF9900]" />
                          Domínio SAA-C03 (Opcional)
                        </label>
                        <span className="text-xs text-slate-400">
                          {availableQuestionsForDomain.length} disponíveis
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {DOMAINS.map((dom) => {
                          const isSelected = selectedDomain === dom.id;
                          const countInDom =
                            dom.id === 'Todos'
                              ? QUESTIONS_DB.length
                              : QUESTIONS_DB.filter((q) => q.domain === dom.id).length;
                          return (
                            <button
                              key={dom.id}
                              type="button"
                              onClick={() => setSelectedDomain(dom.id)}
                              className={`p-3 rounded-xl border flex items-center justify-between gap-2 transition-all text-left cursor-pointer ${
                                isSelected
                                  ? 'bg-orange-500/15 border-[#FF9900]'
                                  : 'bg-slate-900/70 border-slate-700 hover:border-slate-500'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span
                                  className={`p-1.5 rounded-lg shrink-0 ${dom.bg} ${dom.color}`}
                                >
                                  <DomainIcon domain={dom.id} className="w-4 h-4" />
                                </span>
                                <div className="truncate">
                                  <div className="text-xs sm:text-sm font-semibold text-white truncate">
                                    {dom.label}
                                  </div>
                                  <div className="text-[11px] text-slate-400">
                                    Peso na prova: {dom.weight}
                                  </div>
                                </div>
                              </div>
                              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 shrink-0">
                                {countInDom}q
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      {availableQuestionsForDomain.length < questionCount && (
                        <p className="text-xs text-amber-400 mt-2.5 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          Este domínio possui {availableQuestionsForDomain.length} questões no
                          banco; o simulado será iniciado com todas elas.
                        </p>
                      )}
                    </div>

                    {/* Alerta visível próximo ao botão caso falte nome */}
                    {nameError && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/40 text-xs text-red-300 flex items-center gap-2 font-medium">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                        <span>{nameError}</span>
                      </div>
                    )}

                    {/* Botão Iniciar */}
                    <button
                      type="button"
                      onClick={handleStartQuiz}
                      className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#FF9900] to-amber-500 hover:from-amber-400 hover:to-[#FF9900] text-slate-950 font-extrabold text-base shadow-xl shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Play className="w-5 h-5 fill-slate-950" />
                      Iniciar Simulado ({Math.min(questionCount, availableQuestionsForDomain.length)}{' '}
                      Questões)
                    </button>
                  </div>

                  {/* Card Lateral de Regras da Prova */}
                  <div className="bg-slate-800/50 border border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between space-y-5">
                    <div className="space-y-4">
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#FF9900]" />
                        Regras do Exame Oficial
                      </h3>
                      <ul className="space-y-3 text-sm text-slate-300">
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-white">Escala AWS:</strong> 100 a 1000 pontos.
                          </span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-white">Nota de Corte:</strong> 720 pontos para
                            aprovação.
                          </span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-white">Feedback Imediato:</strong> Veja na hora
                            se acertou e o resumo para fixar.
                          </span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-white">Ranking & Histórico:</strong> Suas
                            tentativas e gabaritos ficam salvos para revisão.
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/70">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Dica de Estudo
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Fique atento às <strong className="text-[#FF9900]">palavras-chave</strong>{' '}
                        como &ldquo;menor overhead operacional&rdquo;, &ldquo;altamente
                        disponível&rdquo; e &ldquo;mais econômico&rdquo; — elas definem o serviço
                        correto na prova SAA-C03.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}</>);
}
