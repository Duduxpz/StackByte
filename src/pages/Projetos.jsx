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
        description="Conheça alguns dos sites que desenvolvemos para ajudar negócios a apresentar seu trabalho e fortalecer sua presença digital."
      />

      <CaseStudies />

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
