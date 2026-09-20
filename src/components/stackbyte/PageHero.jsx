export default function PageHero({ eyebrow, title, description }) {
  return (
    <section className="relative overflow-hidden bg-[#080505] pb-16 pt-40">
      <div className="pointer-events-none absolute right-[-10%] top-0 h-[420px] w-[420px] rounded-full bg-[#FD7B01]/20 blur-[140px]" />

      <div className="relative mx-auto max-w-4xl px-6">
        {eyebrow && (
          <span className="font-['ClashDisplay-Regular'] text-xs font-medium tracking-wide text-[#FD7B01]">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 font-['ClashDisplay-Regular'] text-4xl font-semibold leading-[1.1] text-white md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl font-['ClashDisplay-Regular'] text-base leading-relaxed text-white/60">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
