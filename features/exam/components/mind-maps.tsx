import Image from 'next/image';
import { Download, Network } from 'lucide-react';
import { MIND_MAPS } from '../data/mind-maps';

// Downloads reais em PDF, com fontes clicáveis e versão para impressão em cada arquivo.
export function MindMaps() {
  return (
    <section id="mapas-mentais" aria-labelledby="mind-maps-title" className="scroll-mt-36 rounded-3xl border border-slate-700 bg-slate-800/50 p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-xl">
          <h2 id="mind-maps-title" className="flex items-center gap-2 text-xl font-extrabold text-white"><Network className="h-6 w-6 text-sky-400" />Mapas mentais para baixar</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">Revise os principais tópicos do guia SAA-C03. Os pesos orientam a prioridade por domínio; não indicam frequência garantida de perguntas.</p>
        </div>
        <a href="/mind-maps/saa-c03-todos-os-mapas.pdf" download className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-3 text-sm font-extrabold text-slate-950 hover:bg-sky-400"><Download className="h-4 w-4" />Baixar todos os mapas</a>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {MIND_MAPS.map((map) => (
          <article key={map.slug} className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/80">
            <Image src={`/mind-maps/${map.slug}-preview.png`} alt={`Prévia do mapa mental: ${map.title}`} width={720} height={509} className="h-auto w-full" />
            <div className="p-4">
              <span className="text-xs font-bold text-sky-300">{map.weight} do conteúdo pontuado</span>
              <h3 className="mt-1 font-extrabold text-white">{map.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{map.topics}</p>
              <a href={`/mind-maps/saa-c03-${map.slug}.pdf`} download className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-orange-300 underline underline-offset-4 hover:text-orange-200"><Download className="h-4 w-4" />Baixar PDF de {map.title.toLowerCase()}</a>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-500">DevMendes · Material independente, com referências AWS nos PDFs · Revisão de 19/11/2026.</p>
    </section>
  );
}
