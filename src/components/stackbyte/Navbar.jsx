import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Serviços', href: '/#servicos' },
  { label: 'Projetos', href: '/projetos' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Contato', href: '/contato' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Mantém a navbar visível no topo da página.
      if (currentScrollY <= 10) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Rolando para baixo: esconde.
        setVisible(false);
        setOpen(false);
      } else {
        // Rolando para cima: mostra.
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-[9999] w-full border-b border-white/10 bg-[#080505]/90 backdrop-blur-md transition-transform duration-300 ease-out ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/">
          <img
            src="/Ativo 2@3x.png"
            alt="StackByte"
            className="h-7 w-auto object-contain md:h-8"
          />
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="transition-colors hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="/contato"
          className="hidden rounded-full bg-[#FD7B01] px-5 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90 md:inline-block"
        >
          Fale com a gente
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="text-white md:hidden"
          aria-label="Abrir menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-white/10 px-6 py-4 text-sm text-white/80 md:hidden">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="py-2" onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a
            href="/contato"
            className="mt-2 w-fit rounded-full bg-[#FD7B01] px-5 py-2 font-medium text-black"
            onClick={() => setOpen(false)}
          >
            Fale com a gente
          </a>
        </nav>
      )}
    </header>
  );
}
