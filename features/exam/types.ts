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

// Referências opcionais mantêm compatibilidade com o banco e os históricos anteriores.
export interface QuestionProvenance {
  kind: 'authorial';
  reviewedAt: string;
  references: { title: string; url: string }[];
}

// Origem rastreável nos arquivos fornecidos, sem publicar os PDFs ou caminhos locais.
export interface QuestionDocumentSource {
  examNumber: number;
  questionNumber: number;
  fileName: string;
  questionPage: number;
  explanationPages: number[];
  answerOrigin?: { exam: number; number: number; pages: number[] };
}

export type QuestionBankId = 'all' | 'base' | 'dpcn-1' | 'dpcn-2' | 'dpcn-3' | 'dpcn-4' | 'dpcn-5';

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
  provenance?: QuestionProvenance;
  // Os comentários seguem a mesma ordem das alternativas e só aparecem na correção.
  optionExplanations?: string[];
  sourceDocuments?: QuestionDocumentSource[];
  studyNotes?: { text: string; title: string; url: string }[];
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
  // Opcional para continuar lendo as tentativas anteriores à importação dos PDFs.
  bankId?: QuestionBankId;
  mode?: 'exam' | 'practice';
  timeLimitSeconds?: number;
  timedOut?: boolean;
  createdAt: string;
  answers: AnswerRecord[];
}

export interface EnrichedAnswer extends AnswerRecord {
  order: number;
  questionData: Question;
}

