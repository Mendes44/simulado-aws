import type { Question } from '../types';

// A referência fundamenta a explicação; não atribui à AWS a autoria da questão.
export function QuestionReferences({ question }: { question: Question }) {
  if (!question.provenance && !question.sourceDocuments?.length) return null;

  return (
    <div className="mt-3 border-t border-slate-700/70 pt-3 text-xs text-slate-400">
      {question.sourceDocuments?.map((source) => (
        <div key={source.fileName} className="mb-2">
          <p>{source.fileName} · Questão {source.questionNumber} · Página {source.questionPage}</p>
          {source.explanationPages.length > 0 && <p>Comentários: página(s) {source.explanationPages.join(', ')}</p>}
          {source.answerOrigin && <p>Comentários da questão idêntica no Simulado {source.answerOrigin.exam}, questão {source.answerOrigin.number}, página(s) {source.answerOrigin.pages.join(', ')}.</p>}
        </div>
      ))}
      {question.provenance && <p>Questão autoral de treino · Referências AWS revisadas em {question.provenance.reviewedAt.split('-').reverse().join('/')}</p>}
      <ul className="mt-2 space-y-1">
        {question.provenance?.references.map((reference) => (
          <li key={reference.url}>
            <a href={reference.url} target="_blank" rel="noopener noreferrer" className="text-orange-300 underline underline-offset-2 hover:text-orange-200">
              {reference.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
