import type { Question } from '../types';

// Mantém o número do PDF mesmo com o sorteio ou com questões compartilhadas entre simulados.
export function QuestionOrigin({ question }: { question: Question }) {
  if (!question.sourceDocuments?.length) return null;
  return (
    <p className="mb-3 text-xs font-medium text-sky-300">
      Escola da Nuvem · {question.sourceDocuments.map((source) =>
        'Simulado ' + source.examNumber + ', questão ' + source.questionNumber
      ).join(' · ')}
    </p>
  );
}
