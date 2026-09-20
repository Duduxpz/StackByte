export default function Testimonials() {
  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <span className="font-['Inter'] text-xs font-medium tracking-wide text-[#FD7B01]">
          O que dizem nossos clientes
        </span>

        <p className="mt-6 font-['Fraunces'] text-2xl leading-snug text-white md:text-3xl">
          A StackByte entendeu nosso sistema legado melhor do que nossa própria equipe interna.{' '}
          <em className="italic text-white/70">Entregaram no prazo e sem downtime.</em>
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#FD7B01]/20" />
          <div className="text-left">
            <div className="font-['Inter'] text-sm font-medium text-white">Renata Alves</div>
            <div className="font-['Inter'] text-xs text-white/40">CTO, Grupo Meridian</div>
          </div>
        </div>
      </div>
    </section>
  );
}
