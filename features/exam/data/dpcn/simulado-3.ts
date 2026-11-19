import type { Question } from '../../types';

// Enunciados, alternativas e comentários extraídos dos PDFs fornecidos.
// Duplicatas entre arquivos mantêm todas as origens em sourceDocuments.
export const DPCN_3: Question[] = [
  {
    "id": 1301,
    "domain": "Otimização de Custos",
    "multiSelect": true,
    "requiredCount": 2,
    "question": "Uma empresa de hospedagem de imagens faz upload de seus grandes ativos para buckets do Amazon S3 Standard. A empresa usa uploads multipart em paralelo usando APIs S3 e substitui se o mesmo objeto for carregado novamente. Nos primeiros 30 dias após o upload, os objetos serão acessados com frequência. Os objetos serão usados com menos frequência após 30 dias, mas os padrões de acesso para cada objeto serão inconsistentes. A empresa deve otimizar seus custos de armazenamento S3 mantendo alta disponibilidade e resiliência dos ativos armazenados. Qual combinação de ações um arquiteto de soluções deve recomendar para atender a esses requisitos? (Escolha duas.)",
    "options": [
      "Mover ativos para o S3 Intelligent-Tiering após 30 dias.",
      "Configurar uma política de ciclo de vida S3 para limpar uploads multipart incompletos.",
      "Configurar uma política de ciclo de vida S3 para limpar marcadores de exclusão de objetos expirados.",
      "Mover ativos para o S3 Standard-Infrequent Access (S3 Standard-IA) após 30 dias.",
      "Mover ativos para o S3 One Zone-Infrequent Access (S3 One Zone-IA) após 30 dias."
    ],
    "correctIndices": [
      0,
      1
    ],
    "keyword": "Intelligent-Tiering e uploads incompletos",
    "summary": "Após 30 dias, os padrões de acesso são inconsistentes. O S3 Intelligent-Tiering foi criado exatamente para esse cenário — ele monitora automaticamente os padrões de acesso e move os objetos entre camadas (frequente, infrequente, arquivo) sem custo de recuperação, otimizando custos automaticamente. Mantém alta disponibilidade e resiliência pois replica em múltiplas AZs.\n\nA empresa usa uploads multipart em paralelo. Partes de uploads que não foram concluídos ficam armazenadas no S3 e geram cobranças mesmo sem formar um objeto completo. Configurar uma política de ciclo de vida para limpar essas partes incompletas elimina custos desnecessários diretamente relacionados ao uso de uploads multipart descrito no enunciado.",
    "optionExplanations": [
      "Após 30 dias, os padrões de acesso são inconsistentes. O S3 Intelligent-Tiering foi criado exatamente para esse cenário — ele monitora automaticamente os padrões de acesso e move os objetos entre camadas (frequente, infrequente, arquivo) sem custo de recuperação, otimizando custos automaticamente. Mantém alta disponibilidade e resiliência pois replica em múltiplas AZs.",
      "A empresa usa uploads multipart em paralelo. Partes de uploads que não foram concluídos ficam armazenadas no S3 e geram cobranças mesmo sem formar um objeto completo. Configurar uma política de ciclo de vida para limpar essas partes incompletas elimina custos desnecessários diretamente relacionados ao uso de uploads multipart descrito no enunciado.",
      "Marcadores de exclusão expirados são relacionados ao versionamento de objetos. O enunciado não menciona versionamento habilitado nos buckets, portanto essa ação não é relevante para o cenário apresentado.",
      "O S3 Standard-IA cobra uma taxa por recuperação a cada acesso. Como os padrões de acesso após 30 dias são inconsistentes, objetos acessados com frequência nessa camada gerariam custos de recuperação elevados, podendo sair mais caro que o S3 Standard.",
      "Além do problema de custo por recuperação do Standard-IA (mesmo problema do D), o S3 One Zone-IA armazena dados em apenas uma Zona de Disponibilidade, o que viola o requisito de manter alta disponibilidade e resiliência dos ativos."
    ],
    "sourceDocuments": [
      {
        "examNumber": 3,
        "questionNumber": 1,
        "fileName": "Simulado Comentado 3 Novo DPCN.pdf",
        "questionPage": 4,
        "explanationPages": [
          5
        ]
      }
    ]
  },
  {
    "id": 1302,
    "domain": "Segurança",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Um arquiteto de soluções deve proteger uma rede VPC que hospeda instâncias do Amazon EC2. As instâncias EC2 contêm dados altamente sensíveis e são executadas em uma sub-rede privada. De acordo com a política da empresa, as instâncias EC2 que são executadas na VPC podem acessar apenas repositórios de software de terceiros aprovados na internet para atualizações de produtos de software que usam a URL de terceiros. Outro tráfego da internet deve ser bloqueado. Qual solução atende a esses requisitos?",
    "options": [
      "Atualizar a tabela de rotas para a sub-rede privada para rotear o tráfego de saída para um firewall do AWS Network Firewall. Configurar grupos de regras de lista de domínio.",
      "Configurar uma ACL web do AWS WAF. Criar um conjunto personalizado de regras que filtram solicitações de tráfego com base em conjuntos de intervalos de endereços IP de origem e destino.",
      "Implementar regras de grupo de segurança de entrada estritas. Configurar uma regra de saída que permite tráfego apenas para os repositórios de software autorizados na internet especificando as URLs.",
      "Configurar um Application Load Balancer (ALB) na frente das instâncias EC2. Direcionar todo o tráfego de saída para o ALB. Usar uma regra de listener baseada em URL no grupo de destino do ALB para acesso de saída à internet."
    ],
    "correctIndices": [
      0
    ],
    "keyword": "Network Firewall e lista de domínios",
    "summary": "O AWS Network Firewall é um serviço gerenciado de firewall de rede que permite criar regras de filtragem de tráfego em nível de rede. Os grupos de regras de lista de domínio permitem especificar exatamente quais URLs/domínios são permitidos ou bloqueados no tráfego de saída. Ao rotear o tráfego da sub-rede privada pelo Network Firewall, a empresa consegue permitir apenas os repositórios aprovados por URL e bloquear todo o restante, atendendo perfeitamente ao requisito.",
    "optionExplanations": [
      "O AWS Network Firewall é um serviço gerenciado de firewall de rede que permite criar regras de filtragem de tráfego em nível de rede. Os grupos de regras de lista de domínio permitem especificar exatamente quais URLs/domínios são permitidos ou bloqueados no tráfego de saída. Ao rotear o tráfego da sub-rede privada pelo Network Firewall, a empresa consegue permitir apenas os repositórios aprovados por URL e bloquear todo o restante, atendendo perfeitamente ao requisito.",
      "O AWS WAF é projetado para proteger aplicações web de entrada (inbound) contra ataques como SQL injection e XSS. Ele não é a ferramenta adequada para controlar tráfego de saída de instâncias EC2 para a internet. Além disso, filtrar por intervalos de IP não garante que apenas as URLs aprovadas sejam acessadas.",
      "Security Groups não suportam filtragem por URL ou nome de domínio. Eles trabalham apenas com protocolos, portas e endereços IP. Como os repositórios de terceiros podem ter IPs dinâmicos ou múltiplos IPs por trás de um mesmo domínio, especificar URLs em regras de Security Group simplesmente não é possível.",
      "O Application Load Balancer é projetado para balancear tráfego de entrada para targets registrados. Ele não foi projetado para controlar ou rotear tráfego de saída de instâncias EC2 para a internet. As regras de listener do ALB também não têm capacidade de filtrar acesso de saída por URL para destinos externos."
    ],
    "sourceDocuments": [
      {
        "examNumber": 3,
        "questionNumber": 2,
        "fileName": "Simulado Comentado 3 Novo DPCN.pdf",
        "questionPage": 7,
        "explanationPages": [
          8
        ]
      }
    ]
  },
  {
    "id": 1303,
    "domain": "Resiliência",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa hospeda um aplicativo de e-commerce de três camadas na Nuvem AWS. A empresa hospeda o site no Amazon S3 e integra o site com uma API que lida com solicitações de vendas. A empresa hospeda a API em três instâncias do Amazon EC2 atrás de um Application Load Balancer (ALB). A API consiste em conteúdo front-end estático e dinâmico juntamente com workers de back-end que processam solicitações de vendas de forma assíncrona. A empresa está esperando um aumento significativo e repentino no número de solicitações de vendas durante eventos para o lançamento de novos produtos. O que um arquiteto de soluções deve recomendar para garantir que todas as solicitações sejam processadas com sucesso?",
    "options": [
      "Adicionar uma distribuição do Amazon CloudFront para o conteúdo dinâmico. Aumentar o número de instâncias EC2 para lidar com o aumento no tráfego.",
      "Adicionar uma distribuição do Amazon CloudFront para o conteúdo estático. Colocar as instâncias EC2 em um grupo de Auto Scaling para lançar novas instâncias com base no tráfego de rede.",
      "Adicionar uma distribuição do Amazon CloudFront para o conteúdo dinâmico. Adicionar uma instância do Amazon ElastiCache na frente do ALB para reduzir o tráfego para a API lidar.",
      "Adicionar uma distribuição do Amazon CloudFront para o conteúdo estático. Adicionar uma fila do Amazon Simple Queue Service (Amazon SQS) para receber solicitações do site para processamento posterior pelas instâncias EC2."
    ],
    "correctIndices": [
      3
    ],
    "keyword": "CloudFront e desacoplamento com SQS",
    "summary": "CloudFront para conteúdo estático reduz a carga no servidor de origem. A fila SQS desacopla o recebimento das solicitações do processamento — durante um pico repentino, as solicitações são enfileiradas no SQS e processadas pelas instâncias EC2 no seu próprio ritmo de forma assíncrona, garantindo que nenhuma solicitação seja perdida. Isso se alinha perfeitamente com o requisito de garantir que todas as solicitações sejam processadas com sucesso.",
    "optionExplanations": [
      "CloudFront é mais eficiente para conteúdo estático, não dinâmico. Além disso, aumentar manualmente o número de instâncias EC2 não é uma solução escalável ou eficiente para picos repentinos — o aumento manual não acompanha a velocidade do pico de demanda e pode resultar em perda de solicitações.",
      "CloudFront para conteúdo estático está correto, e Auto Scaling é uma melhoria válida. Porém, escalar com base no tráfego de rede não é o indicador mais preciso para esse tipo de carga. Além disso, o Auto Scaling pode não provisionar instâncias rápido o suficiente para picos repentinos, o que pode resultar em perda de solicitações antes das novas instâncias estarem prontas.",
      "CloudFront para conteúdo dinâmico não é a melhor prática. O ElastiCache na frente do ALB não faz sentido arquiteturalmente para solicitações de vendas — vendas são transações únicas que não se beneficiam de cache, pois cada solicitação é diferente e precisa ser processada individualmente.",
      "CloudFront para conteúdo estático reduz a carga no servidor de origem. A fila SQS desacopla o recebimento das solicitações do processamento — durante um pico repentino, as solicitações são enfileiradas no SQS e processadas pelas instâncias EC2 no seu próprio ritmo de forma assíncrona, garantindo que nenhuma solicitação seja perdida. Isso se alinha perfeitamente com o requisito de garantir que todas as solicitações sejam processadas com sucesso."
    ],
    "sourceDocuments": [
      {
        "examNumber": 3,
        "questionNumber": 3,
        "fileName": "Simulado Comentado 3 Novo DPCN.pdf",
        "questionPage": 10,
        "explanationPages": [
          11
        ]
      }
    ]
  },
  {
    "id": 1304,
    "domain": "Segurança",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma auditoria de segurança revela que as instâncias do Amazon EC2 não estão sendo corrigidas regularmente. Um arquiteto de soluções precisa fornecer uma solução que executará verificações de segurança regulares em uma grande frota de instâncias EC2. A solução também deve corrigir as instâncias EC2 em um cronograma regular e fornecer um relatório do status de correção de cada instância. Qual solução atenderá a esses requisitos?",
    "options": [
      "Configurar o Amazon Macie para verificar as instâncias EC2 quanto a vulnerabilidades de software. Configurar um trabalho cron em cada instância EC2 para corrigir a instância em um cronograma regular.",
      "Ativar o Amazon GuardDuty na conta. Configurar o GuardDuty para verificar as instâncias EC2 quanto a vulnerabilidades de software. Configurar o AWS Systems Manager Session Manager para corrigir as instâncias EC2 em um cronograma regular.",
      "Configurar o Amazon Detective para verificar as instâncias EC2 quanto a vulnerabilidades de software. Configurar uma regra programada do Amazon EventBridge para corrigir as instâncias EC2 em um cronograma regular.",
      "Ativar o Amazon Inspector na conta. Configurar o Amazon Inspector para verificar as instâncias EC2 quanto a vulnerabilidades de software. Configurar o AWS Systems Manager Patch Manager para corrigir as instâncias EC2 em um cronograma regular."
    ],
    "correctIndices": [
      3
    ],
    "keyword": "Inspector e Patch Manager",
    "summary": "Esta combinação atende a todos os requisitos do enunciado: Amazon Inspector → serviço dedicado a verificar vulnerabilidades de software e exposições não intencionais de rede em instâncias EC2, gerando relatórios detalhados de findings AWS Systems Manager Patch Manager → automatiza o processo de aplicação de patches em toda a frota de instâncias EC2 em um cronograma regular, além de gerar relatórios de conformidade de patches para cada instância",
    "optionExplanations": [
      "O Amazon Macie é um serviço de segurança focado em descoberta e proteção de dados sensíveis armazenados no Amazon S3, como PII (informações pessoais identificáveis). Ele não tem capacidade de verificar instâncias EC2 quanto a vulnerabilidades de software. Além disso, configurar um trabalho cron individualmente em cada instância de uma grande frota gera alto overhead operacional.",
      "O Amazon GuardDuty é um serviço de detecção de ameaças que monitora comportamentos maliciosos e atividades suspeitas na conta AWS. Ele não realiza varreduras de vulnerabilidades de software em instâncias EC2. O Session Manager também não é a ferramenta adequada para aplicar patches em cronograma regular — esse é o papel do Patch Manager.",
      "O Amazon Detective é um serviço de investigação e análise de segurança que ajuda a analisar e visualizar dados de segurança para investigar possíveis problemas. Ele não verifica vulnerabilidades de software em instâncias EC2 e não tem capacidade de aplicar correções. O EventBridge sozinho também não tem capacidade de aplicar patches.",
      "Esta combinação atende a todos os requisitos do enunciado: Amazon Inspector → serviço dedicado a verificar vulnerabilidades de software e exposições não intencionais de rede em instâncias EC2, gerando relatórios detalhados de findings AWS Systems Manager Patch Manager → automatiza o processo de aplicação de patches em toda a frota de instâncias EC2 em um cronograma regular, além de gerar relatórios de conformidade de patches para cada instância"
    ],
    "sourceDocuments": [
      {
        "examNumber": 3,
        "questionNumber": 4,
        "fileName": "Simulado Comentado 3 Novo DPCN.pdf",
        "questionPage": 13,
        "explanationPages": [
          14
        ]
      }
    ]
  },
  {
    "id": 1305,
    "domain": "Segurança",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa está planejando armazenar dados em instâncias de banco de dados Amazon RDS. A empresa deve criptografar os dados em repouso. O que um arquiteto de soluções deve fazer para atender a esse requisito?",
    "options": [
      "Criar uma chave no AWS Key Management Service (AWS KMS). Habilitar criptografia para as instâncias de banco de dados.",
      "Criar uma chave de criptografia. Armazenar a chave no AWS Secrets Manager. Usar a chave para criptografar as instâncias de banco de dados.",
      "Gerar um certificado no AWS Certificate Manager (ACM). Habilitar SSL/TLS nas instâncias de banco de dados usando o certificado.",
      "Gerar um certificado no AWS Identity and Access Management (IAM). Habilitar SSL/TLS nas instâncias de banco de dados usando o certificado."
    ],
    "correctIndices": [
      0
    ],
    "keyword": "RDS: criptografia com KMS",
    "summary": "O AWS KMS é o serviço nativo da AWS para criação e gerenciamento de chaves de criptografia. Ao criar uma chave KMS e habilitá-la na instância RDS, todos os dados em repouso são criptografados — incluindo o storage subjacente, backups automáticos, snapshots e réplicas de leitura. Esta é a forma padrão e recomendada pela AWS para criptografia em repouso no RDS.",
    "optionExplanations": [
      "O AWS KMS é o serviço nativo da AWS para criação e gerenciamento de chaves de criptografia. Ao criar uma chave KMS e habilitá-la na instância RDS, todos os dados em repouso são criptografados — incluindo o storage subjacente, backups automáticos, snapshots e réplicas de leitura. Esta é a forma padrão e recomendada pela AWS para criptografia em repouso no RDS.",
      "O AWS Secrets Manager é um serviço para armazenar e gerenciar credenciais como senhas, tokens e chaves de API. Ele não é projetado para armazenar chaves de criptografia usadas para criptografar instâncias de banco de dados. A criptografia em repouso do RDS é gerenciada pelo AWS KMS, não pelo Secrets Manager.",
      "O AWS Certificate Manager (ACM) gerencia certificados SSL/TLS que protegem dados em trânsito — ou seja, durante a comunicação entre o cliente e o banco de dados. Habilitar SSL/TLS não criptografa os dados em repouso no storage, que é exatamente o que o enunciado exige.",
      "O AWS IAM não é um serviço para geração de certificados de criptografia de banco de dados. Assim como a opção C, certificados SSL/TLS protegem dados em trânsito, não em repouso. Além disso, o IAM não tem a funcionalidade descrita nesta alternativa para esse fim específico."
    ],
    "sourceDocuments": [
      {
        "examNumber": 3,
        "questionNumber": 5,
        "fileName": "Simulado Comentado 3 Novo DPCN.pdf",
        "questionPage": 16,
        "explanationPages": [
          17
        ]
      }
    ]
  },
  {
    "id": 1306,
    "domain": "Alto Desempenho",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa deve migrar 20 TB de dados de um data center para a Nuvem AWS em 30 dias. A largura de banda de rede da empresa é limitada a 15 Mbps e não pode exceder 70% de utilização. O que um arquiteto de soluções deve fazer para atender a esses requisitos?",
    "options": [
      "Usar o AWS Snowball.",
      "Usar o AWS DataSync.",
      "Usar uma conexão VPN segura.",
      "Usar o Amazon S3 Transfer Acceleration."
    ],
    "correctIndices": [
      0
    ],
    "keyword": "Migração offline com Snowball",
    "summary": "Calculando a capacidade real da rede disponível: 15 Mbps × 70% = 10,5 Mbps utilizáveis 10,5 Mbps = 1,3125 MB/s Em 30 dias: 1,3125 MB/s × 86.400s × 30 = ~3,4 TB A rede comporta apenas ~3,4 TB em 30 dias, muito abaixo dos 20 TB necessários. O AWS Snowball é um dispositivo físico de transferência de dados que pode transportar até 80 TB por dispositivo. A AWS envia o dispositivo, a empresa carrega os dados localmente e devolve o dispositivo para a AWS fazer o upload — sem depender da largura de banda da empresa, atendendo ao prazo de 30 dias.",
    "optionExplanations": [
      "Calculando a capacidade real da rede disponível: 15 Mbps × 70% = 10,5 Mbps utilizáveis 10,5 Mbps = 1,3125 MB/s Em 30 dias: 1,3125 MB/s × 86.400s × 30 = ~3,4 TB A rede comporta apenas ~3,4 TB em 30 dias, muito abaixo dos 20 TB necessários. O AWS Snowball é um dispositivo físico de transferência de dados que pode transportar até 80 TB por dispositivo. A AWS envia o dispositivo, a empresa carrega os dados localmente e devolve o dispositivo para a AWS fazer o upload — sem depender da largura de banda da empresa, atendendo ao prazo de 30 dias.",
      "O AWS DataSync transfere dados pela rede. Usando a mesma largura de banda disponível (10,5 Mbps), seria possível transferir apenas ~3,4 TB em 30 dias — muito abaixo dos 20 TB necessários. O DataSync não resolve a limitação de largura de banda.",
      "Uma conexão VPN segura também utiliza a mesma infraestrutura de rede limitada a 15 Mbps com 70% de utilização. O resultado seria idêntico ao DataSync — apenas ~3,4 TB transferidos em 30 dias. A VPN adiciona overhead de criptografia, podendo até reduzir ainda mais o throughput efetivo.",
      "O Amazon S3 Transfer Acceleration melhora a velocidade de upload para o S3 usando os edge locations do CloudFront, mas ainda depende completamente da largura de banda de internet disponível na empresa. Com apenas 10,5 Mbps utilizáveis, o resultado ainda seria insuficiente para transferir 20 TB em 30 dias."
    ],
    "sourceDocuments": [
      {
        "examNumber": 3,
        "questionNumber": 6,
        "fileName": "Simulado Comentado 3 Novo DPCN.pdf",
        "questionPage": 19,
        "explanationPages": [
          20
        ]
      }
    ]
  },
  {
    "id": 1307,
    "domain": "Segurança",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa precisa fornecer aos seus funcionários acesso seguro a arquivos confidenciais e sensíveis. A empresa quer garantir que os arquivos só possam ser acessados por usuários autorizados. Os arquivos devem ser baixados com segurança para os dispositivos dos funcionários. Os arquivos são armazenados em um servidor de arquivos Windows on-premises. No entanto, devido a um aumento no uso remoto, o servidor de arquivos está ficando sem capacidade. Qual solução atenderá a esses requisitos?",
    "options": [
      "Migrar o servidor de arquivos para uma instância do Amazon EC2 em uma sub-rede pública. Configurar o grupo de segurança para limitar o tráfego de entrada para os endereços IP dos funcionários.",
      "Migrar os arquivos para um sistema de arquivos Amazon FSx for Windows File Server. Integrar o sistema de arquivos Amazon FSx com o Active Directory on-premises. Configurar o AWS Client VPN.",
      "Migrar os arquivos para o Amazon S3 e criar um endpoint VPC privado. Criar uma URL assinada para permitir download.",
      "Migrar os arquivos para o Amazon S3 e criar um endpoint VPC público. Permitir que os funcionários façam login com o AWS IAM Identity Center (AWS Single Sign-On)."
    ],
    "correctIndices": [
      1
    ],
    "keyword": "FSx Windows, Active Directory e VPN",
    "summary": "Esta solução atende a todos os requisitos: FSx for Windows File Server → mantém total compatibilidade com o ambiente Windows existente, incluindo protocolos SMB nativos, sem necessidade de alterações nos clientes Integração com Active Directory on-premises → garante que apenas usuários autorizados tenham acesso, mantendo as permissões e políticas já existentes AWS Client VPN → garante que os downloads sejam feitos de forma segura e criptografada, sem expor os arquivos diretamente à internet Resolve o problema de capacidade migrando para a nuvem com escalabilidade gerenciada",
    "optionExplanations": [
      "Colocar o servidor de arquivos em uma sub-rede pública expõe os dados sensíveis diretamente à internet, o que é uma má prática de segurança. Limitar por endereços IP dos funcionários é frágil — IPs podem mudar, especialmente para funcionários remotos. Além disso, essa solução não resolve o problema de capacidade de forma escalável.",
      "Esta solução atende a todos os requisitos: FSx for Windows File Server → mantém total compatibilidade com o ambiente Windows existente, incluindo protocolos SMB nativos, sem necessidade de alterações nos clientes Integração com Active Directory on-premises → garante que apenas usuários autorizados tenham acesso, mantendo as permissões e políticas já existentes AWS Client VPN → garante que os downloads sejam feitos de forma segura e criptografada, sem expor os arquivos diretamente à internet Resolve o problema de capacidade migrando para a nuvem com escalabilidade gerenciada",
      "O Amazon S3 não é nativamente compatível com servidores de arquivos Windows — ele não suporta protocolos SMB ou NFS que as estações de trabalho Windows usam. URLs assinadas são temporárias e não representam um controle de acesso robusto baseado em identidade para uma força de trabalho corporativa.",
      "Criar um endpoint VPC público para dados confidenciais e sensíveis vai contra as boas práticas de segurança. Assim como a opção C, o S3 não oferece compatibilidade nativa com o ambiente de servidor de arquivos Windows. Além disso, expor os dados publicamente aumenta significativamente o risco de segurança."
    ],
    "sourceDocuments": [
      {
        "examNumber": 3,
        "questionNumber": 7,
        "fileName": "Simulado Comentado 3 Novo DPCN.pdf",
        "questionPage": 22,
        "explanationPages": [
          23
        ]
      }
    ]
  },
  {
    "id": 1308,
    "domain": "Alto Desempenho",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "O aplicativo de uma empresa é executado em instâncias do Amazon EC2 atrás de um Application Load Balancer (ALB). As instâncias são executadas em um grupo de Auto Scaling do Amazon EC2 em múltiplas Zonas de Disponibilidade. No primeiro dia de cada mês à meia-noite, o aplicativo fica muito mais lento quando o lote de cálculo financeiro de fim de mês é executado. Isso faz com que a utilização de CPU das instâncias EC2 salte imediatamente para 100%, o que perturba o aplicativo. Um arquiteto de soluções deve garantir que o aplicativo seja capaz de lidar com a carga de trabalho e evitar tempo de inatividade. O que um arquiteto de soluções deve recomendar para garantir que o aplicativo seja capaz de lidar com a carga de trabalho e evitar tempo de inatividade?",
    "options": [
      "Configurar uma distribuição do Amazon CloudFront na frente do ALB.",
      "Configurar uma política de escalamento simples do EC2 Auto Scaling com base na utilização de CPU.",
      "Configurar uma política de escalamento programado do EC2 Auto Scaling com base no cronograma mensal.",
      "Configurar o Amazon ElastiCache para remover parte da carga de trabalho das instâncias EC2."
    ],
    "correctIndices": [
      2
    ],
    "keyword": "Auto Scaling programado",
    "summary": "O padrão de carga é completamente previsível — sempre no primeiro dia de cada mês à meia-noite. O escalamento programado permite configurar antecipadamente o aumento da capacidade desejada do grupo de Auto Scaling antes do evento ocorrer. As instâncias já estarão prontas e disponíveis quando o lote financeiro começar, evitando qualquer perturbação ou tempo de inatividade.",
    "optionExplanations": [
      "O Amazon CloudFront é uma CDN projetada para cache e distribuição de conteúdo estático e dinâmico. Ele não resolve o problema de sobrecarga de CPU nas instâncias EC2 causado por um processamento intensivo de cálculo financeiro no back-end. O gargalo é no processamento interno, não na entrega de conteúdo.",
      "O escalamento simples reage à utilização de CPU depois que ela já atingiu o limite configurado. No cenário descrito, a CPU salta imediatamente para 100% — o escalamento reativo seria tarde demais para evitar a perturbação do aplicativo, pois leva tempo para detectar a métrica, acionar o escalamento e provisionar novas instâncias.",
      "O padrão de carga é completamente previsível — sempre no primeiro dia de cada mês à meia-noite. O escalamento programado permite configurar antecipadamente o aumento da capacidade desejada do grupo de Auto Scaling antes do evento ocorrer. As instâncias já estarão prontas e disponíveis quando o lote financeiro começar, evitando qualquer perturbação ou tempo de inatividade.",
      "O Amazon ElastiCache é uma solução de cache em memória para reduzir a carga em bancos de dados com consultas repetitivas. O problema descrito é um processamento intensivo de cálculo financeiro nas instâncias EC2, não um problema de consultas repetitivas ao banco de dados. O ElastiCache não reduziria a carga de CPU causada por cálculos financeiros complexos."
    ],
    "sourceDocuments": [
      {
        "examNumber": 3,
        "questionNumber": 8,
        "fileName": "Simulado Comentado 3 Novo DPCN.pdf",
        "questionPage": 25,
        "explanationPages": [
          26
        ]
      }
    ]
  },
  {
    "id": 1309,
    "domain": "Segurança",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa quer dar a um cliente a capacidade de usar o Microsoft Active Directory on-premises para baixar arquivos armazenados no Amazon S3. O aplicativo do cliente usa um cliente SFTP para baixar os arquivos. Qual solução atenderá a esses requisitos com o MENOR overhead operacional e sem alterações no aplicativo do cliente?",
    "options": [
      "Configurar o AWS Transfer Family com SFTP para Amazon S3. Configurar autenticação integrada do Active Directory.",
      "Configurar o AWS Database Migration Service (AWS DMS) para sincronizar o cliente on-premises com o Amazon S3. Configurar autenticação integrada do Active Directory.",
      "Configurar o AWS DataSync para sincronizar entre o local on-premises e o local S3 usando o AWS IAM Identity Center (AWS Single Sign-On).",
      "Configurar um servidor Windows do Amazon EC2 com SFTP para conectar o cliente on-premises ao Amazon S3. Integrar o AWS Identity and Access Management (IAM)."
    ],
    "correctIndices": [
      0
    ],
    "keyword": "Transfer Family com SFTP",
    "summary": "O AWS Transfer Family é um serviço gerenciado que suporta transferência de arquivos usando protocolos como SFTP nativamente. Ele se integra diretamente com o Amazon S3 como destino/origem dos arquivos e suporta autenticação via Microsoft Active Directory, permitindo que os usuários usem suas credenciais corporativas existentes. Como o protocolo SFTP é mantido, nenhuma alteração no aplicativo do cliente é necessária, atendendo a todos os requisitos com mínimo overhead operacional.",
    "optionExplanations": [
      "O AWS Transfer Family é um serviço gerenciado que suporta transferência de arquivos usando protocolos como SFTP nativamente. Ele se integra diretamente com o Amazon S3 como destino/origem dos arquivos e suporta autenticação via Microsoft Active Directory, permitindo que os usuários usem suas credenciais corporativas existentes. Como o protocolo SFTP é mantido, nenhuma alteração no aplicativo do cliente é necessária, atendendo a todos os requisitos com mínimo overhead operacional.",
      "O AWS DMS é um serviço de migração de bancos de dados, não de transferência de arquivos via SFTP. Ele não tem relação com o protocolo SFTP nem com o cenário descrito de download de arquivos por clientes. Usar o DMS para esse fim seria completamente inadequado.",
      "O AWS DataSync é um serviço de sincronização e transferência de dados entre sistemas de armazenamento, mas não expõe um endpoint SFTP para clientes. O IAM Identity Center é para gerenciamento de acesso a serviços AWS, não para autenticação SFTP com Active Directory on-premises. Essa solução exigiria alterações no aplicativo do cliente.",
      "Configurar manualmente um servidor Windows EC2 com SFTP tem alto overhead operacional — a empresa precisaria gerenciar o sistema operacional, patches, disponibilidade, escalabilidade e a configuração do servidor SFTP. Além disso, integrar com IAM não é equivalente à autenticação via Active Directory on-premises exigida. Esta solução viola o requisito de menor overhead operacional."
    ],
    "sourceDocuments": [
      {
        "examNumber": 3,
        "questionNumber": 9,
        "fileName": "Simulado Comentado 3 Novo DPCN.pdf",
        "questionPage": 28,
        "explanationPages": [
          29
        ]
      }
    ]
  },
  {
    "id": 1310,
    "domain": "Alto Desempenho",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa está experimentando aumentos repentinos na demanda. A empresa precisa provisionar grandes instâncias do Amazon EC2 a partir de uma Amazon Machine Image (AMI). As instâncias serão executadas em um grupo de Auto Scaling. A empresa precisa de uma solução que forneça latência de inicialização mínima para atender à demanda. Qual solução atende a esses requisitos?",
    "options": [
      "Usar o comando aws ec2 register-image para criar uma AMI a partir de um snapshot. Usar o AWS Step Functions para substituir a AMI no grupo de Auto Scaling.",
      "Habilitar a restauração rápida de snapshot do Amazon Elastic Block Store (Amazon EBS) em um snapshot. Provisionar uma AMI usando o snapshot. Substituir a AMI no grupo de Auto Scaling pela nova AMI.",
      "Habilitar a criação de AMI e definir regras de ciclo de vida no Amazon Data Lifecycle Manager (Amazon DLM). Criar uma função AWS Lambda que modifica a AMI no grupo de Auto Scaling.",
      "Usar o Amazon EventBridge para invocar políticas de ciclo de vida do AWS Backup que provisionam AMIs. Configurar os limites de capacidade do grupo de Auto Scaling como fonte de evento no EventBridge."
    ],
    "correctIndices": [
      1
    ],
    "keyword": "EBS Fast Snapshot Restore",
    "summary": "O EBS Fast Snapshot Restore (FSR) elimina a latência de inicialização ao pré-inicializar completamente os volumes EBS no momento da criação, sem necessidade de lazy loading. Isso significa que instâncias grandes iniciadas a partir de AMIs com FSR habilitado têm performance de I/O total imediatamente desde o primeiro momento, sem degradação de desempenho inicial. Esta é exatamente a solução para minimizar latência de inicialização em instâncias grandes.",
    "optionExplanations": [
      "Criar uma AMI a partir de um snapshot via CLI é um processo válido, mas não resolve o problema de latência de inicialização. Sem a restauração rápida de snapshot habilitada, os volumes EBS criados a partir de snapshots usam lazy loading — os blocos de dados são carregados do S3 sob demanda durante o primeiro acesso, causando alta latência de I/O nas instâncias recém-iniciadas. O Step Functions também não contribui para reduzir essa latência.",
      "O EBS Fast Snapshot Restore (FSR) elimina a latência de inicialização ao pré-inicializar completamente os volumes EBS no momento da criação, sem necessidade de lazy loading. Isso significa que instâncias grandes iniciadas a partir de AMIs com FSR habilitado têm performance de I/O total imediatamente desde o primeiro momento, sem degradação de desempenho inicial. Esta é exatamente a solução para minimizar latência de inicialização em instâncias grandes.",
      "O Amazon Data Lifecycle Manager (DLM) é usado para automatizar a criação, retenção e exclusão de snapshots e AMIs em um cronograma. Ele não tem funcionalidade para reduzir a latência de inicialização de instâncias EC2. A função Lambda modificando a AMI no Auto Scaling também não contribui para resolver o problema de latência.",
      "O AWS Backup com EventBridge pode automatizar a criação de AMIs, mas essa combinação não aborda o problema central de latência de inicialização. Provisionar AMIs via políticas de ciclo de vida do AWS Backup não habilita FSR nem elimina o lazy loading dos volumes EBS, portanto a latência de inicialização permaneceria alta para instâncias grandes."
    ],
    "sourceDocuments": [
      {
        "examNumber": 3,
        "questionNumber": 10,
        "fileName": "Simulado Comentado 3 Novo DPCN.pdf",
        "questionPage": 31,
        "explanationPages": [
          32
        ]
      }
    ]
  },
  {
    "id": 1311,
    "domain": "Segurança",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa hospeda um aplicativo web de múltiplas camadas que usa um cluster de banco de dados AmazonAurora MySQL para armazenamento. A camada de aplicativo é hospedada em instâncias do AmazonEC2. As diretrizes de segurança de TI da empresa determinam que as credenciais do banco de dados sejam criptografadas e rotacionadas a cada 14 dias. O que um arquiteto de soluções deve fazer para atender a esse requisito com o MENOR esforço operacional?",
    "options": [
      "Criar uma nova chave de criptografia do AWS Key Management Service (AWS KMS). Usar o AWS Secrets Manager para criar um novo segredo que usa a chave KMS com as credenciais apropriadas. Associar o segredo ao cluster Aurora DB. Configurar um período de rotação personalizado de 14 dias.",
      "Criar dois parâmetros no AWS Systems Manager Parameter Store: um para o nome do usuário como parâmetro de string e um que usa o tipo SecureString para a senha. Selecionar criptografia do AWS Key Management Service (AWS KMS) para o parâmetro de senha e carregar esses parâmetros na camada de aplicativo. Implementar uma função AWS Lambda que rotaciona a senha a cada 14 dias.",
      "Armazenar um arquivo que contém as credenciais em um sistema de arquivos AmazonElasticFile System (AmazonEFS) criptografado com AWS Key Management Service (AWS KMS). Montar o sistema de arquivos EFS em todas as instâncias EC2 da camada de aplicativo. Restringir o acesso ao arquivo no sistema de arquivos para que o aplicativo possa ler o arquivo e apenas superusuários possam modificar o arquivo. Implementar uma função AWS Lambda que rotaciona a chave no Aurora a cada 14 dias e grava novas credenciais no arquivo.",
      "Armazenar um arquivo que contém as credenciais em um bucket do AmazonS3 criptografado com AWS Key Management Service (AWS KMS) que o aplicativo usa para carregar as credenciais. Baixar o arquivo para o aplicativo regularmente para garantir que as credenciais corretas sejam usadas. Implementar uma função AWS Lambda que rotaciona as credenciais Aurora a cada 14 dias e faz upload dessas credenciais para o arquivo no bucket S3."
    ],
    "correctIndices": [
      0
    ],
    "keyword": "Secrets Manager: rotação em 14 dias",
    "summary": "O AWS Secrets Manager foi projetado especificamente paraarmazenar, criptografar e rotacionar credenciais de banco de dados com mínimo esforço operacional. Ele possui integração nativa com o Amazon Aurora para rotação automática de credenciais — sem necessidade de desenvolver código customizado. A chave KMS garante a criptografia do segredo, e o período de rotação configurável de 14 dias atende exatamente ao requisito. O Secrets Manager lida com todo o processo de rotação automaticamente, incluindo a atualização das credenciais no banco de dados.",
    "optionExplanations": [
      "O AWS Secrets Manager foi projetado especificamente paraarmazenar, criptografar e rotacionar credenciais de banco de dados com mínimo esforço operacional. Ele possui integração nativa com o Amazon Aurora para rotação automática de credenciais — sem necessidade de desenvolver código customizado. A chave KMS garante a criptografia do segredo, e o período de rotação configurável de 14 dias atende exatamente ao requisito. O Secrets Manager lida com todo o processo de rotação automaticamente, incluindo a atualização das credenciais no banco de dados.",
      "O Parameter Store com SecureString oferece criptografia via KMS, mas não possui rotação automática nativa para credenciais de banco de dados RDS/Aurora. Seria necessário desenvolver e manter uma função Lambda customizada para realizar a rotação, o que aumenta significativamente o esforço operacional em comparação com o Secrets Manager.",
      "Armazenar credenciais em um arquivo no EFS é uma abordagem desnecessariamente complexa e com alto overhead operacional. Requer montar o sistema de arquivos em todas as instâncias EC2, gerenciar permissões de arquivo, implementar Lambda customizado para rotação e garantir sincronização. Esta solução tem muito mais pontos de falha e esforço operacional que as alternativas baseadas em serviços gerenciados.",
      "Armazenar credenciais em um arquivo no S3 e fazer download regularmente também é uma abordagem inadequada para credenciais sensíveis. Além do alto overhead operacional de gerenciar o processo de download e atualização, há riscos de segurança — as credenciais ficam em um arquivo que precisa ser baixado e gerenciado pelas instâncias. A Lambda customizada para rotação também aumenta o esforço operacional desnecessariamente."
    ],
    "sourceDocuments": [
      {
        "examNumber": 3,
        "questionNumber": 11,
        "fileName": "Simulado Comentado 3 Novo DPCN.pdf",
        "questionPage": 34,
        "explanationPages": [
          35
        ]
      }
    ]
  },
  {
    "id": 1312,
    "domain": "Alto Desempenho",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa implantou um aplicativo web na AWS. A empresa hospeda o banco de dados de back-end no Amazon RDS for MySQL com uma instância de banco de dados primário e cinco réplicas de leitura para suportar necessidades de escalamento. As réplicas de leitura devem atrasar no máximo 1 segundo atrás da instância de banco de dados primária. O banco de dados executa rotineiramente procedimentos armazenados agendados. À medida que o tráfego no site aumenta, as réplicas experimentam lag adicional durante períodos de carga de pico. Um arquiteto de soluções deve reduzir o lag de replicação o máximo possível. O arquiteto de soluções deve minimizar alterações no código do aplicativo e deve minimizar o overhead operacional contínuo. Qual solução atenderá a esses requisitos?",
    "options": [
      "Migrar o banco de dados para o Amazon Aurora MySQL. Substituir as réplicas de leitura por Réplicas Aurora e configurar o Aurora Auto Scaling. Substituir os procedimentos armazenados por funções nativas do Aurora MySQL.",
      "Implantar um cluster do Amazon ElastiCache for Redis na frente do banco de dados. Modificar o aplicativo para verificar o cache antes de o aplicativo consultar o banco de dados. Substituir os procedimentos armazenados por funções AWS Lambda.",
      "Migrar o banco de dados para um banco de dados MySQL executando em instâncias do Amazon EC2. Escolher instâncias EC2 de computação otimizada grandes para todos os nós de réplica. Manter os procedimentos armazenados nas instâncias EC2.",
      "Migrar o banco de dados para o Amazon DynamoDB. Provisionar um grande número de unidades de capacidade de leitura (RCUs) para suportar o throughput necessário e configurar o escalamento de capacidade sob demanda. Substituir os procedimentos armazenados por DynamoDB Streams."
    ],
    "correctIndices": [
      0
    ],
    "keyword": "Aurora Auto Scaling",
    "summary": "O Amazon Aurora MySQL utiliza uma arquitetura de armazenamento distribuído e compartilhado que reduz drasticamente o lag de replicação — tipicamente abaixo de 100 milissegundos, muito abaixo do limite de 1 segundo exigido. As Réplicas Aurora compartilham o mesmo volume de armazenamento que a instância primária, eliminando a necessidade de replicar logs binários como no RDS MySQL tradicional. O Aurora Auto Scaling gerencia automaticamente o número de réplicas conforme a demanda, reduzindo o overhead operacional contínuo.",
    "optionExplanations": [
      "O Amazon Aurora MySQL utiliza uma arquitetura de armazenamento distribuído e compartilhado que reduz drasticamente o lag de replicação — tipicamente abaixo de 100 milissegundos, muito abaixo do limite de 1 segundo exigido. As Réplicas Aurora compartilham o mesmo volume de armazenamento que a instância primária, eliminando a necessidade de replicar logs binários como no RDS MySQL tradicional. O Aurora Auto Scaling gerencia automaticamente o número de réplicas conforme a demanda, reduzindo o overhead operacional contínuo.",
      "O ElastiCache pode reduzir consultas ao banco de dados, mas requer modificações significativas no código do aplicativo para verificar o cache antes de consultar o banco — violando o requisito de minimizar alterações no código. Além disso, substituir procedimentos armazenados por funções Lambda também representa grandes mudanças no código e aumenta o overhead operacional.",
      "Migrar para MySQL em instâncias EC2 aumenta significativamente o overhead operacional — a empresa passaria a gerenciar sistema operacional, patches, alta disponibilidade, backups e replicação manualmente. Instâncias de computação otimizada não eliminam o lag de replicação baseado em logs binários que é o problema central descrito.",
      "O Amazon DynamoDB é um banco de dados NoSQL com modelo de dados completamente diferente do MySQL relacional. Migrar para DynamoDB exigiria reescrita completa do aplicativo e dos procedimentos armazenados, violando o requisito de minimizar alterações no código. DynamoDB Streams não são equivalentes a procedimentos armazenados agendados."
    ],
    "sourceDocuments": [
      {
        "examNumber": 3,
        "questionNumber": 12,
        "fileName": "Simulado Comentado 3 Novo DPCN.pdf",
        "questionPage": 37,
        "explanationPages": [
          38
        ]
      }
    ]
  },
  {
    "id": 1313,
    "domain": "Resiliência",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Um arquiteto de soluções deve criar um plano de recuperação de desastres (DR) para uma plataforma de software como serviço (SaaS) de alto volume. Todos os dados para a plataforma são armazenados em um cluster de banco de dados Amazon Aurora MySQL. O plano de DR deve replicar dados para uma Região AWS secundária. Qual solução atenderá a esses requisitos com o MENOR custo?",
    "options": [
      "Usar replicação de log binário MySQL para um cluster Aurora na Região secundária. Provisionar uma instância de banco de dados para o cluster Aurora na Região secundária.",
      "Configurar um banco de dados global Aurora para o cluster de banco de dados. Quando a configuração estiver concluída, remover a instância de banco de dados da Região secundária.",
      "Usar o AWS Database Migration Service (AWS DMS) para replicar continuamente dados para um cluster Aurora na Região secundária. Remover a instância de banco de dados da Região secundária.",
      "Configurar um banco de dados global Aurora para o cluster de banco de dados. Especificar um mínimo de uma instância de banco de dados na Região secundária."
    ],
    "correctIndices": [
      3
    ],
    "keyword": "Aurora Global Database para DR",
    "summary": "O Aurora Global Database é a solução nativa e mais eficiente para replicação entre regiões AWS com Aurora. Ele replica dados com latência inferior a 1 segundo para a região secundária usando replicação baseada em storage, sem impacto na performance da região primária. Manter pelo menos uma instância na região secundária garante que o cluster esteja pronto para ser promovido em caso de desastre, com o menor custo possível — apenas uma instância mínima na região secundária é suficiente para DR.",
    "optionExplanations": [
      "A replicação de log binário MySQL para Aurora é uma abordagem válida, mas tem maior overhead operacional em comparação com o Aurora Global Database. Provisionar e manter manualmente a replicação binlog entre regiões requer mais configuração e gerenciamento contínuo. Além disso, o Aurora Global Database oferece replicação nativa com latência inferior a 1 segundo, sendo mais eficiente e confiável.",
      "Remover a instância de banco de dados da Região secundária após configurar o Aurora Global Database invalida completamente o propósito do DR. Sem uma instância de banco de dados na Região secundária, não há como promover o cluster secundário em caso de falha da Região primária. Um cluster Aurora Global sem instâncias na região secundária não pode ser usado para recuperação de desastres.",
      "O AWS DMS tem um custo associado para replicação contínua e adiciona complexidade operacional desnecessária quando o Aurora Global Database já oferece replicação nativa entre regiões. Remover a instância de banco de dados da Região secundária também inviabiliza o DR, pelo mesmo motivo explicado na opção B.",
      "O Aurora Global Database é a solução nativa e mais eficiente para replicação entre regiões AWS com Aurora. Ele replica dados com latência inferior a 1 segundo para a região secundária usando replicação baseada em storage, sem impacto na performance da região primária. Manter pelo menos uma instância na região secundária garante que o cluster esteja pronto para ser promovido em caso de desastre, com o menor custo possível — apenas uma instância mínima na região secundária é suficiente para DR."
    ],
    "sourceDocuments": [
      {
        "examNumber": 3,
        "questionNumber": 13,
        "fileName": "Simulado Comentado 3 Novo DPCN.pdf",
        "questionPage": 40,
        "explanationPages": [
          41
        ]
      }
    ]
  },
  {
    "id": 1314,
    "domain": "Segurança",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa tem um aplicativo personalizado com credenciais incorporadas que recupera informações de uma instância de banco de dados Amazon RDS MySQL. A gerência diz que o aplicativo deve ser tornado mais seguro com o mínimo de esforço de programação. O que um arquiteto de soluções deve fazer para atender a esses requisitos?",
    "options": [
      "Usar o AWS Key Management Service (AWS KMS) para criar chaves. Configurar o aplicativo para carregar as credenciais do banco de dados do AWS KMS. Habilitar a rotação automática de chave.",
      "Criar credenciais no banco de dados RDS for MySQL para o usuário do aplicativo e armazenar as credenciais no AWS Secrets Manager. Configurar o aplicativo para carregar as credenciais do banco de dados do Secrets Manager. Criar uma função AWS Lambda que rotaciona as credenciais no Secret Manager.",
      "Criar credenciais no banco de dados RDS for MySQL para o usuário do aplicativo e armazenar as credenciais no AWS Secrets Manager. Configurar o aplicativo para carregar as credenciais do banco de dados do Secrets Manager. Configurar um cronograma de rotação de credenciais para o usuário do aplicativo no banco de dados RDS for MySQL usando o Secrets Manager.",
      "Criar credenciais no banco de dados RDS for MySQL para o usuário do aplicativo e armazenar as credenciais no AWS Secrets Manager. Configurar o aplicativo para carregar as credenciais do banco de dados do Secrets Manager. Configurar um cronograma de rotação de credenciais para o usuário do aplicativo no banco de dados RDS for MySQL usando o Parameter Store."
    ],
    "correctIndices": [
      2
    ],
    "keyword": "Secrets Manager e rotação de credenciais",
    "summary": "Esta solução atende a todos os requisitos com mínimo esforço de programação: Remove as credenciais incorporadas do código do aplicativo, resolvendo o problema de segurança O Secrets Manager armazena e criptografa as credenciais de forma segura O aplicativo carrega as credenciais dinamicamente do Secrets Manager em tempo de execução O Secrets Manager possui rotação automática nativa para credenciais RDS MySQL, sem necessidade de código customizado — apenas configurar o cronograma de rotação é suficiente",
    "optionExplanations": [
      "O AWS KMS é um serviço de gerenciamento de chaves de criptografia, não de armazenamento de credenciais de banco de dados. Não é possível carregar credenciais de banco de dados diretamente do KMS — ele não foi projetado para esse fim. A rotação automática de chaves KMS também não tem relação com rotação de credenciais de banco de dados.",
      "Armazenar credenciais no Secrets Manager e carregar no aplicativo está correto, porém criar uma função Lambda customizada para realizar a rotação aumenta o esforço de programação desnecessariamente. O Secrets Manager já possui integração nativa com o RDS MySQL para rotação automática de credenciais, sem necessidade de desenvolver código customizado.",
      "Esta solução atende a todos os requisitos com mínimo esforço de programação: Remove as credenciais incorporadas do código do aplicativo, resolvendo o problema de segurança O Secrets Manager armazena e criptografa as credenciais de forma segura O aplicativo carrega as credenciais dinamicamente do Secrets Manager em tempo de execução O Secrets Manager possui rotação automática nativa para credenciais RDS MySQL, sem necessidade de código customizado — apenas configurar o cronograma de rotação é suficiente",
      "O AWS Systems Manager Parameter Store não possui rotação automática nativa para credenciais de banco de dados RDS. Usar o Parameter Store para configurar um cronograma de rotação de credenciais RDS MySQL simplesmente não é uma funcionalidade disponível nesse serviço. Esta é uma responsabilidade específica do Secrets Manager, que tem integração nativa com RDS para esse fim."
    ],
    "sourceDocuments": [
      {
        "examNumber": 3,
        "questionNumber": 14,
        "fileName": "Simulado Comentado 3 Novo DPCN.pdf",
        "questionPage": 43,
        "explanationPages": [
          44
        ]
      }
    ]
  },
  {
    "id": 1315,
    "domain": "Segurança",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa de mídia hospeda seu site na AWS. A arquitetura do aplicativo web inclui uma frota de instâncias do Amazon EC2 atrás de um Application Load Balancer (ALB) e um banco de dados hospedado no Amazon Aurora. A equipe de cibersegurança da empresa relata que o aplicativo é vulnerável a injeção SQL. Como a empresa deve resolver esse problema?",
    "options": [
      "Usar o AWS WAF na frente do ALB. Associar as ACLs web apropriadas ao AWS WAF.",
      "Criar uma regra de listener do ALB para responder a injeções SQL com uma resposta fixa.",
      "Assinar o AWS Shield Advanced para bloquear automaticamente todas as tentativas de injeção SQL.",
      "Configurar o Amazon Inspector para bloquear automaticamente todas as tentativas de injeção SQL."
    ],
    "correctIndices": [
      0
    ],
    "keyword": "WAF contra injeção SQL",
    "summary": "O AWS WAF é exatamente o serviço projetado para proteger aplicações web contra ataques na camada 7, incluindo injeção SQL. Ele pode ser associado ao ALB e, com as ACLs web adequadas (como as regras gerenciadas da AWS para SQL injection), bloqueia requisições maliciosas antes que cheguem à aplicação ou ao banco de dados.",
    "optionExplanations": [
      "O AWS WAF é exatamente o serviço projetado para proteger aplicações web contra ataques na camada 7, incluindo injeção SQL. Ele pode ser associado ao ALB e, com as ACLs web adequadas (como as regras gerenciadas da AWS para SQL injection), bloqueia requisições maliciosas antes que cheguem à aplicação ou ao banco de dados.",
      "O ALB não possui capacidade nativa de inspecionar o conteúdo das requisições para detectar padrões de injeção SQL. Suas regras de listener trabalham com critérios como cabeçalhos HTTP, paths e hosts — não com análise de segurança de payload.",
      "O AWS Shield é voltado exclusivamente para proteção contra ataques DDoS (volumétricos e de infraestrutura). Ele não possui nenhuma funcionalidade relacionada à detecção ou bloqueio de injeção SQL.",
      "O Amazon Inspector é um serviço de avaliação de vulnerabilidades em instâncias EC2 e imagens de contêiner. Ele identifica vulnerabilidades, mas não atua em tempo real para bloquear requisições maliciosas em trânsito."
    ],
    "sourceDocuments": [
      {
        "examNumber": 3,
        "questionNumber": 15,
        "fileName": "Simulado Comentado 3 Novo DPCN.pdf",
        "questionPage": 46,
        "explanationPages": [
          47
        ]
      }
    ]
  },
  {
    "id": 1316,
    "domain": "Segurança",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa tem um data lake do Amazon S3 governado pelo AWS Lake Formation. A empresa quer criar uma visualização no Amazon QuickSight juntando os dados no data lake com dados operacionais armazenados em um banco de dados Amazon Aurora MySQL. A empresa quer aplicar autorização em nível de coluna para que a equipe de marketing da empresa possa acessar apenas um subconjunto de colunas no banco de dados. Qual solução atenderá a esses requisitos com o MENOR overhead operacional?",
    "options": [
      "Usar o Amazon EMR para ingerir os dados diretamente do banco de dados para o mecanismo SPICE do QuickSight. Incluir apenas as colunas necessárias.",
      "Usar o AWS Glue Studio para ingerir os dados do banco de dados para o data lake S3. Anexar uma política IAM aos usuários do QuickSight para aplicar controle de acesso em nível de coluna. Usar o Amazon S3 como fonte de dados no QuickSight.",
      "Usar o AWS Glue Elastic Views para criar uma visualização materializada para o banco de dados no Amazon S3. Criar uma política de bucket S3 para aplicar controle de acesso em nível de coluna para os usuários do QuickSight. Usar o Amazon S3 como fonte de dados no QuickSight.",
      "Usar um blueprint do Lake Formation para ingerir os dados do banco de dados para o data lake S3. Usar o Lake Formation para aplicar controle de acesso em nível de coluna para os usuários do QuickSight. Usar o Amazon Athena como fonte de dados no QuickSight."
    ],
    "correctIndices": [
      3
    ],
    "keyword": "Lake Formation: autorização por coluna",
    "summary": "O blueprint do Lake Formation automatiza a ingestão de dados do Aurora MySQL para o data lake S3 com baixo overhead. O Lake Formation oferece controle de acesso em nível de coluna de forma nativa e centralizada, sem necessidade de código customizado. O Amazon Athena integra-se diretamente ao Lake Formation respeitando as permissões configuradas, e serve como fonte de dados ideal para o QuickSight nesse cenário.",
    "optionExplanations": [
      "O Amazon EMR adiciona overhead operacional desnecessário para uma tarefa de ingestão simples. Além disso, restringir colunas diretamente no SPICE não é um mecanismo de autorização robusto — qualquer mudança na ingestão exigiria reconfiguração manual, sem controle de acesso centralizado.",
      "Políticas IAM não oferecem controle de acesso em nível de coluna para dados no S3 de forma nativa e simples. Gerenciar permissões granulares por coluna via IAM é complexo e gera alto overhead operacional, especialmente para múltiplos usuários.",
      "O AWS Glue Elastic Views foi descontinuado pela AWS. Além disso, políticas de bucket S3 operam no nível de objeto/prefixo, não no nível de coluna — portanto não atendem ao requisito de controle de acesso em nível de coluna.",
      "O blueprint do Lake Formation automatiza a ingestão de dados do Aurora MySQL para o data lake S3 com baixo overhead. O Lake Formation oferece controle de acesso em nível de coluna de forma nativa e centralizada, sem necessidade de código customizado. O Amazon Athena integra-se diretamente ao Lake Formation respeitando as permissões configuradas, e serve como fonte de dados ideal para o QuickSight nesse cenário."
    ],
    "sourceDocuments": [
      {
        "examNumber": 3,
        "questionNumber": 16,
        "fileName": "Simulado Comentado 3 Novo DPCN.pdf",
        "questionPage": 49,
        "explanationPages": [
          50
        ]
      },
      {
        "examNumber": 4,
        "questionNumber": 1,
        "fileName": "Simulado Comentado 4 Novo DPCN.pdf",
        "questionPage": 4,
        "explanationPages": [
          5
        ]
      }
    ]
  },
  {
    "id": 1317,
    "domain": "Alto Desempenho",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa de processamento de transações tem trabalhos em lote semanais com script que são executados em instâncias do AmazonEC2. As instâncias EC2 estão em um grupo de Auto Scaling. O número de transações pode variar, mas a utilização de CPU de linha de base que é observada em cada execução é de pelo menos 60%. A empresa precisa provisionar a capacidade 30 minutos antes dos trabalhos serem executados. Atualmente, os engenheiros concluem essa tarefa modificando manualmente os parâmetros do grupo de Auto Scaling. A empresa não tem recursos para analisar as tendências de capacidade necessárias para as contagens do grupo de Auto Scaling. A empresa precisa de uma maneira automatizada de modificar a capacidade desejada do grupo de Auto Scaling. Qual solução atenderá a esses requisitos com o MENOR overhead operacional?",
    "options": [
      "Criar uma política de escalamento dinâmico para o grupo de Auto Scaling. Configurar a política para escalar com base na métrica de utilização de CPU. Definir o valor alvo para a métrica em 60%.",
      "Criar uma política de escalamento programado para o grupo de Auto Scaling. Definir a capacidade desejada, capacidade mínima e capacidade máxima apropriadas. Definir a recorrência como semanal. Definir a hora de início para 30 minutos antes dos trabalhos em lote serem executados.",
      "Criar uma política de escalamento preditivo para o grupo de Auto Scaling. Configurar a política para escalar com base em previsão. Definir a métrica de escalamento como utilização de CPU. Definir o valor alvo para a métrica em 60%. Na política, definir as instâncias para pré-lançamento 30 minutos antes dos trabalhos serem executados.",
      "Criar um evento do AmazonEventBridge para invocar uma função AWS Lambda quando o valor da métrica de utilização de CPU para o grupo de Auto Scaling atingir 60%. Configurar a função Lambda para aumentar a capacidade desejada e a capacidade máxima do grupo de Auto Scalingem 20%."
    ],
    "correctIndices": [
      2
    ],
    "keyword": "Auto Scaling preditivo",
    "summary": "O escalamento preditivo usa machine learning para analisar automaticamente o histórico de utilização e prever a capacidade necessária, eliminando a necessidade de análise manual. A configuração de pré-lançamento de 30 minutos garante que as instâncias estejam prontas antes dos trabalhos iniciarem. É a solução com menor overhead operacional pois combina automação inteligente com provisionamento antecipado.",
    "optionExplanations": [
      "O escalamento dinâmico reage a métricas em tempo real — ou seja, só escala após a CPU já ter atingido o limite. Isso não atende ao requisito de provisionar capacidade 30 minutos antes dos trabalhos serem executados.",
      "O escalamento programado até atenderia o requisito de provisionar com antecedência, porém exige que os engenheiros definam manualmente os valores de capacidade. A empresa declarou explicitamente que não tem recursos para analisar tendências de capacidade, tornando essa opção inadequada.",
      "O escalamento preditivo usa machine learning para analisar automaticamente o histórico de utilização e prever a capacidade necessária, eliminando a necessidade de análise manual. A configuração de pré-lançamento de 30 minutos garante que as instâncias estejam prontas antes dos trabalhos iniciarem. É a solução com menor overhead operacional pois combina automação inteligente com provisionamento antecipado.",
      "Assim como o escalamento dinâmico, esta solução é reativa — a Lambda só é invocada após a CPU atingir 60%, não antes. Além disso, criar e manter uma função Lambda para gerenciar o Auto Scaling adiciona overhead operacional desnecessário."
    ],
    "sourceDocuments": [
      {
        "examNumber": 3,
        "questionNumber": 17,
        "fileName": "Simulado Comentado 3 Novo DPCN.pdf",
        "questionPage": 52,
        "explanationPages": [
          53
        ]
      },
      {
        "examNumber": 4,
        "questionNumber": 2,
        "fileName": "Simulado Comentado 4 Novo DPCN.pdf",
        "questionPage": 7,
        "explanationPages": [
          8
        ]
      }
    ]
  },
  {
    "id": 1318,
    "domain": "Resiliência",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Um arquiteto de soluções está projetando a arquitetura de recuperação de desastres (DR) de uma empresa. A empresa tem um banco de dados MySQL que é executado em uma instância do Amazon EC2 em uma sub-rede privada com backup programado. O design de DR precisa incluir múltiplas Regiões AWS. Qual solução atenderá a esses requisitos com o MENOR overhead operacional?",
    "options": [
      "Migrar o banco de dados MySQL para múltiplas instâncias EC2. Configurar uma instância EC2 de standby na Região de DR. Ativar a replicação.",
      "Migrar o banco de dados MySQL para o Amazon RDS. Usar uma implantação Multi-AZ. Ativar a replicação de leitura para a instância de banco de dados primária nas diferentes Zonas de Disponibilidade.",
      "Migrar o banco de dados MySQL para um banco de dados global Amazon Aurora. Hospedar o cluster de banco de dados primário na Região primária. Hospedar o cluster de banco de dados secundário na Região de DR.",
      "Armazenar o backup agendado do banco de dados MySQL em um bucket do Amazon S3 configurado para S3 Cross-Region Replication (CRR). Usar o backup de dados para restaurar o banco de dados na Região de DR."
    ],
    "correctIndices": [
      2
    ],
    "keyword": "Aurora Global Database entre Regiões",
    "summary": "O Amazon Aurora Global Database foi projetado exatamente para esse cenário — replicação gerenciada entre regiões com baixa latência (tipicamente abaixo de 1 segundo). A AWS gerencia toda a infraestrutura de replicação cross-region automaticamente, sem necessidade de configuração manual. Em caso de desastre, o failover para a região secundária pode ser concluído em menos de 1 minuto, com mínimo overhead operacional.",
    "optionExplanations": [
      "Gerenciar replicação manualmente entre instâncias EC2 em múltiplas regiões exige configuração, monitoramento e manutenção contínuos. É a abordagem com maior overhead operacional dentre as opções, pois toda a responsabilidade de replicação, failover e consistência recai sobre a equipe.",
      "O Multi-AZ do RDS oferece alta disponibilidade dentro de uma única região, distribuindo entre Zonas de Disponibilidade. Réplicas de leitura cross-AZ também não equivalem a DR multi-região. Esta opção não atende ao requisito explícito de múltiplas Regiões AWS.",
      "O Amazon Aurora Global Database foi projetado exatamente para esse cenário — replicação gerenciada entre regiões com baixa latência (tipicamente abaixo de 1 segundo). A AWS gerencia toda a infraestrutura de replicação cross-region automaticamente, sem necessidade de configuração manual. Em caso de desastre, o failover para a região secundária pode ser concluído em menos de 1 minuto, com mínimo overhead operacional.",
      "Embora o S3 CRR replique os backups para outra região, restaurar um banco de dados a partir de backup implica em alto RTO (Recovery Time Objective). O processo de restauração é manual e demorado, o que não é ideal para DR. Além disso, o RPO (Recovery Point Objective) fica limitado à frequência dos backups agendados."
    ],
    "sourceDocuments": [
      {
        "examNumber": 3,
        "questionNumber": 18,
        "fileName": "Simulado Comentado 3 Novo DPCN.pdf",
        "questionPage": 55,
        "explanationPages": [],
        "answerOrigin": {
          "exam": 4,
          "number": 3,
          "pages": [
            11
          ]
        }
      },
      {
        "examNumber": 4,
        "questionNumber": 3,
        "fileName": "Simulado Comentado 4 Novo DPCN.pdf",
        "questionPage": 10,
        "explanationPages": [
          11
        ]
      }
    ]
  },
  {
    "id": 1319,
    "domain": "Alto Desempenho",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa tem um aplicativo Java que usa o Amazon Simple Queue Service (Amazon SQS) para analisar mensagens. O aplicativo não pode analisar mensagens maiores que 256 KB de tamanho. A empresa quer implementar uma solução para dar ao aplicativo a capacidade de analisar mensagens tão grandes quanto 50 MB. Qual solução atenderá a esses requisitos com o MENOR número de alterações no código?",
    "options": [
      "Usar a Amazon SQS Extended Client Library para Java para hospedar mensagens maiores que 256 KB no Amazon S3.",
      "Usar o Amazon EventBridge para postar mensagens grandes do aplicativo em vez do Amazon SQS.",
      "Alterar o limite no Amazon SQS para lidar com mensagens maiores que 256 KB.",
      "Armazenar mensagens maiores que 256 KB no Amazon Elastic File System (Amazon EFS). Configurar o Amazon SQS para referenciar esse local nas mensagens."
    ],
    "correctIndices": [
      0
    ],
    "keyword": "SQS Extended Client e S3",
    "summary": "A Amazon SQS Extended Client Library para Java foi criada especificamente para esse cenário. Ela intercepta automaticamente mensagens que excedem 256 KB, armazena o payload no Amazon S3 e envia apenas uma referência ao objeto S3 pela fila SQS. O consumidor da mensagem também usa a biblioteca para recuperar o payload do S3 de forma transparente. As alterações no código são mínimas — basicamente trocar o cliente SQS padrão pelo cliente estendido.",
    "optionExplanations": [
      "A Amazon SQS Extended Client Library para Java foi criada especificamente para esse cenário. Ela intercepta automaticamente mensagens que excedem 256 KB, armazena o payload no Amazon S3 e envia apenas uma referência ao objeto S3 pela fila SQS. O consumidor da mensagem também usa a biblioteca para recuperar o payload do S3 de forma transparente. As alterações no código são mínimas — basicamente trocar o cliente SQS padrão pelo cliente estendido.",
      "O Amazon EventBridge não é um substituto para o SQS em filas de mensagens. Além disso, migraria toda a arquitetura de mensageria da aplicação, exigindo alterações significativas no código — o oposto do que é pedido.",
      "O limite de 256 KB por mensagem é um limite rígido e imutável do Amazon SQS. Não existe configuração ou ajuste que permita aumentar esse limite diretamente no serviço. Simplesmente não é possível fazer isso.",
      "O Amazon SQS não possui integração nativa para referenciar automaticamente arquivos no EFS. Implementar essa solução exigiria código customizado substancial para gerenciar o armazenamento, a referência e a recuperação dos arquivos, aumentando consideravelmente a complexidade e as alterações no código."
    ],
    "sourceDocuments": [
      {
        "examNumber": 3,
        "questionNumber": 19,
        "fileName": "Simulado Comentado 3 Novo DPCN.pdf",
        "questionPage": 57,
        "explanationPages": [
          58
        ]
      },
      {
        "examNumber": 4,
        "questionNumber": 4,
        "fileName": "Simulado Comentado 4 Novo DPCN.pdf",
        "questionPage": 13,
        "explanationPages": [
          14
        ]
      }
    ]
  },
  {
    "id": 1320,
    "domain": "Segurança",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa quer restringir o acesso ao conteúdo de um de seus principais aplicativos web e proteger o conteúdo usando técnicas de autorização disponíveis na AWS. A empresa quer implementar uma arquitetura sem servidor e uma solução de autenticação para menos de 100 usuários. A solução precisa se integrar ao aplicativo web principal e servir conteúdo web globalmente. A solução também deve escalar à medida que a base de usuários da empresa cresce, fornecendo a menor latência de login possível. Qual solução atenderá a esses requisitos com o MENOR custo?",
    "options": [
      "Usar o Amazon Cognito para autenticação. Usar o Lambda@Edge para autorização. Usar o Amazon CloudFront para servir o aplicativo web globalmente.",
      "Usar o AWS Directory Service for Microsoft Active Directory para autenticação. Usar o AWS Lambda para autorização. Usar um Application Load Balancer para servir o aplicativo web globalmente.",
      "Usar o Amazon Cognito para autenticação. Usar o AWS Lambda para autorização. Usar o Amazon S3 Transfer Acceleration para servir o aplicativo web globalmente.",
      "Usar o AWS Directory Service for Microsoft Active Directory para autenticação. Usar o Lambda@Edge para autorização. Usar o AWS Elastic Beanstalk para servir o aplicativo web globalmente."
    ],
    "correctIndices": [
      0
    ],
    "keyword": "Cognito, Lambda@Edge e CloudFront",
    "summary": "O Amazon Cognito é a solução de autenticação sem servidor da AWS, com camada gratuita para até 50.000 usuários ativos mensais — ideal para menos de 100 usuários com custo praticamente zero. O Lambda@Edge executa a lógica de autorização nos pontos de presença do CloudFront, garantindo a menor latência possível para usuários globais. O CloudFront distribui o conteúdo globalmente pela rede de edge locations da AWS, atendendo todos os requisitos com arquitetura totalmente serverless e menor custo.",
    "optionExplanations": [
      "O Amazon Cognito é a solução de autenticação sem servidor da AWS, com camada gratuita para até 50.000 usuários ativos mensais — ideal para menos de 100 usuários com custo praticamente zero. O Lambda@Edge executa a lógica de autorização nos pontos de presença do CloudFront, garantindo a menor latência possível para usuários globais. O CloudFront distribui o conteúdo globalmente pela rede de edge locations da AWS, atendendo todos os requisitos com arquitetura totalmente serverless e menor custo.",
      "O AWS Directory Service for Microsoft Active Directory tem um custo fixo elevado (cobrado por hora, independente do uso), completamente desproporcional para menos de 100 usuários. Além disso, um ALB não distribui conteúdo globalmente como o CloudFront — ele opera regionalmente. Esta é a opção de maior custo.",
      "O S3 Transfer Acceleration é projetado para acelerar uploads para o S3, não para servir conteúdo web globalmente com baixa latência. Não é um substituto para uma CDN como o CloudFront. Além disso, o Lambda regional adicionaria latência variável dependendo da localização do usuário.",
      "O AWS Directory Service for Microsoft Active Directory é caro e excessivo para menos de 100 usuários. O Elastic Beanstalk não é uma solução de distribuição global de conteúdo — ele hospeda aplicações regionalmente. Esta opção não atende aos requisitos de menor custo nem de distribuição global com baixa latência."
    ],
    "sourceDocuments": [
      {
        "examNumber": 3,
        "questionNumber": 20,
        "fileName": "Simulado Comentado 3 Novo DPCN.pdf",
        "questionPage": 60,
        "explanationPages": [
          61
        ]
      },
      {
        "examNumber": 4,
        "questionNumber": 5,
        "fileName": "Simulado Comentado 4 Novo DPCN.pdf",
        "questionPage": 16,
        "explanationPages": [
          17
        ]
      }
    ]
  },
  {
    "id": 1321,
    "domain": "Otimização de Custos",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa tem um array de armazenamento conectado à rede (NAS) envelhecido em seu data center. O array NAS apresenta compartilhamentos SMB e NFS para estações de trabalho clientes. A empresa não quer comprar um novo array NAS. A empresa também não quer incorrer no custo de renovar o contrato de suporte do array NAS. Alguns dos dados são acessados com frequência, mas muito dos dados está inativo. Um arquiteto de soluções precisa implementar uma solução que migre os dados para o Amazon S3, use políticas de ciclo de vida S3 e mantém a mesma aparência para as estações de trabalho clientes. O arquiteto de soluções identificou o AWS Storage Gateway como parte da solução. Qual tipo de gateway de armazenamento o arquiteto de soluções deve provisionar para atender a esses requisitos?",
    "options": [
      "Volume Gateway",
      "Tape Gateway",
      "Amazon FSx File Gateway",
      "Amazon S3 File Gateway"
    ],
    "correctIndices": [
      3
    ],
    "keyword": "S3 File Gateway",
    "summary": "O Amazon S3 File Gateway é exatamente a solução para esse cenário. Ele apresenta compartilhamentos de arquivos SMB e NFS para as estações de trabalho clientes, mantendo a mesma aparência do NAS atual. Os arquivos são armazenados como objetos nativos no Amazon S3, permitindo o uso de políticas de ciclo de vida S3 para mover dados inativos para classes de armazenamento mais baratas como S3-IA ou S3 Glacier. Os dados acessados com frequência são mantidos em cache localmente no gateway para baixa latência.",
    "optionExplanations": [
      "O Volume Gateway apresenta volumes de armazenamento em bloco para as aplicações via iSCSI. Ele não oferece compartilhamentos SMB ou NFS para estações de trabalho clientes, e os dados são armazenados como snapshots EBS no S3 — não como objetos S3 nativos acessíveis por políticas de ciclo de vida S3 diretamente.",
      "O Tape Gateway emula uma biblioteca de fitas virtuais (VTL) para soluções de backup. Não tem relação com compartilhamentos de arquivos SMB/NFS para estações de trabalho, e não é adequado para substituir um NAS em uso ativo pelos clientes.",
      "O Amazon FSx File Gateway é projetado para fornecer acesso local de baixa latência a compartilhamentos de arquivos hospedados no Amazon FSx for Windows File Server, não no Amazon S3. Portanto não atende ao requisito de migrar dados para o S3 com políticas de ciclo de vida.",
      "O Amazon S3 File Gateway é exatamente a solução para esse cenário. Ele apresenta compartilhamentos de arquivos SMB e NFS para as estações de trabalho clientes, mantendo a mesma aparência do NAS atual. Os arquivos são armazenados como objetos nativos no Amazon S3, permitindo o uso de políticas de ciclo de vida S3 para mover dados inativos para classes de armazenamento mais baratas como S3-IA ou S3 Glacier. Os dados acessados com frequência são mantidos em cache localmente no gateway para baixa latência."
    ],
    "sourceDocuments": [
      {
        "examNumber": 3,
        "questionNumber": 21,
        "fileName": "Simulado Comentado 3 Novo DPCN.pdf",
        "questionPage": 63,
        "explanationPages": [
          64
        ]
      },
      {
        "examNumber": 4,
        "questionNumber": 6,
        "fileName": "Simulado Comentado 4 Novo DPCN.pdf",
        "questionPage": 19,
        "explanationPages": [
          20
        ]
      }
    ]
  },
  {
    "id": 1322,
    "domain": "Otimização de Custos",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa tem um aplicativo que é executado em instâncias do Amazon EC2. Um arquiteto de soluções padronizou a empresa em uma família de instância específica e vários tamanhos de instância com base nas necessidades atuais da empresa. A empresa quer maximizar a economia de custos para o aplicativo ao longo dos próximos 3 anos. A empresa precisa ser capaz de alterar a família e os tamanhos de instância nos próximos 6 meses com base na popularidade e uso do aplicativo. Qual solução atenderá a esses requisitos com o MENOR custo?",
    "options": [
      "Compute Savings Plan",
      "EC2 Instance Savings Plan",
      "Instâncias Reservadas Zonais",
      "Instâncias Reservadas Standard"
    ],
    "correctIndices": [
      0
    ],
    "keyword": "Compute Savings Plans",
    "summary": "O Compute Savings Plan oferece a maior flexibilidade dentre todas as opções de economia da AWS. Ele se aplica a qualquer família de instância, tamanho, região, sistema operacional e até serviços como AWS Fargate e Lambda. Como a empresa precisa ser capaz de mudar a família e os tamanhos de instância nos próximos 6 meses, essa flexibilidade é essencial. O desconto pode chegar a até 66% em relação ao preço sob demanda, mantendo total liberdade para mudanças na arquitetura.",
    "optionExplanations": [
      "O Compute Savings Plan oferece a maior flexibilidade dentre todas as opções de economia da AWS. Ele se aplica a qualquer família de instância, tamanho, região, sistema operacional e até serviços como AWS Fargate e Lambda. Como a empresa precisa ser capaz de mudar a família e os tamanhos de instância nos próximos 6 meses, essa flexibilidade é essencial. O desconto pode chegar a até 66% em relação ao preço sob demanda, mantendo total liberdade para mudanças na arquitetura.",
      "O EC2 Instance Savings Plan oferece descontos maiores (até 72%), porém é restrito a uma família de instância específica em uma região específica. Como a empresa pode precisar mudar a família de instância nos próximos 6 meses, este plano não atende ao requisito de flexibilidade — a troca de família invalidaria os benefícios do plano.",
      "As Instâncias Reservadas Zonais são vinculadas a uma família de instância, tamanho, Zona de Disponibilidade e sistema operacional específicos. São extremamente rígidas e não permitem mudanças de família ou tamanho. Completamente inadequadas para o cenário descrito.",
      "As Instâncias Reservadas Standard oferecem bons descontos, porém são vinculadas a uma família de instância e região específicas por todo o período de 1 ou 3 anos. Embora permitam mudança de tamanho dentro da mesma família, não permitem mudança de família de instância — o que é um requisito explícito da empresa."
    ],
    "sourceDocuments": [
      {
        "examNumber": 3,
        "questionNumber": 22,
        "fileName": "Simulado Comentado 3 Novo DPCN.pdf",
        "questionPage": 66,
        "explanationPages": [
          67
        ]
      },
      {
        "examNumber": 4,
        "questionNumber": 7,
        "fileName": "Simulado Comentado 4 Novo DPCN.pdf",
        "questionPage": 22,
        "explanationPages": [
          23
        ]
      }
    ]
  },
  {
    "id": 1323,
    "domain": "Otimização de Custos",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa coleta dados de um grande número de participantes que usam dispositivos vestíveis. A empresa armazena os dados em uma tabela do Amazon DynamoDB e usa aplicativos para analisar os dados. A carga de trabalho de dados é constante e previsível. A empresa quer se manter abaixo de seu orçamento previsto para o DynamoDB. Qual solução atenderá a esses requisitos com o MENOR custo?",
    "options": [
      "Usar o modo provisionado e o DynamoDB Standard-Infrequent Access (DynamoDB Standard- IA). Reservar capacidade para a carga de trabalho prevista.",
      "Usar o modo provisionado. Especificar as unidades de capacidade de leitura (RCUs) e unidades de capacidade de escrita (WCUs).",
      "Usar o modo sob demanda. Definir as unidades de capacidade de leitura (RCUs) e unidades de capacidade de escrita (WCUs) suficientemente altas para acomodar mudanças na carga de trabalho.",
      "Usar o modo sob demanda. Especificar as unidades de capacidade de leitura (RCUs) e unidades de capacidade de escrita (WCUs) com capacidade reservada."
    ],
    "correctIndices": [
      1
    ],
    "keyword": "DynamoDB: capacidade provisionada",
    "summary": "Como a carga de trabalho é constante e previsível, o modo provisionado é a escolha ideal. Nesse modo, você especifica exatamente as RCUs e WCUs necessárias e paga apenas pela capacidade provisionada, independente do uso real. Isso garante custos previsíveis e controlados, mantendo a empresa dentro do orçamento previsto. Para cargas previsíveis, o modo provisionado é sempre mais barato que o modo sob demanda.",
    "optionExplanations": [
      "O DynamoDB Standard-IA é indicado para tabelas onde os dados são acessados com pouca frequência. O cenário descreve dados analisados ativamente por aplicativos, o que sugere acesso frequente. Usar Standard-IA nesse caso pode não gerar economia real e ainda pode incorrer em custos adicionais de recuperação de dados.",
      "Como a carga de trabalho é constante e previsível, o modo provisionado é a escolha ideal. Nesse modo, você especifica exatamente as RCUs e WCUs necessárias e paga apenas pela capacidade provisionada, independente do uso real. Isso garante custos previsíveis e controlados, mantendo a empresa dentro do orçamento previsto. Para cargas previsíveis, o modo provisionado é sempre mais barato que o modo sob demanda.",
      "O modo sob demanda cobra por cada leitura e escrita realizada, sendo mais adequado para cargas de trabalho imprevisíveis ou variáveis. Para uma carga constante e previsível, o modo sob demanda geralmente resulta em custos mais altos que o modo provisionado. Definir RCUs e WCUs altas no modo sob demanda também não faz sentido técnico — esse modo escala automaticamente sem necessidade de configuração de capacidade.",
      "O modo sob demanda não suporta capacidade reservada — esses são conceitos mutuamente exclusivos no DynamoDB. Capacidade reservada só está disponível para tabelas no modo provisionado. Esta opção descreve uma configuração que simplesmente não existe no DynamoDB."
    ],
    "sourceDocuments": [
      {
        "examNumber": 3,
        "questionNumber": 23,
        "fileName": "Simulado Comentado 3 Novo DPCN.pdf",
        "questionPage": 69,
        "explanationPages": [
          70
        ]
      },
      {
        "examNumber": 4,
        "questionNumber": 8,
        "fileName": "Simulado Comentado 4 Novo DPCN.pdf",
        "questionPage": 25,
        "explanationPages": [
          26
        ]
      }
    ]
  },
  {
    "id": 1324,
    "domain": "Segurança",
    "multiSelect": false,
    "requiredCount": 1,
    "question": "Uma empresa armazena dados confidenciais em um banco de dados Amazon Aurora PostgreSQL na Região ap-southeast-3. O banco de dados é criptografado com uma chave gerenciada pelo cliente do AWS Key Management Service (AWS KMS). A empresa foi recentemente adquirida e deve compartilhar com segurança um backup do banco de dados com a conta AWS da empresa adquirente em ap- southeast-3. O que um arquiteto de soluções deve fazer para atender a esses requisitos?",
    "options": [
      "Criar um snapshot do banco de dados. Copiar o snapshot para um novo snapshot não criptografado. Compartilhar o novo snapshot com a conta AWS da empresa adquirente.",
      "Criar um snapshot do banco de dados. Adicionar a conta AWS da empresa adquirente à política de chave KMS. Compartilhar o snapshot com a conta AWS da empresa adquirente.",
      "Criar um snapshot do banco de dados que use uma chave KMS gerenciada pela AWS diferente. Adicionar a conta AWS da empresa adquirente ao alias da chave KMS. Compartilhar o snapshot com a conta AWS da empresa adquirente.",
      "Criar um snapshot do banco de dados. Baixar o snapshot do banco de dados. Fazer upload do snapshot do banco de dados para um bucket do Amazon S3. Atualizar a política do bucket S3 para permitir acesso da conta AWS da empresa adquirente."
    ],
    "correctIndices": [
      1
    ],
    "keyword": "Compartilhamento de snapshot e chave KMS",
    "summary": "Este é o processo correto e seguro para compartilhar snapshots criptografados entre contas AWS. Ao adicionar a conta da empresa adquirente à política da chave KMS, ela obtém permissão para usar a chave de descriptografia. Em seguida, ao compartilhar o snapshot diretamente com a conta de destino, a empresa adquirente pode acessar e restaurar o banco de dados mantendo toda a segurança da criptografia original.",
    "optionExplanations": [
      "Descriptografar o snapshot para compartilhá-lo como não criptografado é uma grave falha de segurança. O enunciado deixa claro que os dados são confidenciais e devem ser compartilhados com segurança. Remover a criptografia vai completamente contra esse requisito e expõe dados sensíveis desnecessariamente.",
      "Este é o processo correto e seguro para compartilhar snapshots criptografados entre contas AWS. Ao adicionar a conta da empresa adquirente à política da chave KMS, ela obtém permissão para usar a chave de descriptografia. Em seguida, ao compartilhar o snapshot diretamente com a conta de destino, a empresa adquirente pode acessar e restaurar o banco de dados mantendo toda a segurança da criptografia original.",
      "Chaves KMS gerenciadas pela AWS (aws/rds, por exemplo) não podem ter suas políticas modificadas para permitir acesso cross-account. Apenas chaves gerenciadas pelo cliente (CMKs) permitem edição de política para compartilhamento entre contas. Além disso, adicionar uma conta a um alias de chave não é um mecanismo válido de controle de acesso no KMS.",
      "Snapshots do Aurora não podem ser simplesmente baixados como arquivos e enviados ao S3 — não existe esse mecanismo de exportação direta de snapshot para fins de compartilhamento entre contas. Além disso, essa abordagem introduz etapas manuais desnecessárias, alto overhead operacional e potenciais riscos de segurança durante a transferência dos dados."
    ],
    "sourceDocuments": [
      {
        "examNumber": 3,
        "questionNumber": 24,
        "fileName": "Simulado Comentado 3 Novo DPCN.pdf",
        "questionPage": 72,
        "explanationPages": [
          73
        ]
      },
      {
        "examNumber": 4,
        "questionNumber": 9,
        "fileName": "Simulado Comentado 4 Novo DPCN.pdf",
        "questionPage": 28,
        "explanationPages": [
          29
        ]
      }
    ]
  },
  {
    "id": 1325,
    "domain": "Resiliência",
    "multiSelect": true,
    "requiredCount": 2,
    "question": "Uma empresa usa uma instância de banco de dados Amazon RDS for Microsoft SQL Server Single-AZ de 100 GB na Região us-east-1 para armazenar transações de clientes. A empresa precisa de alta disponibilidade e recuperação automática para a instância de banco de dados. A empresa também deve executar relatórios no banco de dados RDS várias vezes por ano. O processo de relatório faz com que as transações demorem mais do que o normal para serem lançadas nas contas dos clientes. A empresa precisa de uma solução que melhore o desempenho do processo de relatório. Qual combinação de etapas atenderá a esses requisitos? (Escolha duas.)",
    "options": [
      "Modificar a instância de banco de dados de uma implantação Single-AZ para uma implantação Multi- AZ.",
      "Tirar um snapshot da instância de banco de dados atual. Restaurar o snapshot para uma nova implantação RDS em outra Zona de Disponibilidade.",
      "Criar uma réplica de leitura da instância de banco de dados em uma Zona de Disponibilidade diferente. Direcionar todas as solicitações de relatórios para a réplica de leitura.",
      "Migrar o banco de dados para o RDS Custom.",
      "Usar o RDS Proxy para limitar as solicitações de relatório à janela de manutenção."
    ],
    "correctIndices": [
      0,
      2
    ],
    "keyword": "RDS Multi-AZ e réplica para relatórios",
    "summary": "Converter a instância de Single-AZ para Multi-AZ atende diretamente ao requisito de alta disponibilidade e recuperação automática. No modo Multi-AZ, o RDS mantém uma instância standby sincronizada em outra Zona de Disponibilidade e realiza failover automático em caso de falha da instância primária, sem intervenção manual.\n\nCriar uma réplica de leitura e direcionar as consultas de relatório para ela resolve diretamente o problema de desempenho. As cargas de trabalho de relatório — que são intensivas em leitura — são isoladas da instância primária, eliminando a contenção de recursos que causava lentidão nas transações dos clientes. A réplica em uma AZ diferente também contribui para a resiliência da arquitetura.",
    "optionExplanations": [
      "Converter a instância de Single-AZ para Multi-AZ atende diretamente ao requisito de alta disponibilidade e recuperação automática. No modo Multi-AZ, o RDS mantém uma instância standby sincronizada em outra Zona de Disponibilidade e realiza failover automático em caso de falha da instância primária, sem intervenção manual.",
      "Restaurar um snapshot para uma nova instância RDS é um processo manual e pontual — não oferece alta disponibilidade contínua nem recuperação automática. Além disso, a instância restaurada ficaria desatualizada imediatamente após a restauração, pois não há sincronização contínua com a instância primária.",
      "Criar uma réplica de leitura e direcionar as consultas de relatório para ela resolve diretamente o problema de desempenho. As cargas de trabalho de relatório — que são intensivas em leitura — são isoladas da instância primária, eliminando a contenção de recursos que causava lentidão nas transações dos clientes. A réplica em uma AZ diferente também contribui para a resiliência da arquitetura.",
      "O RDS Custom é voltado para cenários que exigem acesso ao sistema operacional ou personalização profunda do banco de dados. Não resolve nenhum dos requisitos descritos — nem alta disponibilidade automatizada nem melhoria no desempenho de relatórios. Além disso, introduz overhead operacional adicional.",
      "O RDS Proxy é um proxy de banco de dados que gerencia pools de conexões para melhorar a escalabilidade e resiliência de aplicações. Ele não possui funcionalidade para limitar ou agendar consultas de relatório para uma janela de manutenção — isso simplesmente não é uma característica do serviço."
    ],
    "sourceDocuments": [
      {
        "examNumber": 3,
        "questionNumber": 25,
        "fileName": "Simulado Comentado 3 Novo DPCN.pdf",
        "questionPage": 75,
        "explanationPages": [
          76
        ]
      },
      {
        "examNumber": 4,
        "questionNumber": 10,
        "fileName": "Simulado Comentado 4 Novo DPCN.pdf",
        "questionPage": 31,
        "explanationPages": [
          32
        ]
      }
    ]
  }
];
