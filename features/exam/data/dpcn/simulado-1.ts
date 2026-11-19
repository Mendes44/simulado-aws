import type { Question } from '../../types';

// Enunciados, alternativas e comentários extraídos dos PDFs fornecidos.
// Duplicatas entre arquivos mantêm todas as origens em sourceDocuments.
export const DPCN_1: Question[] = [
  {
    "id": 1101,
    "domain": "Alto Desempenho",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa lançou uma instância de banco de dados Amazon RDS for MySQL. A maioria das conexões ao banco de dados vem de aplicativos sem servidor. O tráfego do aplicativo para o banco de dados muda significativamente em intervalos aleatórios. Em momentos de alta demanda, os usuários relatam que seus aplicativos experimentam erros de rejeição de conexão ao banco de dados. Qual solução resolverá esse problema com o MENOR overhead operacional?",
    "options": [
      "Criar um proxy no RDS Proxy. Configurar os aplicativos dos usuários para usar a instância de banco de dados pelo RDS Proxy.",
      "Implantar o Amazon ElastiCache for Memcached entre os aplicativos dos usuários e a instância de banco de dados.",
      "Migrar a instância de banco de dados para uma classe de instância diferente com maior capacidade de E/S. Configurar os aplicativos dos usuários para usar a nova instância de banco de dados.",
      "Configurar Multi-AZ para a instância de banco de dados. Configurar os aplicativos dos usuários para alternar entre as instâncias de banco de dados."
    ],
    "correctIndices": [
      0
    ],
    "keyword": "RDS Proxy e pool de conexões",
    "summary": "O Amazon RDS Proxy foi criado exatamente para esse cenário. Aplicações serverless (como Lambda) abrem e fecham conexões com frequência, podendo esgotar o número máximo de conexões do banco de dados. O RDS Proxy mantém um pool de conexões persistentes entre a aplicação e o banco, gerenciando e reutilizando conexões de forma eficiente. É totalmente gerenciado pela AWS, com mínimo overhead operacional.",
    "optionExplanations": [
      "O Amazon RDS Proxy foi criado exatamente para esse cenário. Aplicações serverless (como Lambda) abrem e fecham conexões com frequência, podendo esgotar o número máximo de conexões do banco de dados. O RDS Proxy mantém um pool de conexões persistentes entre a aplicação e o banco, gerenciando e reutilizando conexões de forma eficiente. É totalmente gerenciado pela AWS, com mínimo overhead operacional.",
      "O ElastiCache for Memcached é uma solução de cache em memória — ele reduz a quantidade de consultas ao banco de dados armazenando resultados em cache, mas não resolve o problema de rejeição de conexões causado por picos de tráfego em aplicações serverless. Além disso, requer configuração e gerenciamento adicional.",
      "Migrar para uma classe de instância maior aumenta recursos de CPU e memória, mas não resolve o problema de esgotamento de conexões. O limite de conexões do RDS está relacionado à memória da instância, e mesmo instâncias maiores têm um teto. Além disso, gera maior custo e overhead operacional de migração.",
      "O RDS Multi-AZ é uma solução de alta disponibilidade e failover automático — a instância secundária não aceita conexões de leitura ou escrita em condições normais. Configurar aplicações para alternar manualmente entre instâncias exigiria lógica customizada e não resolveria o problema de rejeição de conexões por esgotamento do pool."
    ],
    "sourceDocuments": [
      {
        "examNumber": 1,
        "questionNumber": 1,
        "fileName": "Simulado Comentado 1 Novo DPCN.pdf",
        "questionPage": 4,
        "explanationPages": [
          5
        ]
      }
    ]
  },
  {
    "id": 1102,
    "domain": "Resiliência",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa implantou recentemente um novo sistema de auditoria para centralizar informações sobre versões de sistema operacional, correções e software instalado para instâncias do Amazon EC2. Um arquiteto de soluções deve garantir que todas as instâncias provisionadas por grupos de Auto Scaling do EC2 enviem relatórios com sucesso ao sistema de auditoria assim que são lançadas e encerradas. Qual solução atingirá esses objetivos da MAIS eficiente forma?",
    "options": [
      "Usar uma função AWS Lambda agendada e executar um script remotamente em todas as instâncias EC2 para enviar dados ao sistema de auditoria.",
      "Usar ganchos de ciclo de vida do EC2 Auto Scaling para executar um script personalizado para enviar dados ao sistema de auditoria quando as instâncias são lançadas e encerradas.",
      "Usar uma configuração de lançamento do EC2 Auto Scaling para executar um script personalizado por meio de dados do usuário para enviar dados ao sistema de auditoria quando as instâncias são lançadas e encerradas.",
      "Executar um script personalizado no sistema operacional da instância para enviar dados ao sistema de auditoria. Configurar o script para ser invocado pelo grupo de EC2 Auto Scaling quando a instância inicia e é encerrada."
    ],
    "correctIndices": [
      1
    ],
    "keyword": "Auto Scaling Lifecycle Hooks",
    "summary": "Os Lifecycle Hooks do EC2 Auto Scaling são a solução ideal para esse cenário. Eles permitem pausar o ciclo de vida da instância em momentos específicos — durante o lançamento (pending:wait) e durante o encerramento (terminating:wait) — e executar ações personalizadas antes que a instância entre em serviço ou seja encerrada definitivamente. Isso garante que os dados de auditoria sejam enviados com sucesso antes de qualquer transição de estado, com integração nativa ao Auto Scaling e mínimo overhead operacional.",
    "optionExplanations": [
      "Uma função Lambda agendada executa em intervalos de tempo fixos, não em resposta a eventos de lançamento ou encerramento de instâncias. Isso significa que pode haver atrasos entre o evento real e o envio do relatório. Além disso, executar scripts remotamente em instâncias requer conectividade e configuração adicional, aumentando o overhead operacional.",
      "Os Lifecycle Hooks do EC2 Auto Scaling são a solução ideal para esse cenário. Eles permitem pausar o ciclo de vida da instância em momentos específicos — durante o lançamento (pending:wait) e durante o encerramento (terminating:wait) — e executar ações personalizadas antes que a instância entre em serviço ou seja encerrada definitivamente. Isso garante que os dados de auditoria sejam enviados com sucesso antes de qualquer transição de estado, com integração nativa ao Auto Scaling e mínimo overhead operacional.",
      "Os dados do usuário (user data) são executados apenas durante o lançamento inicial da instância, não durante o encerramento. Portanto, essa solução não atenderia ao requisito de enviar relatórios quando as instâncias são encerradas. Além disso, se o script falhar durante o lançamento, não há mecanismo nativo de retry ou pausa do ciclo de vida.",
      "O EC2 Auto Scaling não possui um mecanismo nativo para invocar scripts diretamente no sistema operacional da instância durante eventos de ciclo de vida. Essa abordagem exigiria desenvolvimento customizado complexo e não garantiria a execução confiável dos scripts nos momentos corretos de lançamento e encerramento."
    ],
    "sourceDocuments": [
      {
        "examNumber": 1,
        "questionNumber": 2,
        "fileName": "Simulado Comentado 1 Novo DPCN.pdf",
        "questionPage": 7,
        "explanationPages": [
          8
        ]
      }
    ]
  },
  {
    "id": 1103,
    "domain": "Alto Desempenho",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa está desenvolvendo um jogo multiplayer em tempo real que usa UDP para comunicações entre o cliente e os servidores em um grupo de Auto Scaling. Picos na demanda são antecipados durante o dia, então a plataforma do servidor de jogos deve se adaptar de acordo. Os desenvolvedores querem armazenar pontuações de jogadores e outros dados não relacionais em uma solução de banco de dados que escale sem intervenção. Qual solução o arquiteto de soluções deve recomendar?",
    "options": [
      "Usar o Amazon Route 53 para distribuição de tráfego e o Amazon Aurora Serverless para armazenamento de dados.",
      "Usar um Network Load Balancer para distribuição de tráfego e o Amazon DynamoDB sob demanda para armazenamento de dados.",
      "Usar um Network Load Balancer para distribuição de tráfego e o Amazon Aurora Global Database para armazenamento de dados.",
      "Usar um Application Load Balancer para distribuição de tráfego e tabelas globais do Amazon DynamoDB para armazenamento de dados."
    ],
    "correctIndices": [
      1
    ],
    "keyword": "NLB UDP e DynamoDB sob demanda",
    "summary": "O Network Load Balancer (NLB) opera na camada 4 (TCP/UDP), sendo o único balanceador de carga da AWS que suporta protocolo UDP — essencial para comunicações de jogos em tempo real. O Amazon DynamoDB no modo sob demanda escala automaticamente a capacidade de leitura e escrita sem necessidade de planejamento ou intervenção manual, ideal para picos imprevisíveis de demanda. A combinação atende todos os requisitos: UDP, Auto Scaling e banco não relacional que escala sem intervenção.",
    "optionExplanations": [
      "O Amazon Route 53 é um serviço de DNS — ele pode fazer roteamento de tráfego, mas não é um balanceador de carga adequado para tráfego UDP em tempo real de jogos. O Aurora Serverless é relacional e não é a melhor escolha para dados não relacionais como pontuações de jogadores.",
      "O Network Load Balancer (NLB) opera na camada 4 (TCP/UDP), sendo o único balanceador de carga da AWS que suporta protocolo UDP — essencial para comunicações de jogos em tempo real. O Amazon DynamoDB no modo sob demanda escala automaticamente a capacidade de leitura e escrita sem necessidade de planejamento ou intervenção manual, ideal para picos imprevisíveis de demanda. A combinação atende todos os requisitos: UDP, Auto Scaling e banco não relacional que escala sem intervenção.",
      "O NLB está correto para tráfego UDP, mas o Aurora Global Database é um banco relacional projetado para replicação entre regiões — não é uma solução de banco não relacional que escala automaticamente sem intervenção para dados como pontuações de jogadores.",
      "O Application Load Balancer (ALB) opera na camada 7 (HTTP/HTTPS) e não suporta protocolo UDP, que é o requisito fundamental para comunicações de jogos em tempo real. As tabelas globais do DynamoDB são adequadas para o banco de dados, mas o ALB invalida esta opção."
    ],
    "sourceDocuments": [
      {
        "examNumber": 1,
        "questionNumber": 3,
        "fileName": "Simulado Comentado 1 Novo DPCN.pdf",
        "questionPage": 10,
        "explanationPages": [
          11
        ]
      }
    ]
  },
  {
    "id": 1104,
    "domain": "Alto Desempenho",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa hospeda um aplicativo de front-end que usa uma API de back-end do Amazon API Gateway integrada com o AWS Lambda. Quando a API recebe solicitações, a função Lambda carrega muitas bibliotecas. Em seguida, a função Lambda se conecta a um banco de dados Amazon RDS, processa os dados e retorna os dados ao aplicativo de front-end. A empresa quer garantir que a latência de resposta seja a mais baixa possível para todos os seus usuários com o menor número de alterações nas operações da empresa. Qual solução atenderá a esses requisitos?",
    "options": [
      "Estabelecer uma conexão entre o aplicativo de front-end e o banco de dados para tornar as consultas mais rápidas ignorando a API.",
      "Configurar a simultaneidade provisionada para a função Lambda que lida com as solicitações.",
      "Armazenar em cache os resultados das consultas no Amazon S3 para recuperação mais rápida de conjuntos de dados semelhantes.",
      "Aumentar o tamanho do banco de dados para aumentar o número de conexões que o Lambda pode estabelecer por vez."
    ],
    "correctIndices": [
      1
    ],
    "keyword": "Lambda: simultaneidade provisionada",
    "summary": "O problema descrito é o \"cold start\" do Lambda — quando a função não foi invocada recentemente, a AWS precisa inicializar um novo contêiner, carregar o runtime e as bibliotecas, causando alta latência. A Simultaneidade Provisionada (Provisioned Concurrency) mantém um número configurável de instâncias da função Lambda pré-inicializadas e prontas para responder imediatamente, eliminando o cold start sem necessidade de alterações no código ou na arquitetura existente.",
    "optionExplanations": [
      "Conectar o front-end diretamente ao banco de dados eliminaria a camada de API e Lambda, mas exporia o banco de dados diretamente à internet, criando sérios riscos de segurança. Além disso, exigiria grandes mudanças na arquitetura e nas operações, contradizendo o requisito de menor número de alterações.",
      "O problema descrito é o \"cold start\" do Lambda — quando a função não foi invocada recentemente, a AWS precisa inicializar um novo contêiner, carregar o runtime e as bibliotecas, causando alta latência. A Simultaneidade Provisionada (Provisioned Concurrency) mantém um número configurável de instâncias da função Lambda pré-inicializadas e prontas para responder imediatamente, eliminando o cold start sem necessidade de alterações no código ou na arquitetura existente.",
      "Armazenar resultados no Amazon S3 não é uma solução de cache adequada para baixa latência — o S3 é um serviço de armazenamento de objetos, não um cache de dados em memória. Além disso, implementar essa lógica exigiria alterações significativas no código da aplicação, contradizendo o requisito.",
      "Aumentar o tamanho do banco de dados pode aumentar o número máximo de conexões disponíveis, mas não resolve o problema principal que é a alta latência causada pelo cold start do Lambda ao carregar bibliotecas. Não aborda a causa raiz do problema descrito no cenário."
    ],
    "sourceDocuments": [
      {
        "examNumber": 1,
        "questionNumber": 4,
        "fileName": "Simulado Comentado 1 Novo DPCN.pdf",
        "questionPage": 13,
        "explanationPages": [
          14
        ]
      }
    ]
  },
  {
    "id": 1105,
    "domain": "Alto Desempenho",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa hospeda um aplicativo web de três camadas que inclui um banco de dados PostgreSQL. O banco de dados armazena os metadados dos documentos. A empresa pesquisa os metadados por termos-chave para recuperar documentos que a empresa revisa em um relatório a cada mês. Os documentos são armazenados no Amazon S3. Os documentos são geralmente escritos apenas uma vez, mas são atualizados com frequência. O processo de relatório leva algumas horas usando consultas relacionais. O processo de relatório não deve impedir quaisquer modificações de documentos ou a adição de novos documentos. Um arquiteto de soluções precisa implementar uma solução para acelerar o processo de relatório. Qual solução atenderá a esses requisitos com o MENOR esforço de alteração no código do aplicativo?",
    "options": [
      "Configurar um novo cluster Amazon DocumentDB (com compatibilidade MongoDB) que inclui uma réplica de leitura. Dimensionar a réplica de leitura para gerar os relatórios.",
      "Configurar um novo cluster Amazon Aurora PostgreSQL DB que inclui uma Réplica Aurora. Emitir consultas para a Réplica Aurora para gerar os relatórios.",
      "Configurar uma nova instância Multi-AZ Amazon RDS for PostgreSQL DB. Configurar o módulo de relatório para consultar o nó RDS secundário para que o módulo de relatório não afete o nó primário.",
      "Configurar uma nova tabela do Amazon DynamoDB para armazenar os documentos. Usar uma capacidade de escrita fixa para suportar novas entradas de documentos. Escalar automaticamente a capacidade de leitura para suportar os relatórios."
    ],
    "correctIndices": [
      1
    ],
    "keyword": "Aurora Replicas para relatórios",
    "summary": "O Amazon Aurora PostgreSQL é totalmente compatível com PostgreSQL, o que significa que o código da aplicação e as consultas SQL existentes funcionarão sem modificações. A Réplica Aurora é uma réplica de leitura de baixa latência que pode ser usada exclusivamente para as consultas de relatório, isolando completamente a carga de trabalho de leitura do nó primário (que continua processando escritas e atualizações normalmente). É a solução com menor esforço de alteração no código.",
    "optionExplanations": [
      "O Amazon DocumentDB é compatível com MongoDB — um banco de dados de documentos NoSQL. O banco atual é PostgreSQL relacional. Migrar para DocumentDB exigiria reescrita significativa do código da aplicação e das consultas relacionais, contradizendo o requisito de menor esforço de alteração no código.",
      "O Amazon Aurora PostgreSQL é totalmente compatível com PostgreSQL, o que significa que o código da aplicação e as consultas SQL existentes funcionarão sem modificações. A Réplica Aurora é uma réplica de leitura de baixa latência que pode ser usada exclusivamente para as consultas de relatório, isolando completamente a carga de trabalho de leitura do nó primário (que continua processando escritas e atualizações normalmente). É a solução com menor esforço de alteração no código.",
      "Em uma configuração RDS Multi-AZ, a instância secundária (standby) existe exclusivamente para failover automático — ela não aceita conexões de leitura em condições normais de operação. Portanto, não é possível direcionar consultas de relatório para o nó secundário de uma instância Multi-AZ padrão do RDS.",
      "O Amazon DynamoDB é um banco NoSQL de chave-valor — completamente diferente do PostgreSQL relacional. Migrar para DynamoDB exigiria reescrita completa do código da aplicação, das consultas e do modelo de dados, representando o maior esforço de alteração entre todas as opções."
    ],
    "sourceDocuments": [
      {
        "examNumber": 1,
        "questionNumber": 5,
        "fileName": "Simulado Comentado 1 Novo DPCN.pdf",
        "questionPage": 16,
        "explanationPages": [
          17
        ]
      }
    ]
  },
  {
    "id": 1106,
    "domain": "Segurança",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa tem um aplicativo de três camadas na AWS que ingere dados de sensores de seus dispositivos de usuários. O tráfego flui por um Network Load Balancer (NLB), depois para instâncias do Amazon EC2 para a camada web e finalmente para instâncias EC2 para a camada de aplicativo. A camada de aplicativo faz chamadas a um banco de dados. O que um arquiteto de soluções deve fazer para melhorar a segurança dos dados em trânsito?",
    "options": [
      "Configurar um listener TLS. Implantar o certificado do servidor no NLB.",
      "Configurar o AWS Shield Advanced. Habilitar o AWS WAF no NLB.",
      "Alterar o balanceador de carga para um Application Load Balancer (ALB). Habilitar o AWS WAF no ALB.",
      "Criptografar o volume Amazon Elastic Block Store (Amazon EBS) nas instâncias EC2 usando o AWS Key Management Service (AWS KMS)."
    ],
    "correctIndices": [
      0
    ],
    "keyword": "NLB com listener TLS",
    "summary": "Para melhorar a segurança dos dados em trânsito através do NLB, configurar um listener TLS (Transport Layer Security) é a solução correta. O NLB suporta listeners TLS na camada 4, que criptografam o tráfego de rede entre os clientes e o balanceador de carga. O certificado do servidor é implantado no NLB usando o AWS Certificate Manager (ACM), garantindo que todos os dados transmitidos sejam criptografados enquanto estão em movimento.",
    "optionExplanations": [
      "Para melhorar a segurança dos dados em trânsito através do NLB, configurar um listener TLS (Transport Layer Security) é a solução correta. O NLB suporta listeners TLS na camada 4, que criptografam o tráfego de rede entre os clientes e o balanceador de carga. O certificado do servidor é implantado no NLB usando o AWS Certificate Manager (ACM), garantindo que todos os dados transmitidos sejam criptografados enquanto estão em movimento.",
      "O AWS Shield Advanced oferece proteção contra ataques DDoS e o AWS WAF filtra requisições maliciosas na camada de aplicação — ambos são serviços de segurança, mas nenhum deles criptografa dados em trânsito. Não atendem ao requisito específico de melhorar a segurança dos dados enquanto trafegam pela rede.",
      "Embora o ALB com WAF ofereça segurança na camada de aplicação (camada 7), trocar o NLB por um ALB é uma mudança arquitetural significativa e desnecessária. O WAF protege contra ataques web, não criptografa dados em trânsito. Além disso, o ALB pode não ser adequado se o tráfego dos sensores não for HTTP/HTTPS.",
      "Criptografar volumes EBS protege dados em repouso (armazenados no disco), não dados em trânsito (trafegando pela rede). Não atende ao requisito específico do cenário que pede melhoria da segurança dos dados durante a transmissão."
    ],
    "sourceDocuments": [
      {
        "examNumber": 1,
        "questionNumber": 6,
        "fileName": "Simulado Comentado 1 Novo DPCN.pdf",
        "questionPage": 19,
        "explanationPages": [
          20
        ]
      }
    ]
  },
  {
    "id": 1107,
    "domain": "Otimização de Custos",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa executa um aplicativo em instâncias do Amazon EC2 Linux em múltiplas Zonas de Disponibilidade. O aplicativo precisa de uma camada de armazenamento que seja altamente disponível e compatível com Portable Operating System Interface (POSIX). A camada de armazenamento deve fornecer durabilidade máxima de dados e deve ser compartilhável entre as instâncias EC2. Os dados na camada de armazenamento serão acessados com frequência nos primeiros 30 dias e serão acessados com pouca frequência após esse período. Qual solução atenderá a esses requisitos com o MENOR custo?",
    "options": [
      "Usar a classe de armazenamento Amazon S3 Standard. Criar uma política de ciclo de vida S3 para mover dados acessados com pouca frequência para o S3 Glacier.",
      "Usar a classe de armazenamento Amazon S3 Standard. Criar uma política de ciclo de vida S3 para mover dados acessados com pouca frequência para o S3 Standard-Infrequent Access (S3 Standard-IA).",
      "Usar a classe de armazenamento Amazon Elastic File System (Amazon EFS) Standard. Criar uma política de gerenciamento de ciclo de vida para mover dados acessados com pouca frequência para o EFS Standard-Infrequent Access (EFS Standard-IA).",
      "Usar a classe de armazenamento Amazon Elastic File System (Amazon EFS) One Zone. Criar uma política de gerenciamento de ciclo de vida para mover dados acessados com pouca frequência para o EFS One Zone-Infrequent Access (EFS One Zone-IA)."
    ],
    "correctIndices": [
      2
    ],
    "keyword": "EFS Standard e ciclo de vida",
    "summary": "O Amazon EFS é um sistema de arquivos totalmente gerenciado e compatível com POSIX, podendo ser montado simultaneamente em múltiplas instâncias EC2 em diferentes Zonas de Disponibilidade. O EFS Standard replica os dados em múltiplas AZs, fornecendo durabilidade máxima. A política de ciclo de vida do EFS move automaticamente arquivos não acessados por um período configurável para o EFS Standard-IA, que tem custo significativamente menor para dados acessados com pouca frequência, mantendo a compatibilidade POSIX e a disponibilidade Multi-AZ.",
    "optionExplanations": [
      "O Amazon S3 não é compatível com POSIX — ele usa uma API de objetos (PUT/GET/DELETE), não um sistema de arquivos montável. O requisito explícito de compatibilidade POSIX elimina todas as opções baseadas em S3.",
      "Pelo mesmo motivo da opção A, o Amazon S3 não é compatível com POSIX e não pode ser montado como um sistema de arquivos pelas instâncias EC2 Linux de forma nativa.",
      "O Amazon EFS é um sistema de arquivos totalmente gerenciado e compatível com POSIX, podendo ser montado simultaneamente em múltiplas instâncias EC2 em diferentes Zonas de Disponibilidade. O EFS Standard replica os dados em múltiplas AZs, fornecendo durabilidade máxima. A política de ciclo de vida do EFS move automaticamente arquivos não acessados por um período configurável para o EFS Standard-IA, que tem custo significativamente menor para dados acessados com pouca frequência, mantendo a compatibilidade POSIX e a disponibilidade Multi-AZ.",
      "O EFS One Zone armazena dados em uma única Zona de Disponibilidade, o que não fornece a durabilidade máxima exigida pelo cenário. Se essa AZ sofrer uma interrupção, os dados ficam inacessíveis. Não atende ao requisito de durabilidade máxima de dados."
    ],
    "sourceDocuments": [
      {
        "examNumber": 1,
        "questionNumber": 7,
        "fileName": "Simulado Comentado 1 Novo DPCN.pdf",
        "questionPage": 22,
        "explanationPages": [
          23
        ]
      }
    ]
  },
  {
    "id": 1108,
    "domain": "Segurança",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Um arquiteto de soluções está criando um novo design de VPC. Há duas sub-redes públicas para o balanceador de carga, duas sub-redes privadas para servidores web e duas sub-redes privadas para MySQL. Os servidores web usam apenas HTTPS. O arquiteto de soluções já criou um grupo de segurança para o balanceador de carga permitindo a porta 443 de 0.0.0.0/0. A política da empresa exige que cada recurso tenha o mínimo de acesso necessário para ainda ser capaz de realizar suas tarefas. Qual estratégia de configuração adicional o arquiteto de soluções deve usar para atender a esses requisitos?",
    "options": [
      "Criar um grupo de segurança para os servidores web e permitir a porta 443 de 0.0.0.0/0. Criar um grupo de segurança para os servidores MySQL e permitir a porta 3306 do grupo de segurança dos servidores web.",
      "Criar uma ACL de rede para os servidores web e permitir a porta 443 de 0.0.0.0/0. Criar uma ACL de rede para os servidores MySQL e permitir a porta 3306 do grupo de segurança dos servidores web.",
      "Criar um grupo de segurança para os servidores web e permitir a porta 443 do balanceador de carga. Criar um grupo de segurança para os servidores MySQL e permitir a porta 3306 do grupo de segurança dos servidores web.",
      "Criar uma ACL de rede para os servidores web e permitir a porta 443 do balanceador de carga. Criar uma ACL de rede para os servidores MySQL e permitir a porta 3306 do grupo de segurança dos servidores web."
    ],
    "correctIndices": [
      2
    ],
    "keyword": "Security groups com menor privilégio",
    "summary": "Esta é a implementação correta do princípio do menor privilégio usando Security Groups. O grupo de segurança dos servidores web permite tráfego HTTPS (443) apenas referenciando o grupo de segurança do balanceador de carga como origem — somente o tráfego vindo do LB é permitido. O grupo de segurança do MySQL permite tráfego na porta 3306 apenas referenciando o grupo de segurança dos servidores web como origem — somente os servidores web podem acessar o banco. Security Groups suportam nativamente referências a outros Security Groups.",
    "optionExplanations": [
      "Permitir a porta 443 de 0.0.0.0/0 nos servidores web viola o princípio do menor privilégio. Os servidores web estão em sub-redes privadas e devem receber tráfego apenas do balanceador de carga, não de qualquer endereço IP da internet.",
      "As ACLs de rede não suportam referências a grupos de segurança como origem/destino — elas trabalham apenas com blocos CIDR. Além disso, permitir a porta 443 de 0.0.0.0/0 nos servidores web viola o princípio do menor privilégio.",
      "Esta é a implementação correta do princípio do menor privilégio usando Security Groups. O grupo de segurança dos servidores web permite tráfego HTTPS (443) apenas referenciando o grupo de segurança do balanceador de carga como origem — somente o tráfego vindo do LB é permitido. O grupo de segurança do MySQL permite tráfego na porta 3306 apenas referenciando o grupo de segurança dos servidores web como origem — somente os servidores web podem acessar o banco. Security Groups suportam nativamente referências a outros Security Groups.",
      "As ACLs de rede não suportam referências a grupos de segurança — elas trabalham apenas com endereços IP e blocos CIDR. Portanto, não é possível referenciar o grupo de segurança do balanceador de carga em uma regra de ACL de rede."
    ],
    "sourceDocuments": [
      {
        "examNumber": 1,
        "questionNumber": 8,
        "fileName": "Simulado Comentado 1 Novo DPCN.pdf",
        "questionPage": 25,
        "explanationPages": [
          26
        ]
      }
    ]
  },
  {
    "id": 1109,
    "domain": "Alto Desempenho",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa de e-commerce está executando um aplicativo de múltiplas camadas na AWS. As camadas de front-end e back-end são executadas no Amazon EC2, e o banco de dados é executado no Amazon RDS for MySQL. A camada de back-end se comunica com a instância RDS. Há chamadas frequentes para retornar conjuntos de dados idênticos do banco de dados que estão causando lentidões no desempenho. Qual ação deve ser tomada para melhorar o desempenho do back-end?",
    "options": [
      "Implementar o Amazon SNS para armazenar as chamadas ao banco de dados.",
      "Implementar o Amazon ElastiCache para armazenar em cache os grandes conjuntos de dados.",
      "Implementar uma réplica de leitura RDS for MySQL para armazenar em cache as chamadas ao banco de dados.",
      "Implementar o Amazon Kinesis Data Firehose para transmitir as chamadas para o banco de dados."
    ],
    "correctIndices": [
      1
    ],
    "keyword": "ElastiCache para consultas repetidas",
    "summary": "O Amazon ElastiCache é a solução ideal para esse cenário. Quando há chamadas frequentes retornando conjuntos de dados idênticos, o ElastiCache armazena os resultados dessas consultas em memória (cache). As requisições subsequentes para os mesmos dados são servidas diretamente do cache em microsegundos, sem necessitar acessar o banco de dados RDS. Isso reduz drasticamente a carga no banco de dados e melhora significativamente o desempenho do back-end.",
    "optionExplanations": [
      "O Amazon SNS é um serviço de notificações pub/sub — ele não armazena dados nem faz cache de resultados de consultas. Não tem qualquer função de melhoria de desempenho de banco de dados para consultas repetidas.",
      "O Amazon ElastiCache é a solução ideal para esse cenário. Quando há chamadas frequentes retornando conjuntos de dados idênticos, o ElastiCache armazena os resultados dessas consultas em memória (cache). As requisições subsequentes para os mesmos dados são servidas diretamente do cache em microsegundos, sem necessitar acessar o banco de dados RDS. Isso reduz drasticamente a carga no banco de dados e melhora significativamente o desempenho do back-end.",
      "Uma réplica de leitura do RDS distribui a carga de leitura para uma segunda instância de banco de dados, mas ainda executa todas as consultas SQL contra um banco de dados relacional completo. Não é um mecanismo de cache — não armazena resultados em memória para respostas imediatas. Além disso, o enunciado menciona \"conjuntos de dados idênticos\", para os quais um cache em memória é muito mais eficiente.",
      "O Amazon Kinesis Data Firehose é um serviço de streaming de dados para ingestão e entrega de dados em tempo real para destinos como S3, Redshift ou OpenSearch. Não tem qualquer função de cache ou melhoria de desempenho para consultas repetidas ao banco de dados."
    ],
    "sourceDocuments": [
      {
        "examNumber": 1,
        "questionNumber": 9,
        "fileName": "Simulado Comentado 1 Novo DPCN.pdf",
        "questionPage": 28,
        "explanationPages": [
          29
        ]
      }
    ]
  },
  {
    "id": 1110,
    "domain": "Segurança",
    "multiSelect": true,
    "requiredCount": 2,
    "question": "Um novo funcionário se juntou a uma empresa como engenheiro de implantação. O engenheiro de implantação usará modelos do AWS CloudFormation para criar múltiplos recursos AWS. Um arquiteto de soluções quer que o engenheiro de implantação realize atividades de trabalho seguindo o princípio do menor privilégio. Qual combinação de ações o arquiteto de soluções deve tomar para isso? (Escolha duas.)",
    "options": [
      "Ter o engenheiro de implantação usar credenciais de usuário root da conta AWS para realizar operações de pilha AWS CloudFormation.",
      "Criar um novo usuário IAM para o engenheiro de implantação e adicionar o usuário IAM a um grupo que tem a política IAM PowerUsers anexada.",
      "Criar um novo usuário IAM para o engenheiro de implantação e adicionar o usuário IAM a um grupo que tem a política IAM AdministratorAccess anexada.",
      "Criar um novo usuário IAM para o engenheiro de implantação e adicionar o usuário IAM a um grupo que tem uma política IAM que permite apenas ações do AWS CloudFormation.",
      "Criar uma função IAM para o engenheiro de implantação para definir explicitamente as permissões específicas à pilha do AWS CloudFormation e lançar pilhas usando essa função IAM."
    ],
    "correctIndices": [
      3,
      4
    ],
    "keyword": "CloudFormation e menor privilégio",
    "summary": "Criar um usuário IAM específico e adicioná-lo a um grupo com apenas as permissões necessárias para ações do CloudFormation implementa corretamente o princípio do menor privilégio. O usuário só pode realizar as ações específicas necessárias para seu trabalho, sem acesso a outros serviços.\n\nCriar uma função IAM com permissões explicitamente definidas e específicas para as pilhas CloudFormation é uma prática recomendada adicional. A função define exatamente quais ações são permitidas em quais recursos, e o engenheiro assume essa função para lançar pilhas. Isso fornece controle granular e auditabilidade, seguindo o princípio do menor privilégio.",
    "optionExplanations": [
      "Usar credenciais do usuário root é uma violação grave das melhores práticas de segurança da AWS. O usuário root tem acesso irrestrito a todos os recursos da conta e nunca deve ser usado para tarefas operacionais do dia a dia. Isso viola diretamente o princípio do menor privilégio.",
      "A política PowerUsers concede acesso amplo a quase todos os serviços AWS, exceto gerenciamento de IAM. Isso vai muito além do necessário para um engenheiro de implantação que precisa apenas usar CloudFormation, violando o princípio do menor privilégio.",
      "A política AdministratorAccess concede acesso total a todos os recursos AWS — é equivalente ao usuário root para fins práticos. Conceder acesso de administrador a um engenheiro de implantação é a maior violação possível do princípio do menor privilégio.",
      "Criar um usuário IAM específico e adicioná-lo a um grupo com apenas as permissões necessárias para ações do CloudFormation implementa corretamente o princípio do menor privilégio. O usuário só pode realizar as ações específicas necessárias para seu trabalho, sem acesso a outros serviços.",
      "Criar uma função IAM com permissões explicitamente definidas e específicas para as pilhas CloudFormation é uma prática recomendada adicional. A função define exatamente quais ações são permitidas em quais recursos, e o engenheiro assume essa função para lançar pilhas. Isso fornece controle granular e auditabilidade, seguindo o princípio do menor privilégio."
    ],
    "sourceDocuments": [
      {
        "examNumber": 1,
        "questionNumber": 10,
        "fileName": "Simulado Comentado 1 Novo DPCN.pdf",
        "questionPage": 31,
        "explanationPages": [
          32
        ]
      }
    ]
  },
  {
    "id": 1111,
    "domain": "Segurança",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa está implantando um aplicativo web de duas camadas em uma VPC. A camada web está usando um grupo de Auto Scaling do Amazon EC2 com sub-redes públicas que abrangem múltiplas Zonas de Disponibilidade. A camada de banco de dados consiste em uma instância de banco de dados Amazon RDS for MySQL em sub-redes privadas separadas. A camada web requer acesso ao banco de dados para recuperar informações sobre produtos. O aplicativo web não está funcionando como pretendido. O aplicativo web relata que não pode se conectar ao banco de dados. O banco de dados está confirmado como ativo e em execução. Todas as configurações para ACLs de rede, grupos de segurança e tabelas de rotas ainda estão em seus estados padrão. O que um arquiteto de soluções deve recomendar para corrigir o aplicativo?",
    "options": [
      "Adicionar uma regra explícita à ACL de rede da sub-rede privada para permitir tráfego das instâncias EC2 da camada web.",
      "Adicionar uma rota na tabela de rotas da VPC para permitir tráfego entre as instâncias EC2 da camada web e a camada de banco de dados.",
      "Implantar as instâncias EC2 da camada web e a instância RDS de banco de dados em duas VPCs separadas e configurar o peering de VPC.",
      "Adicionar uma regra de entrada ao grupo de segurança da instância RDS de banco de dados para permitir tráfego do grupo de segurança da camada web."
    ],
    "correctIndices": [
      3
    ],
    "keyword": "RDS: origem pelo security group web",
    "summary": "O Security Group padrão de uma instância RDS recém-criada não permite tráfego de entrada de outros Security Groups — ele nega tudo por padrão (deny all inbound). Para que as instâncias EC2 da camada web possam se conectar ao RDS MySQL na porta 3306, é necessário adicionar uma regra de entrada (inbound rule) no Security Group do RDS que permita tráfego na porta 3306 originado do Security Group da camada web. Esta é a configuração padrão necessária e a causa mais comum desse tipo de problema.",
    "optionExplanations": [
      "As ACLs de rede padrão da AWS permitem todo o tráfego de entrada e saída (allow all). Com configurações padrão, as ACLs de rede não estão bloqueando o tráfego. Adicionar uma regra explícita na ACL não resolve o problema raiz, que está nos Security Groups.",
      "As tabelas de rotas padrão dentro de uma VPC já permitem comunicação entre todas as sub-redes da mesma VPC através da rota local (local route). Não há necessidade de adicionar rotas adicionais para comunicação intra-VPC. O problema não está no roteamento.",
      "Separar instâncias EC2 e RDS em VPCs diferentes e usar peering de VPC é desnecessário e adiciona complexidade arquitetural sem necessidade. O problema é muito mais simples e está nos Security Groups dentro da mesma VPC.",
      "O Security Group padrão de uma instância RDS recém-criada não permite tráfego de entrada de outros Security Groups — ele nega tudo por padrão (deny all inbound). Para que as instâncias EC2 da camada web possam se conectar ao RDS MySQL na porta 3306, é necessário adicionar uma regra de entrada (inbound rule) no Security Group do RDS que permita tráfego na porta 3306 originado do Security Group da camada web. Esta é a configuração padrão necessária e a causa mais comum desse tipo de problema."
    ],
    "sourceDocuments": [
      {
        "examNumber": 1,
        "questionNumber": 11,
        "fileName": "Simulado Comentado 1 Novo DPCN.pdf",
        "questionPage": 34,
        "explanationPages": [
          35
        ]
      }
    ]
  },
  {
    "id": 1112,
    "domain": "Alto Desempenho",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa tem um grande conjunto de dados para seu negócio de publicidade online armazenado em uma instância de banco de dados Amazon RDS for MySQL em uma única Zona de Disponibilidade. A empresa quer que as consultas de relatório de negócios sejam executadas sem impactar as operações de escrita na instância de banco de dados de produção. Qual solução atende a esses requisitos?",
    "options": [
      "Implantar réplicas de leitura RDS para processar as consultas de relatório de negócios.",
      "Escalar horizontalmente a instância de banco de dados colocando-a atrás de um Elastic Load Balancer.",
      "Escalar verticalmente a instância de banco de dados para um tipo de instância maior para lidar com operações de escrita e consultas.",
      "Implantar a instância de banco de dados em múltiplas Zonas de Disponibilidade para processar as consultas de relatório de negócios."
    ],
    "correctIndices": [
      0
    ],
    "keyword": "RDS: réplicas de leitura",
    "summary": "As Réplicas de Leitura do RDS criam uma cópia assíncrona da instância primária especificamente para cargas de trabalho de leitura. As consultas de relatório de negócios são direcionadas para a réplica de leitura, completamente isoladas das operações de escrita que continuam na instância primária. Isso garante que os relatórios não impactem o desempenho de produção. É a solução ideal para separar cargas de trabalho de leitura intensiva de operações de escrita.",
    "optionExplanations": [
      "As Réplicas de Leitura do RDS criam uma cópia assíncrona da instância primária especificamente para cargas de trabalho de leitura. As consultas de relatório de negócios são direcionadas para a réplica de leitura, completamente isoladas das operações de escrita que continuam na instância primária. Isso garante que os relatórios não impactem o desempenho de produção. É a solução ideal para separar cargas de trabalho de leitura intensiva de operações de escrita.",
      "O Elastic Load Balancer não pode ser colocado na frente de uma instância RDS para balancear conexões de banco de dados. O RDS não suporta balanceamento de carga horizontal através de ELB — ele não é uma aplicação web stateless. Esta opção não é tecnicamente viável para bancos de dados RDS.",
      "Escalar verticalmente (aumentar o tipo de instância) pode aumentar a capacidade de processamento, mas não isola as consultas de relatório das operações de escrita. Ambas as cargas de trabalho ainda competiriam pelos mesmos recursos, e consultas longas de relatório ainda poderiam impactar as operações de produção.",
      "O RDS Multi-AZ cria uma instância standby em outra Zona de Disponibilidade para failover automático — a instância secundária não aceita conexões de leitura em operação normal. Não resolve o problema de isolar as consultas de relatório das operações de escrita de produção."
    ],
    "sourceDocuments": [
      {
        "examNumber": 1,
        "questionNumber": 12,
        "fileName": "Simulado Comentado 1 Novo DPCN.pdf",
        "questionPage": 37,
        "explanationPages": [
          38
        ]
      }
    ]
  },
  {
    "id": 1113,
    "domain": "Resiliência",
    "multiSelect": true,
    "requiredCount": 2,
    "question": "Uma empresa hospeda um aplicativo de e-commerce de três camadas em uma frota de instâncias do Amazon EC2. As instâncias são executadas em um grupo de Auto Scaling atrás de um Application Load Balancer (ALB). Todos os dados de e-commerce são armazenados em uma instância de banco de dados Amazon RDS for MariaDB Multi-AZ. A empresa quer otimizar o gerenciamento de sessão do cliente durante as transações. O aplicativo deve armazenar dados de sessão de forma durável. Quais soluções atenderão a esses requisitos? (Escolha duas.)",
    "options": [
      "Ativar o recurso de afinidade de sessão (sticky sessions) no ALB.",
      "Usar uma tabela do Amazon DynamoDB para armazenar informações de sessão do cliente.",
      "Implantar um pool de usuários do Amazon Cognito para gerenciar informações de sessão do usuário.",
      "Implantar um cluster do Amazon ElastiCache for Redis para armazenar informações de sessão do cliente.",
      "Usar o AWS Systems Manager Application Manager no aplicativo para gerenciar informações de sessão do usuário."
    ],
    "correctIndices": [
      1,
      3
    ],
    "keyword": "Estado de sessão fora das instâncias",
    "summary": "O Amazon DynamoDB é um banco de dados NoSQL totalmente gerenciado, altamente disponível e durável — ideal para armazenar dados de sessão. Os dados de sessão são armazenados externamente às instâncias EC2, permitindo que qualquer instância do grupo de Auto Scaling atenda qualquer usuário sem perda de estado. É uma solução escalável e durável para gerenciamento de sessão.\n\nO Amazon ElastiCache for Redis é uma solução clássica e amplamente usada para armazenamento de dados de sessão. O Redis oferece persistência de dados (RDB e AOF), alta disponibilidade com replicação, e acesso em memória de baixíssima latência. Os dados de sessão são armazenados externamente às instâncias EC2, garantindo durabilidade e permitindo que qualquer instância acesse a sessão de qualquer usuário.",
    "optionExplanations": [
      "As sticky sessions (sessões adesivas) vinculam um usuário a uma instância EC2 específica, o que cria dependência de instância única. Se essa instância for encerrada pelo Auto Scaling, os dados de sessão são perdidos. Não fornece armazenamento durável de sessão — viola o requisito de durabilidade.",
      "O Amazon DynamoDB é um banco de dados NoSQL totalmente gerenciado, altamente disponível e durável — ideal para armazenar dados de sessão. Os dados de sessão são armazenados externamente às instâncias EC2, permitindo que qualquer instância do grupo de Auto Scaling atenda qualquer usuário sem perda de estado. É uma solução escalável e durável para gerenciamento de sessão.",
      "O Amazon Cognito é um serviço de autenticação e autorização de usuários (identity management) — não é uma solução de armazenamento de dados de sessão de transações. Ele gerencia tokens de identidade e autenticação, não o estado da sessão do carrinho de compras ou dados de transação.",
      "O Amazon ElastiCache for Redis é uma solução clássica e amplamente usada para armazenamento de dados de sessão. O Redis oferece persistência de dados (RDB e AOF), alta disponibilidade com replicação, e acesso em memória de baixíssima latência. Os dados de sessão são armazenados externamente às instâncias EC2, garantindo durabilidade e permitindo que qualquer instância acesse a sessão de qualquer usuário.",
      "O AWS Systems Manager Application Manager é uma ferramenta de gerenciamento operacional para visualizar e gerenciar recursos de aplicações. Não é uma solução de armazenamento de dados de sessão e não possui funcionalidade para gerenciar estado de sessão de usuários em aplicações web."
    ],
    "sourceDocuments": [
      {
        "examNumber": 1,
        "questionNumber": 13,
        "fileName": "Simulado Comentado 1 Novo DPCN.pdf",
        "questionPage": 40,
        "explanationPages": [
          41
        ]
      }
    ]
  },
  {
    "id": 1114,
    "domain": "Resiliência",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa precisa de uma estratégia de backup para seu aplicativo web sem estado de três camadas. O aplicativo web é executado em instâncias do Amazon EC2 em um grupo de Auto Scaling com uma política de escalamento dinâmico configurada para responder a eventos de escalamento. O banco de dados é executado no Amazon RDS for PostgreSQL. O aplicativo web não requer armazenamento local temporário nas instâncias EC2. O objetivo de ponto de recuperação (RPO) da empresa é de 2 horas. A estratégia de backup deve maximizar a escalabilidade e otimizar a utilização de recursos para esse ambiente. Qual solução atenderá a esses requisitos?",
    "options": [
      "Tirar snapshots dos volumes Amazon Elastic Block Store (Amazon EBS) das instâncias EC2 e do banco de dados a cada 2 horas para atender ao RPO.",
      "Configurar uma política de ciclo de vida de snapshot para tirar snapshots do Amazon Elastic Block Store (Amazon EBS). Habilitar backups automatizados no Amazon RDS para atender ao RPO.",
      "Reter as últimas Amazon Machine Images (AMIs) da camada web e de aplicativo. Habilitar backups automatizados no Amazon RDS e usar recuperação point-in-time para atender ao RPO.",
      "Tirar snapshots dos volumes Amazon Elastic Block Store (Amazon EBS) das instâncias EC2 a cada 2 horas. Habilitar backups automatizados no Amazon RDS e usar recuperação point-in-time para atender ao RPO."
    ],
    "correctIndices": [
      2
    ],
    "keyword": "Aplicação stateless e RDS PITR",
    "summary": "Como o aplicativo é sem estado, as instâncias EC2 não precisam de backups frequentes de volume EBS — basta reter as AMIs que definem a configuração da camada web e de aplicativo para poder recriar instâncias quando necessário. Para o banco de dados RDS, os backups automatizados com recuperação point-in-time (PITR) permitem restaurar o banco para qualquer ponto nos últimos dias com granularidade de até 5 minutos, atendendo ao RPO de 2 horas. Esta combinação maximiza a escalabilidade e otimiza a utilização de recursos.",
    "optionExplanations": [
      "Tirar snapshots EBS de instâncias EC2 sem estado a cada 2 horas é desnecessário e ineficiente. Como o aplicativo é sem estado (stateless) e usa Auto Scaling, não há dados persistentes nas instâncias EC2 que precisem de backup. Fazer snapshot do banco de dados individualmente a cada 2 horas também é menos eficiente do que usar backups automatizados com PITR.",
      "Semelhante à opção A, configurar snapshots EBS para instâncias sem estado é uma utilização ineficiente de recursos. O aplicativo é stateless — as instâncias EC2 podem ser recriadas a qualquer momento a partir de uma AMI. Não otimiza a utilização de recursos como solicitado.",
      "Como o aplicativo é sem estado, as instâncias EC2 não precisam de backups frequentes de volume EBS — basta reter as AMIs que definem a configuração da camada web e de aplicativo para poder recriar instâncias quando necessário. Para o banco de dados RDS, os backups automatizados com recuperação point-in-time (PITR) permitem restaurar o banco para qualquer ponto nos últimos dias com granularidade de até 5 minutos, atendendo ao RPO de 2 horas. Esta combinação maximiza a escalabilidade e otimiza a utilização de recursos.",
      "Tirar snapshots EBS das instâncias EC2 sem estado a cada 2 horas é um desperdício de recursos. Para um aplicativo stateless com Auto Scaling, os dados relevantes são o código/configuração (coberto pela AMI) e o banco de dados (coberto pelo RDS). Snapshots frequentes de EBS de instâncias sem estado não agregam valor e aumentam custos desnecessariamente."
    ],
    "sourceDocuments": [
      {
        "examNumber": 1,
        "questionNumber": 14,
        "fileName": "Simulado Comentado 1 Novo DPCN.pdf",
        "questionPage": 43,
        "explanationPages": [
          44
        ]
      }
    ]
  },
  {
    "id": 1115,
    "domain": "Segurança",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa quer implantar um novo aplicativo web público na AWS. O aplicativo inclui uma camada de servidor web que usa instâncias do Amazon EC2. O aplicativo também inclui uma camada de banco de dados que usa uma instância de banco de dados Amazon RDS for MySQL. O aplicativo deve ser seguro e acessível para clientes globais que têm endereços IP dinâmicos. Como um arquiteto de soluções deve configurar os grupos de segurança para atender a esses requisitos?",
    "options": [
      "Configurar o grupo de segurança para os servidores web para permitir tráfego de entrada na porta 443 de 0.0.0.0/0. Configurar o grupo de segurança para a instância de banco de dados para permitir tráfego de entrada na porta 3306 do grupo de segurança dos servidores web.",
      "Configurar o grupo de segurança para os servidores web para permitir tráfego de entrada na porta 443 dos endereços IP dos clientes. Configurar o grupo de segurança para a instância de banco de dados para permitir tráfego de entrada na porta 3306 do grupo de segurança dos servidores web.",
      "Configurar o grupo de segurança para os servidores web para permitir tráfego de entrada na porta 443 dos endereços IP dos clientes. Configurar o grupo de segurança para a instância de banco de dados para permitir tráfego de entrada na porta 3306 dos endereços IP dos clientes.",
      "Configurar o grupo de segurança para os servidores web para permitir tráfego de entrada na porta 443 de 0.0.0.0/0. Configurar o grupo de segurança para a instância de banco de dados para permitir tráfego de entrada na porta 3306 de 0.0.0.0/0."
    ],
    "correctIndices": [
      0
    ],
    "keyword": "HTTPS público e banco restrito",
    "summary": "Para um aplicativo público acessível por clientes globais com endereços IP dinâmicos, o servidor web deve aceitar tráfego HTTPS (porta 443) de qualquer endereço IP (0.0.0.0/0) — não é possível restringir por IP quando os clientes têm IPs dinâmicos. O banco de dados deve aceitar conexões apenas dos servidores web, referenciando o grupo de segurança dos servidores web como origem na porta 3306. Esta configuração implementa corretamente o princípio do menor privilégio para o banco de dados enquanto permite acesso público necessário aos servidores web.",
    "optionExplanations": [
      "Para um aplicativo público acessível por clientes globais com endereços IP dinâmicos, o servidor web deve aceitar tráfego HTTPS (porta 443) de qualquer endereço IP (0.0.0.0/0) — não é possível restringir por IP quando os clientes têm IPs dinâmicos. O banco de dados deve aceitar conexões apenas dos servidores web, referenciando o grupo de segurança dos servidores web como origem na porta 3306. Esta configuração implementa corretamente o princípio do menor privilégio para o banco de dados enquanto permite acesso público necessário aos servidores web.",
      "Restringir o acesso ao servidor web pelos endereços IP dos clientes não é viável quando os clientes têm endereços IP dinâmicos — os IPs mudam constantemente e não podem ser predefinidos. Tornaria o aplicativo inacessível para a maioria dos usuários.",
      "Além do problema de IPs dinâmicos dos clientes para o servidor web, permitir acesso ao banco de dados MySQL (porta 3306) diretamente dos endereços IP dos clientes é uma grave falha de segurança. O banco de dados nunca deve ser acessível diretamente da internet.",
      "Permitir tráfego de entrada na porta 3306 de 0.0.0.0/0 para o banco de dados é uma grave falha de segurança — expõe o banco de dados MySQL diretamente à internet, tornando-o vulnerável a ataques de força bruta e exploits. O banco de dados deve ser acessível apenas pelos servidores web."
    ],
    "sourceDocuments": [
      {
        "examNumber": 1,
        "questionNumber": 15,
        "fileName": "Simulado Comentado 1 Novo DPCN.pdf",
        "questionPage": 46,
        "explanationPages": [
          47
        ]
      }
    ]
  }
];
