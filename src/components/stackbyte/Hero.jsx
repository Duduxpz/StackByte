const stats = [
  { value: '99.9%', label: 'Uptime médio' },
  { value: '120+', label: 'Sistemas entregues' },
  { value: '-40%', label: 'Tempo de resposta' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#14131E] pb-24 pt-16 md:pt-24">
      <div className="pointer-events-none absolute right-[-10%] top-10 h-[520px] w-[520px] rounded-full bg-[#FF5B00]/25 blur-[140px]" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
        <div>
          <span className="font-['Inter'] text-xs font-medium tracking-wide text-[#FF5B00]">
            Engenharia de software &amp; sistemas
          </span>

          <h1 className="mt-4 font-['Fraunces'] text-4xl font-semibold leading-[1.1] text-white md:text-5xl">
            Sistemas que evoluem <em className="italic text-[#FF5B00]">junto</em> com sua operação.
          </h1>

          <p className="mt-6 max-w-md font-['Inter'] text-base leading-relaxed text-white/60">
            Desenvolvemos, modernizamos e integramos os sistemas que sustentam
            o seu negócio — da arquitetura ao deploy, com engenharia sob medida
            para cada operação.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contato"
              className="rounded-full bg-[#FF5B00] px-6 py-3 font-['Inter'] text-sm font-medium text-black transition-opacity hover:opacity-90"
            >
              Fale com um especialista
            </a>
            <a
              href="#projetos"
              className="rounded-full border border-white/20 px-6 py-3 font-['Inter'] text-sm font-medium text-white transition-colors hover:border-white/40"
            >
              Ver projetos
            </a>
          </div>

          <div className="mt-12 flex gap-10 border-t border-white/10 pt-6">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-['Fraunces'] text-2xl font-semibold text-white">{s.value}</div>
                <div className="mt-1 font-['Inter'] text-xs text-white/50">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative mx-auto max-w-md -rotate-2 rounded-2xl border border-white/10 bg-black/60 p-4 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur">
            <div className="flex items-center gap-1.5 pb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            </div>

            <div className="rounded-lg border border-white/10 bg-[#14131E] p-4">
              <div className="font-['Inter'] text-xs text-white/40">status do deploy</div>
              <div className="mt-1 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#FF5B00]" />
                <span className="font-['Inter'] text-sm text-white">produção · concluído</span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {['CPU', 'Memória', 'Latência'].map((label, i) => (
                  <div key={label} className="rounded-md bg-white/5 p-3">
                    <div className="font-['Inter'] text-[10px] text-white/40">{label}</div>
                    <div className="mt-1 font-['Fraunces'] text-lg text-white">
                      {['24%', '61%', '18ms'][i]}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 h-16 rounded-md bg-gradient-to-t from-[#FF5B00]/20 to-transparent" />
            </div>
          </div>

          <div className="absolute -bottom-4 -left-4 rounded-xl bg-[#FF5B00] px-4 py-3 font-['Inter'] text-xs font-medium text-black shadow-lg">
            Deploy concluído ✓
          </div>
        </div>
      </div>
    </section>
  );
}
