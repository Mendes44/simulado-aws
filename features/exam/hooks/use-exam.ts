'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import type { DomainId, QuestionDomain, Question, AnswerRecord, ExamAttempt } from '../types';
import { QUESTIONS_DB } from '../data/questions';
import { getDomainMeta } from '../data/domains';
import { STORAGE_KEY, NAME_STORAGE_KEY } from '../constants';
import { calculateAwsScore, arraysEqual, shuffleArray, scrollToTop } from '../utils';

// Coordena a sessão, persistência local, cronômetro e navegação do simulado.
export function useExam() {
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Dados Persistidos (localStorage)
  const [attempts, setAttempts] = useState<ExamAttempt[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Navegação Principal
  const [activeTab, setActiveTab] = useState<'simulado' | 'ranking' | 'historico'>('simulado');

  // Estado da Configuração do Simulado
  const [candidateName, setCandidateName] = useState('');
  const [nameError, setNameError] = useState('');
  const [questionCount, setQuestionCount] = useState(10);
  const [selectedDomain, setSelectedDomain] = useState<DomainId>('Todos');

  // Estado do Simulado em Andamento
  const [quizPhase, setQuizPhase] = useState<'setup' | 'playing' | 'result'>('setup');
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [userAnswers, setUserAnswers] = useState<AnswerRecord[]>([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);
  const [latestResult, setLatestResult] = useState<ExamAttempt | null>(null);

  // Estado do Histórico e Revisão
  const [historySearch, setHistorySearch] = useState('');
  const [historyStatusFilter, setHistoryStatusFilter] = useState<'all' | 'passed' | 'failed'>('all');
  const [inspectingAttempt, setInspectingAttempt] = useState<ExamAttempt | null>(null);
  // 1. CARREGAR HISTÓRICO E ÚLTIMO NOME DO LOCALSTORAGE
  useEffect(() => {
    // Lê o navegador após a hidratação; o cancelamento evita leituras após desmontar.
    const loadTimer = window.setTimeout(() => {
    try {
      const savedAttempts = window.localStorage.getItem(STORAGE_KEY);
      if (savedAttempts) {
        const parsed = JSON.parse(savedAttempts) as ExamAttempt[];
        if (Array.isArray(parsed)) {
          setAttempts(parsed);
        }
      }
      const savedName = window.localStorage.getItem(NAME_STORAGE_KEY);
      if (savedName) {
        setCandidateName(savedName);
      }
    } catch (error) {
      console.error('Erro ao ler dados locais:', error);
    } finally {
      setLoadingHistory(false);
    }
    }, 0);
    return () => window.clearTimeout(loadTimer);
  }, []);
  // 2. CRONÔMETRO DO SIMULADO
  useEffect(() => {
    if (quizPhase !== 'playing') return;
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [quizPhase]);
  // CÁLCULO DE QUESTÕES DISPONÍVEIS POR DOMÍNIO
  const availableQuestionsForDomain = useMemo(() => {
    if (selectedDomain === 'Todos') return QUESTIONS_DB;
    return QUESTIONS_DB.filter((q) => q.domain === selectedDomain);
  }, [selectedDomain]);
  // INICIAR SIMULADO (COM SCROLL/FOCO NO CAMPO DE NOME SE VAZIO)
  const handleStartQuiz = () => {
    const trimmed = candidateName.trim();
    if (!trimmed) {
      setNameError('Por favor, informe seu nome acima para registrar no Ranking.');
      nameInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      nameInputRef.current?.focus();
      return;
    }

    setNameError('');
    try {
      window.localStorage.setItem(NAME_STORAGE_KEY, trimmed);
    } catch {
      // Ignora erro caso localStorage esteja indisponível
    }

    const pool = shuffleArray(availableQuestionsForDomain);
    const actualCount = Math.min(questionCount, pool.length);
    const chosen = pool.slice(0, actualCount);

    setQuizQuestions(chosen);
    setCurrentIdx(0);
    setSelectedOptions([]);
    setIsConfirmed(false);
    setUserAnswers([]);
    setElapsedSeconds(0);
    setLatestResult(null);
    setSaveSuccess(false);
    setQuizPhase('playing');
    scrollToTop();
  };
  // SELECIONAR ALTERNATIVA
  const currentQuestion = quizQuestions[currentIdx] || null;

  const handleToggleOption = (optIdx: number) => {
    if (isConfirmed || !currentQuestion) return;

    if (!currentQuestion.multiSelect) {
      setSelectedOptions([optIdx]);
    } else {
      setSelectedOptions((prev) => {
        if (prev.includes(optIdx)) {
          return prev.filter((i) => i !== optIdx);
        }
        if (prev.length >= currentQuestion.requiredCount) {
          return [...prev.slice(1), optIdx];
        }
        return [...prev, optIdx];
      });
    }
  };
  // CONFIRMAR RESPOSTA
  const handleConfirmAnswer = () => {
    if (!currentQuestion || isConfirmed) return;
    if (selectedOptions.length !== currentQuestion.requiredCount) return;

    const isCorrect = arraysEqual(selectedOptions, currentQuestion.correctIndices);
    const answerRecord: AnswerRecord = {
      questionId: currentQuestion.id,
      domain: currentQuestion.domain,
      selectedIndices: [...selectedOptions].sort((a, b) => a - b),
      correctIndices: [...currentQuestion.correctIndices].sort((a, b) => a - b),
      isCorrect
    };

    setUserAnswers((prev) => [...prev, answerRecord]);
    setIsConfirmed(true);
  };
  // PRÓXIMA QUESTÃO OU FINALIZAR
  const handleNextOrFinish = useCallback(() => {
    if (currentIdx + 1 < quizQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOptions([]);
      setIsConfirmed(false);
      scrollToTop();
      return;
    }

    const total = quizQuestions.length;
    const correctCount = userAnswers.filter((a) => a.isCorrect).length;
    const awsScore = calculateAwsScore(correctCount, total);
    const passed = awsScore >= 720;
    const createdAt = new Date().toISOString();

    const resultObj: ExamAttempt = {
      id: `attempt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      candidateName: candidateName.trim(),
      awsScore,
      correctCount,
      totalQuestions: total,
      passed,
      timeSeconds: elapsedSeconds,
      domainFilter: selectedDomain,
      createdAt,
      answers: userAnswers
    };

    setLatestResult(resultObj);
    setQuizPhase('result');

    setAttempts((prev) => {
      const updated = [resultObj, ...prev];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Erro ao salvar no localStorage:', err);
      }
      return updated;
    });
    setSaveSuccess(true);
    scrollToTop();
  }, [
    currentIdx,
    quizQuestions.length,
    userAnswers,
    candidateName,
    elapsedSeconds,
    selectedDomain
  ]);
  // DADOS DERIVADOS: RANKING E HISTÓRICO
  const rankedAttempts = useMemo(() => {
    return [...attempts].sort((a, b) => {
      if (b.awsScore !== a.awsScore) return b.awsScore - a.awsScore;
      if (a.timeSeconds !== b.timeSeconds) return a.timeSeconds - b.timeSeconds;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [attempts]);

  const filteredHistory = useMemo(() => {
    const queryLower = historySearch.trim().toLowerCase();
    return [...attempts]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .filter((att) => {
        if (historyStatusFilter === 'passed' && !att.passed) return false;
        if (historyStatusFilter === 'failed' && att.passed) return false;
        if (queryLower && !att.candidateName.toLowerCase().includes(queryLower)) return false;
        return true;
      });
  }, [attempts, historySearch, historyStatusFilter]);

  const domainBreakdown = useMemo(() => {
    if (!latestResult) return [];
    const domainList: QuestionDomain[] = [
      'Segurança',
      'Resiliência',
      'Alto Desempenho',
      'Otimização de Custos'
    ];
    return domainList.map((dom) => {
      const items = latestResult.answers.filter((a) => a.domain === dom);
      const correct = items.filter((a) => a.isCorrect).length;
      const total = items.length;
      const pct = total > 0 ? Math.round((correct / total) * 100) : null;
      return {
        domain: dom,
        meta: getDomainMeta(dom),
        correct,
        total,
        pct
      };
    });
  }, [latestResult]);
  // NAVEGAÇÃO
  const handleSwitchTab = (tab: 'simulado' | 'ranking' | 'historico') => {
    if (quizPhase === 'playing') {
      setShowExitModal(true);
      return;
    }
    setInspectingAttempt(null);
    setActiveTab(tab);
    scrollToTop();
  };

  const confirmExitQuiz = () => {
    setShowExitModal(false);
    setQuizPhase('setup');
    setSelectedOptions([]);
    setIsConfirmed(false);
    scrollToTop();
  };

  const openAttemptInspection = (att: ExamAttempt) => {
    setInspectingAttempt(att);
    setActiveTab('historico');
    scrollToTop();
  };

  // Expõe os estados e ações usados pelas telas, sem duplicar o cronômetro ou o histórico.
  return { nameInputRef, attempts, setAttempts, loadingHistory, setLoadingHistory, saveSuccess, setSaveSuccess, activeTab, setActiveTab, candidateName, setCandidateName, nameError, setNameError, questionCount, setQuestionCount, selectedDomain, setSelectedDomain, quizPhase, setQuizPhase, quizQuestions, setQuizQuestions, currentIdx, setCurrentIdx, selectedOptions, setSelectedOptions, isConfirmed, setIsConfirmed, userAnswers, setUserAnswers, elapsedSeconds, setElapsedSeconds, showExitModal, setShowExitModal, latestResult, setLatestResult, historySearch, setHistorySearch, historyStatusFilter, setHistoryStatusFilter, inspectingAttempt, setInspectingAttempt, availableQuestionsForDomain, handleStartQuiz, currentQuestion, handleToggleOption, handleConfirmAnswer, handleNextOrFinish, rankedAttempts, filteredHistory, domainBreakdown, handleSwitchTab, confirmExitQuiz, openAttemptInspection };
}

export type ExamController = ReturnType<typeof useExam>;
