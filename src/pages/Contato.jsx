import { Mail, MapPin, Clock } from 'lucide-react';
import Navbar from '../components/stackbyte/Navbar';
import Footer from '../components/stackbyte/Footer';
import FloatingWhatsApp from '../components/stackbyte/FloatingWhatsApp';
import PageHero from '../components/stackbyte/PageHero';
import CTA from '../components/stackbyte/CTA';

const channels = [
  { icon: Mail, label: 'E-mail', value: 'contato@stackbyte.com.br' },
  { icon: Clock, label: 'Prazo de resposta', value: 'Até 48h úteis' },
  { icon: MapPin, label: 'Atendimento', value: 'Remoto, todo o Brasil' },
];

export default function Contato() {
  return (
    <div className="bg-[#080505] text-white">
      <Navbar />

      <PageHero
        eyebrow="Empresa"
        title="Contato"
        description="Conte um pouco sobre o seu sistema atual, o problema que está enfrentando e retornamos com um diagnóstico inicial."
      />

      <section className="bg-[#080505] py-16">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 px-6 md:grid-cols-3">
          {channels.map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <Icon className="text-[#FD7B01]" size={22} />
              <div className="mt-4 font-['ClashDisplay-Regular'] text-xs text-white/40">{label}</div>
              <div className="mt-1 font-['ClashDisplay-Regular'] text-sm text-white">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <CTA />

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
