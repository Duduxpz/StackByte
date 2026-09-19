const cases = [
  {
    client: 'Grupo Meridian',
    summary: 'Migração de sistema de faturamento legado para arquitetura em nuvem.',
    metric: '-62%',
    metricLabel: 'tempo de processamento',
  },
  {
    client: 'Vantix Logística',
    summary: 'Plataforma de rastreamento em tempo real integrada a 4 sistemas de terceiros.',
    metric: '99.98%',
    metricLabel: 'uptime em produção',
  },
  {
    client: 'Norte Capital',
    summary: 'Reestruturação de infraestrutura e pipeline de deploy contínuo.',
    metric: '8x',
    metricLabel: 'mais rápido para lançar',
  },
];

export default function CaseStudies() {
  return (
    <section id="projetos" className="bg-[#080505] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex items-end justify-between gap-6">
          <h2 className="font-['Fraunces'] text-3xl font-semibold text-white md:text-4xl">
            Projetos recentes
          </h2>
          <a href="#contato" className="font-['Inter'] text-sm text-[#FD7B01] hover:underline">
            Ver todos os projetos
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cases.map((item, i) => (
            <div
              key={item.client}
              className={`rounded-2xl border border-white/10 bg-white/[0.03] p-6 ${
                i === 1 ? 'md:mt-8' : ''
              }`}
            >
              <div className="font-['Fraunces'] text-3xl font-semibold text-[#FD7B01]">
                {item.metric}
              </div>
              <div className="mt-1 font-['Inter'] text-xs text-white/40">{item.metricLabel}</div>

              <h3 className="mt-6 font-['Fraunces'] text-lg font-medium text-white">
                {item.client}
              </h3>
              <p className="mt-2 font-['Inter'] text-sm leading-relaxed text-white/60">
                {item.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
