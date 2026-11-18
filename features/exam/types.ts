// Contratos compartilhados entre questões, respostas e tentativas salvas.
export type DomainId =
  | 'Todos'
  | 'Segurança'
  | 'Resiliência'
  | 'Alto Desempenho'
  | 'Otimização de Custos';

export type QuestionDomain = Exclude<DomainId, 'Todos'>;

export interface DomainMeta {
  id: DomainId;
  label: string;
  weight: string;
  color: string;
  bg: string;
  border: string;
  barColor?: string;
}

export interface Question {
  id: number;
  domain: QuestionDomain;
  multiSelect: boolean;
  requiredCount: number;
  question: string;
  options: string[];
  correctIndices: number[];
  keyword: string;
  summary: string;
}

export interface AnswerRecord {
  questionId: number;
  domain: QuestionDomain;
  selectedIndices: number[];
  correctIndices: number[];
  isCorrect: boolean;
}

export interface ExamAttempt {
  id: string;
  candidateName: string;
  awsScore: number;
  correctCount: number;
  totalQuestions: number;
  passed: boolean;
  timeSeconds: number;
  domainFilter: DomainId;
  createdAt: string;
  answers: AnswerRecord[];
}

export interface EnrichedAnswer extends AnswerRecord {
  order: number;
  questionData: Question;
}

