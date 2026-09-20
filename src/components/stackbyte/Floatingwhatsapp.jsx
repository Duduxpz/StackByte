import {MessageCicle} from 'lucide-react';

const WHATSAPP_NUMBER = '5581999999999';
const DEFAULT_MESSAGE = 'Olá! Sou cliente da StackByte e preciso de suporte com um sistema em produção.';

export default function FloatingWhatsapp() {
  const whatsappLink = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Suporte via WhatsApp"
              className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] transition-transform hover:scale-105"
    >
      <MessageCircle size={26} fill="white" strokeWidth={0} />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-black/80 px-3 py-1.5 font-['Inter'] text-xs text-white group-hover:md:block">
        Suporte StackByte
      </span>
    </a>
  );
}