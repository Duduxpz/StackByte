import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ServicoDetalhe from './pages/ServicoDetalhe';
import Sobre from './pages/Sobre';
import Projetos from './pages/Projetos';
import Carreiras from './pages/Carreiras';
import Contato from './pages/Contato';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/servicos/:slug" element={<ServicoDetalhe />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/projetos" element={<Projetos />} />
      <Route path="/carreiras" element={<Carreiras />} />
      <Route path="/contato" element={<Contato />} />
    </Routes>
  );
}

export default App;
