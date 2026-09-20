export default function Testimonials() {
  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <span className="font-['ClashDisplay-Regular'] text-xs font-medium tracking-wide text-[#FD7B01]">
          O que dizem nossos clientes
        </span>

        <p className="mt-6 font-['ClashDisplay-Regular'] text-2xl leading-snug text-white md:text-3xl">
          A StackByte entendeu nosso sistema legado melhor do que nossa própria equipe interna.{' '}
          <em className="italic text-white/70">Entregaram no prazo e sem downtime.</em>
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-white/5">
            <img
              src="/DSC_6854.jpg"
              alt="Caio Lopes"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-left">
            <div className="font-['ClashDisplay-Regular'] text-sm font-medium text-white">Caio Lopes</div>
            <div className="font-['ClashDisplay-Regular'] text-xs text-white/40">Fnot, Caio Finotti | Branding </div>
          </div>
        </div>
      </div>
    </section>
  );  
}
