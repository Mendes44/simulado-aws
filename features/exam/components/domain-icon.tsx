'use client';

import { Shield, Server, Zap, DollarSign, Layers } from 'lucide-react';
import type { DomainId } from '../types';

// Ícone associado ao domínio, reutilizado em todas as telas.
export const DomainIcon = ({
  domain,
  className = 'w-4 h-4'
}: {
  domain: DomainId;
  className?: string;
}) => {
  switch (domain) {
    case 'Segurança':
      return <Shield className={className} />;
    case 'Resiliência':
      return <Server className={className} />;
    case 'Alto Desempenho':
      return <Zap className={className} />;
    case 'Otimização de Custos':
      return <DollarSign className={className} />;
    default:
      return <Layers className={className} />;
  }
};

