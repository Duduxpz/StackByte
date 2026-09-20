import { useEffect, useState } from 'react';

const testimonials = [
  {
    text: 'A StackByte entendeu nosso sistema legado melhor do que nossa própria equipe interna.',
    highlight: 'Entregaram no prazo e sem downtime.',
    name: 'Caio Lopes',
    company: 'Fnot, Caio Finotti | Branding',
    image: '/DSC_6854.jpg',
  },
  {
    text: 'Precisávamos de alguém que realmente entendesse o que nossa empresa precisava.',
    highlight: 'A StackByte transformou nossa ideia em uma solução muito mais completa.',
    name: 'Lucas Almeida',
    company: 'Almeida Solutions | Tecnologia',
    image: '/clientes/lucas.jpg',
  },
  {
    text: 'O projeto começou como uma necessidade simples, mas a equipe conseguiu enxergar muito além.',
    highlight: 'O resultado final superou completamente nossas expectativas.',
    name: 'Gabriel Martins',
    company: 'GM Digital | Marketing',
    image: '/clientes/gabriel.jpg',
  },
  {
    text: 'Tínhamos um processo totalmente manual e cheio de problemas.',
    highlight: 'Hoje conseguimos controlar tudo de forma muito mais rápida e organizada.',
    name: 'Rafael Costa',
    company: 'Costa Empresarial | Gestão',
    image: '/clientes/rafael.jpg',
  },
  {
    text: 'Desde o primeiro contato ficou claro que a StackByte não queria apenas vender um site.',
    highlight: 'Eles realmente entenderam nosso negócio antes de começar o projeto.',
    name: 'Matheus Oliveira',
    company: 'Oliveira Group | Empresarial',
    image: '/clientes/matheus.jpg',
  },
  {
    text: 'Nossa antiga plataforma já não acompanhava o crescimento da empresa.',
    highlight: 'A nova estrutura ficou muito mais rápida, moderna e escalável.',
    name: 'Pedro Henrique',
    company: 'PH Company | Serviços',
    image: '/clientes/pedro.jpg',
  },
  {
    text: 'O atendimento foi um dos maiores diferenciais durante todo o projeto.',
    highlight: 'Sempre tivemos retorno rápido e muita clareza em cada etapa.',
    name: 'João Victor',
    company: 'JV Consultoria | Negócios',
    image: '/clientes/joao.jpg',
  },
  {
    text: 'Precisávamos modernizar nossa presença digital sem perder a identidade da empresa.',
    highlight: 'A StackByte conseguiu equilibrar tecnologia, design e nossa essência.',
    name: 'Felipe Rocha',
    company: 'Rocha Company | Branding',
    image: '/clientes/felipe.jpg',
  },
  {
    text: 'O sistema antigo apresentava problemas que já faziam parte da nossa rotina.',
    highlight: 'Depois do projeto, nossa operação ficou muito mais estável.',
    name: 'André Silva',
    company: 'Silva Tech | Sistemas',
    image: '/clientes/andre.jpg',
  },
  {
    text: 'Entramos no projeto com uma ideia e várias dúvidas sobre como colocar tudo em prática.',
    highlight: 'A equipe ajudou a transformar tudo isso em um produto funcional.',
    name: 'Bruno Mendes',
    company: 'Mendes Digital | Tecnologia',
    image: '/clientes/bruno.jpg',
  },
  {
    text: 'O que mais chamou nossa atenção foi a preocupação com cada detalhe.',
    highlight: 'O resultado ficou muito mais profissional do que imaginávamos.',
    name: 'Thiago Martins',
    company: 'TM Group | Comunicação',
    image: '/clientes/thiago.jpg',
  },
  {
    text: 'Precisávamos de uma solução que pudesse crescer junto com nossa empresa.',
    highlight: 'A arquitetura desenvolvida deixou tudo preparado para os próximos passos.',
    name: 'Henrique Souza',
    company: 'HS Business | Gestão',
    image: '/clientes/henrique.jpg',
  },
  {
    text: 'Nossa experiência anterior com desenvolvimento não tinha sido muito boa.',
    highlight: 'A StackByte mudou completamente nossa visão sobre esse tipo de projeto.',
    name: 'Diego Ferreira',
    company: 'Ferreira & Co. | Empresarial',
    image: '/clientes/diego.jpg',
  },
  {
    text: 'O projeto precisava ser entregue dentro de um prazo bastante apertado.',
    highlight: 'Mesmo assim, a qualidade não ficou em segundo plano.',
    name: 'Gustavo Ribeiro',
    company: 'GR Solutions | Tecnologia',
    image: '/clientes/gustavo.jpg',
  },
  {
    text: 'Queríamos uma experiência digital que realmente representasse o nível da nossa empresa.',
    highlight: 'O resultado trouxe exatamente essa percepção para nossos clientes.',
    name: 'Leonardo Alves',
    company: 'Alves Group | Negócios',
    image: '/clientes/leonardo.jpg',
  },
  {
    text: 'A comunicação durante o desenvolvimento fez toda diferença.',
    highlight: 'Sabíamos exatamente o que estava acontecendo em cada etapa.',
    name: 'Vinícius Santos',
    company: 'VS Company | Serviços',
    image: '/clientes/vinicius.jpg',
  },
  {
    text: 'Não queríamos apenas algo bonito, precisávamos de uma solução que funcionasse de verdade.',
    highlight: 'A StackByte entregou os dois: experiência visual e tecnologia.',
    name: 'Arthur Lima',
    company: 'Lima Digital | Tecnologia',
    image: '/clientes/arthur.jpg',
  },
  {
    text: 'Depois que colocamos o novo projeto no ar, percebemos imediatamente a diferença.',
    highlight: 'Nossa operação ficou mais simples e nossos clientes tiveram uma experiência melhor.',
    name: 'Marcelo Castro',
    company: 'Castro Business | Empresarial',
    image: '/clientes/marcelo.jpg',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  const duration = 5000;

  useEffect(() => {
    const interval = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;

      setProgress((elapsed / duration) * 100);

      if (elapsed >= duration) {
        elapsed = 0;

        setCurrent((prev) => (prev + 1) % testimonials.length);
        setProgress(0);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [current]);

  const testimonial = testimonials[current];

  return (
    <section className="bg-black py-24 overflow-hidden">
      <div className="mx-auto max-w-3xl px-6 text-center">

        {/* Label */}
        <span className="font-['ClashDisplay-Regular'] text-xs font-medium tracking-wide text-[#FD7B01]">
          O que dizem nossos clientes
        </span>

        {/* Depoimento */}
        <div
          key={current}
          className="animate-testimonial mt-6"
        >
          <p className="font-['ClashDisplay-Regular'] text-2xl leading-snug text-white md:text-3xl">
            {testimonial.text}{' '}
            <em className="italic text-white/70">
              {testimonial.highlight}
            </em>
          </p>

          {/* Cliente */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-white/5">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>

            <div className="text-left">
              <div className="font-['ClashDisplay-Regular'] text-sm font-medium text-white">
                {testimonial.name}
              </div>

              <div className="font-['ClashDisplay-Regular'] text-xs text-white/40">
                {testimonial.company}
              </div>
            </div>
          </div>
        </div>

        {/* Indicadores */}
        <div className="mt-10 flex justify-center gap-1.5">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrent(index);
                setProgress(0);
              }}
              className="group relative h-1 w-6 overflow-hidden rounded-full bg-white/10"
              aria-label={`Ver depoimento ${index + 1}`}
            >
              <span
                className={`absolute left-0 top-0 h-full rounded-full bg-[#FD7B01] transition-all ${
                  index === current ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  width: index === current ? `${progress}%` : '0%',
                }}
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}