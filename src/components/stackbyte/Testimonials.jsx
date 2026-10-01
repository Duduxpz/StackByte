import { useEffect, useState } from 'react';

const testimonials = [
  {
    text: 'A StackByte entendeu nosso sistema legado melhor do que nossa própria equipe interna.',
    highlight: 'Entregaram no prazo e sem downtime.',
    name: 'Caio Lopes',
    city: 'Divinópolis, MG',
  },
  {
    text: 'Precisávamos de alguém que realmente entendesse o que nossa empresa precisava.',
    highlight: 'A StackByte transformou nossa ideia em uma solução muito mais completa.',
    name: 'Lucas Almeida',
    city: 'Uberlândia, MG',
  },
  {
    text: 'O projeto começou como uma necessidade simples, mas a equipe conseguiu enxergar muito além.',
    highlight: 'O resultado final superou completamente nossas expectativas.',
    name: 'Gabriel Martins',
    city: 'Belo Horizonte, MG',
  },
  {
    text: 'Tínhamos um processo totalmente manual e cheio de problemas.',
    highlight: 'Hoje conseguimos controlar tudo de forma muito mais rápida e organizada.',
    name: 'Rafael Costa',
    city: 'Uberaba, MG',
  },
  {
    text: 'Desde o primeiro contato ficou claro que a StackByte não queria apenas vender um site.',
    highlight: 'Eles realmente entenderam nosso negócio antes de começar o projeto.',
    name: 'Matheus Oliveira',
    city: 'Araxá, MG',
  },
  {
    text: 'Nossa antiga plataforma já não acompanhava o crescimento da empresa.',
    highlight: 'A nova estrutura ficou muito mais rápida, moderna e escalável.',
    name: 'Pedro Henrique',
    city: 'Patos de Minas, MG',
  },
  {
    text: 'O atendimento foi um dos maiores diferenciais durante todo o projeto.',
    highlight: 'Sempre tivemos retorno rápido e muita clareza em cada etapa.',
    name: 'João Victor',
    city: 'Ituiutaba, MG',
  },
  {
    text: 'Precisávamos modernizar nossa presença digital sem perder a identidade da empresa.',
    highlight: 'A StackByte conseguiu equilibrar tecnologia, design e nossa essência.',
    name: 'Felipe Rocha',
    city: 'Araguari, MG',
  },
  {
    text: 'O sistema antigo apresentava problemas que já faziam parte da nossa rotina.',
    highlight: 'Depois do projeto, nossa operação ficou muito mais estável.',
    name: 'André Silva',
    city: 'Contagem, MG',
  },
  {
    text: 'Entramos no projeto com uma ideia e várias dúvidas sobre como colocar tudo em prática.',
    highlight: 'A equipe ajudou a transformar tudo isso em um produto funcional.',
    name: 'Bruno Mendes',
    city: 'Nova Serrana, MG',
  },
  {
    text: 'O que mais chamou nossa atenção foi a preocupação com cada detalhe.',
    highlight: 'O resultado ficou muito mais profissional do que imaginávamos.',
    name: 'Thiago Martins',
    city: 'Itaúna, MG',
  },
  {
    text: 'Precisávamos de uma solução que pudesse crescer junto com nossa empresa.',
    highlight: 'A arquitetura desenvolvida deixou tudo preparado para os próximos passos.',
    name: 'Henrique Souza',
    city: 'Formiga, MG',
  },
  {
    text: 'Nossa experiência anterior com desenvolvimento não tinha sido muito boa.',
    highlight: 'A StackByte mudou completamente nossa visão sobre esse tipo de projeto.',
    name: 'Diego Ferreira',
    city: 'Carmo do Cajuru, MG',
  },
  {
    text: 'O projeto precisava ser entregue dentro de um prazo bastante apertado.',
    highlight: 'Mesmo assim, a qualidade não ficou em segundo plano.',
    name: 'Gustavo Ribeiro',
    city: 'Pará de Minas, MG',
  },
  {
    text: 'Queríamos uma experiência digital que realmente representasse o nível da nossa empresa.',
    highlight: 'O resultado trouxe exatamente essa percepção para nossos clientes.',
    name: 'Leonardo Alves',
    city: 'Sete Lagoas, MG',
  },
  {
    text: 'A comunicação durante o desenvolvimento fez toda diferença.',
    highlight: 'Sabíamos exatamente o que estava acontecendo em cada etapa.',
    name: 'Vinícius Santos',
    city: 'Lavras, MG',
  },
  {
    text: 'Não queríamos apenas algo bonito, precisávamos de uma solução que funcionasse de verdade.',
    highlight: 'A StackByte entregou os dois: experiência visual e tecnologia.',
    name: 'Arthur Lima',
    city: 'Uberlândia, MG',
  },
  {
    text: 'Depois que colocamos o novo projeto no ar, percebemos imediatamente a diferença.',
    highlight: 'Nossa operação ficou mais simples e nossos clientes tiveram uma experiência melhor.',
    name: 'Marcelo Castro',
    city: 'Divinópolis, MG',
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
          <div className="mt-8 flex flex-col items-center">
              <div className="font-['ClashDisplay-Regular'] text-sm font-medium text-white">
                {testimonial.name}
              </div>

              <div className="mt-1 font-['ClashDisplay-Regular'] text-xs text-white/40">
                {testimonial.city}
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
