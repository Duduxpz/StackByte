import Navbar from './components/stackbyte/Navbar';
import Hero from './components/stackbyte/Hero';
import WhatWeDo from './components/stackbyte/WhatWeDo';
import CaseStudies from './components/stackbyte/CaseStudies';
import Testimonials from './components/stackbyte/Testimonials';
import CTA from './components/stackbyte/CTA';
import Footer from './components/stackbyte/Footer';
import FloatingWhatsApp from './components/stackbyte/Floatingwhatsapp';

function App() {
  return (
    <div className="bg-[#080505] text-white">
      <Navbar />
      <Hero />
      <WhatWeDo />
      <CaseStudies />
      <Testimonials />
      <CTA />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;