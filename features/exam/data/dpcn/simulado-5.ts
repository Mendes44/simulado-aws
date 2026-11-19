import type { Question } from '../../types';

// Enunciados, alternativas e comentários extraídos dos PDFs fornecidos.
// Duplicatas entre arquivos mantêm todas as origens em sourceDocuments.
export const DPCN_5: Question[] = [
  {
    "id": 1501,
    "domain": "Otimização de Custos",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa armazena objetos de dados no Amazon S3 Standard. 75% dos dados raramente são acessados após 30 dias. A empresa precisa que todos os dados permaneçam imediatamente acessíveis com a mesma alta disponibilidade e resiliência, mas quer minimizar custos. Qual solução atenderá a esses requisitos?",
    "options": [
      "Mover os objetos de dados para o S3 Glacier Deep Archive após 30 dias.",
      "Mover os objetos de dados para o S3 Standard-Infrequent Access (S3 Standard-IA) após 30 dias.",
      "Mover os objetos de dados para o S3 One Zone-Infrequent Access (S3 One Zone-IA) após 30 dias.",
      "Mover os objetos de dados para o S3 One Zone-Infrequent Access (S3 One Zone-IA) imediatamente."
    ],
    "correctIndices": [
      1
    ],
    "keyword": "S3 Standard-IA após 30 dias",
    "summary": "O S3 Standard-IA é a escolha ideal para esse cenário. Ele mantém a mesma alta disponibilidade (99,9%) e resiliência (99,999999999%) do S3 Standard, armazenando dados em múltiplas Zonas de Disponibilidade. O acesso é imediato, sem tempo de recuperação. O custo de armazenamento é significativamente menor que o S3 Standard, sendo ideal para dados acessados com pouca frequência mas que precisam estar sempre disponíveis.",
    "optionExplanations": [
      "O S3 Glacier Deep Archive é voltado para arquivamento de longo prazo com tempo de recuperação de 12 a 48 horas. Isso contradiz diretamente o requisito de dados imediatamente acessíveis.",
      "O S3 Standard-IA é a escolha ideal para esse cenário. Ele mantém a mesma alta disponibilidade (99,9%) e resiliência (99,999999999%) do S3 Standard, armazenando dados em múltiplas Zonas de Disponibilidade. O acesso é imediato, sem tempo de recuperação. O custo de armazenamento é significativamente menor que o S3 Standard, sendo ideal para dados acessados com pouca frequência mas que precisam estar sempre disponíveis.",
      "O S3 One Zone-IA armazena dados em apenas uma Zona de Disponibilidade, oferecendo disponibilidade de 99,5% — inferior ao S3 Standard e ao S3 Standard-IA. O enunciado exige a mesma alta disponibilidade e resiliência do S3 Standard, o que elimina qualquer opção One Zone-IA.",
      "Além de não atender ao requisito de alta disponibilidade e resiliência por usar apenas uma AZ, mover os dados imediatamente para One Zone-IA é desnecessário — os dados são acessados frequentemente nos primeiros 30 dias, e movê-los antes desse período resultaria em custos de recuperação mais altos sem benefício de economia real."
    ],
    "sourceDocuments": [
      {
        "examNumber": 5,
        "questionNumber": 1,
        "fileName": "Simulado Comentado 5 Novo DPCN.pdf",
        "questionPage": 4,
        "explanationPages": [
          5
        ]
      }
    ]
  },
  {
    "id": 1502,
    "domain": "Resiliência",
    "multiSelect": true,
    "requiredCount": 2,
    "question": "Uma empresa de jogos está movendo seu placar público de um data center para a Nuvem AWS. A empresa usa instâncias do Amazon EC2 Windows Server atrás de um Application Load Balancer para hospedar seu aplicativo dinâmico. A empresa precisa de uma solução de armazenamento altamente disponível para o aplicativo. O aplicativo consiste em arquivos estáticos e código do lado do servidor dinâmico. Qual combinação de etapas um arquiteto de soluções deve tomar para atender a esses requisitos? (Escolha duas.)",
    "options": [
      "Armazenar os arquivos estáticos no Amazon S3. Usar o Amazon CloudFront para armazenar objetos em cache na borda.",
      "Armazenar os arquivos estáticos no Amazon S3. Usar o Amazon ElastiCache para armazenar objetos em cache na borda.",
      "Armazenar o código do lado do servidor no Amazon Elastic File System (Amazon EFS). Montar o volume EFS em cada instância EC2 para compartilhar os arquivos.",
      "Armazenar o código do lado do servidor no Amazon FSx for Windows File Server. Montar o volume FSx for Windows File Server em cada instância EC2 para compartilhar os arquivos.",
      "Armazenar o código do lado do servidor em um volume Amazon Elastic Block Store (Amazon EBS) General Purpose SSD (gp2). Montar o volume EBS em cada instância EC2 para compartilhar os arquivos."
    ],
    "correctIndices": [
      0,
      3
    ],
    "keyword": "S3, CloudFront e FSx Windows",
    "summary": "O Amazon S3 é a solução ideal para armazenar arquivos estáticos com alta disponibilidade e durabilidade. O CloudFront distribui esses arquivos globalmente através de edge locations, reduzindo a latência para os usuários finais e diminuindo a carga nas origens. Essa combinação é a arquitetura padrão da AWS para servir conteúdo estático de forma altamente disponível e performática.\n\nO Amazon FSx for Windows File Server é projetado especificamente para instâncias Windows Server. Ele fornece um sistema de arquivos compartilhado via protocolo SMB, permitindo que múltiplas instâncias EC2 Windows montem e acessem o mesmo código do lado do servidor simultaneamente. É altamente disponível e totalmente gerenciado pela AWS.",
    "optionExplanations": [
      "O Amazon S3 é a solução ideal para armazenar arquivos estáticos com alta disponibilidade e durabilidade. O CloudFront distribui esses arquivos globalmente através de edge locations, reduzindo a latência para os usuários finais e diminuindo a carga nas origens. Essa combinação é a arquitetura padrão da AWS para servir conteúdo estático de forma altamente disponível e performática.",
      "O Amazon ElastiCache é um serviço de cache em memória para dados de aplicação — não é uma CDN e não armazena objetos em cache na borda para distribuição global. Usar ElastiCache para cache de arquivos estáticos não é o propósito do serviço e não atende ao requisito de alta disponibilidade global.",
      "O Amazon EFS é compatível com instâncias Linux via protocolo NFS. As instâncias EC2 descritas no cenário são Windows Server, e o EFS não é compatível nativamente com Windows. Montar um volume EFS em instâncias Windows exigiria configurações complexas e não suportadas nativamente.",
      "O Amazon FSx for Windows File Server é projetado especificamente para instâncias Windows Server. Ele fornece um sistema de arquivos compartilhado via protocolo SMB, permitindo que múltiplas instâncias EC2 Windows montem e acessem o mesmo código do lado do servidor simultaneamente. É altamente disponível e totalmente gerenciado pela AWS.",
      "Volumes EBS são dispositivos de bloco que só podem ser montados em uma única instância EC2 por vez (exceto em configurações multi-attach específicas e limitadas). Não é possível compartilhar um volume EBS entre múltiplas instâncias EC2 de forma convencional, tornando esta opção inviável para o cenário descrito."
    ],
    "sourceDocuments": [
      {
        "examNumber": 5,
        "questionNumber": 2,
        "fileName": "Simulado Comentado 5 Novo DPCN.pdf",
        "questionPage": 7,
        "explanationPages": [
          8
        ]
      }
    ]
  },
  {
    "id": 1503,
    "domain": "Alto Desempenho",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa de mídia social executa seu aplicativo em instâncias do Amazon EC2 atrás de um Application Load Balancer (ALB). O ALB é a origem de uma distribuição do Amazon CloudFront. O aplicativo tem mais de um bilhão de imagens armazenadas em um bucket do Amazon S3 e processa milhares de imagens por segundo. A empresa quer redimensionar as imagens dinamicamente e servir formatos apropriados para os clientes. Qual solução atenderá a esses requisitos com o MENOR overhead operacional?",
    "options": [
      "Instalar uma biblioteca de gerenciamento de imagens externo em uma instância EC2. Usar a biblioteca de gerenciamento de imagens para processar as imagens.",
      "Criar uma política de solicitação de origem do CloudFront. Usar a política para redimensionar automaticamente as imagens e servir o formato apropriado com base no cabeçalho HTTP User-Agent na solicitação.",
      "Usar uma função Lambda@Edge com uma biblioteca de gerenciamento de imagens externo. Associar a função Lambda@Edge aos comportamentos do CloudFront que servem as imagens.",
      "Criar uma política de cabeçalhos de resposta do CloudFront. Usar a política para redimensionar automaticamente as imagens e servir o formato apropriado com base no cabeçalho HTTP User-Agent na solicitação."
    ],
    "correctIndices": [
      2
    ],
    "keyword": "Lambda@Edge para imagens",
    "summary": "O Lambda@Edge executa código diretamente nos pontos de presença do CloudFront, mais próximo dos usuários finais. Ao associar uma função Lambda@Edge com uma biblioteca de processamento de imagens aos comportamentos do CloudFront, as imagens podem ser redimensionadas e convertidas dinamicamente no momento da requisição, com baixíssima latência. A solução escala automaticamente com a demanda e não requer gerenciamento de infraestrutura — resultando no menor overhead operacional.",
    "optionExplanations": [
      "Instalar e gerenciar uma biblioteca de processamento de imagens em instâncias EC2 introduz alto overhead operacional — gerenciamento de servidores, escalabilidade manual, patching e manutenção. Para milhares de imagens por segundo, essa abordagem seria um gargalo significativo e não escala automaticamente.",
      "Políticas de solicitação de origem do CloudFront controlam quais informações são incluídas nas requisições enviadas à origem — elas não possuem capacidade de processar ou redimensionar imagens. Não existe funcionalidade nativa no CloudFront para transformar imagens dinamicamente através de políticas de solicitação.",
      "O Lambda@Edge executa código diretamente nos pontos de presença do CloudFront, mais próximo dos usuários finais. Ao associar uma função Lambda@Edge com uma biblioteca de processamento de imagens aos comportamentos do CloudFront, as imagens podem ser redimensionadas e convertidas dinamicamente no momento da requisição, com baixíssima latência. A solução escala automaticamente com a demanda e não requer gerenciamento de infraestrutura — resultando no menor overhead operacional.",
      "Políticas de cabeçalhos de resposta do CloudFront controlam os cabeçalhos HTTP retornados ao cliente — elas não possuem capacidade de processar, redimensionar ou converter imagens. Assim como a opção B, não existe funcionalidade nativa no CloudFront para transformar imagens através de políticas de cabeçalhos de resposta."
    ],
    "sourceDocuments": [
      {
        "examNumber": 5,
        "questionNumber": 3,
        "fileName": "Simulado Comentado 5 Novo DPCN.pdf",
        "questionPage": 10,
        "explanationPages": [
          11
        ]
      }
    ]
  },
  {
    "id": 1504,
    "domain": "Segurança",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Um hospital precisa armazenar registros de pacientes em um bucket do Amazon S3. A equipe de conformidade deve garantir que todas as informações de saúde protegidas (PHI) sejam criptografadas em trânsito e em repouso. A equipe de conformidade deve administrar a chave de criptografia para dados em repouso. Qual solução atenderá a esses requisitos?",
    "options": [
      "Criar um certificado SSL/TLS público no AWS Certificate Manager (ACM). Associar o certificado ao Amazon S3. Configurar a criptografia padrão para cada bucket S3 para usar SSE-KMS. Atribuir à equipe de conformidade o gerenciamento das chaves KMS.",
      "Usar a condição aws:SecureTransport nas políticas de bucket S3 para permitir apenas conexões HTTPS. Configurar a criptografia padrão para usar SSE-S3. Atribuir à equipe de conformidade o gerenciamento das chaves SSE-S3.",
      "Usar a condição aws:SecureTransport nas políticas de bucket S3 para permitir apenas conexões HTTPS. Configurar a criptografia padrão para usar SSE-KMS. Atribuir à equipe de conformidade o gerenciamento das chaves KMS.",
      "Usar a condição aws:SecureTransport nas políticas de bucket S3 para permitir apenas conexões HTTPS. Usar o Amazon Macie para proteger os dados sensíveis. Atribuir à equipe de conformidade o gerenciamento do Macie."
    ],
    "correctIndices": [
      2
    ],
    "keyword": "HTTPS e SSE-KMS no S3",
    "summary": "Esta solução atende a todos os requisitos de forma completa. A condição aws:SecureTransport na política do bucket garante criptografia em trânsito, rejeitando qualquer conexão HTTP não criptografada. O SSE-KMS com chaves gerenciadas pelo cliente permite que a equipe de conformidade do hospital administre totalmente as chaves de criptografia — incluindo controle de acesso, rotação e auditoria via AWS KMS.",
    "optionExplanations": [
      "O AWS Certificate Manager gerencia certificados SSL/TLS para serviços como CloudFront, ALB e API Gateway — ele não pode ser associado diretamente ao Amazon S3 para criptografia em trânsito. O S3 já usa HTTPS nativamente e a forma correta de forçar conexões criptografadas é através da condição aws:SecureTransport na política do bucket.",
      "O SSE-S3 usa chaves gerenciadas pela própria AWS — a equipe de conformidade do hospital não teria controle sobre o gerenciamento dessas chaves. O requisito explícito é que a equipe de conformidade deve administrar a chave de criptografia, o que exige chaves gerenciadas pelo cliente via KMS.",
      "Esta solução atende a todos os requisitos de forma completa. A condição aws:SecureTransport na política do bucket garante criptografia em trânsito, rejeitando qualquer conexão HTTP não criptografada. O SSE-KMS com chaves gerenciadas pelo cliente permite que a equipe de conformidade do hospital administre totalmente as chaves de criptografia — incluindo controle de acesso, rotação e auditoria via AWS KMS.",
      "O Amazon Macie é um serviço de descoberta e classificação de dados sensíveis usando machine learning — ele identifica e alerta sobre dados sensíveis, mas não realiza criptografia. Usar o Macie não atende ao requisito de criptografar os dados em repouso nem ao requisito de a equipe administrar as chaves de criptografia."
    ],
    "sourceDocuments": [
      {
        "examNumber": 5,
        "questionNumber": 4,
        "fileName": "Simulado Comentado 5 Novo DPCN.pdf",
        "questionPage": 13,
        "explanationPages": [
          14
        ]
      }
    ]
  },
  {
    "id": 1505,
    "domain": "Segurança",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa usa o Amazon API Gateway para executar um gateway privado com duas APIs REST na mesma VPC. O serviço BuyStock chama o serviço CheckFunds pela internet em vez de pela VPC. Um arquiteto de soluções deve implementar uma solução para que as APIs se comuniquem pela VPC. Qual solução atenderá a esses requisitos com o MENOR número de alterações no código?",
    "options": [
      "Adicionar um cabeçalho X-API-Key no cabeçalho HTTP para autorização.",
      "Usar um endpoint de interface.",
      "Usar um endpoint de gateway.",
      "Adicionar uma fila do Amazon SQS entre as duas APIs REST."
    ],
    "correctIndices": [
      1
    ],
    "keyword": "API Gateway com endpoint de interface",
    "summary": "Um endpoint de interface (Interface VPC Endpoint) cria uma interface de rede privada dentro da VPC que permite comunicação direta com serviços AWS — incluindo o API Gateway — sem que o tráfego saia para a internet. Ao criar um endpoint de interface para o API Gateway, o serviço BuyStock passa a chamar o CheckFunds diretamente pela rede privada da VPC, com mínimas ou nenhuma alteração no código da aplicação.",
    "optionExplanations": [
      "Adicionar um cabeçalho X-API-Key é um mecanismo de autenticação/autorização de API — não altera o roteamento do tráfego. O problema descrito é de conectividade de rede, não de autenticação. Esta solução não faria com que as APIs se comunicassem pela VPC em vez da internet.",
      "Um endpoint de interface (Interface VPC Endpoint) cria uma interface de rede privada dentro da VPC que permite comunicação direta com serviços AWS — incluindo o API Gateway — sem que o tráfego saia para a internet. Ao criar um endpoint de interface para o API Gateway, o serviço BuyStock passa a chamar o CheckFunds diretamente pela rede privada da VPC, com mínimas ou nenhuma alteração no código da aplicação.",
      "Endpoints de gateway são suportados apenas para Amazon S3 e Amazon DynamoDB — não para o API Gateway. Portanto, esta opção não é tecnicamente aplicável ao cenário descrito.",
      "Adicionar uma fila SQS entre as duas APIs mudaria fundamentalmente a arquitetura de comunicação — de síncrona para assíncrona. Isso exigiria alterações significativas no código de ambas as APIs, contradizendo diretamente o requisito de menor número de alterações no código."
    ],
    "sourceDocuments": [
      {
        "examNumber": 5,
        "questionNumber": 5,
        "fileName": "Simulado Comentado 5 Novo DPCN.pdf",
        "questionPage": 16,
        "explanationPages": [
          17
        ]
      }
    ]
  },
  {
    "id": 1506,
    "domain": "Alto Desempenho",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa hospeda um aplicativo de jogos multiplayer na AWS. A empresa quer que o aplicativo leia dados com latência abaixo de milissegundos e execute consultas únicas em dados históricos. Qual solução atenderá a esses requisitos com o MENOR overhead operacional?",
    "options": [
      "Usar o Amazon RDS para dados acessados com frequência. Executar um script personalizado periódico para exportar os dados para um bucket do Amazon S3.",
      "Armazenar os dados diretamente em um bucket do Amazon S3. Implementar uma política de ciclo de vida S3 para mover dados mais antigos para o S3 Glacier Deep Archive. Executar consultas únicas nos dados no Amazon S3 usando o Amazon Athena.",
      "Usar o Amazon DynamoDB com DynamoDB Accelerator (DAX) para dados acessados com frequência. Exportar os dados para um bucket do Amazon S3 usando a exportação de tabela DynamoDB. Executar consultas únicas nos dados no Amazon S3 usando o Amazon Athena.",
      "Usar o Amazon DynamoDB para dados acessados com frequência. Ativar streaming para o Amazon Kinesis Data Streams. Usar o Amazon Kinesis Data Firehose para ler os dados do Kinesis Data Streams. Armazenar os registros em um bucket do Amazon S3."
    ],
    "correctIndices": [
      2
    ],
    "keyword": "DynamoDB DAX, exportação S3 e Athena",
    "summary": "O DynamoDB com DAX oferece latência de leitura em microssegundos — superando o requisito de latência abaixo de milissegundos. A exportação nativa de tabela DynamoDB para S3 é uma funcionalidade gerenciada que não requer código customizado. O Amazon Athena permite executar consultas únicas SQL nos dados históricos no S3 sem necessidade de infraestrutura dedicada. Toda a solução é gerenciada com mínimo overhead operacional.",
    "optionExplanations": [
      "O Amazon RDS não oferece latência abaixo de milissegundos nativamente. Além disso, usar scripts personalizados para exportar dados ao S3 introduz overhead operacional significativo — os scripts precisam ser desenvolvidos, monitorados e mantidos. Esta não é uma solução gerenciada.",
      "O Amazon S3 não oferece latência abaixo de milissegundos para leitura de dados — ele é um armazenamento de objetos com latência de dezenas a centenas de milissegundos. O requisito de leitura com latência sub-milissegundo não é atendido por esta arquitetura.",
      "O DynamoDB com DAX oferece latência de leitura em microssegundos — superando o requisito de latência abaixo de milissegundos. A exportação nativa de tabela DynamoDB para S3 é uma funcionalidade gerenciada que não requer código customizado. O Amazon Athena permite executar consultas únicas SQL nos dados históricos no S3 sem necessidade de infraestrutura dedicada. Toda a solução é gerenciada com mínimo overhead operacional.",
      "Embora o DynamoDB atenda ao requisito de baixa latência, a pipeline com Kinesis Data Streams e Firehose é mais complexa e cara que a exportação nativa do DynamoDB para S3. Além disso, a opção D não menciona nenhum mecanismo para executar consultas únicas nos dados históricos, deixando um requisito sem solução."
    ],
    "sourceDocuments": [
      {
        "examNumber": 5,
        "questionNumber": 6,
        "fileName": "Simulado Comentado 5 Novo DPCN.pdf",
        "questionPage": 19,
        "explanationPages": [
          20
        ]
      }
    ]
  },
  {
    "id": 1507,
    "domain": "Resiliência",
    "multiSelect": true,
    "requiredCount": 2,
    "question": "Uma empresa usa um sistema de processamento de pagamentos que requer que as mensagens para um determinado ID de pagamento sejam recebidas na mesma ordem em que foram enviadas. Quais ações um arquiteto de soluções deve tomar para atender a esse requisito? (Escolha duas.)",
    "options": [
      "Gravar as mensagens em uma tabela do Amazon DynamoDB com o ID de pagamento como chave de partição.",
      "Gravar as mensagens em um fluxo de dados do Amazon Kinesis com o ID de pagamento como chave de partição.",
      "Gravar as mensagens em um cluster do Amazon ElastiCache for Memcached com o ID de pagamento como chave.",
      "Gravar as mensagens em uma fila do Amazon SQS. Definir o atributo da mensagem para usar o ID de pagamento.",
      "Gravar as mensagens em uma fila FIFO do Amazon SQS. Definir o grupo de mensagens para usar o ID de pagamento."
    ],
    "correctIndices": [
      1,
      4
    ],
    "keyword": "Ordenação por chave ou grupo",
    "summary": "O Amazon Kinesis Data Streams garante ordenação de registros dentro de um mesmo shard. Ao usar o ID de pagamento como chave de partição, todos os registros com o mesmo ID de pagamento são roteados para o mesmo shard, garantindo que sejam processados na ordem exata em que foram enviados.\n\nFilas FIFO do SQS garantem que as mensagens sejam processadas exatamente na ordem em que foram enviadas. Ao definir o grupo de mensagens com o ID de pagamento, todas as mensagens do mesmo pagamento são processadas em ordem FIFO dentro do mesmo grupo, atendendo perfeitamente ao requisito de ordenação por ID de pagamento.",
    "optionExplanations": [
      "O DynamoDB é um banco de dados NoSQL — não é um sistema de mensageria e não garante ordenação de mensagens. Armazenar mensagens no DynamoDB não fornece nenhum mecanismo nativo de garantia de ordem de processamento das mensagens.",
      "O Amazon Kinesis Data Streams garante ordenação de registros dentro de um mesmo shard. Ao usar o ID de pagamento como chave de partição, todos os registros com o mesmo ID de pagamento são roteados para o mesmo shard, garantindo que sejam processados na ordem exata em que foram enviados.",
      "O Amazon ElastiCache for Memcached é um cache em memória para melhorar o desempenho de aplicações — não é um sistema de mensageria e não possui nenhum mecanismo de garantia de ordenação de mensagens. Esta opção é completamente inadequada para o cenário descrito.",
      "Filas SQS padrão não garantem ordenação de mensagens — elas oferecem entrega pelo menos uma vez e ordenação de melhor esforço. Definir um atributo de mensagem com o ID de pagamento não adiciona nenhuma garantia de ordenação à fila padrão.",
      "Filas FIFO do SQS garantem que as mensagens sejam processadas exatamente na ordem em que foram enviadas. Ao definir o grupo de mensagens com o ID de pagamento, todas as mensagens do mesmo pagamento são processadas em ordem FIFO dentro do mesmo grupo, atendendo perfeitamente ao requisito de ordenação por ID de pagamento."
    ],
    "sourceDocuments": [
      {
        "examNumber": 5,
        "questionNumber": 7,
        "fileName": "Simulado Comentado 5 Novo DPCN.pdf",
        "questionPage": 22,
        "explanationPages": [
          23
        ]
      }
    ]
  },
  {
    "id": 1508,
    "domain": "Resiliência",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa está construindo um sistema de jogos que precisa enviar eventos únicos para serviços separados de placar de líderes, matchmaking e autenticação simultaneamente. A empresa precisa de um sistema orientado a eventos da AWS que garanta a ordem dos eventos. Qual solução atenderá a esses requisitos?",
    "options": [
      "Bus de evento do Amazon EventBridge",
      "Tópicos FIFO do Amazon Simple Notification Service (Amazon SNS)",
      "Tópicos padrão do Amazon Simple Notification Service (Amazon SNS)",
      "Filas FIFO do Amazon Simple Queue Service (Amazon SQS)"
    ],
    "correctIndices": [
      1
    ],
    "keyword": "SNS FIFO para eventos ordenados",
    "summary": "Os tópicos FIFO do SNS atendem a todos os requisitos simultaneamente. Eles garantem a ordenação dos eventos (FIFO — First In, First Out) e suportam fan-out — ou seja, um único evento publicado no tópico é entregue simultaneamente a múltiplos subscribers (placar, matchmaking e autenticação). É a única opção que combina entrega simultânea para múltiplos destinos com garantia de ordenação.",
    "optionExplanations": [
      "O Amazon EventBridge suporta fan-out de eventos para múltiplos destinos simultaneamente, mas não garante ordenação de eventos. Para cenários que exigem ordem garantida, o EventBridge não é a escolha adequada.",
      "Os tópicos FIFO do SNS atendem a todos os requisitos simultaneamente. Eles garantem a ordenação dos eventos (FIFO — First In, First Out) e suportam fan-out — ou seja, um único evento publicado no tópico é entregue simultaneamente a múltiplos subscribers (placar, matchmaking e autenticação). É a única opção que combina entrega simultânea para múltiplos destinos com garantia de ordenação.",
      "Tópicos SNS padrão suportam fan-out para múltiplos subscribers simultaneamente, mas não garantem ordenação de mensagens. A entrega é de melhor esforço e sem garantia de sequência, o que não atende ao requisito de ordem garantida dos eventos.",
      "Filas FIFO do SQS garantem ordenação, mas são filas de um para um — cada mensagem é consumida por apenas um consumidor. Para enviar o mesmo evento simultaneamente para três serviços diferentes (placar, matchmaking e autenticação), seria necessário criar três filas separadas e publicar em cada uma individualmente, aumentando a complexidade e não sendo a solução mais elegante."
    ],
    "sourceDocuments": [
      {
        "examNumber": 5,
        "questionNumber": 8,
        "fileName": "Simulado Comentado 5 Novo DPCN.pdf",
        "questionPage": 25,
        "explanationPages": [
          26
        ]
      }
    ]
  },
  {
    "id": 1509,
    "domain": "Segurança",
    "multiSelect": true,
    "requiredCount": 2,
    "question": "Um hospital está projetando um novo aplicativo que coleta sintomas de pacientes usando Amazon SQS e Amazon SNS. Os dados devem ser criptografados em repouso e em trânsito. Apenas pessoal autorizado do hospital deve ser capaz de acessar os dados. Qual combinação de etapas o arquiteto de soluções deve tomar? (Escolha duas.)",
    "options": [
      "Ativar criptografia do lado do servidor nos componentes SQS. Atualizar a política de chave padrão para restringir o uso de chave a um conjunto de principais autorizados.",
      "Ativar criptografia do lado do servidor nos componentes SNS usando uma chave gerenciada pelo cliente do AWS KMS. Aplicar uma política de chave para restringir o uso de chave a um conjunto de principais autorizados.",
      "Ativar criptografia nos componentes SNS. Atualizar a política de chave padrão para restringir o uso de chave a um conjunto de principais autorizados. Definir uma condição na política de tópico para permitir apenas conexões criptografadas via TLS.",
      "Ativar criptografia do lado do servidor nos componentes SQS usando uma chave gerenciada pelo cliente do AWS KMS. Aplicar uma política de chave para restringir o uso de chave a um conjunto de principais autorizados. Definir uma condição na política de fila para permitir apenas conexões criptografadas via TLS.",
      "Ativar criptografia do lado do servidor nos componentes SQS usando uma chave gerenciada pelo cliente do AWS KMS. Aplicar uma política IAM para restringir o uso de chave a um conjunto de principais autorizados. Definir uma condição na política de fila para permitir apenas conexões criptografadas via TLS."
    ],
    "correctIndices": [
      1,
      3
    ],
    "keyword": "SNS e SQS: criptografia e acesso",
    "summary": "Ativar SSE no SNS com chave gerenciada pelo cliente (CMK) do KMS garante criptografia em repouso para os dados no SNS. Aplicar uma política de chave específica para a CMK permite restringir o uso da chave exclusivamente ao pessoal autorizado do hospital, atendendo ao requisito de controle de acesso granular.\n\nEsta opção cobre completamente os requisitos para o componente SQS. O SSE com CMK do KMS garante criptografia em repouso. A política de chave restringe o uso apenas a principais autorizados. A condição na política de fila exigindo TLS garante criptografia em trânsito — atendendo todos os três requisitos de segurança para o SQS.",
    "optionExplanations": [
      "Usar a política de chave padrão do KMS não restringe adequadamente o acesso apenas ao pessoal autorizado do hospital. A política padrão concede acesso amplo à conta AWS — não atende ao requisito de restringir o acesso a um conjunto específico de principais autorizados.",
      "Ativar SSE no SNS com chave gerenciada pelo cliente (CMK) do KMS garante criptografia em repouso para os dados no SNS. Aplicar uma política de chave específica para a CMK permite restringir o uso da chave exclusivamente ao pessoal autorizado do hospital, atendendo ao requisito de controle de acesso granular.",
      "Esta opção menciona atualizar a política de chave padrão do KMS, que não oferece controle granular adequado. Além disso, a opção C cobre apenas o SNS — não menciona criptografia ou controle de acesso para o componente SQS, deixando parte da solução incompleta.",
      "Esta opção cobre completamente os requisitos para o componente SQS. O SSE com CMK do KMS garante criptografia em repouso. A política de chave restringe o uso apenas a principais autorizados. A condição na política de fila exigindo TLS garante criptografia em trânsito — atendendo todos os três requisitos de segurança para o SQS.",
      "Aplicar uma política IAM para restringir o uso da chave KMS não é o mecanismo correto — o controle de acesso às chaves KMS é feito através de políticas de chave (key policies), não políticas IAM isoladamente. Políticas IAM sozinhas não são suficientes para controlar o acesso a chaves KMS sem uma política de chave correspondente."
    ],
    "sourceDocuments": [
      {
        "examNumber": 5,
        "questionNumber": 9,
        "fileName": "Simulado Comentado 5 Novo DPCN.pdf",
        "questionPage": 28,
        "explanationPages": [
          29
        ]
      }
    ]
  },
  {
    "id": 1510,
    "domain": "Resiliência",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa executa um aplicativo web respaldado pelo Amazon RDS. Um administrador causou perda de dados editando acidentalmente informações em uma tabela. A empresa quer restaurar o banco de dados para o seu estado de 5 minutos antes de qualquer alteração nos últimos 30 dias. Qual recurso o arquiteto de soluções deve incluir no design?",
    "options": [
      "Réplicas de leitura",
      "Snapshots manuais",
      "Backups automatizados",
      "Implantações Multi-AZ"
    ],
    "correctIndices": [
      2
    ],
    "keyword": "RDS: backups automatizados e PITR",
    "summary": "Os backups automatizados do RDS habilitam o recurso de Point-in-Time Recovery (PITR), que permite restaurar o banco de dados para qualquer segundo específico dentro do período de retenção configurado (até 35 dias). O RDS combina snapshots automáticos diários com logs de transação para permitir restauração para qualquer ponto no tempo — como exatamente 5 minutos antes de uma alteração acidental.",
    "optionExplanations": [
      "Réplicas de leitura são cópias do banco de dados usadas para escalar operações de leitura. Elas replicam as alterações da instância primária em tempo real — incluindo alterações acidentais. Portanto, se um dado foi corrompido na primária, a réplica de leitura também terá o dado corrompido e não serve para recuperação point-in-time.",
      "Snapshots manuais capturam o estado do banco de dados em um momento específico, mas não permitem restauração para um ponto arbitrário no tempo com precisão de minutos. Para restaurar para \"5 minutos antes de uma alteração\" em qualquer momento nos últimos 30 dias, snapshots manuais não oferecem essa granularidade.",
      "Os backups automatizados do RDS habilitam o recurso de Point-in-Time Recovery (PITR), que permite restaurar o banco de dados para qualquer segundo específico dentro do período de retenção configurado (até 35 dias). O RDS combina snapshots automáticos diários com logs de transação para permitir restauração para qualquer ponto no tempo — como exatamente 5 minutos antes de uma alteração acidental.",
      "Implantações Multi-AZ fornecem alta disponibilidade e failover automático em caso de falha de infraestrutura. A instância standby do Multi-AZ replica todas as alterações da primária sincronamente — incluindo alterações acidentais. Portanto, não serve para recuperação de dados corrompidos ou excluídos acidentalmente."
    ],
    "sourceDocuments": [
      {
        "examNumber": 5,
        "questionNumber": 10,
        "fileName": "Simulado Comentado 5 Novo DPCN.pdf",
        "questionPage": 31,
        "explanationPages": [
          32
        ]
      }
    ]
  },
  {
    "id": 1511,
    "domain": "Segurança",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "O aplicativo web de uma empresa usa API Gateway, Lambda e DynamoDB. O aplicativo usa pools de usuários do Amazon Cognito para identificar usuários. Um arquiteto de soluções precisa atualizar o aplicativo para que apenas usuários com uma assinatura possam acessar conteúdo premium. Qual solução atenderá a esse requisito com o MENOR overhead operacional?",
    "options": [
      "Habilitar o cache de API e o throttling na API do API Gateway.",
      "Configurar o AWS WAF na API do API Gateway. Criar uma regra para filtrar usuários que têm uma assinatura.",
      "Aplicar permissões IAM refinadas ao conteúdo premium na tabela DynamoDB.",
      "Implementar planos de uso de API e chaves de API para limitar o acesso de usuários que não têm uma assinatura."
    ],
    "correctIndices": [
      3
    ],
    "keyword": "Planos de uso, Cognito e autorização",
    "summary": "Os planos de uso e chaves de API do API Gateway são a solução nativa e com menor overhead operacional para esse cenário. É possível criar um plano de uso para assinantes que permite acesso ao conteúdo premium e associar chaves de API aos usuários com assinatura ativa. O API Gateway gerencia automaticamente o controle de acesso baseado nas chaves, sem necessidade de lógica customizada na aplicação.",
    "optionExplanations": [
      "Cache de API e throttling são recursos de desempenho e controle de taxa de requisições — não são mecanismos de controle de acesso baseado em assinatura. Habilitar esses recursos não diferencia usuários com assinatura de usuários sem assinatura para acesso ao conteúdo premium.",
      "O AWS WAF é uma firewall de aplicação web que filtra tráfego baseado em padrões de segurança como IPs, cabeçalhos e strings. Não é projetado para gerenciar lógica de negócios como status de assinatura de usuários — implementar isso via WAF seria extremamente complexo e de alto overhead operacional.",
      "Aplicar permissões IAM refinadas diretamente na tabela DynamoDB para cada usuário seria extremamente complexo de gerenciar — especialmente com uma base de usuários crescente. Criar e manter políticas IAM individuais por usuário ou grupo de assinatura introduz alto overhead operacional e não escala bem.",
      "Os planos de uso e chaves de API do API Gateway são a solução nativa e com menor overhead operacional para esse cenário. É possível criar um plano de uso para assinantes que permite acesso ao conteúdo premium e associar chaves de API aos usuários com assinatura ativa. O API Gateway gerencia automaticamente o controle de acesso baseado nas chaves, sem necessidade de lógica customizada na aplicação."
    ],
    "sourceDocuments": [
      {
        "examNumber": 5,
        "questionNumber": 11,
        "fileName": "Simulado Comentado 5 Novo DPCN.pdf",
        "questionPage": 34,
        "explanationPages": [
          35
        ]
      }
    ],
    "studyNotes": [
      {
        "text": "O gabarito do material foi mantido. Atenção: API keys e planos de uso não devem ser usados como mecanismo de autenticação ou autorização. Para restringir conteúdo premium por usuário, a autorização deve validar a assinatura usando Cognito, IAM ou um Lambda authorizer. Planos de uso complementam o controle com cotas e limites de consumo.",
        "url": "https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-usage-plans.html",
        "title": "AWS: uso correto de API keys e planos de uso"
      }
    ]
  },
  {
    "id": 1512,
    "domain": "Alto Desempenho",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa usa roteamento baseado em latência do Route 53 para rotear solicitações para seu aplicativo UDP hospedado on-premises nos EUA, Ásia e Europa. Os requisitos de conformidade exigem que o aplicativo seja hospedado on-premises. A empresa quer melhorar o desempenho e a disponibilidade. O que um arquiteto de soluções deve fazer?",
    "options": [
      "Configurar três Network Load Balancers (NLBs) nas três Regiões AWS para endereçar os endpoints on-premises. Criar um acelerador usando o AWS Global Accelerator e registrar os NLBs como seus endpoints. Fornecer acesso ao aplicativo usando um CNAME que aponte para o DNS do acelerador.",
      "Configurar três Application Load Balancers (ALBs) nas três Regiões AWS para endereçar os endpoints on- premises. Criar um acelerador usando o AWS Global Accelerator e registrar os ALBs como seus endpoints. Fornecer acesso ao aplicativo usando um CNAME que aponte para o DNS do acelerador.",
      "Configurar três NLBs nas três Regiões AWS para endereçar os endpoints on-premises. No Route 53, criar um registro de roteamento de latência que aponte para os três NLBs e usá-lo como origem para uma distribuição do Amazon CloudFront. Fornecer acesso ao aplicativo usando um CNAME que aponte para o DNS do CloudFront.",
      "Configurar três ALBs nas três Regiões AWS para endereçar os endpoints on-premises. No Route 53, criar um registro de roteamento de latência que aponte para os três ALBs e usá-lo como origem para uma distribuição do Amazon CloudFront. Fornecer acesso ao aplicativo usando um CNAME que aponte para o DNS do CloudFront."
    ],
    "correctIndices": [
      0
    ],
    "keyword": "Global Accelerator e NLBs",
    "summary": "O AWS Global Accelerator roteia o tráfego pela rede backbone global da AWS, reduzindo latência e melhorando disponibilidade. Os NLBs operam na camada 4 e suportam o protocolo UDP — essencial para este aplicativo. Registrar os NLBs como endpoints do Global Accelerator permite que o tráfego UDP seja roteado de forma otimizada para os servidores on- premises através dos NLBs regionais, melhorando desempenho e disponibilidade sem violar os requisitos de conformidade de hospedagem on-premises.",
    "optionExplanations": [
      "O AWS Global Accelerator roteia o tráfego pela rede backbone global da AWS, reduzindo latência e melhorando disponibilidade. Os NLBs operam na camada 4 e suportam o protocolo UDP — essencial para este aplicativo. Registrar os NLBs como endpoints do Global Accelerator permite que o tráfego UDP seja roteado de forma otimizada para os servidores on- premises através dos NLBs regionais, melhorando desempenho e disponibilidade sem violar os requisitos de conformidade de hospedagem on-premises.",
      "Os Application Load Balancers operam na camada 7 (HTTP/HTTPS) e não suportam o protocolo UDP. Como o aplicativo usa UDP, os ALBs são tecnicamente incompatíveis com este cenário.",
      "O Amazon CloudFront é uma CDN projetada para conteúdo HTTP/HTTPS e não suporta o protocolo UDP. Usar CloudFront para um aplicativo UDP é tecnicamente inviável, independente dos NLBs usados como origem.",
      "Esta opção tem dois problemas: ALBs não suportam UDP e CloudFront também não suporta UDP. Ambos os componentes são incompatíveis com o protocolo de rede do aplicativo descrito."
    ],
    "sourceDocuments": [
      {
        "examNumber": 5,
        "questionNumber": 12,
        "fileName": "Simulado Comentado 5 Novo DPCN.pdf",
        "questionPage": 37,
        "explanationPages": [
          38
        ]
      }
    ]
  },
  {
    "id": 1513,
    "domain": "Segurança",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Um arquiteto de soluções quer que todos os novos usuários tenham requisitos de complexidade específicos e períodos de rotação obrigatórios para senhas de usuários IAM. O que o arquiteto de soluções deve fazer?",
    "options": [
      "Definir uma política de senha geral para toda a conta AWS.",
      "Definir uma política de senha para cada usuário IAM na conta AWS.",
      "Usar software de fornecedor terceiro para definir os requisitos de senha.",
      "Anexar uma regra do Amazon CloudWatch ao evento Create_newuser para definir a senha com os requisitos apropriados."
    ],
    "correctIndices": [
      0
    ],
    "keyword": "IAM: política de senha da conta",
    "summary": "O IAM permite configurar uma política de senha de conta que se aplica automaticamente a todos os usuários IAM da conta AWS. Nessa política é possível definir requisitos de complexidade (comprimento mínimo, uso de maiúsculas, minúsculas, números e caracteres especiais) e períodos de rotação obrigatórios. É a forma nativa, simples e com menor overhead operacional de atender ao requisito — configurada uma única vez, aplica-se a todos os usuários automaticamente.",
    "optionExplanations": [
      "O IAM permite configurar uma política de senha de conta que se aplica automaticamente a todos os usuários IAM da conta AWS. Nessa política é possível definir requisitos de complexidade (comprimento mínimo, uso de maiúsculas, minúsculas, números e caracteres especiais) e períodos de rotação obrigatórios. É a forma nativa, simples e com menor overhead operacional de atender ao requisito — configurada uma única vez, aplica-se a todos os usuários automaticamente.",
      "O IAM não permite definir políticas de senha individuais por usuário — existe apenas uma política de senha por conta AWS que se aplica a todos os usuários. Tentar configurar políticas individuais por usuário não é uma funcionalidade disponível no IAM.",
      "Usar software de terceiros para gerenciar políticas de senha de usuários IAM introduz complexidade, custo e dependência desnecessários. A AWS já fornece essa funcionalidade nativamente através da política de senha da conta IAM, tornando soluções de terceiros completamente desnecessárias para este caso.",
      "O Amazon CloudWatch monitora métricas e logs — não é um serviço de gerenciamento de políticas de senha. Não existe um evento nativo \"Create_newuser\" no CloudWatch que possa ser usado para aplicar políticas de senha. Esta abordagem seria extremamente complexa, frágil e sem suporte nativo da AWS."
    ],
    "sourceDocuments": [
      {
        "examNumber": 5,
        "questionNumber": 13,
        "fileName": "Simulado Comentado 5 Novo DPCN.pdf",
        "questionPage": 40,
        "explanationPages": [
          41
        ]
      }
    ]
  },
  {
    "id": 1514,
    "domain": "Alto Desempenho",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa migrou um aplicativo para instâncias do Amazon EC2 Linux. Uma instância executa várias tarefas de 1 hora em um cronograma. As tarefas foram escritas por diferentes equipes e não têm linguagem de programação comum. A empresa está preocupada com desempenho e escalabilidade. Um arquiteto de soluções precisa implementar uma solução. Qual solução atenderá a esses requisitos com o MENOR overhead operacional?",
    "options": [
      "Usar o AWS Batch para executar as tarefas como trabalhos. Agendar os trabalhos usando o Amazon EventBridge.",
      "Converter a instância EC2 em um contêiner. Usar o AWS App Runner para criar o contêiner sob demanda para executar as tarefas como trabalhos.",
      "Copiar as tarefas em funções AWS Lambda. Agendar as funções Lambda usando o Amazon EventBridge.",
      "Criar uma Amazon Machine Image (AMI) da instância EC2 que executa as tarefas. Criar um grupo de Auto Scaling com a AMI para executar múltiplas cópias da instância."
    ],
    "correctIndices": [
      0
    ],
    "keyword": "AWS Batch e EventBridge",
    "summary": "O AWS Batch é projetado especificamente para execução de trabalhos em lote de qualquer linguagem ou tecnologia — cada tarefa pode ser empacotada como um contêiner independente, resolvendo o problema de múltiplas linguagens de programação. O Batch gerencia automaticamente o provisionamento, escalonamento e encerramento da infraestrutura. O EventBridge agenda os trabalhos de forma nativa. Toda a solução é gerenciada com mínimo overhead operacional.",
    "optionExplanations": [
      "O AWS Batch é projetado especificamente para execução de trabalhos em lote de qualquer linguagem ou tecnologia — cada tarefa pode ser empacotada como um contêiner independente, resolvendo o problema de múltiplas linguagens de programação. O Batch gerencia automaticamente o provisionamento, escalonamento e encerramento da infraestrutura. O EventBridge agenda os trabalhos de forma nativa. Toda a solução é gerenciada com mínimo overhead operacional.",
      "O AWS App Runner é projetado para hospedar aplicações web e APIs — não para executar trabalhos em lote agendados. Converter todas as tarefas em contêineres e gerenciá-las via App Runner introduz complexidade desnecessária e não resolve adequadamente o requisito de agendamento e escalabilidade de trabalhos em lote.",
      "O AWS Lambda possui limite de 15 minutos de execução por invocação. As tarefas descritas têm duração de 1 hora — excedendo o limite máximo do Lambda. Esta opção é tecnicamente inviável para o cenário descrito.",
      "Criar múltiplas cópias da instância EC2 via Auto Scaling executaria todas as tarefas simultaneamente em cada instância, não distribuindo as tarefas entre instâncias. Além disso, gerenciar um grupo de Auto Scaling para trabalhos em lote introduz alto overhead operacional comparado ao AWS Batch."
    ],
    "sourceDocuments": [
      {
        "examNumber": 5,
        "questionNumber": 14,
        "fileName": "Simulado Comentado 5 Novo DPCN.pdf",
        "questionPage": 43,
        "explanationPages": [
          44
        ]
      }
    ]
  },
  {
    "id": 1515,
    "domain": "Resiliência",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa executa um aplicativo web público de três camadas em uma VPC. As instâncias EC2 em sub-redes privadas precisam se comunicar com um servidor de licença pela internet. A empresa precisa de uma solução gerenciada que minimize a manutenção operacional. Qual solução atende a esses requisitos?",
    "options": [
      "Provisionar uma instância NAT em uma sub-rede pública. Modificar a tabela de rotas de cada sub-rede privada com uma rota padrão que aponte para a instância NAT.",
      "Provisionar uma instância NAT em uma sub-rede privada. Modificar a tabela de rotas de cada sub-rede pública com uma rota padrão que aponte para a instância NAT.",
      "Provisionar um gateway NAT em uma sub-rede pública. Modificar a tabela de rotas de cada sub-rede privada com uma rota padrão que aponte para o gateway NAT.",
      "Provisionar um gateway NAT em uma sub-rede privada. Modificar a tabela de rotas de cada sub-rede privada com uma rota padrão que aponte para o gateway NAT."
    ],
    "correctIndices": [
      2
    ],
    "keyword": "NAT gateway para saída privada",
    "summary": "O NAT Gateway é um serviço totalmente gerenciado pela AWS — sem necessidade de gerenciar instâncias, patches ou escalabilidade. Ele deve ser provisionado em uma sub-rede pública e as tabelas de rotas das sub-redes privadas devem apontar para ele como rota padrão para tráfego de internet. Escala automaticamente conforme a demanda e oferece alta disponibilidade dentro da AZ, minimizando completamente a manutenção operacional.",
    "optionExplanations": [
      "A instância NAT funciona tecnicamente, mas é uma solução não gerenciada — requer que a equipe gerencie patching, alta disponibilidade, escalabilidade e manutenção da instância EC2. A AWS até recomenda substituir instâncias NAT por gateways NAT devido ao menor overhead operacional. Esta opção contradiz o requisito de minimizar manutenção operacional.",
      "Uma instância NAT deve ser provisionada em uma sub-rede pública para ter acesso à internet — não em uma sub-rede privada. Além disso, modificar a tabela de rotas das sub-redes públicas não faz sentido para permitir que instâncias privadas acessem a internet. A configuração descrita está incorreta.",
      "O NAT Gateway é um serviço totalmente gerenciado pela AWS — sem necessidade de gerenciar instâncias, patches ou escalabilidade. Ele deve ser provisionado em uma sub-rede pública e as tabelas de rotas das sub-redes privadas devem apontar para ele como rota padrão para tráfego de internet. Escala automaticamente conforme a demanda e oferece alta disponibilidade dentro da AZ, minimizando completamente a manutenção operacional.",
      "Um gateway NAT provisionado em uma sub-rede privada não teria acesso à internet, pois sub-redes privadas não possuem rota para um Internet Gateway. O NAT Gateway precisa obrigatoriamente estar em uma sub-rede pública para funcionar corretamente."
    ],
    "sourceDocuments": [
      {
        "examNumber": 5,
        "questionNumber": 15,
        "fileName": "Simulado Comentado 5 Novo DPCN.pdf",
        "questionPage": 46,
        "explanationPages": [
          47
        ]
      }
    ]
  },
  {
    "id": 1516,
    "domain": "Segurança",
    "multiSelect": true,
    "requiredCount": 2,
    "question": "Uma empresa precisa criar um cluster do Amazon EKS com grupo de nós gerenciados respaldado por volumes EBS. Todos os dados em repouso devem ser criptografados com uma chave gerenciada pelo cliente armazenada no AWS KMS. Qual combinação de ações atenderá a esse requisito com o MENOR overhead operacional? (Escolha duas.)",
    "options": [
      "Usar um plugin Kubernetes que usa a chave gerenciada pelo cliente para realizar criptografia de dados.",
      "Após a criação do cluster EKS, localizar os volumes EBS. Habilitar criptografia usando a chave gerenciada pelo cliente.",
      "Habilitar a criptografia EBS por padrão na Região AWS onde o cluster EKS será criado. Selecionar a chave gerenciada pelo cliente como chave padrão.",
      "Criar o cluster EKS. Criar uma função IAM que tem uma política que concede permissão à chave gerenciada pelo cliente. Associar a função ao cluster EKS.",
      "Armazenar a chave gerenciada pelo cliente como um segredo Kubernetes no cluster EKS. Usar a chave gerenciada pelo cliente para criptografar os volumes EBS."
    ],
    "correctIndices": [
      2,
      3
    ],
    "keyword": "EBS criptografado e permissões KMS",
    "summary": "Habilitar a criptografia EBS por padrão na região garante que todos os volumes EBS criados — incluindo os do grupo de nós gerenciados do EKS — sejam automaticamente criptografados com a chave gerenciada pelo cliente selecionada. É uma configuração única, proativa e sem necessidade de intervenção manual para cada volume criado.\n\nPara que o cluster EKS possa criar e usar volumes EBS criptografados com uma CMK do KMS, é necessário que o cluster tenha permissões explícitas para usar a chave. Criar uma função IAM com a política de permissão KMS adequada e associá-la ao cluster EKS garante que o EKS tenha as permissões necessárias para criar e montar volumes criptografados automaticamente.",
    "optionExplanations": [
      "Usar um plugin Kubernetes customizado para criptografia introduz complexidade operacional significativa — o plugin precisa ser instalado, configurado, atualizado e mantido manualmente. Isso contradiz o requisito de menor overhead operacional quando existem soluções nativas da AWS disponíveis.",
      "Habilitar criptografia em volumes EBS após a criação é um processo manual, reativo e propenso a erros — alguns volumes podem ser criados antes de serem criptografados. Esta abordagem não garante que todos os volumes sejam criptografados desde o início e introduz overhead operacional de monitoramento contínuo.",
      "Habilitar a criptografia EBS por padrão na região garante que todos os volumes EBS criados — incluindo os do grupo de nós gerenciados do EKS — sejam automaticamente criptografados com a chave gerenciada pelo cliente selecionada. É uma configuração única, proativa e sem necessidade de intervenção manual para cada volume criado.",
      "Para que o cluster EKS possa criar e usar volumes EBS criptografados com uma CMK do KMS, é necessário que o cluster tenha permissões explícitas para usar a chave. Criar uma função IAM com a política de permissão KMS adequada e associá-la ao cluster EKS garante que o EKS tenha as permissões necessárias para criar e montar volumes criptografados automaticamente.",
      "Armazenar uma chave KMS como segredo Kubernetes não é uma prática recomendada — chaves KMS são gerenciadas pelo AWS KMS e não devem ser exportadas ou armazenadas fora do serviço. Além disso, essa abordagem introduz riscos de segurança e complexidade operacional desnecessários quando o KMS já fornece o gerenciamento adequado da chave."
    ],
    "sourceDocuments": [
      {
        "examNumber": 5,
        "questionNumber": 16,
        "fileName": "Simulado Comentado 5 Novo DPCN.pdf",
        "questionPage": 49,
        "explanationPages": [
          50
        ]
      }
    ],
    "studyNotes": [
      {
        "text": "O gabarito do material foi mantido. Para volumes EBS com chave KMS do cliente em nós lançados por Auto Scaling, a política da chave também deve autorizar a service-linked role do Auto Scaling a usar a chave e criar grants. Associar uma função apenas ao cluster EKS não substitui essa autorização.",
        "url": "https://docs.aws.amazon.com/autoscaling/ec2/userguide/key-policy-requirements-EBS-encryption.html",
        "title": "AWS: política KMS para volumes criptografados no Auto Scaling"
      }
    ]
  },
  {
    "id": 1517,
    "domain": "Otimização de Custos",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa quer migrar um banco de dados Oracle para a AWS. O banco de dados consiste em uma única tabela que contém milhões de imagens GIS de alta resolução identificadas por um código geográfico. Durante desastres naturais, dezenas de milhares de imagens são atualizadas a cada poucos minutos. Cada código geográfico tem uma única imagem associada. A empresa quer uma solução altamente disponível e escalável. Qual solução atende a esses requisitos com o MENOR custo?",
    "options": [
      "Armazenar as imagens e códigos geográficos em uma tabela do banco de dados. Usar o Oracle em execução em uma instância RDS Multi-AZ.",
      "Armazenar as imagens em buckets do Amazon S3. Usar o Amazon DynamoDB com o código geográfico como chave e a URL S3 da imagem como valor.",
      "Armazenar as imagens e códigos geográficos em uma tabela do Amazon DynamoDB. Configurar o DynamoDB Accelerator (DAX) durante períodos de alta carga.",
      "Armazenar as imagens em buckets do Amazon S3. Armazenar códigos geográficos e URLs S3 de imagens em uma tabela do banco de dados. Usar o Oracle em execução em uma instância RDS Multi-AZ."
    ],
    "correctIndices": [
      1
    ],
    "keyword": "S3 para imagens e DynamoDB para metadados",
    "summary": "Esta é a arquitetura ideal para esse cenário. O Amazon S3 é a solução de armazenamento de objetos mais econômica e escalável para imagens de alta resolução. O DynamoDB com o código geográfico como chave de partição oferece acesso de baixíssima latência e escala automaticamente para suportar dezenas de milhares de atualizações por minuto durante desastres. Como cada código geográfico tem exatamente uma imagem, o modelo chave-valor do DynamoDB é perfeito. Esta combinação é altamente disponível, escalável e de menor custo.",
    "optionExplanations": [
      "Armazenar imagens de alta resolução diretamente em uma tabela de banco de dados relacional é uma prática inadequada para esse volume de dados. O RDS Oracle tem custos de licenciamento elevados e não escala tão facilmente quanto soluções NoSQL para dezenas de milhares de atualizações por minuto durante eventos de desastre.",
      "Esta é a arquitetura ideal para esse cenário. O Amazon S3 é a solução de armazenamento de objetos mais econômica e escalável para imagens de alta resolução. O DynamoDB com o código geográfico como chave de partição oferece acesso de baixíssima latência e escala automaticamente para suportar dezenas de milhares de atualizações por minuto durante desastres. Como cada código geográfico tem exatamente uma imagem, o modelo chave-valor do DynamoDB é perfeito. Esta combinação é altamente disponível, escalável e de menor custo.",
      "Armazenar imagens de alta resolução diretamente no DynamoDB não é recomendado — o DynamoDB tem limite de 400 KB por item e imagens GIS de alta resolução certamente excedem esse limite. Além disso, o DAX adiciona custo sem ser necessário para o padrão de acesso descrito.",
      "Usar Oracle no RDS mantém os altos custos de licenciamento Oracle sem necessidade — o DynamoDB atende perfeitamente ao modelo de dados de chave-valor (código geográfico → URL da imagem). O RDS Oracle Multi-AZ seria significativamente mais caro que o DynamoDB para esse caso de uso específico."
    ],
    "sourceDocuments": [
      {
        "examNumber": 5,
        "questionNumber": 17,
        "fileName": "Simulado Comentado 5 Novo DPCN.pdf",
        "questionPage": 52,
        "explanationPages": [
          53
        ]
      }
    ]
  },
  {
    "id": 1518,
    "domain": "Otimização de Custos",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa tem um aplicativo IoT que transmite dados de automóveis para o Amazon S3 via Kinesis Data Firehose. Os dados produzem trilhões de objetos S3 por ano. Toda manhã a empresa usa dados dos últimos 30 dias. Quatro vezes por ano usa dados dos últimos 12 meses. Os dados devem estar disponíveis com atraso mínimo por até 1 ano. Após 1 ano, os dados devem ser retidos para arquivamento. Qual solução de armazenamento atende a esses requisitos com o MENOR custo?",
    "options": [
      "Usar S3 Intelligent-Tiering. Criar uma política de ciclo de vida S3 para fazer a transição de objetos para o S3 Glacier Deep Archive após 1 ano.",
      "Usar S3 Intelligent-Tiering. Configurar o S3 Intelligent-Tiering para mover automaticamente objetos para o S3 Glacier Deep Archive após 1 ano.",
      "Usar S3 Standard-Infrequent Access (S3 Standard-IA). Criar uma política de ciclo de vida S3 para fazer a transição de objetos para o S3 Glacier Deep Archive após 1 ano.",
      "Usar S3 Standard. Criar uma política de ciclo de vida S3 para fazer a transição de objetos para S3 Standard-IA após 30 dias e para S3 Glacier Deep Archive após 1 ano."
    ],
    "correctIndices": [
      3
    ],
    "keyword": "S3 Lifecycle: Standard-IA e arquivo",
    "summary": "Esta solução usa a classe de armazenamento mais adequada para cada fase do ciclo de vida dos dados. O S3 Standard é ideal para os primeiros 30 dias de acesso frequente diário. Após 30 dias, a transição para S3 Standard-IA reduz custos para os dados acessados apenas trimestralmente. Após 1 ano, a transição para S3 Glacier Deep Archive minimiza os custos de arquivamento de longo prazo. As políticas de ciclo de vida automatizam todo o processo sem overhead operacional adicional.",
    "optionExplanations": [
      "O S3 Intelligent-Tiering cobra uma taxa de monitoramento por objeto — com trilhões de objetos, essa taxa de monitoramento seria astronomicamente alta, tornando esta opção extremamente cara. Além disso, o padrão de acesso é previsível (últimos 30 dias diariamente, últimos 12 meses trimestralmente), o que torna o Intelligent-Tiering desnecessário — ele é projetado para padrões de acesso imprevisíveis.",
      "Pelo mesmo motivo da opção A, o S3 Intelligent-Tiering com trilhões de objetos teria custos de monitoramento proibitivos. O S3 Intelligent-Tiering também não suporta nativamente a configuração de transição automática para Glacier Deep Archive como política de ciclo de vida — isso é feito via políticas de ciclo de vida separadas.",
      "O S3 Standard-IA cobra uma taxa mínima de armazenamento de 128 KB por objeto e tem custo de recuperação por GB. Com trilhões de pequenos objetos acessados diariamente nos primeiros 30 dias, os custos de recuperação e o custo mínimo por objeto tornariam esta opção mais cara que o S3 Standard para dados de acesso frequente.",
      "Esta solução usa a classe de armazenamento mais adequada para cada fase do ciclo de vida dos dados. O S3 Standard é ideal para os primeiros 30 dias de acesso frequente diário. Após 30 dias, a transição para S3 Standard-IA reduz custos para os dados acessados apenas trimestralmente. Após 1 ano, a transição para S3 Glacier Deep Archive minimiza os custos de arquivamento de longo prazo. As políticas de ciclo de vida automatizam todo o processo sem overhead operacional adicional."
    ],
    "sourceDocuments": [
      {
        "examNumber": 5,
        "questionNumber": 18,
        "fileName": "Simulado Comentado 5 Novo DPCN.pdf",
        "questionPage": 55,
        "explanationPages": [
          56
        ]
      }
    ]
  },
  {
    "id": 1519,
    "domain": "Alto Desempenho",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa está executando vários aplicativos em três VPCs separadas dentro da Região us-east-1. Os aplicativos devem se comunicar entre VPCs e enviar consistentemente centenas de gigabytes de dados por dia para um aplicativo sensível à latência em um único data center on-premises. Um arquiteto de soluções precisa maximizar a eficiência de custo. Qual solução atende a esses requisitos?",
    "options": [
      "Configurar três conexões AWS Site-to-Site VPN do data center para a AWS. Estabelecer conectividade configurando uma conexão VPN para cada VPC.",
      "Lançar um appliance de rede virtual de terceiros em cada VPC. Estabelecer um túnel VPN IPsec entre o data center e cada appliance virtual.",
      "Configurar três conexões AWS Direct Connect de um gateway Direct Connect na Região us-east-1. Estabelecer conectividade configurando cada VPC para usar uma das conexões Direct Connect.",
      "Configurar uma conexão AWS Direct Connect do data center para a AWS. Criar um gateway de trânsito e anexar cada VPC ao gateway de trânsito. Estabelecer conectividade entre a conexão Direct Connect e o gateway de trânsito."
    ],
    "correctIndices": [
      3
    ],
    "keyword": "Direct Connect e Transit Gateway",
    "summary": "Esta é a solução mais eficiente em custo. Uma única conexão AWS Direct Connect fornece largura de banda dedicada, baixa latência e consistência para transferir centenas de gigabytes diários para o aplicativo sensível à latência on-premises. O Transit Gateway centraliza a conectividade entre as três VPCs — permitindo comunicação entre elas — e se conecta ao Direct Connect através de um Direct Connect Gateway, eliminando a necessidade de múltiplas conexões dedicadas.",
    "optionExplanations": [
      "Conexões VPN site-to-site usam a internet pública e não são adequadas para transferir centenas de gigabytes por dia para um aplicativo sensível à latência — a largura de banda e latência variável da internet não garantem o desempenho necessário. Além disso, três conexões VPN separadas aumentam o custo e a complexidade de gerenciamento.",
      "Gerenciar appliances de rede virtuais de terceiros em cada VPC introduz alto overhead operacional e de licenciamento. Túneis VPN IPsec sobre a internet têm as mesmas limitações de latência e largura de banda da opção A, sendo inadequados para centenas de gigabytes diários com requisito de baixa latência.",
      "Configurar três conexões Direct Connect separadas — uma para cada VPC — seria extremamente caro e desnecessário. O Direct Connect pode ser compartilhado entre múltiplas VPCs através de um gateway de trânsito, tornando três conexões individuais um desperdício de custo significativo.",
      "Esta é a solução mais eficiente em custo. Uma única conexão AWS Direct Connect fornece largura de banda dedicada, baixa latência e consistência para transferir centenas de gigabytes diários para o aplicativo sensível à latência on-premises. O Transit Gateway centraliza a conectividade entre as três VPCs — permitindo comunicação entre elas — e se conecta ao Direct Connect através de um Direct Connect Gateway, eliminando a necessidade de múltiplas conexões dedicadas."
    ],
    "sourceDocuments": [
      {
        "examNumber": 5,
        "questionNumber": 19,
        "fileName": "Simulado Comentado 5 Novo DPCN.pdf",
        "questionPage": 58,
        "explanationPages": [
          59
        ]
      }
    ]
  },
  {
    "id": 1520,
    "domain": "Resiliência",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa de e-commerce está construindo um aplicativo distribuído com funções sem servidor e serviços AWS para processar pedidos. As tarefas requerem aprovações manuais como parte do fluxo de trabalho. A solução deve combinar múltiplas funções Lambda em aplicativos responsivos e orquestrar dados e serviços em EC2, contêineres ou servidores on-premises. Qual solução atenderá a esses requisitos com o MENOR overhead operacional?",
    "options": [
      "Usar o AWS Step Functions para construir o aplicativo.",
      "Integrar todos os componentes do aplicativo em um trabalho do AWS Glue.",
      "Usar o Amazon Simple Queue Service (Amazon SQS) para construir o aplicativo.",
      "Usar funções AWS Lambda e eventos do Amazon EventBridge para construir o aplicativo."
    ],
    "correctIndices": [
      0
    ],
    "keyword": "Step Functions com aprovação manual",
    "summary": "O AWS Step Functions é a solução ideal para esse cenário. Ele orquestra nativamente funções Lambda, serviços AWS, instâncias EC2, contêineres e até sistemas on-premises em fluxos de trabalho visuais e gerenciados. Suporta nativamente aprovações manuais através de estados de espera com callbacks (taskToken), onde o fluxo pausa até receber uma aprovação humana. Toda a orquestração é gerenciada pela AWS com mínimo overhead operacional.",
    "optionExplanations": [
      "O AWS Step Functions é a solução ideal para esse cenário. Ele orquestra nativamente funções Lambda, serviços AWS, instâncias EC2, contêineres e até sistemas on-premises em fluxos de trabalho visuais e gerenciados. Suporta nativamente aprovações manuais através de estados de espera com callbacks (taskToken), onde o fluxo pausa até receber uma aprovação humana. Toda a orquestração é gerenciada pela AWS com mínimo overhead operacional.",
      "O AWS Glue é um serviço de integração de dados focado em ETL — não é uma ferramenta de orquestração de fluxos de trabalho de negócios. Não possui suporte nativo para aprovações manuais, combinação de funções Lambda ou orquestração de serviços heterogêneos como descrito no cenário.",
      "O Amazon SQS é um serviço de filas de mensagens — não é um orquestrador de fluxos de trabalho. Implementar um fluxo de trabalho complexo com aprovações manuais, múltiplas funções Lambda e serviços heterogêneos usando apenas SQS exigiria desenvolvimento customizado extensivo, resultando em alto overhead operacional.",
      "Embora Lambda e EventBridge possam ser usados juntos para arquiteturas orientadas a eventos, essa combinação não oferece nenhum mecanismo nativo de gerenciamento de estado, aprovações manuais ou orquestração de fluxo de trabalho complexo. Implementar essas funcionalidades manualmente resultaria em alto overhead operacional e código complexo de manter."
    ],
    "sourceDocuments": [
      {
        "examNumber": 5,
        "questionNumber": 20,
        "fileName": "Simulado Comentado 5 Novo DPCN.pdf",
        "questionPage": 61,
        "explanationPages": [
          62
        ]
      }
    ]
  }
];
