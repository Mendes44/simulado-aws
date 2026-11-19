import type { Question } from '../types';

// Questões autorais de treino, fundamentadas na documentação indicada em cada item.
// IDs estáveis preservam a associação das respostas no histórico.
export const PRACTICE_QUESTIONS: Question[] = [
  {
    "id": 31,
    "domain": "Segurança",
    "multiSelect": true,
    "requiredCount": 2,
    "question": "Uma equipe opera duas contas AWS. Analistas da conta de auditoria precisam consultar recursos na conta de produção apenas durante investigações, sem manter chaves de acesso dessa conta. Quais ações devem ser combinadas? Selecione DUAS.",
    "options": [
      "Criar uma função IAM em produção com as permissões de consulta necessárias e uma política de confiança para o principal autorizado da conta de auditoria.",
      "Distribuir uma chave de acesso do usuário root de produção aos analistas.",
      "Permitir que o principal autorizado em auditoria execute sts:AssumeRole na função de produção.",
      "Criar uma VPC compartilhada para que permissões IAM sejam herdadas automaticamente entre as contas.",
      "Anexar uma política de confiança a um grupo IAM em produção para permitir que o grupo seja assumido."
    ],
    "correctIndices": [
      0,
      2
    ],
    "keyword": "Acesso entre contas com IAM roles",
    "summary": "A função define o que pode ser consultado e em quem confia. O principal de origem também precisa de permissão para assumir a função. A sessão usa credenciais temporárias; grupos IAM não são funções assumíveis e conectividade de rede não concede permissões IAM.",
    "provenance": {
      "kind": "authorial",
      "reviewedAt": "2026-11-19",
      "references": [
        {
          "title": "IAM: acesso entre contas",
          "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_aws-accounts.html"
        }
      ]
    }
  },
  {
    "id": 32,
    "domain": "Segurança",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Um portal guarda comprovantes em um bucket S3 privado. Após autenticar o cliente, o backend deve permitir o download de um único comprovante por até cinco minutos, sem entregar credenciais AWS ao navegador. Qual solução atende com menor esforço operacional?",
    "options": [
      "Tornar o bucket público por cinco minutos e depois restaurar a política privada.",
      "Gerar no backend uma URL pré-assinada de GET para a chave do comprovante, com validade de cinco minutos.",
      "Entregar ao navegador a chave de acesso da função utilizada pelo backend.",
      "Habilitar o versionamento do bucket para autorizar downloads temporários."
    ],
    "correctIndices": [
      1
    ],
    "keyword": "S3: URL pré-assinada",
    "summary": "A URL pré-assinada concede acesso temporário à operação e ao objeto especificados, limitado às permissões de quem assina e à validade de suas credenciais. O bucket pode continuar privado. A URL deve ser protegida, pois quem a possuir poderá usá-la enquanto estiver válida.",
    "provenance": {
      "kind": "authorial",
      "reviewedAt": "2026-11-19",
      "references": [
        {
          "title": "S3: downloads e uploads com URLs pré-assinadas",
          "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html"
        }
      ]
    }
  },
  {
    "id": 33,
    "domain": "Segurança",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma plataforma de cursos precisa oferecer cadastro, login e autenticação de usuários de sua aplicação web. O backend espera tokens OIDC/JWT e a equipe não quer operar um diretório de senhas. Qual serviço é o mais adequado?",
    "options": [
      "AWS Organizations, criando uma conta AWS para cada aluno.",
      "IAM Access Analyzer, emitindo tokens de sessão para o site.",
      "Amazon Cognito user pool, integrado à aplicação.",
      "Amazon Cognito identity pool, usado isoladamente como diretório de senhas e emissor de tokens OIDC da aplicação."
    ],
    "correctIndices": [
      2
    ],
    "keyword": "Cognito user pool para autenticação",
    "summary": "User pools fornecem diretório e fluxos de autenticação para aplicações, com tokens para integração. Identity pools têm outra finalidade: fornecer credenciais AWS temporárias para acesso a recursos. Organizations e Access Analyzer não implementam o login dos alunos.",
    "provenance": {
      "kind": "authorial",
      "reviewedAt": "2026-11-19",
      "references": [
        {
          "title": "Cognito: autenticação com user pools",
          "url": "https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools.html"
        }
      ]
    }
  },
  {
    "id": 34,
    "domain": "Segurança",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma aplicação aceita HTTPS de clientes em uma instância EC2. Considerando somente security groups, sem bloqueios de NACL ou de rotas, a equipe remove todas as regras de saída. O tráfego de resposta das conexões HTTPS de entrada já permitidas será bloqueado?",
    "options": [
      "Sim, pois security groups exigem regras explícitas nas duas direções de cada conexão.",
      "Sim, a menos que sejam liberadas todas as portas efêmeras no security group.",
      "Não, pois security groups permitem todo tráfego de saída mesmo quando não possuem regras.",
      "Não. Security groups são stateful e permitem as respostas ao tráfego de entrada autorizado."
    ],
    "correctIndices": [
      3
    ],
    "keyword": "Security groups são stateful",
    "summary": "O estado da conexão permite o tráfego de resposta independentemente das regras da direção oposta. Isso não significa liberar novas conexões de saída. NACLs são um controle separado e podem exigir regras próprias para o retorno.",
    "provenance": {
      "kind": "authorial",
      "reviewedAt": "2026-11-19",
      "references": [
        {
          "title": "VPC: fundamentos de security groups",
          "url": "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html"
        }
      ]
    }
  },
  {
    "id": 35,
    "domain": "Resiliência",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Consumidores processam eventos de uma fila SQS Standard. Mensagens malformadas falham repetidamente e precisam ser isoladas para análise depois de algumas tentativas, sem serem descartadas de imediato. Qual configuração atende ao requisito?",
    "options": [
      "Configurar uma dead-letter queue e uma redrive policy com maxReceiveCount adequado na fila de origem.",
      "Diminuir a retenção da fila de origem para excluir rapidamente todos os eventos.",
      "Substituir a fila por notificações de e-mail sem armazenamento das mensagens.",
      "Configurar maxReceiveCount para que o consumidor sempre apague a mensagem antes de processá-la."
    ],
    "correctIndices": [
      0
    ],
    "keyword": "SQS: dead-letter queue e redrive policy",
    "summary": "A redrive policy determina quantas recepções sem exclusão bem-sucedida são toleradas antes de encaminhar a mensagem à DLQ. A fila separada permite investigar e, após corrigir a causa, reprocessar as mensagens. O limite deve permitir novas tentativas para falhas transitórias.",
    "provenance": {
      "kind": "authorial",
      "reviewedAt": "2026-11-19",
      "references": [
        {
          "title": "SQS: dead-letter queues",
          "url": "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html"
        }
      ]
    }
  },
  {
    "id": 36,
    "domain": "Resiliência",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma aplicação transacional usa RDS for PostgreSQL Single-AZ. A prioridade é recuperar o serviço automaticamente se a AZ do banco falhar. Não há necessidade de escalar leituras. Qual mudança atende com menor esforço operacional?",
    "options": [
      "Criar uma réplica de leitura na mesma AZ e exigir promoção manual.",
      "Converter a implantação para RDS Multi-AZ com uma instância standby em outra AZ.",
      "Aumentar o volume de armazenamento da instância atual.",
      "Configurar apenas snapshots mensais, mantendo a instância em uma única AZ."
    ],
    "correctIndices": [
      1
    ],
    "keyword": "RDS Multi-AZ com uma standby",
    "summary": "Essa implantação mantém uma standby síncrona em outra AZ e oferece failover automático. A standby desse tipo de implantação não atende consultas de leitura. Ela é diferente de um Multi-AZ DB cluster com instâncias legíveis; backups não substituem o failover automático.",
    "provenance": {
      "kind": "authorial",
      "reviewedAt": "2026-11-19",
      "references": [
        {
          "title": "RDS: implantação Multi-AZ com uma standby",
          "url": "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZSingleStandby.html"
        }
      ]
    }
  },
  {
    "id": 37,
    "domain": "Resiliência",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Um serviço possui um endpoint principal e um endpoint de contingência já provisionado em outra Região. A equipe quer que o DNS retorne o secundário quando uma verificação de integridade indicar falha no principal. Qual política do Route 53 deve usar?",
    "options": [
      "Geolocalização, sem verificações de integridade.",
      "Simples, publicando os dois destinos como equivalentes.",
      "Failover, com registros primário e secundário e verificação de integridade do principal.",
      "Ponderada, mantendo permanentemente 100% do peso no principal e sem avaliação de saúde."
    ],
    "correctIndices": [
      2
    ],
    "keyword": "Route 53: failover ativo-passivo",
    "summary": "Failover atende ao desenho ativo-passivo: o destino secundário é utilizado quando o principal não está saudável. O mecanismo atua nas respostas DNS e depende dos caches e TTLs; ele não replica dados nem garante a migração instantânea das conexões existentes.",
    "provenance": {
      "kind": "authorial",
      "reviewedAt": "2026-11-19",
      "references": [
        {
          "title": "Route 53: roteamento de failover",
          "url": "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-failover.html"
        }
      ]
    }
  },
  {
    "id": 38,
    "domain": "Resiliência",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Um bucket S3 recebe documentos que usuários às vezes sobrescrevem ou excluem por engano. A equipe precisa recuperar versões anteriores após essas operações, sem exigir retenção imutável. Qual recurso deve habilitar antes de novas alterações?",
    "options": [
      "Transfer Acceleration, para manter cópias anteriores nos pontos de presença.",
      "CORS, para impedir qualquer exclusão autenticada.",
      "Criptografia SSE-S3, que cria automaticamente um histórico de alterações.",
      "S3 Versioning, preservando versões e permitindo recuperar objetos com delete markers."
    ],
    "correctIndices": [
      3
    ],
    "keyword": "S3 Versioning para recuperação",
    "summary": "Com versionamento, sobrescritas criam novas versões e exclusões sem versionId normalmente adicionam um delete marker. Versões anteriores podem ser recuperadas, desde que não tenham sido permanentemente excluídas. Versionamento não é imutabilidade; versões armazenadas também geram custos.",
    "provenance": {
      "kind": "authorial",
      "reviewedAt": "2026-11-19",
      "references": [
        {
          "title": "S3: preservação de versões de objetos",
          "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html"
        }
      ]
    }
  },
  {
    "id": 39,
    "domain": "Alto Desempenho",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma produtora envia arquivos de 8 GB para o S3 por um link instável. Quando ocorre uma falha, ela quer reenviar somente a parte afetada e poder transferir partes em paralelo. Qual abordagem deve adotar?",
    "options": [
      "Utilizar multipart upload e concluir o upload após enviar todas as partes.",
      "Enviar o arquivo com uma única operação PUT, reiniciando toda a transferência após cada erro.",
      "Habilitar S3 Versioning para dividir automaticamente o envio em blocos paralelos.",
      "Usar S3 Select como protocolo de envio dos arquivos."
    ],
    "correctIndices": [
      0
    ],
    "keyword": "S3 multipart upload",
    "summary": "Multipart upload divide a transferência em partes independentes, que podem ser enviadas em paralelo e repetidas individualmente em caso de falha. O objeto fica disponível após concluir o upload. Uploads abandonados devem ser abortados para evitar custos das partes remanescentes.",
    "provenance": {
      "kind": "authorial",
      "reviewedAt": "2026-11-19",
      "references": [
        {
          "title": "S3: visão geral de multipart upload",
          "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html"
        }
      ]
    }
  },
  {
    "id": 40,
    "domain": "Alto Desempenho",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma aplicação grava um item em uma tabela DynamoDB de uma única Região. Logo após a confirmação da escrita, precisa ler a versão mais recente desse mesmo item diretamente pela chave primária. Qual operação atende ao requisito?",
    "options": [
      "GetItem com leitura eventualmente consistente, pois toda leitura reflete imediatamente a última escrita.",
      "GetItem na tabela com ConsistentRead definido como true.",
      "Query em qualquer índice secundário global com ConsistentRead definido como true.",
      "Leitura a partir do DynamoDB Streams para substituir a consulta síncrona por chave."
    ],
    "correctIndices": [
      1
    ],
    "keyword": "DynamoDB: leitura fortemente consistente",
    "summary": "Tabelas e índices secundários locais aceitam leituras fortemente consistentes. GSIs não oferecem essa opção. O requisito pede o item atualizado na mesma Região, diretamente na tabela; uma leitura eventual pode retornar uma versão anterior logo após a escrita.",
    "provenance": {
      "kind": "authorial",
      "reviewedAt": "2026-11-19",
      "references": [
        {
          "title": "DynamoDB: consistência de leitura",
          "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadConsistency.html"
        }
      ]
    }
  },
  {
    "id": 41,
    "domain": "Alto Desempenho",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma loja usa CloudFront para servir imagens. O parâmetro variant altera a imagem, enquanto campaign só identifica a campanha e não muda a resposta. Há muitas combinações de campaign reduzindo os acertos do cache. Como melhorar o cache sem misturar variantes?",
    "options": [
      "Retirar todos os parâmetros da chave de cache, inclusive variant.",
      "Incluir sempre todos os parâmetros na chave de cache.",
      "Configurar a chave de cache para considerar variant e ignorar campaign, encaminhando à origem o que for necessário.",
      "Criar uma distribuição CloudFront separada para cada campanha."
    ],
    "correctIndices": [
      2
    ],
    "keyword": "CloudFront: chave de cache seletiva",
    "summary": "A chave deve distinguir valores que alteram a representação do objeto. Parâmetros de rastreamento que não mudam a resposta fragmentam o cache sem benefício. Ignorar variant, por outro lado, pode entregar uma imagem incorreta. Encaminhamento à origem e composição da chave devem ser configurados conforme a aplicação.",
    "provenance": {
      "kind": "authorial",
      "reviewedAt": "2026-11-19",
      "references": [
        {
          "title": "CloudFront: cache por parâmetros de query string",
          "url": "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/QueryStringParameters.html"
        }
      ]
    }
  },
  {
    "id": 42,
    "domain": "Alto Desempenho",
    "multiSelect": true,
    "requiredCount": 2,
    "question": "Um cluster Aurora possui uma instância de gravação e duas Aurora Replicas. Relatórios somente de leitura podem tolerar o atraso de replicação. Quais ações distribuem essas conexões sem enviar gravações às réplicas? Selecione DUAS.",
    "options": [
      "Apontar todas as gravações para o reader endpoint.",
      "Fixar todas as conexões no endpoint de uma única réplica.",
      "Manter operações de escrita no cluster endpoint de gravação.",
      "Enviar as novas conexões dos relatórios ao reader endpoint.",
      "Substituir as réplicas por cópias manuais diárias de snapshots."
    ],
    "correctIndices": [
      2,
      3
    ],
    "keyword": "Aurora: writer e reader endpoints",
    "summary": "O cluster endpoint direciona à instância primária. Com réplicas disponíveis, o reader endpoint distribui conexões de leitura entre elas, e não cada consulta de uma conexão existente. Separar os pools de conexão permite aliviar o writer; leituras que exigem dados imediatamente atualizados podem precisar dele.",
    "provenance": {
      "kind": "authorial",
      "reviewedAt": "2026-11-19",
      "references": [
        {
          "title": "Aurora: conexões por endpoints",
          "url": "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.Endpoints.html"
        }
      ]
    }
  },
  {
    "id": 43,
    "domain": "Otimização de Custos",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma equipe guarda cópias secundárias de arquivos de 10 MB que podem ser recriados a partir de um repositório externo. São mantidas por pelo menos seis meses, raramente consultadas e exigem acesso em milissegundos. A perda de uma AZ é aceitável. Qual classe atende com menor custo de armazenamento entre as opções?",
    "options": [
      "S3 Standard.",
      "S3 Standard-IA.",
      "S3 Glacier Deep Archive.",
      "S3 One Zone-IA."
    ],
    "correctIndices": [
      3
    ],
    "keyword": "S3 One Zone-IA para dados recriáveis",
    "summary": "One Zone-IA é adequada a dados pouco acessados e recriáveis quando não é necessária resiliência à perda de uma AZ. Oferece acesso em milissegundos e armazenamento menor que Standard-IA, com cobrança por recuperação. Deep Archive não atende ao acesso imediato exigido.",
    "provenance": {
      "kind": "authorial",
      "reviewedAt": "2026-11-19",
      "references": [
        {
          "title": "S3: classes de armazenamento",
          "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html"
        }
      ]
    }
  },
  {
    "id": 44,
    "domain": "Otimização de Custos",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Instâncias EC2 privadas transferem grandes volumes para o S3 na mesma Região por um NAT gateway. A equipe quer reduzir o processamento cobrado no NAT sem abrir acesso público às instâncias. Qual alteração é mais adequada?",
    "options": [
      "Criar um gateway VPC endpoint para o S3 e associá-lo às tabelas de rotas das sub-redes privadas.",
      "Substituir o NAT gateway por um internet gateway mantendo as instâncias sem IP público.",
      "Criar uma conexão VPN pela internet para alcançar o endpoint público do S3.",
      "Adicionar um segundo NAT gateway e balancear o mesmo volume de dados entre os dois."
    ],
    "correctIndices": [
      0
    ],
    "keyword": "Gateway endpoint S3 sem taxa adicional",
    "summary": "O gateway endpoint permite alcançar o S3 sem NAT ou internet gateway e não possui taxa adicional de endpoint. As políticas IAM, do bucket e do endpoint ainda controlam a autorização. Ele reduz esse tráfego pelo NAT, mas não substitui o NAT para outros destinos que continuem necessários.",
    "provenance": {
      "kind": "authorial",
      "reviewedAt": "2026-11-19",
      "references": [
        {
          "title": "VPC: gateway endpoints",
          "url": "https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html"
        }
      ]
    }
  },
  {
    "id": 45,
    "domain": "Otimização de Custos",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma tabela DynamoDB acumula eventos temporários. Eles deixam de ser úteis após sete dias e podem ser excluídos alguns dias depois desse prazo. A aplicação consegue ignorar itens vencidos nas consultas. Qual solução evita jobs de limpeza e consumo de escrita para a exclusão inicial?",
    "options": [
      "Executar um Scan completo a cada minuto e excluir cada item com DeleteItem.",
      "Habilitar TTL e gravar em cada item um atributo numérico com a expiração em Unix epoch, em segundos.",
      "Configurar TTL em uma string de data e exigir remoção exatamente no segundo informado.",
      "Criar um índice secundário global para excluir automaticamente os itens da tabela após sete dias."
    ],
    "correctIndices": [
      1
    ],
    "keyword": "DynamoDB TTL: expiração assíncrona",
    "summary": "TTL remove itens vencidos de forma assíncrona, normalmente em alguns dias, sem consumir escrita para a exclusão inicial. O atributo deve ser numérico e expresso em segundos Unix. Enquanto aguardam remoção, itens vencidos ainda podem ser lidos; a aplicação deve tratá-los. Em global tables, exclusões replicadas podem ser cobradas.",
    "provenance": {
      "kind": "authorial",
      "reviewedAt": "2026-11-19",
      "references": [
        {
          "title": "DynamoDB: Time to Live",
          "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html"
        }
      ]
    }
  },
  {
    "id": 46,
    "domain": "Otimização de Custos",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma aplicação utiliza volumes EBS gp2 superdimensionados apenas para obter mais IOPS. A capacidade de disco usada é pequena e a carga está dentro dos limites de gp3. Qual mudança permite ajustar desempenho sem comprar capacidade desnecessária?",
    "options": [
      "Migrar para um volume HDD sc1, independentemente do padrão de E/S.",
      "Substituir o volume por instance store e assumir que os dados sobreviverão à parada da instância.",
      "Migrar para gp3 e provisionar capacidade, IOPS e throughput conforme a necessidade.",
      "Aumentar ainda mais o tamanho do volume gp2 para reduzir a quantidade de GiB faturada."
    ],
    "correctIndices": [
      2
    ],
    "keyword": "EBS gp3: desempenho independente da capacidade",
    "summary": "gp3 permite configurar IOPS e throughput independentemente da capacidade. Isso evita manter espaço ocioso apenas para aumentar o desempenho de gp2. A migração exige dimensionar os três parâmetros e verificar os limites da instância; o custo final depende do desempenho adicional contratado.",
    "provenance": {
      "kind": "authorial",
      "reviewedAt": "2026-11-19",
      "references": [
        {
          "title": "EBS: volumes SSD de uso geral",
          "url": "https://docs.aws.amazon.com/ebs/latest/userguide/general-purpose.html"
        }
      ]
    }
  }
];
