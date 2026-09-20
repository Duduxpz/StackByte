import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const columns = [
  {
    title: 'Serviços',
    links: ['Desenvolvimento', 'Modernização', 'Cloud & DevOps', 'Segurança'],
  },
  {
    title: 'Empresa',
    links: ['Sobre', 'Projetos', 'Carreiras', 'Contato'],
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-black pt-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-16 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <span className="font-['ClashDisplay-Regular'] text-lg font-semibold text-white">
              Stack<span className="text-[#FD7B01]">Byte</span>
            </span>
            <p className="mt-4 max-w-xs font-['ClashDisplay-Regular'] text-sm leading-relaxed text-white/50">
              Engenharia de software e modernização de sistemas para empresas
              que não podem parar.
            </p>
            <div className="mt-6 flex gap-4 text-white/50">
              <a
                href="https://wa.me/5531998062982"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex items-center justify-center transition-opacity hover:opacity-100"
              >
                <img
                  src="/whatsappblack.png"
                  alt="WhatsApp"
                  className="h-[18px] w-[18px] object-contain brightness-0 invert opacity-70 transition-opacity hover:opacity-100"
                />
              </a>
              <a
                href="https://www.instagram.com/stackbyte.br"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center justify-center transition-opacity hover:opacity-100"
              >
                <img
                  src="/instagram.png"
                  alt="Instagram"
                  className="h-[18px] w-[18px] object-contain brightness-0 invert opacity-70 transition-opacity hover:opacity-100"
                />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-['ClashDisplay-Regular'] text-sm font-medium text-white">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="font-['ClashDisplay-Regular'] text-sm text-white/50 hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-['ClashDisplay-Regular'] text-sm font-medium text-white">
              Receba novidades técnicas
            </h4>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-transparent px-3 font-['ClashDisplay-Regular'] text-sm text-white placeholder-white/30 outline-none"
              />
              <button
                type="submit"
                aria-label="Inscrever"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FD7B01] text-black"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-8 font-['ClashDisplay-Regular'] text-xs text-white/30 md:flex-row">
          <span>© {new Date().getFullYear()} StackByte. Todos os direitos reservados.</span>
          <span>CNPJ 00.000.000/0001-00</span>
        </div>
      </div>
    </footer>
  );
}
