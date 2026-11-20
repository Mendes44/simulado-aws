'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import type { DomainId, QuestionDomain, Question, AnswerRecord, ExamAttempt, QuestionBankId } from '../types';
import { QUESTIONS_DB } from '../data/questions';
import { selectQuestionsForBank } from '../data/question-banks';
import { getDomainMeta } from '../data/domains';
import { NAME_STORAGE_KEY } from '../constants';
import { useAttemptStore } from './use-attempt-store';
import { calculateAwsScore, shuffleArray, scrollToTop } from '../utils';
import { EXAM_QUESTION_COUNT, EXAM_DURATION_SECONDS, selectExamQuestions, createAnswerRecord, completeAnswers } from '../exam-rules';

// Uma sessão compartilhada pelas telas; os modos diferem no tempo, na navegação e no feedback.
export function useExam() {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const startedAtRef = useRef(0);
  const finishedRef = useRef(false);
  const [activeTab, setActiveTab] = useState<'simulado' | 'ranking' | 'historico'>('simulado');
  const [candidateName, setCandidateName] = useState('');
  const { attempts, rankedAttempts, rankingSource, loadingHistory, saveSuccess, setSaveSuccess, saveAttempt, refreshRanking, cloudStatus, cloudError, pendingCount } = useAttemptStore(setCandidateName);
  const [nameError, setNameError] = useState('');
  // 65 é a prova padrão; zero significa todas as questões do filtro no modo treino.
  const [questionCount, setQuestionCount] = useState(EXAM_QUESTION_COUNT);
  const [selectedBank, setSelectedBank] = useState<QuestionBankId>('all');
  const [selectedDomain, setSelectedDomain] = useState<DomainId>('Todos');
  const [quizPhase, setQuizPhase] = useState<'setup' | 'playing' | 'result'>('setup');
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [userAnswers, setUserAnswers] = useState<AnswerRecord[]>([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [latestResult, setLatestResult] = useState<ExamAttempt | null>(null);
  const [historySearch, setHistorySearch] = useState('');
  const [historyStatusFilter, setHistoryStatusFilter] = useState<'all' | 'passed' | 'failed'>('all');
  const [inspectingAttempt, setInspectingAttempt] = useState<ExamAttempt | null>(null);
  const isExamMode = questionCount === EXAM_QUESTION_COUNT;
  const currentQuestion = quizQuestions[currentIdx] ?? null;
  const remainingSeconds = Math.max(0, EXAM_DURATION_SECONDS - elapsedSeconds);

  const questionsForBank = useMemo(() => selectQuestionsForBank(QUESTIONS_DB, selectedBank), [selectedBank]);
  const availableQuestionsForDomain = useMemo(() => selectedDomain === 'Todos'
    ? questionsForBank
    : questionsForBank.filter((question) => question.domain === selectedDomain), [questionsForBank, selectedDomain]);
  const effectiveQuestionCount = isExamMode ? EXAM_QUESTION_COUNT : questionCount === 0
    ? availableQuestionsForDomain.length
    : Math.min(questionCount, availableQuestionsForDomain.length);

  // Inclui a seleção atual antes de navegar ou entregar. O mapa substitui respostas revisadas.
  const answersWithCurrentSelection = useCallback(() => {
    if (!currentQuestion) return userAnswers;
    const record = createAnswerRecord(currentQuestion, selectedOptions);
    return [...userAnswers.filter((answer) => answer.questionId !== currentQuestion.id), record];
  }, [currentQuestion, selectedOptions, userAnswers]);

  const answeredQuestionIds = useMemo(() => new Set(
    answersWithCurrentSelection().filter((answer) => {
      const question = quizQuestions.find((item) => item.id === answer.questionId);
      return question && answer.selectedIndices.length === question.requiredCount;
    }).map((answer) => answer.questionId)
  ), [answersWithCurrentSelection, quizQuestions]);
  const answeredCount = answeredQuestionIds.size;

  // A proteção por ref evita salvar duas vezes se entrega e expiração ocorrerem juntas.
  const finishQuiz = useCallback((timedOut = false) => {
    if (finishedRef.current || !quizQuestions.length) return;
    finishedRef.current = true;
    const answers = completeAnswers(quizQuestions, answersWithCurrentSelection());
    const correctCount = answers.filter((answer) => answer.isCorrect).length;
    const awsScore = calculateAwsScore(correctCount, quizQuestions.length);
    const elapsed = Math.max(0, Math.floor((Date.now() - startedAtRef.current) / 1000));
    const result: ExamAttempt = {
      id: `attempt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      candidateName: candidateName.trim(),
      awsScore, correctCount, totalQuestions: quizQuestions.length,
      passed: awsScore >= 720,
      timeSeconds: isExamMode ? Math.min(EXAM_DURATION_SECONDS, elapsed) : elapsed,
      domainFilter: isExamMode ? 'Todos' : selectedDomain,
      bankId: isExamMode ? 'all' : selectedBank,
      mode: isExamMode ? 'exam' : 'practice',
      timeLimitSeconds: isExamMode ? EXAM_DURATION_SECONDS : undefined,
      timedOut,
      createdAt: new Date().toISOString(),
      answers,
    };
    saveAttempt(result);
    setLatestResult(result);
    setShowFinishModal(false);
    setShowExitModal(false);
    setQuizPhase('result');
    scrollToTop();
  }, [quizQuestions, answersWithCurrentSelection, candidateName, isExamMode, selectedDomain, selectedBank, saveAttempt]);

  // Atualiza a ação de entrega sem reiniciar o relógio a cada seleção de alternativa.
  const finishActionRef = useRef(finishQuiz);
  useEffect(() => { finishActionRef.current = finishQuiz; }, [finishQuiz]);

  // Usa tempo real, em vez de somar ticks: abas em segundo plano não pausam a prova.
  useEffect(() => {
    if (quizPhase !== 'playing') return;
    const updateClock = () => {
      const elapsed = Math.max(0, Math.floor((Date.now() - startedAtRef.current) / 1000));
      setElapsedSeconds(isExamMode ? Math.min(EXAM_DURATION_SECONDS, elapsed) : elapsed);
      if (isExamMode && elapsed >= EXAM_DURATION_SECONDS) finishActionRef.current(true);
    };
    const timer = window.setInterval(updateClock, 1000);
    document.addEventListener('visibilitychange', updateClock);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', updateClock);
    };
  }, [quizPhase, isExamMode]);

  const handleStartQuiz = () => {
    if (!effectiveQuestionCount || loadingHistory) return;
    const trimmed = candidateName.trim();
    if (!trimmed) {
      setNameError('Por favor, informe seu nome acima para registrar no Ranking.');
      nameInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      nameInputRef.current?.focus();
      return;
    }
    setNameError('');
    try { window.localStorage.setItem(NAME_STORAGE_KEY, trimmed); } catch { /* O treino continua sem persistir o nome. */ }
    const chosen = isExamMode ? selectExamQuestions(QUESTIONS_DB)
      : shuffleArray(availableQuestionsForDomain).slice(0, effectiveQuestionCount);
    startedAtRef.current = Date.now();
    finishedRef.current = false;
    setQuizQuestions(chosen);
    setCurrentIdx(0);
    setSelectedOptions([]);
    setIsConfirmed(false);
    setUserAnswers([]);
    setElapsedSeconds(0);
    setLatestResult(null);
    setSaveSuccess(false);
    setShowFinishModal(false);
    setQuizPhase('playing');
    scrollToTop();
  };

  const handleToggleOption = (index: number) => {
    if (isConfirmed || !currentQuestion) return;
    if (!currentQuestion.multiSelect) setSelectedOptions([index]);
    else setSelectedOptions((previous) => previous.includes(index) ? previous.filter((item) => item !== index)
      : previous.length >= currentQuestion.requiredCount ? [...previous.slice(1), index] : [...previous, index]);
  };

  // Só o modo treino revela acertos antes da entrega final.
  const handleConfirmAnswer = () => {
    if (isExamMode || !currentQuestion || isConfirmed || selectedOptions.length !== currentQuestion.requiredCount) return;
    setUserAnswers(answersWithCurrentSelection());
    setIsConfirmed(true);
  };

  const handleGoToQuestion = (index: number) => {
    if (!isExamMode || index < 0 || index >= quizQuestions.length) return;
    const updated = answersWithCurrentSelection();
    setUserAnswers(updated);
    setCurrentIdx(index);
    setSelectedOptions(updated.find((answer) => answer.questionId === quizQuestions[index].id)?.selectedIndices ?? []);
    setIsConfirmed(false);
    scrollToTop();
  };

  const handleNextOrFinish = () => {
    if (isExamMode) {
      if (currentIdx + 1 < quizQuestions.length) handleGoToQuestion(currentIdx + 1);
      else setShowFinishModal(true);
      return;
    }
    if (!isConfirmed) return;
    if (currentIdx + 1 < quizQuestions.length) {
      setCurrentIdx((index) => index + 1);
      setSelectedOptions([]);
      setIsConfirmed(false);
      scrollToTop();
    } else finishQuiz();
  };

  const filteredHistory = useMemo(() => [...attempts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .filter((attempt) => (historyStatusFilter !== 'passed' || attempt.passed)
      && (historyStatusFilter !== 'failed' || !attempt.passed)
      && attempt.candidateName.toLowerCase().includes(historySearch.trim().toLowerCase())), [attempts, historySearch, historyStatusFilter]);
  const displayedResult = latestResult ? attempts.find((attempt) => attempt.id === latestResult.id) ?? latestResult : null;
  const domainBreakdown = useMemo(() => {
    if (!displayedResult) return [];
    const domains: QuestionDomain[] = ['Segurança', 'Resiliência', 'Alto Desempenho', 'Otimização de Custos'];
    return domains.map((domain) => {
      const answers = displayedResult.answers.filter((answer) => answer.domain === domain);
      const correct = answers.filter((answer) => answer.isCorrect).length;
      return { domain, meta: getDomainMeta(domain), correct, total: answers.length, pct: answers.length ? Math.round(correct / answers.length * 100) : null };
    });
  }, [displayedResult]);

  const handleSwitchTab = (tab: 'simulado' | 'ranking' | 'historico') => {
    if (quizPhase === 'playing') { setShowExitModal(true); return; }
    setInspectingAttempt(null);
    setActiveTab(tab);
    scrollToTop();
  };
  const confirmExitQuiz = () => {
    finishedRef.current = true;
    setShowExitModal(false);
    setShowFinishModal(false);
    setQuizPhase('setup');
    setSelectedOptions([]);
    setIsConfirmed(false);
    scrollToTop();
  };
  const openAttemptInspection = (attempt: ExamAttempt) => {
    setInspectingAttempt(attempt);
    setActiveTab('historico');
    scrollToTop();
  };

  return { refreshRanking, cloudStatus, cloudError, pendingCount, rankingSource, isExamMode, remainingSeconds, answeredCount, answeredQuestionIds, showFinishModal, setShowFinishModal, finishQuiz, handleGoToQuestion,
    selectedBank, setSelectedBank, questionsForBank, effectiveQuestionCount, nameInputRef, attempts, loadingHistory, saveSuccess,
    activeTab, setActiveTab, candidateName, setCandidateName, nameError, setNameError, questionCount, setQuestionCount,
    selectedDomain, setSelectedDomain, quizPhase, setQuizPhase, quizQuestions, currentIdx, selectedOptions, isConfirmed, userAnswers,
    elapsedSeconds, showExitModal, setShowExitModal, latestResult: displayedResult, historySearch, setHistorySearch, historyStatusFilter, setHistoryStatusFilter,
    inspectingAttempt, setInspectingAttempt, availableQuestionsForDomain, handleStartQuiz, currentQuestion, handleToggleOption,
    handleConfirmAnswer, handleNextOrFinish, rankedAttempts, filteredHistory, domainBreakdown, handleSwitchTab, confirmExitQuiz, openAttemptInspection };
}

export type ExamController = ReturnType<typeof useExam>;
