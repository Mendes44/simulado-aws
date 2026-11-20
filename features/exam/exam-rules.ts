import type { AnswerRecord, Question, QuestionDomain } from './types';
import { arraysEqual, shuffleArray } from './utils';

// Valores publicados pela AWS para o SAA-C03, sem acomodação adicional de tempo.
export const EXAM_QUESTION_COUNT = 65;
export const EXAM_DURATION_SECONDS = 130 * 60;

const DOMAIN_WEIGHTS: { domain: QuestionDomain; weight: number }[] = [
  { domain: 'Segurança', weight: 30 },
  { domain: 'Resiliência', weight: 26 },
  { domain: 'Alto Desempenho', weight: 24 },
  { domain: 'Otimização de Custos', weight: 20 },
];

// Aproxima os pesos dos domínios por maiores restos. O sorteio não repete IDs.
// Os pesos oficiais se referem ao conteúdo pontuado, não a uma distribuição fixa das 65 perguntas.
export function selectExamQuestions(questions: Question[], count = EXAM_QUESTION_COUNT): Question[] {
  const unique = [...new Map(questions.map((question) => [question.id, question])).values()];
  if (unique.length < count) throw new Error('Banco insuficiente para a prova completa.');
  const quotas = DOMAIN_WEIGHTS.map(({ domain, weight }) => ({
    domain,
    count: Math.floor(count * weight / 100),
    remainder: count * weight / 100 % 1,
  }));
  let remaining = count - quotas.reduce((sum, quota) => sum + quota.count, 0);
  for (const quota of [...quotas].sort((a, b) => b.remainder - a.remainder)) {
    if (remaining-- > 0) quota.count += 1;
  }
  const chosen = quotas.flatMap((quota) => shuffleArray(unique.filter((question) => question.domain === quota.domain)).slice(0, quota.count));
  const chosenIds = new Set(chosen.map((question) => question.id));
  // Se um domínio tiver poucos itens, completa usando os outros, sem duplicar perguntas.
  const extra = shuffleArray(unique.filter((question) => !chosenIds.has(question.id))).slice(0, count - chosen.length);
  return shuffleArray([...chosen, ...extra]);
}

export function createAnswerRecord(question: Question, selectedIndices: number[]): AnswerRecord {
  const selected = [...selectedIndices].sort((a, b) => a - b);
  return {
    questionId: question.id,
    domain: question.domain,
    selectedIndices: selected,
    correctIndices: [...question.correctIndices].sort((a, b) => a - b),
    isCorrect: selected.length === question.requiredCount && arraysEqual(selected, question.correctIndices),
  };
}

// Garante uma resposta por questão e registra as não respondidas como erros.
export function completeAnswers(questions: Question[], answers: AnswerRecord[]): AnswerRecord[] {
  const byQuestion = new Map(answers.map((answer) => [answer.questionId, answer]));
  return questions.map((question) => byQuestion.get(question.id) ?? createAnswerRecord(question, []));
}
