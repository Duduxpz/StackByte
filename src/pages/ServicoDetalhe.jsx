import { useParams, Link, Navigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import Navbar from '../components/stackbyte/Navbar';
import Footer from '../components/stackbyte/Footer';
import FloatingWhatsApp from '../components/stackbyte/FloatingWhatsApp';
import PageHero from '../components/stackbyte/PageHero';
import servicesContent from '../data/servicesContent';

export default function ServicoDetalhe() {
  const { slug } = useParams();
  const service = servicesContent[slug];

  if (!service) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-[#080505] text-white">
      <Navbar />

      <PageHero
        eyebrow={service.eyebrow}
        title={service.title}
        description={service.description}
      />

      <section className="bg-[#080505] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {service.highlights.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="mb-4 h-1 w-10 rounded-full bg-[#FD7B01]" />
                <h3 className="font-['ClashDisplay-Regular'] text-base font-medium text-white">
                  {item.title}
                </h3>
                <p className="mt-3 font-['ClashDisplay-Regular'] text-sm leading-relaxed text-white/60">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-['ClashDisplay-Regular'] text-2xl font-semibold text-white md:text-3xl">
            Como funciona
          </h2>
          <ul className="mt-8 space-y-5">
            {service.process.map((step, i) => (
              <li key={step} className="flex items-start gap-4">
                <CheckCircle2 className="mt-0.5 shrink-0 text-[#FD7B01]" size={20} />
                <span className="font-['ClashDisplay-Regular'] text-sm leading-relaxed text-white/70 md:text-base">
                  {step}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#FD7B01] py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-6 text-center">
          <h2 className="font-['ClashDisplay-Regular'] text-2xl font-semibold text-black md:text-3xl">
            Quer conversar sobre {service.title.toLowerCase()}?
          </h2>
          <Link
            to="/contato"
            className="rounded-full bg-black px-7 py-3 font-['ClashDisplay-Regular'] text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Falar com a StackByte
          </Link>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
