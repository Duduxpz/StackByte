import Navbar from '../components/stackbyte/Navbar';
import Footer from '../components/stackbyte/Footer';
import FloatingWhatsApp from '../components/stackbyte/FloatingWhatsApp';
import PageHero from '../components/stackbyte/PageHero';
import CaseStudies from '../components/stackbyte/CaseStudies';

export default function Projetos() {
  return (
    <div className="bg-[#080505] text-white">
      <Navbar />

      <PageHero
        eyebrow="Empresa"
        title="Projetos"
        description="Alguns dos sistemas que desenvolvemos, modernizamos e colocamos em produção — com resultado medido, não só entregue."
      />

      <CaseStudies />

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
