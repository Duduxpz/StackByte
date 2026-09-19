import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#14131E]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <span className="font-['Fraunces'] text-lg font-semibold text-white">
          Stack<span className="text-[#FF5B00]">Byte</span>
        </span>

        <nav className="hidden items-center gap-8 font-['Inter'] text-sm text-white/70 md:flex">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="transition-colors hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contato"
          className="hidden rounded-full bg-[#FF5B00] px-5 py-2 font-['Inter'] text-sm font-medium text-black transition-opacity hover:opacity-90 md:inline-block"
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
        <nav className="flex flex-col gap-1 border-t border-white/10 px-6 py-4 font-['Inter'] text-sm text-white/80 md:hidden">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="py-2" onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            className="mt-2 w-fit rounded-full bg-[#FF5B00] px-5 py-2 font-medium text-black"
            onClick={() => setOpen(false)}
          >
            Fale com a gente
          </a>
        </nav>
      )}
    </header>
  );
}
