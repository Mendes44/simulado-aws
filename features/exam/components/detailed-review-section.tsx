'use client';

import { QuestionReferences } from './question-references';
import { QuestionExplanation } from './question-explanation';
import { QuestionOrigin } from './question-origin';

import { useState, useMemo } from 'react';
import { BookOpen, CheckCircle2, XCircle, Sparkles, Check, ArrowLeft, KeyRound } from 'lucide-react';
import type { AnswerRecord, ExamAttempt, EnrichedAnswer } from '../types';
import { QUESTIONS_DB } from '../data/questions';
import { getQuestionBankLabel } from '../data/question-banks';
import { getDomainMeta } from '../data/domains';
import { OPTION_LETTERS } from '../constants';
import { formatTime, formatDate } from '../utils';
import { DomainIcon } from './domain-icon';

// Reconstrói as questões da tentativa e permite revisar acertos e erros.
interface DetailedReviewSectionProps {
  answers: AnswerRecord[];
  onBack?: () => void;
  headerInfo?: ExamAttempt;
}

export function DetailedReviewSection({
  answers,
  onBack,
  headerInfo
}: DetailedReviewSectionProps) {
  const [filterMode, setFilterMode] = useState<'all' | 'wrong' | 'correct'>('all');

  const enrichedAnswers = useMemo<EnrichedAnswer[]>(() => {
    return (answers || [])
      .map((ans, index) => {
        const q = QUESTIONS_DB.find((item) => item.id === ans.questionId);
        if (!q) return null;
        return {
          ...ans,
          order: index + 1,
          questionData: q
        };
      })
      .filter((item): item is EnrichedAnswer => item !== null);
  }, [answers]);

  const filtered = useMemo(() => {
    if (filterMode === 'wrong') return enrichedAnswers.filter((a) => !a.isCorrect);
    if (filterMode === 'correct') return enrichedAnswers.filter((a) => a.isCorrect);
    return enrichedAnswers;
  }, [enrichedAnswers, filterMode]);

  const totalCorrect = enrichedAnswers.filter((a) => a.isCorrect).length;
  const totalWrong = enrichedAnswers.length - totalCorrect;

  return (
    <div className="space-y-6">
      {headerInfo && (
        <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="p-2.5 rounded-xl bg-slate-700/70 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                title="Voltar"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-white">{headerInfo.candidateName}</h3>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    headerInfo.passed
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}
                >
                  {headerInfo.passed ? 'APROVADO' : 'REPROVADO'}
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-0.5">
                {formatDate(headerInfo.createdAt)} • {getQuestionBankLabel(headerInfo.bankId)} • Pontuação AWS:{' '}
                <span className="text-orange-400 font-semibold">{headerInfo.awsScore}/1000</span> •{' '}
                {headerInfo.correctCount}/{headerInfo.totalQuestions} acertos • Tempo:{' '}
                {formatTime(headerInfo.timeSeconds)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filtros do Gabarito */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-orange-400" />
          Gabarito Detalhado ({filtered.length})
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              filterMode === 'all'
                ? 'bg-orange-500 text-slate-950 font-bold shadow-lg shadow-orange-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            Todas ({enrichedAnswers.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('wrong')}
            className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              filterMode === 'wrong'
                ? 'bg-red-500 text-white font-bold shadow-lg shadow-red-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            Apenas Erros ({totalWrong})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('correct')}
            className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              filterMode === 'correct'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            Apenas Acertos ({totalCorrect})
          </button>
        </div>
      </div>

      {/* Lista de Questões Revisadas */}
      {filtered.length === 0 ? (
        <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-8 text-center">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
          <p className="text-slate-300 font-medium">
            Nenhuma questão encontrada para este filtro.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => {
            const q = item.questionData;
            const domainMeta = getDomainMeta(q.domain);
            return (
              <div
                key={`${q.id}-${item.order}`}
                className={`bg-slate-800/75 border rounded-2xl p-5 transition-all ${
                  item.isCorrect ? 'border-emerald-500/30' : 'border-red-500/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-700">
                      Questão #{item.order} (Q{q.id})
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border ${domainMeta.bg} ${domainMeta.color} ${domainMeta.border}`}
                    >
                      <DomainIcon domain={q.domain} className="w-3.5 h-3.5" />
                      {q.domain}
                    </span>
                    {q.multiSelect && (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-purple-500/15 text-purple-300 border border-purple-500/30">
                        Múltipla Escolha ({q.requiredCount})
                      </span>
                    )}
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${
                      item.isCorrect
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {item.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Acertou
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" /> Errou
                      </>
                    )}
                  </span>
                </div>

                <QuestionOrigin question={q} />
                <p className="text-slate-100 font-medium leading-relaxed mb-4">{q.question}</p>

                <div className="space-y-2 mb-4">
                  {q.options.map((optText, optIdx) => {
                    const isCorrectOpt = q.correctIndices.includes(optIdx);
                    const wasSelected = item.selectedIndices.includes(optIdx);

                    let styleClasses =
                      'bg-slate-900/50 border-slate-700/70 text-slate-400';
                    if (isCorrectOpt) {
                      styleClasses =
                        'bg-emerald-500/15 border-emerald-500/50 text-emerald-100';
                    } else if (wasSelected && !isCorrectOpt) {
                      styleClasses = 'bg-red-500/15 border-red-500/50 text-red-100';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border text-sm flex items-start gap-3 ${styleClasses}`}
                      >
                        <span
                          className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                            isCorrectOpt
                              ? 'bg-emerald-500 text-slate-950'
                              : wasSelected
                              ? 'bg-red-500 text-white'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {OPTION_LETTERS[optIdx]}
                        </span>
                        <div className="flex-1">
                          <span>{optText}</span>
                          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            {isCorrectOpt && (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
                                <Check className="w-3.5 h-3.5" /> Gabarito Correto
                              </span>
                            )}
                            {wasSelected && (
                              <span
                                className={`inline-flex items-center gap-1 text-xs font-semibold ${
                                  isCorrectOpt ? 'text-emerald-300' : 'text-red-400'
                                }`}
                              >
                                {isCorrectOpt ? '• Você marcou esta' : '✗ Você marcou esta'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Resumo de Fixação */}
                <div className="bg-slate-900/90 border border-orange-500/30 rounded-xl p-4">
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> {q.optionExplanations ? 'Comentários por alternativa' : 'Resumo para Fixação na Prova'}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-orange-500/15 text-orange-300 border border-orange-500/30 flex items-center gap-1">
                      <KeyRound className="w-3 h-3" /> {q.keyword}
                    </span>
                  </div>
                  <QuestionExplanation question={q} />
                  <QuestionReferences question={q} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

