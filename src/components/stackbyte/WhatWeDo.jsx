import { useState } from 'react';

const services = [
  {
    title: 'Desenvolvimento de software',
    description:
      'Construção de produtos e plataformas sob medida, do zero ao lançamento, com foco em performance e manutenibilidade.',
  },
  {
    title: 'Modernização de sistemas legados',
    description:
      'Migramos sistemas antigos para arquiteturas atuais sem interromper a operação do seu negócio.',
  },
  {
    title: 'Cloud & DevOps',
    description:
      'Infraestrutura escalável, pipelines de CI/CD e monitoramento contínuo para operações confiáveis.',
  },
  {
    title: 'Integração de APIs',
    description:
      'Conectamos sistemas internos e de terceiros para eliminar retrabalho manual e silos de dados.',
  },
  {
    title: 'Segurança da informação',
    description:
      'Auditoria, hardening e práticas de segurança aplicadas em cada camada do sistema.',
  },
];

export default function WhatWeDo() {
  const [active, setActive] = useState(0);

  return (
    <section id="servicos" className="bg-[#080505] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-12 text-3xl font-semibold text-white md:text-4xl">
          O que a StackByte faz
        </h2>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {services.map((service, i) => (
              <li key={service.title}>
                <button
                  onClick={() => setActive(i)}
                  className={`flex w-full items-baseline gap-4 py-5 text-left transition-colors ${
                    active === i ? 'text-white' : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  <span className="text-xs text-white/30">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-lg font-medium">{service.title}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-8">
            <div className="mb-4 h-1 w-12 rounded-full bg-[#FD7B01]" />
            <h3 className="text-xl font-semibold text-white">
              {services[active].title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {services[active].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
