// Materiais publicados pela AWS ficam separados das questões autorais do simulado.
export function OfficialStudyResources() {
  return (
    <section aria-labelledby="official-materials" className="rounded-2xl border border-slate-700/80 bg-slate-800/50 p-6">
      <h3 id="official-materials" className="font-bold text-white">Materiais oficiais para estudar</h3>
      <p className="mt-2 text-sm text-slate-300">
        Consulte os exemplos publicados pela AWS para conhecer o formato. As 16 questões autorais
        têm referências AWS na correção. Os simulados DPCN usam os gabaritos dos PDFs fornecidos. Este é um preparatório independente.
      </p>
      <ul className="mt-3 space-y-2 text-sm text-orange-300">
        <li><a className="underline underline-offset-2" href="https://d1.awsstatic.com/training-and-certification/docs-sa-assoc/AWS-Certified-Solutions-Architect-Associate_Sample-Questions.pdf" target="_blank" rel="noopener noreferrer">10 questões de exemplo da AWS com gabarito (PDF em inglês)</a></li>
        <li><a className="underline underline-offset-2" href="https://skillbuilder.aws/category/exam-prep/solutions-architect-associate-SAA-C03" target="_blank" rel="noopener noreferrer">Preparação oficial e conjuntos de prática no AWS Skill Builder</a></li>
        <li><a className="underline underline-offset-2" href="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html" target="_blank" rel="noopener noreferrer">Guia SAA-C03: domínios, formatos e critérios de avaliação</a></li>
      </ul>
      <p className="mt-3 text-xs text-slate-400">O exame tem 65 questões e duração de 130 minutos. O modo prova reproduz a quantidade e a duração; os treinos oferecem correção imediata. A nota é estimada, e o banco é independente.</p>
    </section>
  );
}
