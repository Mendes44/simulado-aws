'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  XCircle,
  Clock,
  Trophy,
  History,
  Play,
  ChevronRight,
  RotateCcw,
  Filter,
  Search,
  Shield,
  Server,
  Zap,
  DollarSign,
  Sparkles,
  User,
  Check,
  AlertCircle,
  Eye,
  ArrowLeft,
  BarChart3,
  Layers,
  KeyRound,
  Cloud
} from 'lucide-react';

// ============================================================================
// TIPOS TYPESCRIPT
// ============================================================================
type DomainId =
  | 'Todos'
  | 'Segurança'
  | 'Resiliência'
  | 'Alto Desempenho'
  | 'Otimização de Custos';

type QuestionDomain = Exclude<DomainId, 'Todos'>;

interface DomainMeta {
  id: DomainId;
  label: string;
  weight: string;
  color: string;
  bg: string;
  border: string;
  barColor?: string;
}

interface Question {
  id: number;
  domain: QuestionDomain;
  multiSelect: boolean;
  requiredCount: number;
  question: string;
  options: string[];
  correctIndices: number[];
  keyword: string;
  summary: string;
}

interface AnswerRecord {
  questionId: number;
  domain: QuestionDomain;
  selectedIndices: number[];
  correctIndices: number[];
  isCorrect: boolean;
}

interface ExamAttempt {
  id: string;
  candidateName: string;
  awsScore: number;
  correctCount: number;
  totalQuestions: number;
  passed: boolean;
  timeSeconds: number;
  domainFilter: DomainId;
  createdAt: string;
  answers: AnswerRecord[];
}

interface EnrichedAnswer extends AnswerRecord {
  order: number;
  questionData: Question;
}

const STORAGE_KEY = 'aws_saa_c03_simulado_attempts_v1';
const NAME_STORAGE_KEY = 'aws_saa_c03_last_candidate_name_v1';

// ============================================================================
// METADADOS DOS DOMÍNIOS OFICIAIS AWS SAA-C03
// ============================================================================
const DOMAINS: DomainMeta[] = [
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

const getDomainMeta = (domainId: DomainId): DomainMeta => {
  return DOMAINS.find((d) => d.id === domainId) || DOMAINS[0];
};

const DomainIcon = ({
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

// ============================================================================
// BANCO DE DADOS: 30 QUESTÕES REAIS NO ESTILO AWS SAA-C03 (PT-BR)
// ============================================================================
const QUESTIONS_DB: Question[] = [
  {
    id: 1,
    domain: 'Segurança',
    multiSelect: false,
    requiredCount: 1,
    question:
      'Uma empresa precisa mover dados de uma instância do Amazon EC2 para um bucket do Amazon S3. A empresa deve garantir que nenhuma chamada de API e nenhum dado seja roteado pelas rotas da internet pública. Apenas a instância EC2 pode ter acesso para fazer upload de dados para o bucket S3. Qual solução atenderá a esses requisitos?',
    options: [
      'Criar um endpoint VPC de interface para o Amazon S3 na sub-rede onde a instância EC2 está localizada. Anexar uma política de recurso ao bucket S3 para permitir apenas a função IAM da instância EC2 para acesso.',
      'Criar um endpoint VPC de gateway para o Amazon S3 na Zona de Disponibilidade onde a instância EC2 está localizada. Anexar grupos de segurança apropriados ao endpoint. Anexar uma política de recurso ao bucket S3 para permitir apenas a função IAM da instância EC2 para acesso.',
      'Executar a ferramenta nslookup de dentro da instância EC2 para obter o endereço IP privado do endpoint de serviço de API do bucket S3. Criar uma rota na tabela de rotas VPC para fornecer à instância EC2 acesso ao bucket S3.',
      'Usar o arquivo ip-ranges.json disponível publicamente fornecido pela AWS para obter o endereço IP privado do endpoint de serviço de API do bucket S3. Criar uma rota na tabela de rotas VPC para fornecer à instância EC2 acesso ao bucket S3.'
    ],
    correctIndices: [0],
    keyword: 'VPC Interface Endpoint + Política de Bucket S3',
    summary:
      'Endpoints VPC mantêm o tráfego privado na rede AWS sem passar pela internet. A opção do Gateway Endpoint está incorreta porque Gateway Endpoints NÃO aceitam Security Groups (grupos de segurança) — apenas Interface Endpoints (PrivateLink) aceitam.'
  },
  {
    id: 2,
    domain: 'Resiliência',
    multiSelect: false,
    requiredCount: 1,
    question:
      'Uma empresa de aprendizado online está migrando para a Nuvem AWS. A empresa mantém seus registros de alunos em um banco de dados PostgreSQL. A empresa precisa de uma solução onde seus dados estejam disponíveis e online em múltiplas Regiões AWS a todo momento. Qual solução atenderá a esses requisitos com o MENOR overhead operacional?',
    options: [
      'Migrar o banco de dados PostgreSQL para um cluster PostgreSQL no Amazon EC2.',
      'Migrar o banco de dados PostgreSQL para uma instância de banco de dados Amazon RDS for PostgreSQL com o recurso Multi-AZ habilitado.',
      'Migrar o banco de dados PostgreSQL para uma instância de banco de dados Amazon RDS for PostgreSQL. Criar uma réplica de leitura em outra Região.',
      'Migrar o banco de dados PostgreSQL para uma instância de banco de dados Amazon RDS for PostgreSQL. Configurar snapshots de banco de dados para serem copiados para outra Região.'
    ],
    correctIndices: [2],
    keyword: 'Cross-Region Read Replica (RDS)',
    summary:
      'O recurso Multi-AZ opera apenas dentro da mesma Região (entre AZs). Snapshots copiados não ficam "online" para acesso imediato. Para manter dados online em múltiplas Regiões com menor esforço operacional no RDS PostgreSQL, utilize Cross-Region Read Replica.'
  },
  {
    id: 3,
    domain: 'Alto Desempenho',
    multiSelect: false,
    requiredCount: 1,
    question:
      'Uma empresa hospeda seu aplicativo web na AWS usando sete instâncias do Amazon EC2. A empresa requer que os endereços IP de todas as instâncias EC2 saudáveis sejam retornados em resposta a consultas DNS. Qual política do Amazon Route 53 deve ser usada?',
    options: [
      'Política de roteamento simples',
      'Política de roteamento de latência',
      'Política de roteamento de múltiplos valores',
      'Política de roteamento de geolocalização'
    ],
    correctIndices: [2],
    keyword: 'Multivalue Answer Routing + Health Checks',
    summary:
      'A política de roteamento de múltiplos valores (Multivalue Answer) retorna até 8 registros saudáveis (com Health Checks) por consulta DNS. A política Simples pode retornar vários IPs, mas NÃO suporta verificações de integridade (Health Checks).'
  },
  {
    id: 4,
    domain: 'Resiliência',
    multiSelect: false,
    requiredCount: 1,
    question:
      'Uma empresa está usando um sistema de gerenciamento de conteúdo executado em uma única instância do Amazon EC2 contendo tanto o servidor web quanto o banco de dados. A empresa deve tornar a plataforma de site altamente disponível e escalável para atender à demanda dos usuários. O que um arquiteto de soluções deve recomendar?',
    options: [
      'Mover o banco de dados para o Amazon RDS e habilitar backups automáticos. Lançar manualmente outra instância EC2 na mesma Zona de Disponibilidade.',
      'Migrar o banco de dados para uma instância do Amazon Aurora com uma réplica de leitura na mesma Zona de Disponibilidade que a instância EC2 existente. Lançar manualmente outra instância EC2 na mesma Zona de Disponibilidade.',
      'Mover o banco de dados para o Amazon Aurora com uma réplica de leitura em outra Zona de Disponibilidade. Criar uma Amazon Machine Image (AMI) a partir da instância EC2. Configurar um Application Load Balancer em duas Zonas de Disponibilidade. Anexar um grupo de Auto Scaling que usa a AMI nas duas Zonas de Disponibilidade.',
      'Mover o banco de dados para uma instância EC2 separada e agendar backups para o Amazon S3. Criar uma AMI da EC2 original. Configurar um ALB em duas AZs e um Auto Scaling Group.'
    ],
    correctIndices: [2],
    keyword: 'Multi-AZ + Desacoplamento (Aurora + ALB + ASG)',
    summary:
      'Alta disponibilidade real exige múltiplas Zonas de Disponibilidade e desacoplamento do banco de dados (Aurora com réplica em outra AZ para failover automático), combinados com ALB e Auto Scaling Group distribuídos em 2 AZs.'
  },
  {
    id: 5,
    domain: 'Resiliência',
    multiSelect: false,
    requiredCount: 1,
    question:
      'Uma empresa executa um aplicativo web em instâncias EC2 em múltiplas AZs dentro de sub-redes privadas. Um arquiteto implementa um Application Load Balancer (ALB) voltado para a internet apontando para essas instâncias, mas o tráfego da internet não está atingindo as instâncias EC2. Como resolver?',
    options: [
      'Substituir o ALB por um Network Load Balancer. Configurar um gateway NAT em uma sub-rede pública para permitir tráfego da internet.',
      'Mover as instâncias EC2 para sub-redes públicas. Adicionar uma regra aos grupos de segurança das instâncias EC2 para permitir tráfego de saída para 0.0.0.0/0.',
      'Atualizar as tabelas de rotas para as sub-redes das instâncias EC2 para enviar tráfego 0.0.0.0/0 pela rota do gateway de internet. Adicionar regra de saída para 0.0.0.0/0.',
      'Criar sub-redes públicas em cada Zona de Disponibilidade. Associar as sub-redes públicas ao ALB. Atualizar as tabelas de rotas das sub-redes públicas com rota para o Internet Gateway.'
    ],
    correctIndices: [3],
    keyword: 'ALB Internet-Facing em Sub-redes Públicas',
    summary:
      'Um ALB voltado para a internet (internet-facing) precisa residir em sub-redes públicas (com rota 0.0.0.0/0 para um Internet Gateway) em cada AZ onde há instâncias de destino, mantendo as instâncias EC2 protegidas nas sub-redes privadas.'
  },
  {
    id: 6,
    domain: 'Alto Desempenho',
    multiSelect: false,
    requiredCount: 1,
    question:
      'Uma empresa executa software de análise em instâncias EC2 para processar dados enviados ao Amazon S3. Usuários relatam que alguns dados não estão sendo processados e o CloudWatch mostra CPU das EC2 constantemente próxima a 100%. Como melhorar o desempenho e escalar o sistema com base na carga do usuário?',
    options: [
      'Criar uma cópia da instância. Colocar todas as instâncias atrás de um Application Load Balancer.',
      'Criar um endpoint VPC S3 para o Amazon S3. Atualizar o software para referenciar o endpoint.',
      'Parar as instâncias EC2. Modificar o tipo de instância para um com CPU mais poderosa e mais memória. Reiniciar as instâncias.',
      'Rotear as solicitações de entrada para o Amazon Simple Queue Service (Amazon SQS). Configurar um grupo de Auto Scaling EC2 com base no tamanho da fila. Atualizar o software para ler da fila.'
    ],
    correctIndices: [3],
    keyword: 'Desacoplamento com SQS + Auto Scaling por Fila',
    summary:
      'O Amazon SQS desacopla a arquitetura e atua como buffer seguro para evitar perda de requisições durante picos. O Auto Scaling baseado no tamanho da fila (métrica ApproximateNumberOfMessagesVisible) escala automaticamente conforme a demanda.'
  },
  {
    id: 7,
    domain: 'Alto Desempenho',
    multiSelect: false,
    requiredCount: 1,
    question:
      'Uma empresa está implementando uma solução de armazenamento compartilhado para um aplicativo de mídia hospedado na Nuvem AWS. A empresa precisa da capacidade de usar clientes SMB para acessar dados. A solução deve ser totalmente gerenciada. Qual solução AWS atende a esses requisitos?',
    options: [
      'Criar um gateway de volume AWS Storage Gateway. Criar um compartilhamento de arquivo que usa o protocolo cliente necessário.',
      'Criar um gateway de fita AWS Storage Gateway. Configurar fitas para usar o Amazon S3.',
      'Criar uma instância do Amazon EC2 Windows. Instalar e configurar uma função de compartilhamento de arquivo Windows na instância.',
      'Criar um sistema de arquivos Amazon FSx for Windows File Server. Anexar o sistema de arquivos ao servidor de origem. Conectar o servidor de aplicativos ao sistema de arquivos.'
    ],
    correctIndices: [3],
    keyword: 'Clientes SMB + Totalmente Gerenciado = FSx Windows',
    summary:
      'Sempre que a prova pedir "clientes SMB" e solução "totalmente gerenciada" na AWS, a resposta é Amazon FSx for Windows File Server. (Amazon EFS usa protocolo NFS para Linux; EC2 Windows exige gerenciamento manual).'
  },
  {
    id: 8,
    domain: 'Alto Desempenho',
    multiSelect: false,
    requiredCount: 1,
    question:
      'Uma empresa criou um aplicativo de análise de imagens onde usuários fazem upload de fotos e metadados de molduras. Hoje usa uma única EC2 e DynamoDB para metadados. O tráfego varia drasticamente por hora e dia da semana, e o sistema precisa escalar automaticamente. Qual solução atende a esses requisitos?',
    options: [
      'Usar o AWS Lambda para processar as fotos. Armazenar as fotos e metadados no DynamoDB.',
      'Usar o Amazon Kinesis Data Firehose para processar as fotos e armazenar as fotos e metadados.',
      'Usar o AWS Lambda para processar as fotos. Armazenar as fotos no Amazon S3. Manter o DynamoDB para armazenar os metadados.',
      'Aumentar o número de instâncias EC2 para três. Usar volumes Amazon EBS de SSD de IOPS provisionado (io2) para armazenar fotos e metadados.'
    ],
    correctIndices: [2],
    keyword: 'Serverless: Lambda + S3 (Arquivos) + DynamoDB (Metadados)',
    summary:
      'Arquitetura serverless ideal: Amazon S3 para objetos pesados (fotos), DynamoDB apenas para metadados (o limite de item no DynamoDB é 400 KB, inviável para fotos) e AWS Lambda para processamento sob demanda que escala automaticamente.'
  },
  {
    id: 9,
    domain: 'Segurança',
    multiSelect: false,
    requiredCount: 1,
    question:
      'Uma empresa executa uma carga de trabalho OLTP em uma instância Amazon RDS não criptografada em implantação Multi-AZ, com snapshots diários. O que um arquiteto de soluções deve fazer para garantir que o banco de dados e os snapshots sejam sempre criptografados daqui para frente?',
    options: [
      'Criptografar uma cópia do snapshot DB mais recente. Substituir a instância de banco de dados existente restaurando o snapshot criptografado.',
      'Criar um novo volume do Amazon EBS criptografado e copiar os snapshots para ele. Habilitar criptografia na instância de banco de dados.',
      'Copiar os snapshots e habilitar a criptografia usando o AWS KMS. Restaurar o snapshot criptografado em uma instância de banco de dados existente.',
      'Copiar os snapshots para um bucket do Amazon S3 que é criptografado usando SSE-KMS.'
    ],
    correctIndices: [0],
    keyword: 'Copiar Snapshot + Criptografar + Restaurar NOVA Instância',
    summary:
      'Não é possível habilitar criptografia diretamente em uma instância RDS já existente nem restaurar um snapshot em cima de uma instância existente. O fluxo obrigatório é: criar snapshot -> copiar o snapshot habilitando KMS -> restaurar como uma NOVA instância e substituir a antiga.'
  },
  {
    id: 10,
    domain: 'Segurança',
    multiSelect: false,
    requiredCount: 1,
    question:
      'Uma empresa quer construir uma infraestrutura de gerenciamento de chaves escalável para suportar desenvolvedores que precisam criptografar dados em seus aplicativos. O que um arquiteto de soluções deve fazer para reduzir o overhead operacional?',
    options: [
      'Usar autenticação multifator (MFA) para proteger as chaves de criptografia.',
      'Usar o AWS Key Management Service (AWS KMS) para proteger as chaves de criptografia.',
      'Usar o AWS Certificate Manager (ACM) para criar, armazenar e atribuir as chaves de criptografia.',
      'Usar uma política IAM para limitar o escopo de usuários que têm permissões de acesso para proteger as chaves de criptografia.'
    ],
    correctIndices: [1],
    keyword: 'AWS KMS = Gerenciamento Escalável de Chaves',
    summary:
      'O AWS KMS é o serviço totalmente gerenciado e escalável para criar, rotacionar e proteger chaves criptográficas usadas em aplicativos. O ACM (Certificate Manager) serve apenas para certificados SSL/TLS.'
  },
  {
    id: 11,
    domain: 'Alto Desempenho',
    multiSelect: false,
    requiredCount: 1,
    question:
      'Uma empresa tem um aplicativo web dinâmico em duas instâncias EC2 com certificado SSL próprio instalado em cada instância. Com o aumento do tráfego, a criptografia/descriptografia SSL está levando a CPU das EC2 ao limite máximo. O que fazer para aumentar o desempenho?',
    options: [
      'Criar um novo certificado SSL usando o AWS Certificate Manager (ACM). Instalar o certificado ACM em cada instância.',
      'Criar um bucket do Amazon S3. Migrar o certificado SSL para o bucket S3 e referenciá-lo nas EC2.',
      'Criar outra instância EC2 como servidor proxy e migrar o certificado SSL para ela.',
      'Importar o certificado SSL para o AWS Certificate Manager (ACM). Criar um Application Load Balancer com um listener HTTPS que usa o certificado SSL do ACM.'
    ],
    correctIndices: [3],
    keyword: 'SSL Offloading no ALB com ACM',
    summary:
      'Transferir a terminação SSL (SSL Offloading) para um Application Load Balancer integrado ao ACM remove o peso do processamento criptográfico das instâncias EC2, liberando CPU para a lógica do aplicativo.'
  },
  {
    id: 12,
    domain: 'Otimização de Custos',
    multiSelect: false,
    requiredCount: 1,
    question:
      'Uma empresa tem um trabalho de processamento em lote altamente dinâmico em muitas instâncias EC2. O trabalho é sem estado (stateless), pode ser iniciado e parado a qualquer momento sem impacto negativo e leva até 60 minutos no total. Qual a solução mais escalável e econômica?',
    options: [
      'Implementar Instâncias Spot do EC2.',
      'Comprar Instâncias Reservadas do EC2.',
      'Implementar Instâncias Sob Demanda do EC2.',
      'Implementar o processamento no AWS Lambda.'
    ],
    correctIndices: [0],
    keyword: 'Stateless + Tolerante a Interrupções + 60 min = EC2 Spot',
    summary:
      'Cargas stateless e tolerantes a interrupções são o caso de uso perfeito para EC2 Spot Instances (até 90% de desconto). O AWS Lambda tem limite máximo de 15 minutos por execução, não atendendo aos 60 minutos exigidos.'
  },
  {
    id: 13,
    domain: 'Resiliência',
    multiSelect: true,
    requiredCount: 2,
    question:
      'Uma empresa executa seu site de e-commerce de duas camadas na AWS (Balanceador de carga + EC2 + RDS). As EC2 e o RDS não devem ser expostos à internet pública, mas as EC2 precisam acessar um serviço web de pagamento externo na internet. O aplicativo deve ser altamente disponível. Qual combinação atende aos requisitos? (Escolha DUAS)',
    options: [
      'Usar um grupo de Auto Scaling para iniciar as instâncias EC2 em sub-redes privadas. Implantar uma instância de banco de dados RDS Multi-AZ em sub-redes privadas.',
      'Configurar uma VPC com duas sub-redes privadas e dois gateways NAT em duas Zonas de Disponibilidade. Implantar um Application Load Balancer nas sub-redes privadas.',
      'Usar um grupo de Auto Scaling para iniciar as instâncias EC2 em sub-redes públicas em duas Zonas de Disponibilidade. Implantar uma instância de banco de dados RDS Multi-AZ em sub-redes privadas.',
      'Configurar uma VPC com duas sub-redes públicas, duas sub-redes privadas e dois gateways NAT em duas Zonas de Disponibilidade. Implantar um Application Load Balancer nas sub-redes públicas.'
    ],
    correctIndices: [0, 3],
    keyword: 'EC2/RDS Privados + ALB/NAT Gateways Públicos em 2 AZs',
    summary:
      'EC2 e RDS ficam isolados em sub-redes privadas (segurança). O ALB e os 2 NAT Gateways (1 por AZ para alta disponibilidade) ficam nas sub-redes públicas para receber tráfego dos clientes e dar acesso de saída à internet para as EC2.'
  },
  {
    id: 14,
    domain: 'Otimização de Custos',
    multiSelect: false,
    requiredCount: 1,
    question:
      'Um arquiteto de soluções precisa reduzir os custos de armazenamento de dados no Amazon S3 Standard. Todos os dados devem ser mantidos por pelo menos 25 anos, e os dados dos últimos 2 anos devem ser altamente disponíveis e imediatamente recuperáveis. Qual solução atenderá a esses requisitos?',
    options: [
      'Configurar uma política de ciclo de vida S3 para fazer a transição de objetos para o S3 Glacier Deep Archive imediatamente.',
      'Configurar uma política de ciclo de vida S3 para fazer a transição de objetos para o S3 Glacier Deep Archive após 2 anos.',
      'Usar o S3 Intelligent-Tiering e ativar a opção de arquivamento para o S3 Glacier Deep Archive.',
      'Configurar uma política de ciclo de vida S3 para fazer a transição para o S3 One Zone-IA imediatamente e para o S3 Glacier Deep Archive após 2 anos.'
    ],
    correctIndices: [1],
    keyword: 'S3 Lifecycle -> Glacier Deep Archive após 2 anos',
    summary:
      'Manter no S3 Standard por 2 anos garante alta disponibilidade e acesso imediato. Depois de 2 anos, mover via política de ciclo de vida para o S3 Glacier Deep Archive oferece o menor custo de armazenamento para retenção de 25 anos. One Zone-IA não é altamente disponível.'
  },
  {
    id: 15,
    domain: 'Alto Desempenho',
    multiSelect: false,
    requiredCount: 1,
    question:
      'Uma empresa de mídia precisa de pelo menos 10 TB com máximo desempenho de E/S para processamento de vídeo, 300 TB de armazenamento muito durável para conteúdo de mídia e 900 TB para arquivos de mídia que não estão mais em uso. Qual conjunto de serviços recomendar?',
    options: [
      'Amazon EBS para máximo desempenho, Amazon S3 para armazenamento durável de dados e Amazon S3 Glacier para armazenamento de arquivo.',
      'Amazon EBS para máximo desempenho, Amazon EFS para armazenamento durável de dados e Amazon S3 Glacier para armazenamento de arquivo.',
      'Armazenamento de instância Amazon EC2 para máximo desempenho, Amazon EFS para armazenamento durável e Amazon S3 para arquivo.',
      'Armazenamento de instância Amazon EC2 para máximo desempenho, Amazon S3 para armazenamento durável e Amazon S3 Glacier para armazenamento de arquivo.'
    ],
    correctIndices: [0],
    keyword: 'EBS (Alto I/O) + S3 (11 noves) + S3 Glacier (Arquivo)',
    summary:
      'Amazon EBS (ex: io2 Block Express) oferece armazenamento em bloco persistente de altíssimo desempenho; S3 oferece 11 noves de durabilidade para mídia ativa; S3 Glacier é ideal para arquivamento de baixo custo. Instance Store é efêmero.'
  },
  {
    id: 16,
    domain: 'Otimização de Custos',
    multiSelect: false,
    requiredCount: 1,
    question:
      'Uma empresa deseja executar aplicativos em contêineres na AWS. Esses aplicativos são sem estado e podem tolerar interrupções na infraestrutura subjacente. A solução deve minimizar custos e overhead operacional. O que recomendar?',
    options: [
      'Usar Instâncias Spot em um grupo de Auto Scaling do Amazon EC2 para executar os contêineres.',
      'Usar Instâncias Spot em um grupo de nós gerenciados pelo Amazon Elastic Kubernetes Service (Amazon EKS).',
      'Usar Instâncias Sob Demanda em um grupo de Auto Scaling do Amazon EC2 para executar os contêineres.',
      'Usar Instâncias Sob Demanda em um grupo de nós gerenciados pelo Amazon EKS.'
    ],
    correctIndices: [1],
    keyword: 'Contêineres Gerenciados + Menor Custo = EKS Managed Nodes + Spot',
    summary:
      'Contêineres com menor overhead operacional apontam para EKS Managed Node Groups (automatizam provisionamento e ciclo de vida). Como a carga é sem estado e tolera interrupções, usar Instâncias Spot minimiza os custos.'
  },
  {
    id: 17,
    domain: 'Segurança',
    multiSelect: false,
    requiredCount: 1,
    question:
      'Um aplicativo é executado em instâncias do Amazon EC2 em sub-redes privadas e precisa acessar uma tabela do Amazon DynamoDB. Qual é a forma MAIS segura de acessar a tabela enquanto garante que o tráfego não saia da rede AWS?',
    options: [
      'Usar um endpoint VPC para o DynamoDB.',
      'Usar um gateway NAT em uma sub-rede pública.',
      'Usar uma instância NAT em uma sub-rede privada.',
      'Usar o gateway de internet anexado à VPC.'
    ],
    correctIndices: [0],
    keyword: 'VPC Gateway Endpoint para DynamoDB',
    summary:
      'Um VPC Gateway Endpoint para DynamoDB (ou S3) roteia o tráfego diretamente pelo backbone privado da AWS sem passar pela internet pública e sem custos adicionais. NAT e IGW enviam tráfego pela internet.'
  },
  {
    id: 18,
    domain: 'Resiliência',
    multiSelect: false,
    requiredCount: 1,
    question:
      'Uma empresa está preocupada que duas instâncias NAT em uso não suportem mais o tráfego necessário para o aplicativo. Um arquiteto precisa implementar uma solução altamente disponível, tolerante a falhas e automaticamente escalável. O que recomendar?',
    options: [
      'Remover as duas instâncias NAT e substituí-las por dois gateways NAT na mesma Zona de Disponibilidade.',
      'Usar grupos de Auto Scaling com Network Load Balancers para as instâncias NAT em diferentes Zonas de Disponibilidade.',
      'Remover as duas instâncias NAT e substituí-las por dois gateways NAT em diferentes Zonas de Disponibilidade.',
      'Substituir as duas instâncias NAT por Instâncias Spot em diferentes Zonas de Disponibilidade com NLB.'
    ],
    correctIndices: [2],
    keyword: 'NAT Gateways em Múltiplas AZs',
    summary:
      'NAT Gateways são serviços totalmente gerenciados que escalam largura de banda automaticamente. Implantar 1 NAT Gateway em cada Zona de Disponibilidade garante tolerância a falhas e alta disponibilidade sem overhead.'
  },
  {
    id: 19,
    domain: 'Resiliência',
    multiSelect: false,
    requiredCount: 1,
    question:
      'Um aplicativo crítico roda em EC2 atrás de um ALB com Auto Scaling e acessa um Amazon RDS, mas tudo está localizado em uma única Zona de Disponibilidade. Como atualizar o design para usar uma segunda AZ e tornar o aplicativo altamente disponível?',
    options: [
      'Provisionar uma sub-rede em cada AZ. Configurar o Auto Scaling para distribuir EC2 nas duas AZs. Configurar o banco com conexões para cada rede.',
      'Provisionar duas sub-redes que se estendem por ambas as AZs. Distribuir EC2 nas duas AZs e configurar conexões para cada rede.',
      'Provisionar uma sub-rede em cada Zona de Disponibilidade. Configurar o grupo de Auto Scaling para distribuir as instâncias EC2 em ambas as Zonas de Disponibilidade. Configurar a instância de banco de dados para implantação Multi-AZ.',
      'Provisionar uma sub-rede que se estenda por ambas as AZs. Distribuir EC2 nas duas AZs e configurar o banco para Multi-AZ.'
    ],
    correctIndices: [2],
    keyword: '1 Sub-rede por AZ + ASG Multi-AZ + RDS Multi-AZ',
    summary:
      'Regra de ouro da VPC: uma sub-rede pertence SEMPRE a uma única AZ (nunca se estende por duas AZs). Para alta disponibilidade completa: sub-rede em cada AZ + Auto Scaling Multi-AZ + RDS Multi-AZ.'
  },
  {
    id: 20,
    domain: 'Segurança',
    multiSelect: false,
    requiredCount: 1,
    question:
      'Uma empresa armazena documentos confidenciais em um bucket Amazon S3 e distribui o conteúdo globalmente via Amazon CloudFront. O arquiteto deve garantir que os usuários só possam acessar os arquivos através do CloudFront e nunca diretamente pela URL do S3. Qual solução atende?',
    options: [
      'Configurar o Amazon S3 Block Public Access e usar Origin Access Control (OAC) do CloudFront com política no bucket S3.',
      'Habilitar o S3 Static Website Hosting e restringir o acesso por Security Group no bucket S3.',
      'Mover os objetos para o S3 Glacier e gerar URLs pré-assinadas para o CloudFront.',
      'Configurar uma NACL na VPC para bloquear acesso direto ao bucket S3.'
    ],
    correctIndices: [0],
    keyword: 'CloudFront OAC (Origin Access Control) + S3 Block Public Access',
    summary:
      'Origin Access Control (OAC) — sucessor moderno do OAI — combinado com S3 Block Public Access e Bucket Policy garante que apenas a distribuição CloudFront autorizada consiga ler os objetos privados do S3.'
  },
  {
    id: 21,
    domain: 'Segurança',
    multiSelect: false,
    requiredCount: 1,
    question:
      'Uma empresa precisa armazenar credenciais de banco de dados Amazon RDS usadas por uma aplicação em EC2, com rotação automática dessas senhas a cada 30 dias e o menor esforço operacional. Qual serviço utilizar?',
    options: [
      'Armazenar as credenciais no AWS Systems Manager Parameter Store Standard e criar um cron job na EC2 para rotacionar.',
      'Armazenar as credenciais no AWS Secrets Manager e habilitar a rotação automática nativa para o RDS.',
      'Armazenar as credenciais criptografadas em um arquivo no Amazon S3 usando AWS KMS.',
      'Usar variáveis de ambiente na instância EC2 e atualizar via AWS CloudFormation mensalmente.'
    ],
    correctIndices: [1],
    keyword: 'Rotação Automática de Credenciais RDS = AWS Secrets Manager',
    summary:
      'Sempre que o requisito mencionar "rotação automática de credenciais de banco de dados" com "menor esforço operacional", escolha o AWS Secrets Manager, pois ele possui integração nativa para rotacionar senhas do RDS.'
  },
  {
    id: 22,
    domain: 'Segurança',
    multiSelect: false,
    requiredCount: 1,
    question:
      'Uma organização possui dezenas de contas AWS gerenciadas pelo AWS Organizations. A equipe de segurança precisa garantir que NENHUM usuário — nem mesmo o administrador de uma conta membro — consiga desativar o AWS CloudTrail ou excluir logs. Como implementar?',
    options: [
      'Criar uma política IAM em cada conta membro negando a ação cloudtrail:StopLogging.',
      'Configurar uma Service Control Policy (SCP) na raiz ou na OU do AWS Organizations negando explicitamente ações de desativação/exclusão do CloudTrail.',
      'Habilitar o AWS GuardDuty em todas as contas membro.',
      'Configurar uma permissão de limite (Permissions Boundary) no usuário root de cada conta.'
    ],
    correctIndices: [1],
    keyword: 'Bloqueio Global em Contas Membro = Organizations SCP',
    summary:
      'Service Control Policies (SCPs) definem os limites máximos de permissão em todas as contas membro do AWS Organizations, bloqueando até administradores locais e o usuário root das contas membro (não afeta a Management Account).'
  },
  {
    id: 23,
    domain: 'Alto Desempenho',
    multiSelect: false,
    requiredCount: 1,
    question:
      'Um aplicativo de jogos usa Amazon DynamoDB e sofre picos extremos de leitura repetitiva nos mesmos itens, exigindo tempos de resposta em microssegundos sem alterar o código de consulta da aplicação. Qual solução recomendar?',
    options: [
      'Migrar o banco de dados para o Amazon RDS com réplicas de leitura.',
      'Implementar o Amazon DynamoDB Accelerator (DAX) na frente da tabela DynamoDB.',
      'Ativar o DynamoDB Streams com AWS Lambda para cache em S3.',
      'Aumentar o tamanho das instâncias EC2 da camada web.'
    ],
    correctIndices: [1],
    keyword: 'DynamoDB + Microssegundos + Sem Alterar Código = DAX',
    summary:
      'O Amazon DynamoDB Accelerator (DAX) é um cache em memória totalmente gerenciado e compatível com a API do DynamoDB que reduz tempos de leitura de milissegundos para microssegundos sem reescrever a lógica de consulta.'
  },
  {
    id: 24,
    domain: 'Alto Desempenho',
    multiSelect: false,
    requiredCount: 1,
    question:
      'Uma empresa precisa oferecer acesso global de baixíssima latência e endereços IP estáticos (Anycast) para um aplicativo TCP/UDP sensível a latência hospedado em múltiplas Regiões AWS, com failover rápido de tráfego. Qual serviço usar?',
    options: [
      'Amazon CloudFront',
      'AWS Global Accelerator',
      'Amazon Route 53 com roteamento simples',
      'AWS Direct Connect'
    ],
    correctIndices: [1],
    keyword: 'IPs Estáticos Anycast + TCP/UDP Global = Global Accelerator',
    summary:
      'O AWS Global Accelerator fornece 2 IPs estáticos Anycast e roteia tráfego TCP/UDP pelo backbone global da AWS, entregando baixíssima latência e failover instantâneo sem depender de cache/TTL de DNS.'
  },
  {
    id: 25,
    domain: 'Resiliência',
    multiSelect: false,
    requiredCount: 1,
    question:
      'Uma aplicação precisa de um sistema de arquivos compartilhado acessível simultaneamente por centenas de instâncias EC2 Linux em múltiplas Zonas de Disponibilidade, escalando automaticamente de gigabytes para petabytes. Qual serviço escolher?',
    options: [
      'Amazon EBS Multi-Attach',
      'Amazon EFS (Elastic File System)',
      'Amazon S3 montado via bucket policy',
      'Amazon FSx for Windows File Server'
    ],
    correctIndices: [1],
    keyword: 'Compartilhado Linux + Multi-AZ + Elástico = Amazon EFS',
    summary:
      'Amazon EFS é um sistema de arquivos NFS gerenciado, elástico (GB a PB) e acessível simultaneamente por milhares de instâncias Linux em múltiplas AZs. EBS Multi-Attach é limitado a uma única AZ e até 16 instâncias Nitro.'
  },
  {
    id: 26,
    domain: 'Segurança',
    multiSelect: false,
    requiredCount: 1,
    question:
      'Uma empresa precisa proteger seu aplicativo web (executado atrás de um Application Load Balancer) contra ataques comuns de camada 7, como SQL Injection e Cross-Site Scripting (XSS), além de bloquear IPs maliciosos específicos. Qual serviço usar?',
    options: [
      'AWS Shield Standard',
      'AWS WAF (Web Application Firewall) associado ao ALB',
      'Security Groups configurados na porta 443',
      'Amazon Inspector'
    ],
    correctIndices: [1],
    keyword: 'Camada 7 (SQLi, XSS, Bloqueio de IP) = AWS WAF',
    summary:
      'O AWS WAF protege aplicações web (ALB, CloudFront, API Gateway) contra exploits de camada 7 como SQL Injection, XSS e bloqueio por IP ou geolocalização. AWS Shield protege contra ataques DDoS.'
  },
  {
    id: 27,
    domain: 'Otimização de Custos',
    multiSelect: false,
    requiredCount: 1,
    question:
      'Uma empresa executa uma carga de trabalho previsível e contínua 24x7 em instâncias EC2 durante os próximos 3 anos. A empresa quer o máximo desconto possível, mas precisa manter flexibilidade para mudar a família de instâncias, sistema operacional ou Região AWS no futuro. Qual opção escolher?',
    options: [
      'Standard Reserved Instances (3 anos)',
      'Compute Savings Plans (3 anos)',
      'EC2 Instance Savings Plans (3 anos)',
      'Instâncias Spot do EC2'
    ],
    correctIndices: [1],
    keyword: 'Flexibilidade de Família, SO e Região = Compute Savings Plans',
    summary:
      'Compute Savings Plans oferecem até 66% de desconto e total flexibilidade para mudar família de instâncias, tamanho, sistema operacional, tenancy e até Região AWS (cobrindo também Fargate e Lambda).'
  },
  {
    id: 28,
    domain: 'Resiliência',
    multiSelect: false,
    requiredCount: 1,
    question:
      'Uma empresa precisa conectar 15 VPCs diferentes em uma Região AWS e também conectar todas elas ao data center on-premises via VPN Site-to-Site, evitando a complexidade de gerenciar uma malha completa de VPC Peering. Qual solução recomendar?',
    options: [
      'Criar conexões de VPC Peering entre todas as 15 VPCs.',
      'Implantar um AWS Transit Gateway como hub central para conectar as VPCs e a VPN on-premises.',
      'Configurar um NAT Gateway compartilhado entre todas as VPCs.',
      'Usar AWS PrivateLink para interligar todas as VPCs.'
    ],
    correctIndices: [1],
    keyword: 'Múltiplas VPCs + On-Premises (Hub-and-Spoke) = Transit Gateway',
    summary:
      'O AWS Transit Gateway atua como um roteador de nuvem central (arquitetura hub-and-spoke), eliminando a complexidade exponencial de gerenciar dezenas de conexões de VPC Peering e integrando VPN e Direct Connect.'
  },
  {
    id: 29,
    domain: 'Otimização de Custos',
    multiSelect: false,
    requiredCount: 1,
    question:
      'Uma empresa armazena logs no Amazon S3 com padrões de acesso imprevisíveis que mudam frequentemente ao longo dos meses. O arquiteto precisa otimizar automaticamente os custos de armazenamento sem impacto no desempenho e sem esforço operacional para analisar padrões de acesso. Qual classe usar?',
    options: [
      'Amazon S3 Standard-IA',
      'Amazon S3 Intelligent-Tiering',
      'Amazon S3 Glacier Instant Retrieval',
      'Amazon S3 One Zone-IA'
    ],
    correctIndices: [1],
    keyword: 'Padrões de Acesso Imprevisíveis = S3 Intelligent-Tiering',
    summary:
      'Sempre que a questão mencionar "padrões de acesso imprevisíveis ou variáveis" com otimização automática de custos e sem taxas de recuperação, a resposta é Amazon S3 Intelligent-Tiering.'
  },
  {
    id: 30,
    domain: 'Resiliência',
    multiSelect: false,
    requiredCount: 1,
    question:
      'Uma empresa exige que seus dados críticos no Amazon S3 sejam protegidos contra exclusão acidental e contra sobrescrita por um período de conformidade legal de 5 anos, de forma que nem mesmo o usuário root consiga apagar ou alterar os objetos antes do prazo (modelo WORM). Como configurar?',
    options: [
      'Habilitar o S3 Versioning e políticas IAM restritivas.',
      'Habilitar o S3 Object Lock no modo Compliance com período de retenção de 5 anos.',
      'Habilitar o S3 Object Lock no modo Governance com período de retenção de 5 anos.',
      'Habilitar a replicação entre Regiões (CRR) sem versionamento.'
    ],
    correctIndices: [1],
    keyword: 'WORM Estrito (Nem Root Apaga) = S3 Object Lock Compliance',
    summary:
      'O S3 Object Lock no modo Compliance garante WORM (Write-Once-Read-Many) absoluto: nenhum usuário, nem mesmo o root da conta AWS, consegue excluir ou sobrescrever o objeto durante o período de retenção. (No modo Governance, usuários com permissão especial podem burlar a trava).'
  }
];

// ============================================================================
// UTILITÁRIOS
// ============================================================================
const formatTime = (totalSeconds: number): string => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const formatDate = (isoString: string): string => {
  try {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch {
    return isoString || '-';
  }
};

const calculateAwsScore = (correct: number, total: number): number => {
  if (!total || total <= 0) return 100;
  return Math.round(100 + (correct / total) * 900);
};

const arraysEqual = (a: number[], b: number[]): boolean => {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort((x, y) => x - y);
  const sortedB = [...b].sort((x, y) => x - y);
  return sortedA.every((val, idx) => val === sortedB[idx]);
};

const shuffleArray = <T,>(arr: T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E'];

// ============================================================================
// COMPONENTE DE REVISÃO DE GABARITO (REUTILIZÁVEL NO RESULTADO E HISTÓRICO)
// ============================================================================
interface DetailedReviewSectionProps {
  answers: AnswerRecord[];
  onBack?: () => void;
  headerInfo?: ExamAttempt;
}

function DetailedReviewSection({
  answers,
  onBack,
  headerInfo
}: DetailedReviewSectionProps) {
  const [filterMode, setFilterMode] = useState<'all' | 'wrong' | 'correct'>('all');

  const enrichedAnswers = useMemo<EnrichedAnswer[]>(() => {
    return (answers || [])
      .map((ans, index) => {
        const q = QUESTIONS_DB.find((item) => item.id === ans.questionId);
        if (!q) return null;
        return {
          ...ans,
          order: index + 1,
          questionData: q
        };
      })
      .filter((item): item is EnrichedAnswer => item !== null);
  }, [answers]);

  const filtered = useMemo(() => {
    if (filterMode === 'wrong') return enrichedAnswers.filter((a) => !a.isCorrect);
    if (filterMode === 'correct') return enrichedAnswers.filter((a) => a.isCorrect);
    return enrichedAnswers;
  }, [enrichedAnswers, filterMode]);

  const totalCorrect = enrichedAnswers.filter((a) => a.isCorrect).length;
  const totalWrong = enrichedAnswers.length - totalCorrect;

  return (
    <div className="space-y-6">
      {headerInfo && (
        <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="p-2.5 rounded-xl bg-slate-700/70 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                title="Voltar"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-white">{headerInfo.candidateName}</h3>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    headerInfo.passed
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}
                >
                  {headerInfo.passed ? 'APROVADO' : 'REPROVADO'}
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-0.5">
                {formatDate(headerInfo.createdAt)} • Pontuação AWS:{' '}
                <span className="text-orange-400 font-semibold">{headerInfo.awsScore}/1000</span> •{' '}
                {headerInfo.correctCount}/{headerInfo.totalQuestions} acertos • Tempo:{' '}
                {formatTime(headerInfo.timeSeconds)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filtros do Gabarito */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-orange-400" />
          Gabarito Detalhado ({filtered.length})
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              filterMode === 'all'
                ? 'bg-orange-500 text-slate-950 font-bold shadow-lg shadow-orange-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            Todas ({enrichedAnswers.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('wrong')}
            className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              filterMode === 'wrong'
                ? 'bg-red-500 text-white font-bold shadow-lg shadow-red-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            Apenas Erros ({totalWrong})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('correct')}
            className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              filterMode === 'correct'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            Apenas Acertos ({totalCorrect})
          </button>
        </div>
      </div>

      {/* Lista de Questões Revisadas */}
      {filtered.length === 0 ? (
        <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-8 text-center">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
          <p className="text-slate-300 font-medium">
            Nenhuma questão encontrada para este filtro.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => {
            const q = item.questionData;
            const domainMeta = getDomainMeta(q.domain);
            return (
              <div
                key={`${q.id}-${item.order}`}
                className={`bg-slate-800/75 border rounded-2xl p-5 transition-all ${
                  item.isCorrect ? 'border-emerald-500/30' : 'border-red-500/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-700">
                      Questão #{item.order} (Q{q.id})
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border ${domainMeta.bg} ${domainMeta.color} ${domainMeta.border}`}
                    >
                      <DomainIcon domain={q.domain} className="w-3.5 h-3.5" />
                      {q.domain}
                    </span>
                    {q.multiSelect && (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-purple-500/15 text-purple-300 border border-purple-500/30">
                        Múltipla Escolha ({q.requiredCount})
                      </span>
                    )}
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${
                      item.isCorrect
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {item.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Acertou
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" /> Errou
                      </>
                    )}
                  </span>
                </div>

                <p className="text-slate-100 font-medium leading-relaxed mb-4">{q.question}</p>

                <div className="space-y-2 mb-4">
                  {q.options.map((optText, optIdx) => {
                    const isCorrectOpt = q.correctIndices.includes(optIdx);
                    const wasSelected = item.selectedIndices.includes(optIdx);

                    let styleClasses =
                      'bg-slate-900/50 border-slate-700/70 text-slate-400';
                    if (isCorrectOpt) {
                      styleClasses =
                        'bg-emerald-500/15 border-emerald-500/50 text-emerald-100';
                    } else if (wasSelected && !isCorrectOpt) {
                      styleClasses = 'bg-red-500/15 border-red-500/50 text-red-100';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border text-sm flex items-start gap-3 ${styleClasses}`}
                      >
                        <span
                          className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                            isCorrectOpt
                              ? 'bg-emerald-500 text-slate-950'
                              : wasSelected
                              ? 'bg-red-500 text-white'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {OPTION_LETTERS[optIdx]}
                        </span>
                        <div className="flex-1">
                          <span>{optText}</span>
                          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            {isCorrectOpt && (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
                                <Check className="w-3.5 h-3.5" /> Gabarito Correto
                              </span>
                            )}
                            {wasSelected && (
                              <span
                                className={`inline-flex items-center gap-1 text-xs font-semibold ${
                                  isCorrectOpt ? 'text-emerald-300' : 'text-red-400'
                                }`}
                              >
                                {isCorrectOpt ? '• Você marcou esta' : '✗ Você marcou esta'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Resumo de Fixação */}
                <div className="bg-slate-900/90 border border-orange-500/30 rounded-xl p-4">
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Resumo para Fixação na Prova
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-orange-500/15 text-orange-300 border border-orange-500/30 flex items-center gap-1">
                      <KeyRound className="w-3 h-3" /> {q.keyword}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{q.summary}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL (PAGE)
// ============================================================================
export default function HomePage() {
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Dados Persistidos (localStorage)
  const [attempts, setAttempts] = useState<ExamAttempt[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Navegação Principal
  const [activeTab, setActiveTab] = useState<'simulado' | 'ranking' | 'historico'>('simulado');

  // Estado da Configuração do Simulado
  const [candidateName, setCandidateName] = useState('');
  const [nameError, setNameError] = useState('');
  const [questionCount, setQuestionCount] = useState(10);
  const [selectedDomain, setSelectedDomain] = useState<DomainId>('Todos');

  // Estado do Simulado em Andamento
  const [quizPhase, setQuizPhase] = useState<'setup' | 'playing' | 'result'>('setup');
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [userAnswers, setUserAnswers] = useState<AnswerRecord[]>([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);
  const [latestResult, setLatestResult] = useState<ExamAttempt | null>(null);

  // Estado do Histórico e Revisão
  const [historySearch, setHistorySearch] = useState('');
  const [historyStatusFilter, setHistoryStatusFilter] = useState<'all' | 'passed' | 'failed'>('all');
  const [inspectingAttempt, setInspectingAttempt] = useState<ExamAttempt | null>(null);

  // --------------------------------------------------------------------------
  // 1. CARREGAR HISTÓRICO E ÚLTIMO NOME DO LOCALSTORAGE
  // --------------------------------------------------------------------------
  useEffect(() => {
    try {
      const savedAttempts = window.localStorage.getItem(STORAGE_KEY);
      if (savedAttempts) {
        const parsed = JSON.parse(savedAttempts) as ExamAttempt[];
        if (Array.isArray(parsed)) {
          setAttempts(parsed);
        }
      }
      const savedName = window.localStorage.getItem(NAME_STORAGE_KEY);
      if (savedName) {
        setCandidateName(savedName);
      }
    } catch (error) {
      console.error('Erro ao ler dados locais:', error);
    } finally {
      setLoadingHistory(false);
    }
  }, []);

  // --------------------------------------------------------------------------
  // 2. CRONÔMETRO DO SIMULADO
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (quizPhase !== 'playing') return;
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [quizPhase]);

  // --------------------------------------------------------------------------
  // CÁLCULO DE QUESTÕES DISPONÍVEIS POR DOMÍNIO
  // --------------------------------------------------------------------------
  const availableQuestionsForDomain = useMemo(() => {
    if (selectedDomain === 'Todos') return QUESTIONS_DB;
    return QUESTIONS_DB.filter((q) => q.domain === selectedDomain);
  }, [selectedDomain]);

  // --------------------------------------------------------------------------
  // INICIAR SIMULADO (COM SCROLL/FOCO NO CAMPO DE NOME SE VAZIO)
  // --------------------------------------------------------------------------
  const handleStartQuiz = () => {
    const trimmed = candidateName.trim();
    if (!trimmed) {
      setNameError('Por favor, informe seu nome acima para registrar no Ranking.');
      nameInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      nameInputRef.current?.focus();
      return;
    }

    setNameError('');
    try {
      window.localStorage.setItem(NAME_STORAGE_KEY, trimmed);
    } catch {
      // Ignora erro caso localStorage esteja indisponível
    }

    const pool = shuffleArray(availableQuestionsForDomain);
    const actualCount = Math.min(questionCount, pool.length);
    const chosen = pool.slice(0, actualCount);

    setQuizQuestions(chosen);
    setCurrentIdx(0);
    setSelectedOptions([]);
    setIsConfirmed(false);
    setUserAnswers([]);
    setElapsedSeconds(0);
    setLatestResult(null);
    setSaveSuccess(false);
    setQuizPhase('playing');
    scrollToTop();
  };

  // --------------------------------------------------------------------------
  // SELECIONAR ALTERNATIVA
  // --------------------------------------------------------------------------
  const currentQuestion = quizQuestions[currentIdx] || null;

  const handleToggleOption = (optIdx: number) => {
    if (isConfirmed || !currentQuestion) return;

    if (!currentQuestion.multiSelect) {
      setSelectedOptions([optIdx]);
    } else {
      setSelectedOptions((prev) => {
        if (prev.includes(optIdx)) {
          return prev.filter((i) => i !== optIdx);
        }
        if (prev.length >= currentQuestion.requiredCount) {
          return [...prev.slice(1), optIdx];
        }
        return [...prev, optIdx];
      });
    }
  };

  // --------------------------------------------------------------------------
  // CONFIRMAR RESPOSTA
  // --------------------------------------------------------------------------
  const handleConfirmAnswer = () => {
    if (!currentQuestion || isConfirmed) return;
    if (selectedOptions.length !== currentQuestion.requiredCount) return;

    const isCorrect = arraysEqual(selectedOptions, currentQuestion.correctIndices);
    const answerRecord: AnswerRecord = {
      questionId: currentQuestion.id,
      domain: currentQuestion.domain,
      selectedIndices: [...selectedOptions].sort((a, b) => a - b),
      correctIndices: [...currentQuestion.correctIndices].sort((a, b) => a - b),
      isCorrect
    };

    setUserAnswers((prev) => [...prev, answerRecord]);
    setIsConfirmed(true);
  };

  // --------------------------------------------------------------------------
  // PRÓXIMA QUESTÃO OU FINALIZAR
  // --------------------------------------------------------------------------
  const handleNextOrFinish = useCallback(() => {
    if (currentIdx + 1 < quizQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOptions([]);
      setIsConfirmed(false);
      scrollToTop();
      return;
    }

    const total = quizQuestions.length;
    const correctCount = userAnswers.filter((a) => a.isCorrect).length;
    const awsScore = calculateAwsScore(correctCount, total);
    const passed = awsScore >= 720;
    const createdAt = new Date().toISOString();

    const resultObj: ExamAttempt = {
      id: `attempt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      candidateName: candidateName.trim(),
      awsScore,
      correctCount,
      totalQuestions: total,
      passed,
      timeSeconds: elapsedSeconds,
      domainFilter: selectedDomain,
      createdAt,
      answers: userAnswers
    };

    setLatestResult(resultObj);
    setQuizPhase('result');

    setAttempts((prev) => {
      const updated = [resultObj, ...prev];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Erro ao salvar no localStorage:', err);
      }
      return updated;
    });
    setSaveSuccess(true);
    scrollToTop();
  }, [
    currentIdx,
    quizQuestions.length,
    userAnswers,
    candidateName,
    elapsedSeconds,
    selectedDomain
  ]);

  // --------------------------------------------------------------------------
  // DADOS DERIVADOS: RANKING E HISTÓRICO
  // --------------------------------------------------------------------------
  const rankedAttempts = useMemo(() => {
    return [...attempts].sort((a, b) => {
      if (b.awsScore !== a.awsScore) return b.awsScore - a.awsScore;
      if (a.timeSeconds !== b.timeSeconds) return a.timeSeconds - b.timeSeconds;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [attempts]);

  const filteredHistory = useMemo(() => {
    const queryLower = historySearch.trim().toLowerCase();
    return [...attempts]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .filter((att) => {
        if (historyStatusFilter === 'passed' && !att.passed) return false;
        if (historyStatusFilter === 'failed' && att.passed) return false;
        if (queryLower && !att.candidateName.toLowerCase().includes(queryLower)) return false;
        return true;
      });
  }, [attempts, historySearch, historyStatusFilter]);

  const domainBreakdown = useMemo(() => {
    if (!latestResult) return [];
    const domainList: QuestionDomain[] = [
      'Segurança',
      'Resiliência',
      'Alto Desempenho',
      'Otimização de Custos'
    ];
    return domainList.map((dom) => {
      const items = latestResult.answers.filter((a) => a.domain === dom);
      const correct = items.filter((a) => a.isCorrect).length;
      const total = items.length;
      const pct = total > 0 ? Math.round((correct / total) * 100) : null;
      return {
        domain: dom,
        meta: getDomainMeta(dom),
        correct,
        total,
        pct
      };
    });
  }, [latestResult]);

  // --------------------------------------------------------------------------
  // NAVEGAÇÃO
  // --------------------------------------------------------------------------
  const handleSwitchTab = (tab: 'simulado' | 'ranking' | 'historico') => {
    if (quizPhase === 'playing') {
      setShowExitModal(true);
      return;
    }
    setInspectingAttempt(null);
    setActiveTab(tab);
    scrollToTop();
  };

  const confirmExitQuiz = () => {
    setShowExitModal(false);
    setQuizPhase('setup');
    setSelectedOptions([]);
    setIsConfirmed(false);
    scrollToTop();
  };

  const openAttemptInspection = (att: ExamAttempt) => {
    setInspectingAttempt(att);
    setActiveTab('historico');
    scrollToTop();
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col font-sans selection:bg-orange-500/30 selection:text-orange-200">
      {/* ================================================================== */}
      {/* CABEÇALHO GLOBAL                                                   */}
      {/* ================================================================== */}
      <header className="sticky top-0 z-30 bg-[#0B1120]/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF9900] to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/20 shrink-0">
              <Cloud className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-white">
                  Simulado <span className="text-[#FF9900]">AWS SAA-C03</span>
                </h1>
                <span className="hidden md:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-orange-500/15 text-orange-400 border border-orange-500/30">
                  Solutions Architect
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Banco Oficial de 30 Questões • Nota de Corte: 720/1000
              </p>
            </div>
          </div>

          {/* Navegação por Abas */}
          <nav className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 w-full sm:w-auto justify-center">
            <button
              type="button"
              onClick={() => handleSwitchTab('simulado')}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'simulado'
                  ? 'bg-[#FF9900] text-slate-950 shadow-md shadow-orange-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Play className="w-4 h-4" />
              <span>Simulado</span>
            </button>
            <button
              type="button"
              onClick={() => handleSwitchTab('ranking')}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'ranking'
                  ? 'bg-[#FF9900] text-slate-950 shadow-md shadow-orange-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Ranking</span>
              {attempts.length > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    activeTab === 'ranking'
                      ? 'bg-slate-950/20 text-slate-950'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {attempts.length}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => handleSwitchTab('historico')}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'historico'
                  ? 'bg-[#FF9900] text-slate-950 shadow-md shadow-orange-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Gabaritos</span>
            </button>
          </nav>
        </div>
      </header>

      {/* ================================================================== */}
      {/* CONTEÚDO PRINCIPAL                                                 */}
      {/* ================================================================== */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* ================================================================ */}
        {/* ABA 1: SIMULADO                                                  */}
        {/* ================================================================ */}
        {activeTab === 'simulado' && (
          <>
            {/* FASE 1: TELA INICIAL E CONFIGURAÇÃO */}
            {quizPhase === 'setup' && (
              <div className="space-y-6">
                {/* Banner Hero */}
                <div className="relative overflow-hidden bg-gradient-to-br from-slate-800/90 via-slate-900 to-[#0B1120] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl">
                  <div className="absolute -right-12 -top-12 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="relative z-10 max-w-2xl">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-orange-500/15 text-[#FF9900] border border-orange-500/30 mb-3">
                      <Award className="w-3.5 h-3.5" /> Preparatório Certificação Oficial
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                      AWS Certified Solutions Architect – Associate{' '}
                      <span className="text-[#FF9900]">(SAA-C03)</span>
                    </h2>
                    <p className="text-slate-300 text-sm sm:text-base mt-2.5 leading-relaxed">
                      Treine com questões reais no padrão do exame, receba correção imediata com
                      resumo técnico para fixação e descubra sua nota na escala oficial da AWS (100
                      a 1000 pontos).
                    </p>
                  </div>
                </div>

                {/* Formulário de Configuração */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-slate-800/70 border border-slate-700/80 rounded-2xl p-6 space-y-6">
                    {/* Nome do Candidato */}
                    <div>
                      <label
                        htmlFor="candidateName"
                        className="text-sm font-bold text-slate-200 mb-2 flex items-center gap-2"
                      >
                        <User className="w-4 h-4 text-[#FF9900]" />
                        Seu Nome (para o Ranking e Histórico) <span className="text-red-400">*</span>
                      </label>
                      <input
                        ref={nameInputRef}
                        id="candidateName"
                        type="text"
                        value={candidateName}
                        onChange={(e) => {
                          setCandidateName(e.target.value);
                          if (nameError) setNameError('');
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleStartQuiz();
                        }}
                        placeholder="Ex: Maria Silva, João Pedro..."
                        maxLength={45}
                        className={`w-full px-4 py-3.5 rounded-xl bg-slate-900 border text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                          nameError
                            ? 'border-red-500 focus:ring-red-500/40'
                            : 'border-slate-700 focus:border-[#FF9900] focus:ring-orange-500/30'
                        }`}
                      />
                      {nameError && (
                        <p className="text-xs text-red-400 mt-2 flex items-center gap-1.5 font-medium">
                          <AlertCircle className="w-4 h-4 shrink-0" /> {nameError}
                        </p>
                      )}
                    </div>

                    {/* Tamanho do Simulado */}
                    <div>
                      <label className="text-sm font-bold text-slate-200 mb-2.5 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-[#FF9900]" />
                        Tamanho do Simulado
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { count: 10, label: 'Rápido', desc: '10 questões' },
                          { count: 20, label: 'Intermediário', desc: '20 questões' },
                          { count: 30, label: 'Completo', desc: '30 questões' }
                        ].map((opt) => {
                          const isSelected = questionCount === opt.count;
                          return (
                            <button
                              key={opt.count}
                              type="button"
                              onClick={() => setQuestionCount(opt.count)}
                              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-orange-500/15 border-[#FF9900] shadow-lg shadow-orange-500/10'
                                  : 'bg-slate-900/70 border-slate-700 hover:border-slate-500'
                              }`}
                            >
                              <div
                                className={`text-lg font-extrabold ${
                                  isSelected ? 'text-[#FF9900]' : 'text-white'
                                }`}
                              >
                                {opt.count}
                              </div>
                              <div className="text-xs font-bold text-slate-200">{opt.label}</div>
                              <div className="text-[11px] text-slate-400">{opt.desc}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Filtro por Domínio */}
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
                          <Filter className="w-4 h-4 text-[#FF9900]" />
                          Domínio SAA-C03 (Opcional)
                        </label>
                        <span className="text-xs text-slate-400">
                          {availableQuestionsForDomain.length} disponíveis
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {DOMAINS.map((dom) => {
                          const isSelected = selectedDomain === dom.id;
                          const countInDom =
                            dom.id === 'Todos'
                              ? QUESTIONS_DB.length
                              : QUESTIONS_DB.filter((q) => q.domain === dom.id).length;
                          return (
                            <button
                              key={dom.id}
                              type="button"
                              onClick={() => setSelectedDomain(dom.id)}
                              className={`p-3 rounded-xl border flex items-center justify-between gap-2 transition-all text-left cursor-pointer ${
                                isSelected
                                  ? 'bg-orange-500/15 border-[#FF9900]'
                                  : 'bg-slate-900/70 border-slate-700 hover:border-slate-500'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span
                                  className={`p-1.5 rounded-lg shrink-0 ${dom.bg} ${dom.color}`}
                                >
                                  <DomainIcon domain={dom.id} className="w-4 h-4" />
                                </span>
                                <div className="truncate">
                                  <div className="text-xs sm:text-sm font-semibold text-white truncate">
                                    {dom.label}
                                  </div>
                                  <div className="text-[11px] text-slate-400">
                                    Peso na prova: {dom.weight}
                                  </div>
                                </div>
                              </div>
                              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 shrink-0">
                                {countInDom}q
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      {availableQuestionsForDomain.length < questionCount && (
                        <p className="text-xs text-amber-400 mt-2.5 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          Este domínio possui {availableQuestionsForDomain.length} questões no
                          banco; o simulado será iniciado com todas elas.
                        </p>
                      )}
                    </div>

                    {/* Alerta visível próximo ao botão caso falte nome */}
                    {nameError && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/40 text-xs text-red-300 flex items-center gap-2 font-medium">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                        <span>{nameError}</span>
                      </div>
                    )}

                    {/* Botão Iniciar */}
                    <button
                      type="button"
                      onClick={handleStartQuiz}
                      className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#FF9900] to-amber-500 hover:from-amber-400 hover:to-[#FF9900] text-slate-950 font-extrabold text-base shadow-xl shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Play className="w-5 h-5 fill-slate-950" />
                      Iniciar Simulado ({Math.min(questionCount, availableQuestionsForDomain.length)}{' '}
                      Questões)
                    </button>
                  </div>

                  {/* Card Lateral de Regras da Prova */}
                  <div className="bg-slate-800/50 border border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between space-y-5">
                    <div className="space-y-4">
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#FF9900]" />
                        Regras do Exame Oficial
                      </h3>
                      <ul className="space-y-3 text-sm text-slate-300">
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-white">Escala AWS:</strong> 100 a 1000 pontos.
                          </span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-white">Nota de Corte:</strong> 720 pontos para
                            aprovação.
                          </span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-white">Feedback Imediato:</strong> Veja na hora
                            se acertou e o resumo para fixar.
                          </span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-white">Ranking & Histórico:</strong> Suas
                            tentativas e gabaritos ficam salvos para revisão.
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/70">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Dica de Estudo
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Fique atento às <strong className="text-[#FF9900]">palavras-chave</strong>{' '}
                        como &ldquo;menor overhead operacional&rdquo;, &ldquo;altamente
                        disponível&rdquo; e &ldquo;mais econômico&rdquo; — elas definem o serviço
                        correto na prova SAA-C03.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* FASE 2: SIMULADO EM ANDAMENTO */}
            {quizPhase === 'playing' && currentQuestion && (
              <div className="space-y-5">
                {/* Barra Superior de Progresso e Cronômetro */}
                <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-sm font-extrabold text-white">
                        Questão {currentIdx + 1}{' '}
                        <span className="text-slate-400 font-medium">
                          de {quizQuestions.length}
                        </span>
                      </span>
                      {(() => {
                        const meta = getDomainMeta(currentQuestion.domain);
                        return (
                          <span
                            className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg border ${meta.bg} ${meta.color} ${meta.border}`}
                          >
                            <DomainIcon domain={currentQuestion.domain} className="w-3.5 h-3.5" />
                            {currentQuestion.domain}
                          </span>
                        );
                      })()}
                      {currentQuestion.multiSelect && (
                        <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40">
                          Escolha {currentQuestion.requiredCount} alternativas
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-sm font-mono font-bold text-[#FF9900]">
                        <Clock className="w-4 h-4" />
                        {formatTime(elapsedSeconds)}
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowExitModal(true)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                      >
                        Sair
                      </button>
                    </div>
                  </div>

                  {/* Barra de progresso */}
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FF9900] to-amber-400 transition-all duration-300"
                      style={{
                        width: `${((currentIdx + (isConfirmed ? 1 : 0)) / quizQuestions.length) * 100}%`
                      }}
                    />
                  </div>
                </div>

                {/* Cartão da Questão */}
                <div className="bg-slate-800/75 border border-slate-700/80 rounded-2xl p-5 sm:p-7 shadow-xl">
                  <p className="text-base sm:text-lg font-semibold text-white leading-relaxed mb-6">
                    {currentQuestion.question}
                  </p>

                  {/* Alternativas */}
                  <div className="space-y-3">
                    {currentQuestion.options.map((optText, optIdx) => {
                      const isSelected = selectedOptions.includes(optIdx);
                      const isCorrectOpt = currentQuestion.correctIndices.includes(optIdx);

                      let cardClass =
                        'bg-slate-900/70 border-slate-700 hover:border-slate-500 text-slate-200';
                      let badgeClass = 'bg-slate-800 text-slate-300 border-slate-600';
                      let statusIcon: React.ReactNode = null;

                      if (!isConfirmed) {
                        if (isSelected) {
                          cardClass =
                            'bg-orange-500/15 border-[#FF9900] text-white shadow-md shadow-orange-500/10';
                          badgeClass = 'bg-[#FF9900] text-slate-950 border-[#FF9900]';
                        }
                      } else {
                        if (isCorrectOpt) {
                          cardClass =
                            'bg-emerald-500/15 border-emerald-500 text-emerald-50 shadow-md shadow-emerald-500/10';
                          badgeClass = 'bg-emerald-500 text-slate-950 border-emerald-400';
                          statusIcon = (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                          );
                        } else if (isSelected && !isCorrectOpt) {
                          cardClass =
                            'bg-red-500/15 border-red-500 text-red-50 shadow-md shadow-red-500/10';
                          badgeClass = 'bg-red-500 text-white border-red-400';
                          statusIcon = (
                            <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                          );
                        } else {
                          cardClass =
                            'bg-slate-900/40 border-slate-800 text-slate-500 opacity-75';
                          badgeClass = 'bg-slate-800/70 text-slate-500 border-slate-700';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          disabled={isConfirmed}
                          onClick={() => handleToggleOption(optIdx)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3.5 ${cardClass} ${
                            isConfirmed ? 'cursor-default' : 'cursor-pointer'
                          }`}
                        >
                          <span
                            className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5 transition-colors ${badgeClass}`}
                          >
                            {OPTION_LETTERS[optIdx]}
                          </span>
                          <span className="flex-1 text-sm sm:text-base leading-relaxed">
                            {optText}
                          </span>
                          {statusIcon}
                        </button>
                      );
                    })}
                  </div>

                  {/* Resumo para Fixação (aparece após confirmar) */}
                  {isConfirmed && (
                    <div
                      className={`mt-6 rounded-2xl border p-5 transition-all ${
                        arraysEqual(selectedOptions, currentQuestion.correctIndices)
                          ? 'bg-emerald-500/10 border-emerald-500/40'
                          : 'bg-red-500/10 border-red-500/40'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          {arraysEqual(selectedOptions, currentQuestion.correctIndices) ? (
                            <>
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                              <span className="font-extrabold text-emerald-400">
                                Resposta Correta!
                              </span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-5 h-5 text-red-400" />
                              <span className="font-extrabold text-red-400">
                                Resposta Incorreta — Veja o porquê:
                              </span>
                            </>
                          )}
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-orange-500/20 text-[#FF9900] border border-orange-500/40">
                          <KeyRound className="w-3.5 h-3.5" />
                          Palavra-chave: {currentQuestion.keyword}
                        </span>
                      </div>

                      <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-700/70">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#FF9900]" />
                          Resumo para Fixação na Prova
                        </div>
                        <p className="text-sm text-slate-200 leading-relaxed">
                          {currentQuestion.summary}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Botões de Ação */}
                  <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-slate-700/70">
                    <div className="text-xs text-slate-400">
                      {!isConfirmed ? (
                        currentQuestion.multiSelect ? (
                          <span>
                            Selecionadas:{' '}
                            <strong className="text-white">
                              {selectedOptions.length}/{currentQuestion.requiredCount}
                            </strong>
                          </span>
                        ) : (
                          <span>Selecione 1 alternativa para confirmar</span>
                        )
                      ) : (
                        <span>
                          Acertos até agora:{' '}
                          <strong className="text-emerald-400">
                            {userAnswers.filter((a) => a.isCorrect).length}
                          </strong>{' '}
                          de {userAnswers.length}
                        </span>
                      )}
                    </div>

                    {!isConfirmed ? (
                      <button
                        type="button"
                        onClick={handleConfirmAnswer}
                        disabled={selectedOptions.length !== currentQuestion.requiredCount}
                        className={`px-6 py-3 rounded-xl font-extrabold text-sm transition-all flex items-center gap-2 ${
                          selectedOptions.length === currentQuestion.requiredCount
                            ? 'bg-[#FF9900] hover:bg-amber-400 text-slate-950 shadow-lg shadow-orange-500/20 cursor-pointer'
                            : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <Check className="w-4 h-4" />
                        Confirmar Resposta
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleNextOrFinish}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF9900] to-amber-500 hover:from-amber-400 hover:to-[#FF9900] text-slate-950 font-extrabold text-sm shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2 cursor-pointer"
                      >
                        {currentIdx + 1 < quizQuestions.length ? (
                          <>
                            Próxima Questão <ChevronRight className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            Finalizar Simulado <Award className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* FASE 3: RESULTADO FINAL (ESCALA AWS 100-1000) */}
            {quizPhase === 'result' && latestResult && (
              <div className="space-y-6">
                {/* Card Principal de Resultado */}
                <div
                  className={`relative overflow-hidden rounded-3xl border-2 p-6 sm:p-8 shadow-2xl ${
                    latestResult.passed
                      ? 'bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-900 border-emerald-500/50'
                      : 'bg-gradient-to-br from-red-950/70 via-slate-900 to-slate-900 border-red-500/50'
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                      <div className="inline-flex items-center gap-2 mb-3">
                        <span
                          className={`px-4 py-1.5 rounded-full text-sm font-extrabold tracking-wider uppercase flex items-center gap-2 ${
                            latestResult.passed
                              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30'
                              : 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                          }`}
                        >
                          {latestResult.passed ? (
                            <>
                              <CheckCircle2 className="w-4 h-4" /> APROVADO NA AWS SAA-C03
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4" /> REPROVADO (CORTE: 720)
                            </>
                          )}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                        {latestResult.passed
                          ? `Parabéns, ${latestResult.candidateName}!`
                          : `Continue treinando, ${latestResult.candidateName}!`}
                      </h2>
                      <p className="text-slate-300 text-sm mt-1.5">
                        {latestResult.passed
                          ? 'Você atingiu a pontuação mínima exigida no exame oficial da AWS.'
                          : 'Revise os erros no gabarito abaixo usando os resumos de fixação e tente novamente.'}
                      </p>
                      <div className="mt-3 flex items-center justify-center md:justify-start gap-2 text-xs">
                        {saveSuccess && (
                          <span className="text-emerald-400 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Resultado salvo no Ranking e
                            Histórico!
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Placar AWS 100 - 1000 */}
                    <div className="bg-slate-950/80 border border-slate-700/80 rounded-2xl p-6 text-center min-w-[200px] shrink-0">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Pontuação AWS
                      </div>
                      <div
                        className={`text-5xl font-black mt-1 ${
                          latestResult.passed ? 'text-emerald-400' : 'text-red-400'
                        }`}
                      >
                        {latestResult.awsScore}
                      </div>
                      <div className="text-xs text-slate-400 font-semibold mt-1">
                        de 1000 pontos (Corte: 720)
                      </div>
                    </div>
                  </div>

                  {/* Métricas Rápidas */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800">
                    <div className="bg-slate-900/70 rounded-xl p-3.5 border border-slate-800">
                      <div className="text-xs text-slate-400">Taxa de Acerto</div>
                      <div className="text-xl font-extrabold text-white mt-0.5">
                        {Math.round(
                          (latestResult.correctCount / latestResult.totalQuestions) * 100
                        )}
                        %
                      </div>
                    </div>
                    <div className="bg-slate-900/70 rounded-xl p-3.5 border border-slate-800">
                      <div className="text-xs text-slate-400">Acertos</div>
                      <div className="text-xl font-extrabold text-emerald-400 mt-0.5">
                        {latestResult.correctCount} / {latestResult.totalQuestions}
                      </div>
                    </div>
                    <div className="bg-slate-900/70 rounded-xl p-3.5 border border-slate-800">
                      <div className="text-xs text-slate-400">Erros</div>
                      <div className="text-xl font-extrabold text-red-400 mt-0.5">
                        {latestResult.totalQuestions - latestResult.correctCount}
                      </div>
                    </div>
                    <div className="bg-slate-900/70 rounded-xl p-3.5 border border-slate-800">
                      <div className="text-xs text-slate-400">Tempo Total</div>
                      <div className="text-xl font-extrabold text-[#FF9900] mt-0.5 font-mono">
                        {formatTime(latestResult.timeSeconds)}
                      </div>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setQuizPhase('setup');
                        scrollToTop();
                      }}
                      className="px-5 py-3 rounded-xl bg-[#FF9900] hover:bg-amber-400 text-slate-950 font-extrabold text-sm transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Fazer Novo Simulado
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSwitchTab('ranking')}
                      className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Trophy className="w-4 h-4 text-[#FF9900]" />
                      Ver Ranking Geral
                    </button>
                  </div>
                </div>

                {/* Desempenho por Domínio */}
                <div className="bg-slate-800/75 border border-slate-700/80 rounded-2xl p-6">
                  <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#FF9900]" />
                    Desempenho por Domínio SAA-C03
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {domainBreakdown.map((item) => (
                      <div
                        key={item.domain}
                        className="bg-slate-900/70 border border-slate-700/70 rounded-xl p-4"
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`p-1.5 rounded-lg ${item.meta.bg} ${item.meta.color}`}>
                              <DomainIcon domain={item.domain} className="w-4 h-4" />
                            </span>
                            <div>
                              <div className="text-sm font-bold text-white">{item.meta.label}</div>
                              <div className="text-[11px] text-slate-400">
                                Peso oficial: {item.meta.weight}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            {item.total > 0 ? (
                              <>
                                <div className="text-sm font-extrabold text-white">{item.pct}%</div>
                                <div className="text-[11px] text-slate-400">
                                  {item.correct}/{item.total} acertos
                                </div>
                              </>
                            ) : (
                              <span className="text-xs text-slate-500">Não incluído</span>
                            )}
                          </div>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-500 ${
                              item.meta.barColor || 'bg-orange-500'
                            }`}
                            style={{ width: `${item.pct ?? 0}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gabarito Detalhado da Tentativa */}
                <DetailedReviewSection answers={latestResult.answers} />
              </div>
            )}
          </>
        )}

        {/* ================================================================ */}
        {/* ABA 2: RANKING (LEADERBOARD)                                     */}
        {/* ================================================================ */}
        {activeTab === 'ranking' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
                  <Trophy className="w-7 h-7 text-[#FF9900]" />
                  Ranking dos Candidatos
                </h2>
                <p className="text-sm text-slate-400 mt-0.5">
                  Ordenado por maior pontuação AWS (desempate por menor tempo).
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('simulado');
                  setQuizPhase('setup');
                  scrollToTop();
                }}
                className="px-4 py-2.5 rounded-xl bg-[#FF9900] hover:bg-amber-400 text-slate-950 font-extrabold text-sm transition-all inline-flex items-center gap-2 self-start sm:self-auto cursor-pointer"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                Fazer Simulado
              </button>
            </div>

            {loadingHistory ? (
              <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-10 text-center text-slate-400">
                Carregando ranking...
              </div>
            ) : rankedAttempts.length === 0 ? (
              <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-10 text-center space-y-3">
                <Trophy className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">Nenhum simulado registrado ainda</h3>
                <p className="text-sm text-slate-400">
                  Seja o primeiro a concluir um simulado e entrar no topo do Ranking!
                </p>
              </div>
            ) : (
              <div className="bg-slate-800/75 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900/90 border-b border-slate-700/80 text-xs uppercase tracking-wider text-slate-400">
                        <th className="py-3.5 px-4 font-bold">Pos.</th>
                        <th className="py-3.5 px-4 font-bold">Candidato</th>
                        <th className="py-3.5 px-4 font-bold">Nota AWS</th>
                        <th className="py-3.5 px-4 font-bold">Acertos</th>
                        <th className="py-3.5 px-4 font-bold">Tempo</th>
                        <th className="py-3.5 px-4 font-bold">Status</th>
                        <th className="py-3.5 px-4 font-bold text-right">Gabarito</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/60 text-sm">
                      {rankedAttempts.map((att, index) => {
                        const pos = index + 1;
                        let medal: React.ReactNode = (
                          <span className="text-slate-400 font-bold pl-1.5">#{pos}</span>
                        );
                        if (pos === 1) {
                          medal = (
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 font-black">
                              🥇
                            </span>
                          );
                        } else if (pos === 2) {
                          medal = (
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-300/20 text-slate-200 border border-slate-300/40 font-black">
                              🥈
                            </span>
                          );
                        } else if (pos === 3) {
                          medal = (
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-700/30 text-orange-300 border border-orange-500/40 font-black">
                              🥉
                            </span>
                          );
                        }

                        return (
                          <tr
                            key={att.id}
                            className="hover:bg-slate-700/30 transition-colors"
                          >
                            <td className="py-3.5 px-4 whitespace-nowrap">{medal}</td>
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-white">{att.candidateName}</div>
                              <div className="text-[11px] text-slate-400">
                                {formatDate(att.createdAt)} • {att.domainFilter}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="text-base font-black text-[#FF9900]">
                                {att.awsScore}
                              </span>
                              <span className="text-xs text-slate-500">/1000</span>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap font-semibold text-slate-200">
                              {att.correctCount}/{att.totalQuestions}
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap font-mono text-slate-300">
                              {formatTime(att.timeSeconds)}
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                                  att.passed
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                }`}
                              >
                                {att.passed ? 'APROVADO' : 'REPROVADO'}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap text-right">
                              <button
                                type="button"
                                onClick={() => openAttemptInspection(att)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700/70 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5 text-[#FF9900]" />
                                Ver
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================================================================ */}
        {/* ABA 3: HISTÓRICO DE GABARITOS                                    */}
        {/* ================================================================ */}
        {activeTab === 'historico' && (
          <div className="space-y-6">
            {inspectingAttempt ? (
              <DetailedReviewSection
                answers={inspectingAttempt.answers}
                headerInfo={inspectingAttempt}
                onBack={() => {
                  setInspectingAttempt(null);
                  scrollToTop();
                }}
              />
            ) : (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
                      <History className="w-7 h-7 text-[#FF9900]" />
                      Histórico de Gabaritos
                    </h2>
                    <p className="text-sm text-slate-400 mt-0.5">
                      Clique em qualquer tentativa para revisar o que foi marcado em cada questão.
                    </p>
                  </div>
                </div>

                {/* Busca e Filtros */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={historySearch}
                      onChange={(e) => setHistorySearch(e.target.value)}
                      placeholder="Buscar por nome do candidato..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#FF9900]"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    {(
                      [
                        { id: 'all', label: 'Todos' },
                        { id: 'passed', label: 'Aprovados' },
                        { id: 'failed', label: 'Reprovados' }
                      ] as const
                    ).map((btn) => (
                      <button
                        key={btn.id}
                        type="button"
                        onClick={() => setHistoryStatusFilter(btn.id)}
                        className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          historyStatusFilter === btn.id
                            ? 'bg-[#FF9900] text-slate-950'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lista de Tentativas */}
                {loadingHistory ? (
                  <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-10 text-center text-slate-400">
                    Carregando histórico...
                  </div>
                ) : filteredHistory.length === 0 ? (
                  <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-10 text-center space-y-2">
                    <History className="w-12 h-12 text-slate-600 mx-auto" />
                    <h3 className="text-lg font-bold text-white">Nenhuma tentativa encontrada</h3>
                    <p className="text-sm text-slate-400">
                      Conclua um simulado ou ajuste os filtros de busca.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredHistory.map((att) => (
                      <button
                        key={att.id}
                        type="button"
                        onClick={() => openAttemptInspection(att)}
                        className="text-left bg-slate-800/75 hover:bg-slate-800 border border-slate-700/80 hover:border-[#FF9900]/60 rounded-2xl p-5 transition-all group cursor-pointer"
                      >
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div>
                            <div className="font-extrabold text-white text-base group-hover:text-[#FF9900] transition-colors">
                              {att.candidateName}
                            </div>
                            <div className="text-xs text-slate-400 mt-0.5">
                              {formatDate(att.createdAt)} • Domínio: {att.domainFilter}
                            </div>
                          </div>
                          <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${
                              att.passed
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}
                          >
                            {att.passed ? 'APROVADO' : 'REPROVADO'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-700/60">
                          <div className="flex items-center gap-4 text-xs">
                            <div>
                              <span className="text-slate-400">Nota: </span>
                              <strong className="text-[#FF9900] text-sm">{att.awsScore}</strong>
                            </div>
                            <div>
                              <span className="text-slate-400">Acertos: </span>
                              <strong className="text-white">
                                {att.correctCount}/{att.totalQuestions}
                              </strong>
                            </div>
                            <div>
                              <span className="text-slate-400">Tempo: </span>
                              <strong className="text-slate-200 font-mono">
                                {formatTime(att.timeSeconds)}
                              </strong>
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#FF9900]">
                            Revisar <ChevronRight className="w-4 h-4" />
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </main>

      {/* ================================================================== */}
      {/* MODAL DE CONFIRMAÇÃO DE SAÍDA                                      */}
      {/* ================================================================== */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-red-500/15 text-red-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-white">Sair do Simulado?</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Se você sair agora, o progresso deste simulado em andamento será perdido e não será
              registrado no Ranking.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowExitModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold transition-colors cursor-pointer"
              >
                Continuar Prova
              </button>
              <button
                type="button"
                onClick={confirmExitQuiz}
                className="px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors cursor-pointer"
              >
                Sim, Encerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rodapé */}
      <footer className="border-t border-slate-800/80 py-4 text-center text-xs text-slate-500">
        Simulado Preparatório AWS Certified Solutions Architect – Associate (SAA-C03) • Bons
        estudos!
      </footer>
    </div>
  );
}