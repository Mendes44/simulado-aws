import type { Question } from '../types';

// Banco de questões: os IDs são usados para reconstruir os gabaritos do histórico.
export const QUESTIONS_DB: Question[] = [
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

