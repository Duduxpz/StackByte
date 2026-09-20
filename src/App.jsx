import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const ServicoDetalhe = lazy(() => import('./pages/ServicoDetalhe'));
const Sobre = lazy(() => import('./pages/Sobre'));
const Projetos = lazy(() => import('./pages/Projetos'));
const Carreiras = lazy(() => import('./pages/Carreiras'));
const Contato = lazy(() => import('./pages/Contato'));

function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080505]" />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicos/:slug" element={<ServicoDetalhe />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/projetos" element={<Projetos />} />
        <Route path="/carreiras" element={<Carreiras />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
    </Suspense>
  );
}

export default App;
