import type { Question } from '../../types';

// Enunciados, alternativas e comentários extraídos dos PDFs fornecidos.
// Duplicatas entre arquivos mantêm todas as origens em sourceDocuments.
export const DPCN_2: Question[] = [
  {
    "id": 1201,
    "domain": "Segurança",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Um usuário IAM fez várias alterações de configuração em recursos AWS na conta de sua empresa durante uma implantação de produção na semana passada. Um arquiteto de soluções descobriu que algumas regras de grupos de segurança não estão configuradas como desejado. O arquiteto de soluções quer confirmar qual usuário IAM foi responsável por fazer as alterações. Qual serviço o arquiteto de soluções deve usar para encontrar as informações desejadas?",
    "options": [
      "Amazon GuardDuty",
      "Amazon Inspector",
      "AWS CloudTrail",
      "AWS Config"
    ],
    "correctIndices": [
      2
    ],
    "keyword": "CloudTrail: autoria das alterações",
    "summary": "O AWS CloudTrail registra todas as chamadas de API feitas na conta AWS, incluindo quem fez a chamada (identidade do usuário IAM), quando foi feita, de qual endereço IP, e quais parâmetros foram usados. Para investigar alterações em regras de Security Groups, o CloudTrail registra eventos como AuthorizeSecurityGroupIngress e RevokeSecurityGroupEgress, incluindo o usuário IAM responsável. É a ferramenta de auditoria e conformidade padrão da AWS para rastrear ações de usuários.",
    "optionExplanations": [
      "O Amazon GuardDuty é um serviço de detecção de ameaças que monitora continuamente atividades maliciosas e comportamentos não autorizados usando machine learning. Ele detecta ameaças como acesso suspeito ou comprometimento de credenciais, mas não fornece um histórico detalhado de quais usuários IAM fizeram alterações específicas em recursos.",
      "O Amazon Inspector é um serviço de avaliação de segurança que analisa vulnerabilidades em instâncias EC2 e imagens de contêiner. Ele identifica vulnerabilidades de software e configurações inseguras, mas não registra histórico de ações de usuários IAM em recursos AWS.",
      "O AWS CloudTrail registra todas as chamadas de API feitas na conta AWS, incluindo quem fez a chamada (identidade do usuário IAM), quando foi feita, de qual endereço IP, e quais parâmetros foram usados. Para investigar alterações em regras de Security Groups, o CloudTrail registra eventos como AuthorizeSecurityGroupIngress e RevokeSecurityGroupEgress, incluindo o usuário IAM responsável. É a ferramenta de auditoria e conformidade padrão da AWS para rastrear ações de usuários.",
      "O AWS Config registra o histórico de configurações dos recursos AWS e permite verificar como um recurso estava configurado em um ponto específico no tempo. Embora possa mostrar o que mudou na configuração do Security Group, ele não identifica de forma direta qual usuário IAM específico fez a alteração. Para identificar o usuário responsável, o CloudTrail é o serviço correto."
    ],
    "sourceDocuments": [
      {
        "examNumber": 2,
        "questionNumber": 1,
        "fileName": "Simulado Comentado 2 Novo DPCN.pdf",
        "questionPage": 4,
        "explanationPages": [
          5
        ]
      }
    ]
  },
  {
    "id": 1202,
    "domain": "Segurança",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa implementou um serviço DNS autogerenciado na AWS. A solução consiste no seguinte: Instâncias do Amazon EC2 em diferentes Regiões AWS; Endpoints de um acelerador padrão no AWS Global Accelerator. A empresa quer proteger a solução contra ataques DDoS. O que um arquiteto de soluções deve fazer para atender a esse requisito?",
    "options": [
      "Assinar o AWS Shield Advanced. Adicionar o acelerador como recurso a proteger.",
      "Assinar o AWS Shield Advanced. Adicionar as instâncias EC2 como recursos a proteger.",
      "Criar uma ACL web do AWS WAF que inclui uma regra baseada em taxa. Associar a ACL web ao acelerador.",
      "Criar uma ACL web do AWS WAF que inclui uma regra baseada em taxa. Associar a ACL web às instâncias EC2."
    ],
    "correctIndices": [
      0
    ],
    "keyword": "Shield Advanced no Global Accelerator",
    "summary": "O AWS Shield Advanced oferece proteção aprimorada contra ataques DDoS para recursos específicos da AWS. O ponto de entrada do tráfego nessa arquitetura são os endpoints do AWS Global Accelerator — é aqui que o tráfego entra na rede AWS antes de ser roteado para as instâncias EC2. Proteger o acelerador com Shield Advanced garante que os ataques DDoS sejam mitigados na borda da rede global da AWS, antes de chegarem às instâncias EC2. O Shield Advanced também oferece suporte 24/7 da equipe DRT (DDoS Response Team) e proteção de custos.",
    "optionExplanations": [
      "O AWS Shield Advanced oferece proteção aprimorada contra ataques DDoS para recursos específicos da AWS. O ponto de entrada do tráfego nessa arquitetura são os endpoints do AWS Global Accelerator — é aqui que o tráfego entra na rede AWS antes de ser roteado para as instâncias EC2. Proteger o acelerador com Shield Advanced garante que os ataques DDoS sejam mitigados na borda da rede global da AWS, antes de chegarem às instâncias EC2. O Shield Advanced também oferece suporte 24/7 da equipe DRT (DDoS Response Team) e proteção de custos.",
      "Embora o Shield Advanced possa proteger instâncias EC2 individualmente, nessa arquitetura o tráfego flui primeiro pelo Global Accelerator. Proteger apenas as instâncias EC2 deixaria o acelerador — ponto de entrada do tráfego — desprotegido. A proteção deve ser aplicada no ponto de entrada, que é o acelerador.",
      "O AWS WAF opera na camada 7 (HTTP/HTTPS) e é associado a recursos como CloudFront, ALB, API Gateway e AppSync. O AWS WAF não pode ser associado diretamente a um acelerador do Global Accelerator padrão. Além disso, o tráfego DNS usa UDP/TCP na porta 53, não HTTP/HTTPS.",
      "O AWS WAF não pode ser associado diretamente a instâncias EC2 — ele funciona com CloudFront, ALB, API Gateway, AppSync e Cognito. Além disso, para tráfego DNS (UDP/TCP porta 53), o WAF com regras baseadas em taxa não é a ferramenta apropriada."
    ],
    "sourceDocuments": [
      {
        "examNumber": 2,
        "questionNumber": 2,
        "fileName": "Simulado Comentado 2 Novo DPCN.pdf",
        "questionPage": 7,
        "explanationPages": [
          8
        ]
      }
    ]
  },
  {
    "id": 1203,
    "domain": "Segurança",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa financeira hospeda um aplicativo web na AWS. O aplicativo usa um endpoint Regional do Amazon API Gateway para dar aos usuários a capacidade de recuperar os preços atuais das ações. A equipe de segurança da empresa notou um aumento no número de solicitações de API. A equipe de segurança está preocupada que ataques de inundação HTTP possam fazer o aplicativo ficar offline. Um arquiteto de soluções deve projetar uma solução para proteger o aplicativo desse tipo de ataque. Qual solução atende a esses requisitos com o MENOR overhead operacional?",
    "options": [
      "Criar uma distribuição do Amazon CloudFront na frente do endpoint Regional do API Gateway com um TTL máximo de 24 horas.",
      "Criar uma ACL web Regional do AWS WAF com uma regra baseada em taxa. Associar a ACL web ao estágio do API Gateway.",
      "Usar métricas do Amazon CloudWatch para monitorar a métrica Count e alertar a equipe de segurança quando a taxa predefinida for atingida.",
      "Criar uma distribuição do Amazon CloudFront com Lambda@Edge na frente do endpoint Regional do API Gateway. Criar uma função AWS Lambda para bloquear solicitações de endereços IP que excedam a taxa predefinida."
    ],
    "correctIndices": [
      1
    ],
    "keyword": "WAF: regra baseada em taxa",
    "summary": "O AWS WAF com regras baseadas em taxa (rate-based rules) é a solução ideal para proteger contra ataques de inundação HTTP com mínimo overhead operacional. Uma ACL web Regional com rate-based rule monitora automaticamente a taxa de requisições por endereço IP e bloqueia automaticamente IPs que excedam o limite configurado (ex: 2000 requisições por 5 minutos). O WAF se integra nativamente com o API Gateway Regional, sem necessidade de alterações na arquitetura existente.",
    "optionExplanations": [
      "O CloudFront com TTL alto pode ajudar a reduzir requisições para conteúdo estático em cache, mas para uma API que retorna preços de ações em tempo real, um TTL de 24 horas tornaria os dados desatualizados e inúteis. Além disso, o CloudFront sozinho não bloqueia ataques de inundação HTTP ativamente.",
      "O AWS WAF com regras baseadas em taxa (rate-based rules) é a solução ideal para proteger contra ataques de inundação HTTP com mínimo overhead operacional. Uma ACL web Regional com rate-based rule monitora automaticamente a taxa de requisições por endereço IP e bloqueia automaticamente IPs que excedam o limite configurado (ex: 2000 requisições por 5 minutos). O WAF se integra nativamente com o API Gateway Regional, sem necessidade de alterações na arquitetura existente.",
      "Monitorar métricas e alertar a equipe é uma abordagem reativa — a equipe precisaria investigar e tomar ação manualmente após receber o alerta. Durante o tempo entre o alerta e a ação manual, o ataque continuaria. Não é uma proteção automática e tem alto overhead operacional.",
      "Usar CloudFront com Lambda@Edge para bloquear IPs é tecnicamente possível, mas tem alto overhead operacional — requer desenvolvimento e manutenção de código Lambda, além de configuração do CloudFront. O AWS WAF com rate-based rules resolve o mesmo problema de forma nativa e gerenciada com muito menos esforço."
    ],
    "sourceDocuments": [
      {
        "examNumber": 2,
        "questionNumber": 3,
        "fileName": "Simulado Comentado 2 Novo DPCN.pdf",
        "questionPage": 10,
        "explanationPages": [
          11
        ]
      }
    ]
  },
  {
    "id": 1204,
    "domain": "Resiliência",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa de startups meteorológica tem um aplicativo web personalizado para vender dados meteorológicos online aos seus usuários. A empresa usa o Amazon DynamoDB para armazenar seus dados e quer criar um novo serviço que envie um alerta para os gerentes de quatro equipes internas toda vez que um novo evento meteorológico for registrado. A empresa não quer que esse novo serviço afete o desempenho do aplicativo atual. O que um arquiteto de soluções deve fazer para atender a esses requisitos com o MENOR overhead operacional?",
    "options": [
      "Usar transações do DynamoDB para gravar novos dados de eventos na tabela. Configurar as transações para notificar as equipes internas.",
      "Ter o aplicativo atual publicar uma mensagem em quatro tópicos do Amazon Simple Notification Service (Amazon SNS). Ter cada equipe assinar um tópico.",
      "Habilitar os DynamoDB Streams na tabela. Usar triggers para gravar em um único tópico do Amazon Simple Notification Service (Amazon SNS) no qual as equipes possam assinar.",
      "Adicionar um atributo personalizado a cada registro para sinalizar novos itens. Escrever um trabalho cron que verifica a tabela a cada minuto por itens novos e notifica uma fila do Amazon Simple Queue Service (Amazon SQS) na qual as equipes possam assinar."
    ],
    "correctIndices": [
      2
    ],
    "keyword": "DynamoDB Streams e SNS",
    "summary": "O DynamoDB Streams captura automaticamente todas as modificações na tabela (insert, update, delete) sem impactar o desempenho do aplicativo — é um fluxo assíncrono e separado. Um trigger (Lambda) processa o stream e publica uma mensagem em um único tópico SNS. Os gerentes das quatro equipes assinam esse tópico e recebem notificações automaticamente. Esta solução é completamente desacoplada do aplicativo existente, não afeta seu desempenho, e tem mínimo overhead operacional.",
    "optionExplanations": [
      "As transações do DynamoDB garantem operações ACID em múltiplos itens, mas não possuem funcionalidade de notificação integrada. Não é possível configurar transações para enviar alertas automaticamente — não existe esse recurso no DynamoDB.",
      "Modificar o aplicativo atual para publicar em tópicos SNS adiciona lógica de notificação diretamente no código da aplicação, o que pode afetar o desempenho (requisito violado) e aumenta o acoplamento. Usar quatro tópicos SNS separados em vez de um também aumenta o overhead operacional desnecessariamente.",
      "O DynamoDB Streams captura automaticamente todas as modificações na tabela (insert, update, delete) sem impactar o desempenho do aplicativo — é um fluxo assíncrono e separado. Um trigger (Lambda) processa o stream e publica uma mensagem em um único tópico SNS. Os gerentes das quatro equipes assinam esse tópico e recebem notificações automaticamente. Esta solução é completamente desacoplada do aplicativo existente, não afeta seu desempenho, e tem mínimo overhead operacional.",
      "Um trabalho cron que consulta a tabela DynamoDB periodicamente (polling) consome capacidade de leitura do banco, pode causar atrasos de até 1 minuto na notificação, e aumenta o overhead operacional de manutenção. As filas SQS não são adequadas para notificações para múltiplos assinantes individuais (isso é papel do SNS). É uma abordagem ineficiente comparada ao uso de Streams."
    ],
    "sourceDocuments": [
      {
        "examNumber": 2,
        "questionNumber": 4,
        "fileName": "Simulado Comentado 2 Novo DPCN.pdf",
        "questionPage": 13,
        "explanationPages": [
          14
        ]
      }
    ]
  },
  {
    "id": 1205,
    "domain": "Resiliência",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa quer usar a Nuvem AWS para tornar um aplicativo existente altamente disponível e resiliente. A versão atual do aplicativo reside no data center da empresa. O aplicativo experimentou recentemente perda de dados após a falha de um servidor de banco de dados por causa de uma interrupção de energia inesperada. A empresa precisa de uma solução que evite qualquer único ponto de falha. A solução deve dar ao aplicativo a capacidade de escalar para atender à demanda dos usuários. Qual solução atenderá a esses requisitos?",
    "options": [
      "Implantar os servidores de aplicativos usando instâncias do Amazon EC2 em um grupo de Auto Scaling em múltiplas Zonas de Disponibilidade. Usar uma instância de banco de dados Amazon RDS em uma configuração Multi-AZ.",
      "Implantar os servidores de aplicativos usando instâncias do Amazon EC2 em um grupo de Auto Scaling em uma única Zona de Disponibilidade. Implantar o banco de dados em uma instância EC2. Habilitar a Recuperação Automática EC2.",
      "Implantar os servidores de aplicativos usando instâncias do Amazon EC2 em um grupo de Auto Scaling em múltiplas Zonas de Disponibilidade. Usar uma instância de banco de dados Amazon RDS com uma réplica de leitura em uma única Zona de Disponibilidade. Promover a réplica de leitura para substituir a instância primária de banco de dados se a instância primária falhar.",
      "Implantar os servidores de aplicativos usando instâncias do Amazon EC2 em um grupo de Auto Scaling em múltiplas Zonas de Disponibilidade. Implantar os servidores de banco de dados primário e secundário em instâncias EC2 em múltiplas Zonas de Disponibilidade. Usar o Amazon Elastic Block Store (Amazon EBS) Multi-Attach para criar armazenamento compartilhado entre as instâncias."
    ],
    "correctIndices": [
      0
    ],
    "keyword": "Auto Scaling Multi-AZ e RDS Multi-AZ",
    "summary": "Esta solução elimina todos os pontos únicos de falha e adiciona capacidade de escalonamento. O grupo de Auto Scaling em múltiplas AZs garante que se uma AZ falhar, as instâncias em outras AZs continuam servindo o tráfego, e novas instâncias são lançadas automaticamente conforme a demanda aumenta. O RDS Multi-AZ mantém uma instância standby sincronizada em outra AZ com failover automático em caso de falha da instância primária — resolve diretamente o problema de perda de dados por falha do servidor de banco de dados descrito no cenário.",
    "optionExplanations": [
      "Esta solução elimina todos os pontos únicos de falha e adiciona capacidade de escalonamento. O grupo de Auto Scaling em múltiplas AZs garante que se uma AZ falhar, as instâncias em outras AZs continuam servindo o tráfego, e novas instâncias são lançadas automaticamente conforme a demanda aumenta. O RDS Multi-AZ mantém uma instância standby sincronizada em outra AZ com failover automático em caso de falha da instância primária — resolve diretamente o problema de perda de dados por falha do servidor de banco de dados descrito no cenário.",
      "Usar uma única Zona de Disponibilidade mantém um ponto único de falha no nível de AZ. Implantar o banco de dados em uma instância EC2 sem gerenciamento automatizado de HA e sem o recurso Multi-AZ não resolve o problema de perda de dados. A Recuperação Automática EC2 reinicia a instância em caso de falha de hardware, mas não protege contra perda de dados durante o processo.",
      "Uma réplica de leitura RDS na mesma AZ que a instância primária não elimina o ponto único de falha no nível de AZ. Além disso, a promoção manual de uma réplica de leitura requer intervenção humana — não é failover automático. As réplicas de leitura usam replicação assíncrona, o que pode resultar em alguma perda de dados durante a promoção.",
      "Gerenciar bancos de dados em instâncias EC2 aumenta o overhead operacional significativamente. O EBS Multi-Attach tem limitações importantes — suporta apenas volumes io1/io2 e requer que as aplicações gerenciem o acesso concorrente ao nível do sistema de arquivos. Esta abordagem é muito mais complexa e menos confiável que o RDS Multi-AZ gerenciado."
    ],
    "sourceDocuments": [
      {
        "examNumber": 2,
        "questionNumber": 5,
        "fileName": "Simulado Comentado 2 Novo DPCN.pdf",
        "questionPage": 16,
        "explanationPages": [
          17
        ]
      }
    ]
  },
  {
    "id": 1206,
    "domain": "Resiliência",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa precisa ingerir e lidar com grandes quantidades de dados de streaming que seu aplicativo gera. O aplicativo é executado em instâncias do Amazon EC2 e envia dados para o Amazon Kinesis Data Streams, que está configurado com as configurações padrão. A cada dois dias, o aplicativo consome os dados e grava os dados em um bucket do Amazon S3 para processamento de business intelligence (BI). A empresa observa que o Amazon S3 não está recebendo todos os dados que o aplicativo envia para o Kinesis Data Streams. O que um arquiteto de soluções deve fazer para resolver esse problema?",
    "options": [
      "Atualizar as configurações padrão do Kinesis Data Streams modificando o período de retenção de dados.",
      "Atualizar o aplicativo para usar a Kinesis Producer Library (KPL) para enviar os dados para o Kinesis Data Streams.",
      "Atualizar o número de shards do Kinesis para lidar com o throughput dos dados enviados para o Kinesis Data Streams.",
      "Ativar o S3 Versioning no bucket S3 para preservar cada versão de cada objeto que é ingerido no bucket S3."
    ],
    "correctIndices": [
      0
    ],
    "keyword": "Kinesis: retenção de dados",
    "summary": "O Amazon Kinesis Data Streams tem um período de retenção de dados padrão de 24 horas. Como o aplicativo consome os dados a cada dois dias (48 horas), os dados gerados nas primeiras horas são descartados pelo Kinesis antes de serem consumidos. A solução é aumentar o período de retenção para pelo menos 48 horas (pode ser configurado até 365 dias) para garantir que todos os dados estejam disponíveis quando o aplicativo for consumi-los a cada dois dias.",
    "optionExplanations": [
      "O Amazon Kinesis Data Streams tem um período de retenção de dados padrão de 24 horas. Como o aplicativo consome os dados a cada dois dias (48 horas), os dados gerados nas primeiras horas são descartados pelo Kinesis antes de serem consumidos. A solução é aumentar o período de retenção para pelo menos 48 horas (pode ser configurado até 365 dias) para garantir que todos os dados estejam disponíveis quando o aplicativo for consumi-los a cada dois dias.",
      "A Kinesis Producer Library (KPL) melhora o throughput de ingestão usando agregação e compressão de registros, mas não resolve o problema de dados sendo descartados antes de serem consumidos. O problema é de retenção, não de throughput de ingestão.",
      "Aumentar o número de shards aumenta a capacidade de throughput do stream (mais dados por segundo), mas não resolve o problema de dados sendo descartados por expiração do período de retenção. O problema não é de capacidade de ingestão, mas sim de tempo de retenção.",
      "O S3 Versioning preserva múltiplas versões de objetos já gravados no S3, mas não tem qualquer relação com o problema de dados não chegando ao S3 a partir do Kinesis. O problema ocorre antes dos dados chegarem ao S3 — eles expiram no Kinesis antes de serem consumidos."
    ],
    "sourceDocuments": [
      {
        "examNumber": 2,
        "questionNumber": 6,
        "fileName": "Simulado Comentado 2 Novo DPCN.pdf",
        "questionPage": 19,
        "explanationPages": [
          20
        ]
      }
    ]
  },
  {
    "id": 1207,
    "domain": "Segurança",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Um desenvolvedor tem um aplicativo que usa uma função AWS Lambda para fazer upload de arquivos para o Amazon S3 e precisa das permissões necessárias para realizar a tarefa. O desenvolvedor já tem um usuário IAM com credenciais IAM válidas necessárias para o Amazon S3. O que um arquiteto de soluções deve fazer para conceder as permissões?",
    "options": [
      "Adicionar as permissões IAM necessárias na política de recurso da função Lambda.",
      "Criar uma solicitação assinada usando as credenciais IAM existentes na função Lambda.",
      "Criar um novo usuário IAM e usar as credenciais IAM existentes na função Lambda.",
      "Criar uma função de execução IAM com as permissões necessárias e anexar a função IAM à função Lambda."
    ],
    "correctIndices": [
      3
    ],
    "keyword": "Lambda: função de execução IAM",
    "summary": "A forma correta e segura de conceder permissões a uma função Lambda é criar uma função de execução IAM (execution role) com as permissões necessárias (ex: s3:PutObject) e anexá-la à função Lambda. Quando a Lambda executa, ela assume automaticamente essa role e recebe credenciais temporárias do AWS STS. As credenciais temporárias são rotacionadas automaticamente, seguindo as melhores práticas de segurança da AWS.",
    "optionExplanations": [
      "As funções Lambda não possuem uma \"política de recurso\" para definir permissões de saída — elas têm políticas de recurso (resource-based policies) para controlar quem pode invocar a função, não para definir o que a função pode fazer. As permissões de saída são definidas através da função de execução IAM (execution role).",
      "Usar credenciais IAM de um usuário existente dentro do código da função Lambda é uma prática de segurança ruim — credenciais estáticas incorporadas em código ou variáveis de ambiente podem ser expostas. Além disso, credenciais de usuário IAM não expiram automaticamente, aumentando o risco de segurança em caso de vazamento.",
      "Criar um novo usuário IAM e usar suas credenciais na função Lambda tem o mesmo problema de segurança — credenciais estáticas em código. As melhores práticas da AWS são explícitas: nunca use credenciais de longo prazo (usuários IAM) em funções Lambda quando roles com credenciais temporárias estão disponíveis.",
      "A forma correta e segura de conceder permissões a uma função Lambda é criar uma função de execução IAM (execution role) com as permissões necessárias (ex: s3:PutObject) e anexá-la à função Lambda. Quando a Lambda executa, ela assume automaticamente essa role e recebe credenciais temporárias do AWS STS. As credenciais temporárias são rotacionadas automaticamente, seguindo as melhores práticas de segurança da AWS."
    ],
    "sourceDocuments": [
      {
        "examNumber": 2,
        "questionNumber": 7,
        "fileName": "Simulado Comentado 2 Novo DPCN.pdf",
        "questionPage": 22,
        "explanationPages": [
          23
        ]
      }
    ]
  },
  {
    "id": 1208,
    "domain": "Resiliência",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa implantou um aplicativo sem servidor que invoca uma função AWS Lambda quando novos documentos são carregados em um bucket do Amazon S3. O aplicativo usa a função Lambda para processar os documentos. Após uma recente campanha de marketing, a empresa notou que o aplicativo não processou muitos dos documentos. O que um arquiteto de soluções deve fazer para melhorar a arquitetura deste aplicativo?",
    "options": [
      "Definir o valor de timeout de execução da função Lambda para 15 minutos.",
      "Configurar uma política de replicação de bucket S3. Organizar os documentos no bucket S3 para processamento posterior.",
      "Implantar uma função Lambda adicional. Balancear a carga do processamento dos documentos entre as duas funções Lambda.",
      "Criar uma fila do Amazon Simple Queue Service (Amazon SQS). Enviar as solicitações para a fila. Configurar a fila como fonte de evento para Lambda."
    ],
    "correctIndices": [
      3
    ],
    "keyword": "SQS como buffer para Lambda",
    "summary": "Usar o Amazon SQS como buffer entre o S3 e a Lambda é a solução arquitetural correta. Quando um documento é carregado no S3, um evento é enviado à fila SQS em vez de invocar a Lambda diretamente. A fila SQS armazena durabilmente todas as mensagens durante picos de tráfego, garantindo que nenhum documento seja perdido. A Lambda consome a fila no seu próprio ritmo, com escalonamento automático baseado no tamanho da fila. Esta arquitetura desacoplada garante processamento garantido de todos os documentos.",
    "optionExplanations": [
      "Aumentar o timeout da Lambda resolve problemas de processamento demorado, mas não resolve o problema de documentos não processados durante picos de tráfego. O problema é de sobrecarga de eventos simultâneos, não de tempo de execução individual.",
      "Replicação de bucket S3 copia objetos para outro bucket em outra região — não é uma solução para gerenciar picos de processamento. Organizar documentos manualmente para processamento posterior aumentaria o overhead operacional sem resolver o problema arquitetural.",
      "Balancear carga entre duas funções Lambda não resolve o problema de forma escalável. Durante picos de tráfego intenso, duas funções podem ser igualmente insuficientes. Além disso, Lambda já escala automaticamente — o problema não é a capacidade individual da função, mas sim a garantia de que todos os eventos serão processados.",
      "Usar o Amazon SQS como buffer entre o S3 e a Lambda é a solução arquitetural correta. Quando um documento é carregado no S3, um evento é enviado à fila SQS em vez de invocar a Lambda diretamente. A fila SQS armazena durabilmente todas as mensagens durante picos de tráfego, garantindo que nenhum documento seja perdido. A Lambda consome a fila no seu próprio ritmo, com escalonamento automático baseado no tamanho da fila. Esta arquitetura desacoplada garante processamento garantido de todos os documentos."
    ],
    "sourceDocuments": [
      {
        "examNumber": 2,
        "questionNumber": 8,
        "fileName": "Simulado Comentado 2 Novo DPCN.pdf",
        "questionPage": 25,
        "explanationPages": [
          26
        ]
      }
    ]
  },
  {
    "id": 1209,
    "domain": "Otimização de Custos",
    "multiSelect": true,
    "requiredCount": 2,
    "question": "Um arquiteto de soluções está projetando a arquitetura para um ambiente de demonstração de software. O ambiente será executado em instâncias do Amazon EC2 em um grupo de Auto Scaling atrás de um Application Load Balancer (ALB). O sistema experimentará aumentos significativos no tráfego durante o horário de trabalho, mas não é necessário operar nos fins de semana. Qual combinação de ações o arquiteto de soluções deve tomar para garantir que o sistema possa escalar para atender à demanda? (Escolha duas.)",
    "options": [
      "Usar o AWS Auto Scaling para ajustar a capacidade do ALB com base na taxa de solicitações.",
      "Usar o AWS Auto Scaling para escalar a capacidade do gateway de internet VPC.",
      "Lançar as instâncias EC2 em múltiplas Regiões AWS para distribuir a carga entre as Regiões.",
      "Usar uma política de escalamento de rastreamento de alvo para escalar o grupo de Auto Scaling com base na utilização de CPU da instância.",
      "Usar o escalamento programado para alterar o mínimo, máximo e capacidade desejada do grupo de Auto Scaling para zero nos fins de semana. Reverter para os valores padrão no início da semana."
    ],
    "correctIndices": [
      3,
      4
    ],
    "keyword": "Escalamento dinâmico e programado",
    "summary": "Uma política de escalamento de rastreamento de alvo (target tracking) monitora continuamente uma métrica (como utilização de CPU média do grupo) e ajusta automaticamente o número de instâncias para manter essa métrica em um valor alvo. Quando o tráfego aumenta durante o horário de trabalho, a CPU sobe e o Auto Scaling adiciona instâncias; quando o tráfego diminui, instâncias são removidas. É a forma mais simples e eficiente de escalar dinamicamente com base na demanda real.\n\nO escalamento programado (scheduled scaling) permite definir com antecedência mudanças na capacidade do grupo de Auto Scaling em horários específicos. Configurar a capacidade mínima, máxima e desejada para zero nos fins de semana garante que nenhuma instância EC2 seja executada quando o sistema não precisa operar, eliminando custos desnecessários. No início da semana, os valores são restaurados para os níveis operacionais normais.",
    "optionExplanations": [
      "O AWS Auto Scaling não gerencia a capacidade do ALB — o Application Load Balancer é um serviço totalmente gerenciado que escala automaticamente sua própria capacidade conforme necessário, sem intervenção do usuário. Não existe a opção de configurar Auto Scaling para o ALB diretamente.",
      "O Internet Gateway de uma VPC é um componente gerenciado pela AWS que escala automaticamente para suportar qualquer volume de tráfego. Não é possível nem necessário configurar Auto Scaling para um Internet Gateway — ele não tem limitações de capacidade que precisem ser gerenciadas pelo usuário.",
      "Distribuir o ambiente de demonstração em múltiplas Regiões AWS seria excessivamente complexo e custoso para um ambiente de demonstração. Múltiplas Regiões são usadas para requisitos de latência global ou recuperação de desastres, não para escalar cargas de trabalho simples dentro de uma região.",
      "Uma política de escalamento de rastreamento de alvo (target tracking) monitora continuamente uma métrica (como utilização de CPU média do grupo) e ajusta automaticamente o número de instâncias para manter essa métrica em um valor alvo. Quando o tráfego aumenta durante o horário de trabalho, a CPU sobe e o Auto Scaling adiciona instâncias; quando o tráfego diminui, instâncias são removidas. É a forma mais simples e eficiente de escalar dinamicamente com base na demanda real.",
      "O escalamento programado (scheduled scaling) permite definir com antecedência mudanças na capacidade do grupo de Auto Scaling em horários específicos. Configurar a capacidade mínima, máxima e desejada para zero nos fins de semana garante que nenhuma instância EC2 seja executada quando o sistema não precisa operar, eliminando custos desnecessários. No início da semana, os valores são restaurados para os níveis operacionais normais."
    ],
    "sourceDocuments": [
      {
        "examNumber": 2,
        "questionNumber": 9,
        "fileName": "Simulado Comentado 2 Novo DPCN.pdf",
        "questionPage": 28,
        "explanationPages": [
          29
        ]
      }
    ]
  },
  {
    "id": 1210,
    "domain": "Segurança",
    "multiSelect": true,
    "requiredCount": 2,
    "question": "Um arquiteto de soluções está projetando uma arquitetura de duas camadas que inclui uma sub-rede pública e uma sub-rede de banco de dados. Os servidores web na sub-rede pública devem estar abertos à internet na porta 443. A instância de banco de dados Amazon RDS for MySQL na sub-rede de banco de dados deve ser acessível apenas aos servidores web na porta 3306. Qual combinação de etapas o arquiteto de soluções deve tomar para atender a esses requisitos? (Escolha duas.)",
    "options": [
      "Criar uma ACL de rede para a sub-rede pública. Adicionar uma regra para negar tráfego de saída para 0.0.0.0/0 na porta 3306.",
      "Criar um grupo de segurança para a instância de banco de dados. Adicionar uma regra para permitir tráfego do bloco CIDR da sub-rede pública na porta 3306.",
      "Criar um grupo de segurança para os servidores web na sub-rede pública. Adicionar uma regra para permitir tráfego de 0.0.0.0/0 na porta 443.",
      "Criar um grupo de segurança para a instância de banco de dados. Adicionar uma regra para permitir tráfego do grupo de segurança dos servidores web na porta 3306.",
      "Criar um grupo de segurança para a instância de banco de dados. Adicionar uma regra para negar todo o tráfego, exceto o tráfego do grupo de segurança dos servidores web na porta 3306."
    ],
    "correctIndices": [
      2,
      3
    ],
    "keyword": "Security groups entre camadas",
    "summary": "Criar um Security Group para os servidores web que permite tráfego de entrada de qualquer lugar (0.0.0.0/0) na porta 443 é a configuração correta para um servidor web público que precisa aceitar conexões HTTPS de qualquer cliente na internet.\n\nCriar um Security Group para o banco de dados que permite tráfego de entrada na porta 3306 apenas referenciando o Security Group dos servidores web como origem implementa corretamente o princípio do menor privilégio — somente os servidores web podem acessar o banco de dados MySQL, independente do endereço IP.",
    "optionExplanations": [
      "Adicionar uma regra de negação de saída na porta 3306 na ACL da sub-rede pública impediria os servidores web de se conectarem ao banco de dados MySQL. Isso bloquearia a comunicação necessária entre as camadas, não implementa o requisito corretamente.",
      "Usar o bloco CIDR da sub-rede pública como origem para o acesso ao banco de dados é menos seguro do que referenciar o grupo de segurança dos servidores web. Qualquer recurso na sub-rede pública com aquele CIDR poderia acessar o banco, não apenas os servidores web. Não implementa o menor privilégio de forma adequada.",
      "Criar um Security Group para os servidores web que permite tráfego de entrada de qualquer lugar (0.0.0.0/0) na porta 443 é a configuração correta para um servidor web público que precisa aceitar conexões HTTPS de qualquer cliente na internet.",
      "Criar um Security Group para o banco de dados que permite tráfego de entrada na porta 3306 apenas referenciando o Security Group dos servidores web como origem implementa corretamente o princípio do menor privilégio — somente os servidores web podem acessar o banco de dados MySQL, independente do endereço IP.",
      "Os Security Groups da AWS são stateful e funcionam com modelo \"deny-all by padrão, allow explicitly\" — eles já negam todo o tráfego que não foi explicitamente permitido. Não é possível adicionar regras de negação explícitas em Security Groups (apenas em NACLs). Esta opção descreve um comportamento que não existe em Security Groups."
    ],
    "sourceDocuments": [
      {
        "examNumber": 2,
        "questionNumber": 10,
        "fileName": "Simulado Comentado 2 Novo DPCN.pdf",
        "questionPage": 31,
        "explanationPages": [
          32
        ]
      }
    ]
  }
];
