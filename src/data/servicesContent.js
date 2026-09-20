// Conteúdo de cada página de serviço. Edite os textos aqui — os componentes
// (ServicoDetalhe.jsx) só leem esses dados, então basta mudar o texto abaixo
// para atualizar o site.

const servicesContent = {
  desenvolvimento: {
    title: 'Desenvolvimento de software',
    eyebrow: 'Serviços — Engenharia',
    description:
      'Construímos produtos e plataformas sob medida, do zero ao lançamento, com foco em performance, manutenibilidade e crescimento de longo prazo.',
    highlights: [
      {
        title: 'Produtos web e mobile',
        text: 'Aplicações completas — front-end, back-end e banco de dados — pensadas para escalar junto com o seu negócio.',
      },
      {
        title: 'Arquitetura sob medida',
        text: 'Definimos a arquitetura certa para o seu caso, evitando tanto complexidade desnecessária quanto gargalos futuros.',
      },
      {
        title: 'Código que dura',
        text: 'Padrões de engenharia, testes automatizados e documentação para que o sistema continue evoluindo mesmo sem nós.',
      },
    ],
    process: [
      'Descoberta e levantamento de requisitos com o seu time',
      'Prototipação e validação técnica das decisões de arquitetura',
      'Desenvolvimento em ciclos curtos, com entregas frequentes',
      'Testes, homologação e deploy assistido em produção',
    ],
  },
  modernizacao: {
    title: 'Modernização de sistemas legados',
    eyebrow: 'Serviços — Engenharia',
    description:
      'Migramos sistemas antigos para arquiteturas atuais sem interromper a operação do seu negócio — passo a passo, com risco controlado.',
    highlights: [
      {
        title: 'Migração sem downtime',
        text: 'Estratégias de migração incremental para que o sistema antigo e o novo convivam até a transição ser 100% segura.',
      },
      {
        title: 'Redução de dívida técnica',
        text: 'Identificamos os pontos mais frágeis do sistema atual e priorizamos o que traz mais risco ou mais custo de manutenção.',
      },
      {
        title: 'Continuidade do negócio',
        text: 'Toda modernização é planejada para não travar as operações do dia a dia da sua empresa.',
      },
    ],
    process: [
      'Auditoria técnica do sistema atual e mapeamento de riscos',
      'Plano de migração faseado, com marcos claros',
      'Execução incremental, com testes em paralelo ao sistema antigo',
      'Descomissionamento do legado só depois da validação completa',
    ],
  },
  'cloud-devops': {
    title: 'Cloud & DevOps',
    eyebrow: 'Serviços — Infraestrutura',
    description:
      'Infraestrutura escalável, pipelines de CI/CD e monitoramento contínuo para operações confiáveis, do primeiro deploy ao milionésimo usuário.',
    highlights: [
      {
        title: 'Infraestrutura como código',
        text: 'Ambientes versionados, replicáveis e auditáveis — nada de configuração manual que só uma pessoa entende.',
      },
      {
        title: 'CI/CD de verdade',
        text: 'Pipelines automatizados de teste e deploy, para que colocar código em produção seja rotina, não evento.',
      },
      {
        title: 'Observabilidade',
        text: 'Monitoramento, alertas e logs centralizados para detectar problemas antes que o cliente perceba.',
      },
    ],
    process: [
      'Diagnóstico da infraestrutura e maturidade de deploy atual',
      'Desenho da arquitetura cloud (AWS, GCP ou Azure)',
      'Implementação de pipelines de CI/CD e monitoramento',
      'Transferência de conhecimento para o seu time operar com autonomia',
    ],
  },
  seguranca: {
    title: 'Segurança da informação',
    eyebrow: 'Serviços — Segurança',
    description:
      'Auditoria, hardening e práticas de segurança aplicadas em cada camada do sistema — antes que um incidente aconteça, não depois.',
    highlights: [
      {
        title: 'Auditoria de segurança',
        text: 'Levantamento de vulnerabilidades em código, infraestrutura e processos, com plano de ação priorizado por risco.',
      },
      {
        title: 'Hardening de sistemas',
        text: 'Configuração segura de servidores, banco de dados e APIs, seguindo boas práticas do mercado.',
      },
      {
        title: 'Conformidade',
        text: 'Apoio para adequar seus sistemas a exigências como LGPD e boas práticas de proteção de dados.',
      },
    ],
    process: [
      'Levantamento de superfície de ataque e pontos críticos',
      'Testes de segurança e simulação de cenários de invasão',
      'Aplicação de correções e hardening priorizado por risco',
      'Relatório final e recomendações de monitoramento contínuo',
    ],
  },
};

export default servicesContent;
