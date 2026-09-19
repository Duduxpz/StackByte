export default function CTA() {
  return (
    <section id="contato" className="bg-[#FF5B00] py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center">
        <h2 className="max-w-xl font-['Fraunces'] text-3xl font-semibold text-black md:text-4xl">
          Vamos modernizar a sua stack.
        </h2>
        <p className="max-w-md font-['Inter'] text-sm text-black/70">
          Conte um pouco sobre o seu sistema atual e retornamos com um diagnóstico inicial em até 48h.
        </p>
        <a
          href="mailto:contato@stackbyte.com.br"
          className="rounded-full bg-black px-7 py-3 font-['Inter'] text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Falar com a StackByte
        </a>
      </div>
    </section>
  );
}
