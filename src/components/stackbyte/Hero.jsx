import Hero3DLogo from './Hero3DLogo';

const stats = [
  { value: '87%', label: 'Uptime médio' },
  { value: '17...', label: 'Sistemas entregues' },
  { value: '94%', label: 'Tempo de resposta' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#080505] pb-24 pt-16 md:pt-24">
      <div className="pointer-events-none absolute right-[-10%] top-10 h-[520px] w-[520px] rounded-full bg-[#FD7B01]/25 blur-[140px]" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
        <div>
          <span className="text-xs font-medium tracking-wide text-[#FD7B01]">
            Engenharia de software &amp; sistemas
          </span>

          <h1 className="mt-4 text-4xl font-normal leading-[1.1] text-white md:text-5xl">
  Sistemas que evoluem <em className="italic text-[#FD7B01]">junto</em> com sua operação.
</h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-white/60">
            Desenvolvemos, modernizamos e integramos os sistemas que sustentam
            o seu negócio — da arquitetura ao deploy, com engenharia sob medida
            para cada operação.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contato"
              className="rounded-full bg-[#FD7B01] px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
            >
              Fale com um especialista
            </a>
            <a
              href="#projetos"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/40"
            >
              Ver projetos
            </a>
          </div>

          <div className="mt-12 flex gap-10 border-t border-white/10 pt-6">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-semibold text-white">{s.value}</div>
                <div className="mt-1 text-xs text-white/50">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <Hero3DLogo className="h-[400px] w-full md:h-[540px]" />
        </div>
      </div>
    </section>
  );
}