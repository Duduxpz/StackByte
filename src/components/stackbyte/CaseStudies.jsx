import { ArrowUpRight, ExternalLink, MonitorSmartphone } from 'lucide-react';

// Add each public URL and a real screenshot here to turn these cards into
// verifiable project references. Avoid publishing outcome metrics without a source.
const cases = [
  {
    client: 'Portfólio pessoal',
    type: 'Portfólio',
    summary: 'Meu portfólio pessoal com apresentação dos meus trabalhos e projetos.',
    url: 'https://duduxpz.github.io/portfolio/',
    image: '',
  },
  {
    client: 'Pecuaria',
    type: 'Website institucional',
    summary: 'Presença digital organizada para facilitar o acesso às principais informações.',
    url: '',
    image: '',
  },
  {
    client: 'RP DESIGNER',
    type: 'Website institucional',
    summary: 'Uma página web pensada para apresentar o negócio com clareza em qualquer tela.',
    url: '',
    image: '',
  },
];

function ProjectPreview({ item, index }) {
  if (item.image) {
    return (
      <img
        src={item.image}
        alt={`Captura de tela do site ${item.client}`}
        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
      />
    );
  }

  return (
    <div className={`flex h-full flex-col justify-between overflow-hidden rounded-t-[inherit] bg-gradient-to-br ${index === 1 ? 'from-[#29190d] via-[#18110d] to-[#0e0b09]' : 'from-[#20150d] via-[#100e0d] to-[#0c0b0b]'} p-5`}>
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <span className="h-2 w-2 rounded-full bg-[#FD7B01]" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="ml-2 h-2 w-24 rounded-full bg-white/10" />
        <MonitorSmartphone className="ml-auto h-4 w-4 text-white/40" aria-hidden="true" />
      </div>
      <div className="relative py-6">
        <div className="pointer-events-none absolute -left-8 top-0 h-36 w-36 rounded-full bg-[#FD7B01]/15 blur-3xl" />
        <span className="relative text-xs font-medium uppercase tracking-[0.22em] text-[#FD7B01]">Projeto {String(index + 1).padStart(2, '0')}</span>
        <p className="relative mt-3 max-w-[14ch] font-['ClashDisplay-Regular'] text-3xl font-semibold leading-tight text-white sm:text-4xl">{item.client}</p>
      </div>
      <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-3">
        <span className="h-8 rounded-md bg-white/[0.06]" />
        <span className="h-8 rounded-md bg-white/[0.06]" />
        <span className="h-8 rounded-md bg-[#FD7B01]/20" />
      </div>
    </div>
  );
}

export default function CaseStudies() {
  return (
    <section id="projetos" className="bg-[#080505] py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 max-w-2xl">
          <span className="font-['ClashDisplay-Regular'] text-xs font-medium uppercase tracking-[0.2em] text-[#FD7B01]">Portfólio</span>
          <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h2 className="font-['ClashDisplay-Regular'] text-3xl font-semibold text-white md:text-4xl">Projetos recentes</h2>
              <p className="mt-3 max-w-xl font-['ClashDisplay-Regular'] text-sm leading-relaxed text-white/55 md:text-base">
                Projetos web desenvolvidos com foco em apresentar marcas e trabalhos com clareza e profissionalismo.
              </p>
            </div>
            <a href="#contato" className="shrink-0 font-['ClashDisplay-Regular'] text-sm text-[#FD7B01] transition-colors hover:text-white">
              Vamos conversar <ArrowUpRight className="ml-1 inline h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {cases.map((item, index) => (
            <article key={item.client} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] transition duration-300 hover:-translate-y-1 hover:border-[#FD7B01]/40 hover:bg-white/[0.04]">
              <div className="aspect-[1.55] overflow-hidden rounded-t-[inherit] border-b border-white/10">
                <ProjectPreview item={item} index={index} />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-[#FD7B01]/25 bg-[#FD7B01]/[0.08] px-3 py-1 font-['ClashDisplay-Regular'] text-[11px] text-[#ffac5c]">{item.type}</span>
                  <span className="font-['ClashDisplay-Regular'] text-xs text-white/35">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-4 font-['ClashDisplay-Regular'] text-xl font-medium text-white">{item.client}</h3>
                <p className="mt-2 min-h-[3rem] font-['ClashDisplay-Regular'] text-sm leading-relaxed text-white/55">{item.summary}</p>
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 font-['ClashDisplay-Regular'] text-sm text-[#FD7B01] hover:text-white">
                    Visitar site <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : (
                  <span className="mt-5 inline-flex items-center gap-2 font-['ClashDisplay-Regular'] text-sm text-white/30">Link do projeto pendente</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
