import { useEffect, useState } from 'react';
import { ArrowUpRight, ExternalLink, X } from 'lucide-react';

const portfolioUrl = 'https://duduxpz.github.io/portfolio/';
const cases = [
  {
    client: 'StackByte',
    type: 'Desenvolvimento web',
    summary: 'Site para desenvolvimento e tecnologias de sistemas.',
    details: 'Projeto apresentado no portfólio pessoal como site de desenvolvimento e tecnologias. A captura mostra a identidade visual e a apresentação do trabalho.',
    url: portfolioUrl,
    image: '/projects/stackbyte.png',
  },
  {
    client: 'PRIVATE MODE',
    type: 'Evento · UDI/MG',
    summary: 'Site para uma festa eletrônica em Uberlândia, Minas Gerais.',
    details: 'Projeto de página para evento, apresentado no portfólio pessoal. A captura original mostra a proposta visual usada para divulgar a festa.',
    url: portfolioUrl,
    image: '/projects/private-mode.png',
  },
  {
    client: 'Checkout',
    type: 'E-commerce · UI/UX',
    summary: 'Fluxo de finalização de compra para uma loja virtual.',
    details: 'Projeto de checkout para e-commerce, apresentado no portfólio pessoal. A captura mostra as telas do fluxo de compra.',
    url: portfolioUrl,
    image: '/projects/checkout.png',
  },
];

function ProjectPreview({ item }) {
  return (
    <img
      src={item.image}
      alt={`Captura real do projeto ${item.client}`}
      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
      loading="lazy"
    />
  );
}

export default function CaseStudies() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (!selectedProject) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [selectedProject]);

  return (
    <section id="projetos" className="bg-[#080505] py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10">
          <span className="font-['ClashDisplay-Regular'] text-xs font-medium uppercase tracking-[0.2em] text-[#FD7B01]">Portfólio</span>
          <div className="mt-3 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-['ClashDisplay-Regular'] text-3xl font-semibold text-white md:text-4xl">Projetos recentes</h2>
              <p className="mt-3 max-w-xl font-['ClashDisplay-Regular'] text-sm leading-relaxed text-white/55 md:text-base">
                Projetos web desenvolvidos com foco em apresentar marcas e trabalhos com clareza e profissionalismo.
              </p>
            </div>
            <a href="#contato" className="shrink-0 font-['ClashDisplay-Regular'] text-sm text-[#FD7B01] transition-colors hover:text-white md:ml-auto">
              Vamos conversar <ArrowUpRight className="ml-1 inline h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {cases.map((item, index) => (
            <article key={item.client} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] transition duration-300 hover:-translate-y-1 hover:border-[#FD7B01]/40 hover:bg-white/[0.04]">
              <button
                type="button"
                onClick={() => setSelectedProject(item)}
                aria-label={`Ver detalhes do projeto ${item.client}`}
                className="relative block aspect-[1.55] w-full overflow-hidden rounded-t-[inherit] border-b border-white/10 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FD7B01]"
              >
                <ProjectPreview item={item} />
                <span className="absolute bottom-3 right-3 rounded-full border border-white/20 bg-black/70 px-3 py-1.5 font-['ClashDisplay-Regular'] text-xs text-white opacity-100 transition group-hover:border-[#FD7B01]/70 group-hover:text-[#ffac5c] sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
                  Ver detalhes <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </button>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-[#FD7B01]/25 bg-[#FD7B01]/[0.08] px-3 py-1 font-['ClashDisplay-Regular'] text-[11px] text-[#ffac5c]">{item.type}</span>
                  <span className="font-['ClashDisplay-Regular'] text-xs text-white/35">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-4 font-['ClashDisplay-Regular'] text-xl font-medium text-white">{item.client}</h3>
                <p className="mt-2 min-h-[3rem] font-['ClashDisplay-Regular'] text-sm leading-relaxed text-white/55">{item.summary}</p>
                <button type="button" onClick={() => setSelectedProject(item)} className="mt-5 inline-flex items-center gap-2 font-['ClashDisplay-Regular'] text-sm text-[#FD7B01] hover:text-white focus:outline-none focus-visible:underline">
                  Ver detalhes <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedProject(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-detail-title"
            className="relative my-auto grid w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#100d0b] shadow-2xl md:grid-cols-[1.2fr_0.8fr]"
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label="Fechar detalhes do projeto"
              className="absolute right-3 top-3 z-10 rounded-full border border-white/15 bg-black/70 p-2 text-white transition hover:border-[#FD7B01] hover:text-[#FD7B01] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FD7B01]"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="min-h-64 aspect-[1.35] overflow-hidden bg-[#0c0b0b] md:aspect-auto">
              <ProjectPreview item={selectedProject} />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-8">
              <span className="w-fit rounded-full border border-[#FD7B01]/25 bg-[#FD7B01]/[0.08] px-3 py-1 font-['ClashDisplay-Regular'] text-xs text-[#ffac5c]">
                {selectedProject.type}
              </span>
              <h3 id="project-detail-title" className="mt-4 font-['ClashDisplay-Regular'] text-2xl font-semibold text-white md:text-3xl">
                {selectedProject.client}
              </h3>
              <p className="mt-3 font-['ClashDisplay-Regular'] text-sm leading-relaxed text-white/60">
                {selectedProject.details}
              </p>
              {selectedProject.url ? (
                <a href={selectedProject.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#FD7B01] px-5 py-3 font-['ClashDisplay-Regular'] text-sm font-medium text-black transition hover:bg-[#ff9a3d]">
                  Ver no portfólio <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : (
                <p className="mt-6 font-['ClashDisplay-Regular'] text-sm text-white/35">Consulte a captura do projeto.</p>
              )}
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
