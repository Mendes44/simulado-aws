import type { Question, QuestionBankId } from '../types';

export const QUESTION_BANKS: { id: QuestionBankId; label: string }[] = [
  { id: 'all', label: 'Todos os bancos' },
  { id: 'base', label: 'Banco anterior' },
  { id: 'dpcn-1', label: 'DPCN — Simulado Comentado 1' },
  { id: 'dpcn-2', label: 'DPCN — Simulado Comentado 2' },
  { id: 'dpcn-3', label: 'DPCN — Simulado Comentado 3' },
  { id: 'dpcn-4', label: 'DPCN — Simulado Comentado 4' },
  { id: 'dpcn-5', label: 'DPCN — Simulado Comentado 5' },
];

// Uma questão compartilhada pertence a cada simulado de origem, mas só aparece uma vez em Todos.
export function selectQuestionsForBank(questions: Question[], bankId: QuestionBankId): Question[] {
  if (bankId === 'all') return questions;
  if (bankId === 'base') return questions.filter((question) => !question.sourceDocuments?.length);
  const examNumber = Number(bankId.replace('dpcn-', ''));
  return questions.filter((question) => question.sourceDocuments?.some((source) => source.examNumber === examNumber));
}

export function getQuestionBankLabel(bankId?: QuestionBankId): string {
  return QUESTION_BANKS.find((bank) => bank.id === bankId)?.label ?? 'Banco anterior';
}
