import Navbar from '../components/stackbyte/Navbar';
import Footer from '../components/stackbyte/Footer';
import FloatingWhatsApp from '../components/stackbyte/FloatingWhatsApp';
import PageHero from '../components/stackbyte/PageHero';

const values = [
  {
    title: 'Engenharia antes de venda',
    text: 'Só prometemos o que sabemos entregar com qualidade — preferimos dizer não a um projeto do que entregar algo malfeito.',
  },
  {
    title: 'Transparência técnica',
    text: 'Você entende o que está sendo construído e por quê, sem jargão para esconder decisões.',
  },
  {
    title: 'Parceria de longo prazo',
    text: 'Sistemas que construímos continuam sendo nossos depois da entrega — acompanhamos a operação real.',
  },
];

export default function Sobre() {
  return (
    <div className="bg-[#080505] text-white">
      <Navbar />

      <PageHero
        eyebrow="Empresa"
        title="Sobre a StackByte"
        description="Somos uma empresa de tecnologia focada em desenvolvimento de sistemas, modernização de infraestrutura e engenharia de software para empresas que não podem parar."
      />

      <section className="bg-[#080505] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <p className="font-['ClashDisplay-Regular'] text-base leading-relaxed text-white/70">
            A StackByte nasceu para resolver um problema comum: empresas que crescem
            mais rápido do que os sistemas que sustentam essa operação. Trabalhamos
            com times técnicos e não técnicos para entender o problema de verdade
            antes de escrever a primeira linha de código.
          </p>
        </div>
      </section>

      <section className="bg-black py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-10 font-['ClashDisplay-Regular'] text-2xl font-semibold text-white md:text-3xl">
            Como trabalhamos
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="mb-4 h-1 w-10 rounded-full bg-[#FD7B01]" />
                <h3 className="font-['ClashDisplay-Regular'] text-base font-medium text-white">{v.title}</h3>
                <p className="mt-3 font-['ClashDisplay-Regular'] text-sm leading-relaxed text-white/60">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
