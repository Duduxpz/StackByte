import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

const WHATSAPP_NUMBER = '5531998062982';

const DEFAULT_MESSAGE =
  'Olá! Vim pelo site da StackByte e gostaria de conversar sobre um projeto.';

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);

  const containerRef = useRef(null);

  const whatsappLink =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      DEFAULT_MESSAGE,
    )}`;

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !containerRef.current?.contains(
          event.target,
        )
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener(
      'pointerdown',
      handleOutsideClick,
    );

    document.addEventListener(
      'keydown',
      handleEscape,
    );

    return () => {
      document.removeEventListener(
        'pointerdown',
        handleOutsideClick,
      );

      document.removeEventListener(
        'keydown',
        handleEscape,
      );
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-5 right-5 z-[80] sm:bottom-6 sm:right-6"
      style={{
        paddingBottom:
          'env(safe-area-inset-bottom)',
      }}
    >
      {open && (
        <div
          className="mb-3 w-[calc(100vw-2.5rem)] max-w-[320px] origin-bottom-right animate-[scaleIn_.18s_ease-out] overflow-hidden rounded-2xl border border-white/10 bg-[#100d0b]/95 p-4 shadow-[0_25px_80px_rgba(0,0,0,.45)] backdrop-blur-xl"
          role="dialog"
          aria-label="Contato via WhatsApp"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#25D366]">
              <MessageCircle
                size={20}
                strokeWidth={2}
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <strong className="font-['ClashDisplay-Regular'] text-sm text-white">
                  Fale com a StackByte
                </strong>

                <button
                  type="button"
                  onClick={() =>
                    setOpen(false)
                  }
                  aria-label="Fechar WhatsApp"
                  className="rounded-full p-1 text-white/40 transition hover:bg-white/10 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <p className="mt-1 font-['ClashDisplay-Regular'] text-xs leading-relaxed text-white/50">
                Tire dúvidas, fale sobre um
                projeto ou peça um orçamento.
              </p>
            </div>
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 font-['ClashDisplay-Regular'] text-sm font-semibold text-black transition hover:bg-[#43e47c] active:scale-[0.98]"
          >
            Abrir WhatsApp
            <Send size={16} />
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={
          open
            ? 'Fechar contato via WhatsApp'
            : 'Abrir contato via WhatsApp'
        }
        aria-expanded={open}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_40px_-8px_rgba(37,211,102,.7)] transition duration-300 hover:scale-105 hover:shadow-[0_16px_45px_-8px_rgba(37,211,102,.85)] active:scale-95 sm:h-15 sm:w-15"
      >
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/30 duration-[2.5s]" />

        {open ? (
          <X size={23} />
        ) : (
          <MessageCircle
            size={25}
            strokeWidth={2.2}
          />
        )}

        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg border border-white/10 bg-[#100d0b] px-3 py-2 font-['ClashDisplay-Regular'] text-xs text-white shadow-xl sm:block sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
          Fale com a StackByte
        </span>
      </button>
    </div>
  );
}