import type { DomainId, DomainMeta } from '../types';

// Aparência e pesos dos domínios usados na configuração e nos resultados.
export const DOMAINS: DomainMeta[] = [
  {
    id: 'Todos',
    label: 'Todos os Domínios',
    weight: '100%',
    color: 'text-orange-400',
    bg: 'bg-orange-500/15',
    border: 'border-orange-500/30'
  },
  {
    id: 'Segurança',
    label: 'Arquiteturas Seguras',
    weight: '30%',
    color: 'text-rose-400',
    bg: 'bg-rose-500/15',
    border: 'border-rose-500/30',
    barColor: 'bg-rose-500'
  },
  {
    id: 'Resiliência',
    label: 'Arquiteturas Resilientes',
    weight: '26%',
    color: 'text-sky-400',
    bg: 'bg-sky-500/15',
    border: 'border-sky-500/30',
    barColor: 'bg-sky-500'
  },
  {
    id: 'Alto Desempenho',
    label: 'Alto Desempenho',
    weight: '24%',
    color: 'text-amber-400',
    bg: 'bg-amber-500/15',
    border: 'border-amber-500/30',
    barColor: 'bg-amber-500'
  },
  {
    id: 'Otimização de Custos',
    label: 'Otimização de Custos',
    weight: '20%',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/15',
    border: 'border-emerald-500/30',
    barColor: 'bg-emerald-500'
  }
];

export const getDomainMeta = (domainId: DomainId): DomainMeta => {
  return DOMAINS.find((d) => d.id === domainId) || DOMAINS[0];
};

