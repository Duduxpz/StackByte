import Navbar from './components/stackbyte/Navbar';
import Hero from './components/stackbyte/Hero';
import WhatWeDo from './components/stackbyte/WhatWeDo';
import CaseStudies from './components/stackbyte/CaseStudies';
import Testimonials from './components/stackbyte/Testimonials';
import CTA from './components/stackbyte/CTA';
import Footer from './components/stackbyte/Footer';

function App() {
  return (
    <div className="bg-[#080505] pt-[73px] text-white">
      <Navbar />
      <Hero />
      <WhatWeDo />
      <CaseStudies />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
