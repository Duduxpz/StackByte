import Navbar from '../components/stackbyte/Navbar';
import Footer from '../components/stackbyte/Footer';
import FloatingWhatsApp from '../components/stackbyte/FloatingWhatsApp';
import PageHero from '../components/stackbyte/PageHero';

const benefits = [
  'Trabalho remoto, com encontros presenciais pontuais',
  'Horário flexível — entregamos por resultado, não por presença',
  'Projetos técnicos desafiadores, não retrabalho repetitivo',
  'Investimento contínuo em aprendizado e ferramentas',
];

export default function Carreiras() {
  return (
    <div className="bg-[#080505] text-white">
      <Navbar />

      <PageHero
        eyebrow="Empresa"
        title="Carreiras"
        description="Ainda não temos vagas abertas publicamente, mas estamos sempre de olho em gente boa de engenharia. Se você curte sistemas complexos, quer trocar uma ideia."
      />

      <section className="bg-black py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 font-['ClashDisplay-Regular'] text-2xl font-semibold text-white md:text-3xl">
            Como é trabalhar aqui
          </h2>
          <ul className="space-y-4">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FD7B01]" />
                <span className="font-['ClashDisplay-Regular'] text-sm leading-relaxed text-white/70 md:text-base">
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#FD7B01] py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-6 text-center">
          <h2 className="font-['ClashDisplay-Regular'] text-2xl font-semibold text-black md:text-3xl">
            Quer se apresentar mesmo sem vaga aberta?
          </h2>
          <a
            href="mailto:contato@stackbyte.com.br"
            className="rounded-full bg-black px-7 py-3 font-['ClashDisplay-Regular'] text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Mandar um e-mail
          </a>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
