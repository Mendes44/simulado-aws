import type { QuestionDomain } from '../types';

// Arquivos estáticos gerados por scripts/generate-mind-maps.py e incluídos no deploy.
export const MIND_MAPS: { slug: string; title: string; domain: QuestionDomain; weight: string; topics: string }[] = [
  { slug: 'seguranca', title: 'Arquiteturas seguras', domain: 'Segurança', weight: '30%', topics: 'IAM, redes privadas, criptografia e proteção de aplicações.' },
  { slug: 'resiliencia', title: 'Arquiteturas resilientes', domain: 'Resiliência', weight: '26%', topics: 'Multi-AZ, desacoplamento, backups e recuperação de desastres.' },
  { slug: 'desempenho', title: 'Alto desempenho', domain: 'Alto Desempenho', weight: '24%', topics: 'Computação, armazenamento, bancos de dados e redes.' },
  { slug: 'custos', title: 'Otimização de custos', domain: 'Otimização de Custos', weight: '20%', topics: 'Capacidade, classes S3, ciclo de vida e visibilidade financeira.' },
];
