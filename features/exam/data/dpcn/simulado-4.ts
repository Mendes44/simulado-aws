import type { Question } from '../../types';

// Enunciados, alternativas e comentários extraídos dos PDFs fornecidos.
// Duplicatas entre arquivos mantêm todas as origens em sourceDocuments.
export const DPCN_4: Question[] = [
  {
    "id": 1411,
    "domain": "Resiliência",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa está movendo seu aplicativo de gerenciamento de dados para a AWS. A empresa quer fazer a transição para uma arquitetura orientada a eventos. A arquitetura precisa ser mais distribuída e usar conceitos sem servidor enquanto executa os diferentes aspectos do fluxo de trabalho. A empresa também quer minimizar o overhead operacional. Qual solução atenderá a esses requisitos?",
    "options": [
      "Construir o fluxo de trabalho no AWS Glue. Usar o AWS Glue para invocar funções AWS Lambda para processar os passos do fluxo de trabalho.",
      "Construir o fluxo de trabalho no AWS Step Functions. Implantar o aplicativo em instâncias do Amazon EC2. Usar o Step Functions para invocar os passos do fluxo de trabalho nas instâncias EC2.",
      "Construir o fluxo de trabalho no Amazon EventBridge. Usar o EventBridge para invocar funções AWS Lambda em um cronograma para processar os passos do fluxo de trabalho.",
      "Construir o fluxo de trabalho no AWS Step Functions. Usar o Step Functions para criar uma máquina de estado. Usar a máquina de estado para invocar funções AWS Lambda para processar os passos do fluxo de trabalho."
    ],
    "correctIndices": [
      3
    ],
    "keyword": "Step Functions para orquestração",
    "summary": "O AWS Step Functions é o serviço ideal para orquestração de fluxos de trabalho sem servidor orientados a eventos. A máquina de estado gerencia toda a lógica de sequenciamento, tratamento de erros, retentativas e estados do fluxo de trabalho de forma visual e declarativa. A integração nativa com funções AWS Lambda garante uma arquitetura totalmente sem servidor e distribuída, com mínimo overhead operacional — a AWS gerencia toda a infraestrutura subjacente.",
    "optionExplanations": [
      "O AWS Glue é um serviço de integração de dados focado em ETL (Extract, Transform, Load). Ele não foi projetado para orquestrar fluxos de trabalho orientados a eventos de forma geral. Usar o Glue como orquestrador de fluxos de trabalho de aplicação é uma abordagem inadequada que não atende ao requisito de arquitetura orientada a eventos distribuída.",
      "Embora o AWS Step Functions seja a escolha correta para orquestração de fluxos de trabalho, implantar o aplicativo em instâncias EC2 contradiz diretamente os requisitos de arquitetura sem servidor e menor overhead operacional. Gerenciar instâncias EC2 adiciona overhead operacional significativo de provisionamento, patching e manutenção.",
      "O Amazon EventBridge é excelente para roteamento de eventos, mas não é uma ferramenta de orquestração de fluxos de trabalho complexos. Invocar funções Lambda em um cronograma também contradiz o conceito de arquitetura orientada a eventos — cronogramas são baseados em tempo, não em eventos. O EventBridge sozinho não gerencia estados, tratamento de erros ou sequenciamento de passos do fluxo de trabalho.",
      "O AWS Step Functions é o serviço ideal para orquestração de fluxos de trabalho sem servidor orientados a eventos. A máquina de estado gerencia toda a lógica de sequenciamento, tratamento de erros, retentativas e estados do fluxo de trabalho de forma visual e declarativa. A integração nativa com funções AWS Lambda garante uma arquitetura totalmente sem servidor e distribuída, com mínimo overhead operacional — a AWS gerencia toda a infraestrutura subjacente."
    ],
    "sourceDocuments": [
      {
        "examNumber": 4,
        "questionNumber": 11,
        "fileName": "Simulado Comentado 4 Novo DPCN.pdf",
        "questionPage": 34,
        "explanationPages": [
          35
        ]
      }
    ]
  },
  {
    "id": 1412,
    "domain": "Alto Desempenho",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa está projetando a rede para um jogo multi-player online. O jogo usa o protocolo de rede UDP e será implantado em oito Regiões AWS. A arquitetura de rede precisa minimizar a latência e a perda de pacotes para dar aos usuários finais uma experiência de jogo de alta qualidade. Qual solução atenderá a esses requisitos?",
    "options": [
      "Configurar um gateway de trânsito em cada Região. Criar conexões de peering entre gateways de trânsito em cada Região.",
      "Configurar o AWS Global Accelerator com listeners UDP e grupos de endpoints em cada Região.",
      "Configurar o Amazon CloudFront com UDP ativado. Configurar uma origem em cada Região.",
      "Configurar uma malha de peering de VPC entre cada Região. Ativar UDP para cada VPC."
    ],
    "correctIndices": [
      1
    ],
    "keyword": "Global Accelerator com UDP",
    "summary": "O AWS Global Accelerator é a solução ideal para esse cenário. Ele roteia o tráfego dos usuários finais pela rede backbone global da AWS em vez da internet pública, reduzindo significativamente a latência e a perda de pacotes. Suporta nativamente o protocolo UDP, possui listeners configuráveis e grupos de endpoints por região, garantindo que os jogadores sejam direcionados automaticamente para a região mais próxima com menor latência.",
    "optionExplanations": [
      "O Transit Gateway é usado para conectar VPCs e redes on-premises dentro e entre regiões. Ele não é projetado para otimizar a latência de usuários finais conectando-se a um jogo — ele gerencia conectividade de rede interna da AWS, não o tráfego de jogadores externos até os servidores.",
      "O AWS Global Accelerator é a solução ideal para esse cenário. Ele roteia o tráfego dos usuários finais pela rede backbone global da AWS em vez da internet pública, reduzindo significativamente a latência e a perda de pacotes. Suporta nativamente o protocolo UDP, possui listeners configuráveis e grupos de endpoints por região, garantindo que os jogadores sejam direcionados automaticamente para a região mais próxima com menor latência.",
      "O Amazon CloudFront é uma CDN projetada para distribuição de conteúdo HTTP/HTTPS. Ele não suporta o protocolo UDP — é fundamentalmente incompatível com o requisito do jogo. CloudFront é adequado para assets estáticos e streaming, não para comunicação em tempo real de jogos.",
      "O peering de VPC conecta redes VPC entre si, mas não melhora a experiência dos usuários finais externos conectando-se ao jogo. Além disso, uma malha de peering completa entre oito regiões seria extremamente complexa de gerenciar e não resolveria o problema de latência da última milha entre jogadores e servidores."
    ],
    "sourceDocuments": [
      {
        "examNumber": 4,
        "questionNumber": 12,
        "fileName": "Simulado Comentado 4 Novo DPCN.pdf",
        "questionPage": 37,
        "explanationPages": [
          38
        ]
      }
    ]
  },
  {
    "id": 1413,
    "domain": "Otimização de Custos",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa hospeda um aplicativo web de três camadas em instâncias do Amazon EC2 em uma única Zona de Disponibilidade. O aplicativo web usa um banco de dados MySQL autogerenciado em EC2 com volume EBS io2 de 1 TB. A empresa espera tráfego de 1.000 IOPS no pico. A empresa quer minimizar interrupções, estabilizar o desempenho e reduzir custos mantendo capacidade para o dobro de IOPS. A empresa quer mover para uma solução totalmente gerenciada, altamente disponível e tolerante a falhas. Qual solução atenderá a esses requisitos com o MENOR custo?",
    "options": [
      "Usar uma implantação Multi-AZ de uma instância de banco de dados Amazon RDS for MySQL com um volume EBS io2 Block Express.",
      "Usar uma implantação Multi-AZ de uma instância de banco de dados Amazon RDS for MySQL com um volume EBS General Purpose SSD (gp2).",
      "Usar as camadas de acesso S3 Intelligent-Tiering do Amazon S3.",
      "Usar duas grandes instâncias EC2 para hospedar o banco de dados em modo ativo-passivo."
    ],
    "correctIndices": [
      1
    ],
    "keyword": "RDS Multi-AZ e armazenamento SSD",
    "summary": "O RDS for MySQL Multi-AZ atende aos requisitos de alta disponibilidade, tolerância a falhas e solução totalmente gerenciada. O volume gp2 oferece até 3.000 IOPS para volumes de 1 TB — suficiente para suportar o dobro do pico esperado de 1.000 IOPS. O gp2 é consideravelmente mais barato que o io2, reduzindo custos enquanto mantém a capacidade necessária.",
    "optionExplanations": [
      "O volume io2 Block Express oferece desempenho extremamente alto — até 256.000 IOPS — muito além dos 2.000 IOPS necessários (dobro do pico de 1.000). Usar io2 Block Express para essa carga de trabalho é um superdimensionamento significativo que resultaria em custos desnecessariamente elevados.",
      "O RDS for MySQL Multi-AZ atende aos requisitos de alta disponibilidade, tolerância a falhas e solução totalmente gerenciada. O volume gp2 oferece até 3.000 IOPS para volumes de 1 TB — suficiente para suportar o dobro do pico esperado de 1.000 IOPS. O gp2 é consideravelmente mais barato que o io2, reduzindo custos enquanto mantém a capacidade necessária.",
      "O Amazon S3 é um serviço de armazenamento de objetos e não pode ser usado como banco de dados relacional MySQL. Esta opção é completamente inadequada para o caso de uso descrito.",
      "Usar instâncias EC2 em modo ativo-passivo não atende ao requisito de solução totalmente gerenciada. Gerenciar replicação, failover e manutenção manualmente entre instâncias EC2 introduz alto overhead operacional e não garante a mesma disponibilidade e tolerância a falhas do RDS Multi-AZ."
    ],
    "sourceDocuments": [
      {
        "examNumber": 4,
        "questionNumber": 13,
        "fileName": "Simulado Comentado 4 Novo DPCN.pdf",
        "questionPage": 40,
        "explanationPages": [
          41
        ]
      }
    ]
  },
  {
    "id": 1414,
    "domain": "Alto Desempenho",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa hospeda um aplicativo sem servidor na AWS usando API Gateway, Lambda e RDS for PostgreSQL. A empresa observa erros de timeout de conexão de banco de dados durante horários de tráfego de pico ou imprevisível. A empresa precisa de uma solução que reduza as falhas com o mínimo de alterações de código. O que um arquiteto de soluções deve fazer?",
    "options": [
      "Reduzir a taxa de simultaneidade do Lambda.",
      "Habilitar o RDS Proxy na instância de banco de dados RDS.",
      "Redimensionar a classe da instância de banco de dados RDS para aceitar mais conexões.",
      "Migrar o banco de dados para o Amazon DynamoDB com escalamento sob demanda."
    ],
    "correctIndices": [
      1
    ],
    "keyword": "RDS Proxy para aplicações serverless",
    "summary": "O RDS Proxy foi criado exatamente para esse cenário. Funções Lambda podem criar milhares de conexões simultâneas ao banco de dados durante picos de tráfego, esgotando o pool de conexões do RDS e causando timeouts. O RDS Proxy gerencia e reutiliza um pool de conexões entre o Lambda e o RDS, absorvendo os picos sem sobrecarregar o banco de dados. A implementação requer mínimas ou nenhuma alteração no código da aplicação.",
    "optionExplanations": [
      "Reduzir a simultaneidade do Lambda limitaria a capacidade de processamento do aplicativo, degradando a experiência do usuário. Isso não resolve o problema de timeouts — apenas reduz o número de requisições processadas, o que é o oposto do objetivo da empresa.",
      "O RDS Proxy foi criado exatamente para esse cenário. Funções Lambda podem criar milhares de conexões simultâneas ao banco de dados durante picos de tráfego, esgotando o pool de conexões do RDS e causando timeouts. O RDS Proxy gerencia e reutiliza um pool de conexões entre o Lambda e o RDS, absorvendo os picos sem sobrecarregar o banco de dados. A implementação requer mínimas ou nenhuma alteração no código da aplicação.",
      "Redimensionar a instância RDS pode aumentar o limite de conexões, mas é uma solução temporária e de custo elevado. Durante picos muito altos de tráfego Lambda, mesmo instâncias maiores podem ser sobrecarregadas. Não resolve o problema estrutural de gerenciamento de conexões.",
      "Migrar de PostgreSQL para DynamoDB exigiria alterações significativas no código — mudança completa do modelo de dados, queries e lógica de acesso ao banco. Isso contradiz diretamente o requisito de mínimas alterações de código e representa um projeto de migração de grande porte."
    ],
    "sourceDocuments": [
      {
        "examNumber": 4,
        "questionNumber": 14,
        "fileName": "Simulado Comentado 4 Novo DPCN.pdf",
        "questionPage": 43,
        "explanationPages": [
          44
        ]
      }
    ]
  },
  {
    "id": 1415,
    "domain": "Alto Desempenho",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa está migrando um aplicativo antigo para a AWS. O aplicativo executa um trabalho em lote a cada hora, é intensivo em CPU, leva 15 minutos em média e usa um servidor com 64 vCPUs e 512 GiB de memória. Qual solução executará o trabalho em lote em 15 minutos com o MENOR overhead operacional?",
    "options": [
      "Usar o AWS Lambda com escalamento funcional.",
      "Usar o Amazon Elastic Container Service (Amazon ECS) com o AWS Fargate.",
      "Usar o Amazon Lightsail com o AWS Auto Scaling.",
      "Usar o AWS Batch no Amazon EC2."
    ],
    "correctIndices": [
      3
    ],
    "keyword": "AWS Batch no EC2",
    "summary": "O AWS Batch é projetado especificamente para cargas de trabalho em lote, com gerenciamento automático de filas, escalonamento e execução de jobs. Rodando no EC2, permite selecionar instâncias com as especificações exatas necessárias (64 vCPUs e 512 GiB de memória). O AWS Batch gerencia toda a infraestrutura automaticamente — provisionamento, escalonamento e encerramento das instâncias — resultando no menor overhead operacional para esse cenário.",
    "optionExplanations": [
      "O AWS Lambda possui limite máximo de 15 minutos de execução por invocação e limite de 10 GB de memória. O trabalho requer 512 GiB de memória — muito além dos limites do Lambda. Esta opção é tecnicamente inviável para esse caso de uso.",
      "O AWS Fargate tem limite máximo de 16 vCPUs e 120 GiB de memória por task. O trabalho requer 64 vCPUs e 512 GiB de memória — muito além dos limites do Fargate. Esta opção também é tecnicamente inviável sem fragmentar o trabalho em múltiplas tasks, o que aumentaria a complexidade.",
      "O Amazon Lightsail é voltado para aplicações simples e de pequeno porte. Não oferece instâncias com 64 vCPUs e 512 GiB de memória, nem é adequado para cargas de trabalho em lote intensivas em CPU. O overhead operacional seria alto para esse tipo de carga.",
      "O AWS Batch é projetado especificamente para cargas de trabalho em lote, com gerenciamento automático de filas, escalonamento e execução de jobs. Rodando no EC2, permite selecionar instâncias com as especificações exatas necessárias (64 vCPUs e 512 GiB de memória). O AWS Batch gerencia toda a infraestrutura automaticamente — provisionamento, escalonamento e encerramento das instâncias — resultando no menor overhead operacional para esse cenário."
    ],
    "sourceDocuments": [
      {
        "examNumber": 4,
        "questionNumber": 15,
        "fileName": "Simulado Comentado 4 Novo DPCN.pdf",
        "questionPage": 46,
        "explanationPages": [
          47
        ]
      }
    ]
  }
];
