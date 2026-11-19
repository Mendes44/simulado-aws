# Simulado AWS SAA-C03

Aplicação Next.js para praticar questões, corrigir respostas e revisar tentativas.

## Desenvolvimento

- `npm ci`: instala as dependências do lockfile.
- `npm run dev`: inicia o servidor local.
- `npm run lint`: verifica o código.
- `npm run build`: valida e gera a versão de produção.
- `npm start`: serve a versão de produção.

## Organização

- `app/page.tsx`: entrada da página.
- `app/layout.tsx`: idioma, estilos globais e metadados.
- `app/opengraph-image.tsx` e `app/twitter-image.tsx`: miniatura PNG para compartilhamento.
- `features/exam/types.ts`: contratos de questões, respostas e tentativas.
- `features/exam/data/`: questões e apresentação dos domínios.
- `features/exam/hooks/use-exam.ts`: estados, cronômetro, navegação e persistência.
- `features/exam/components/`: configuração, prova, resultado, ranking, histórico e revisão.
- `features/exam/utils.ts`: formatação, embaralhamento e correção.
- `features/exam/constants.ts`: chaves de armazenamento e letras das alternativas.

## Dados e regras

As tentativas e o último nome ficam no `localStorage` do navegador. O ranking é local ao navegador; não existe um banco compartilhado entre usuários. As chaves existentes foram mantidas para preservar o histórico.

A nota usa a estimativa linear já existente: `100 + (acertos / total) * 900`, arredondada. O corte do simulado é 720. Essa fórmula não reproduz o cálculo estatístico da certificação oficial.

Para incluir questões, edite `data/questions.ts` e mantenha os IDs únicos e estáveis: o histórico usa esses IDs para recuperar o enunciado. Os índices das alternativas começam em zero.

## Compartilhamento e publicação

A miniatura é gerada pelo Next.js em 1200 × 630 pixels. O endereço público está em `metadataBase`, no layout; atualize-o se o domínio mudar. As redes sociais podem manter prévias antigas em cache após uma publicação.

A publicação continua pelo fluxo existente do projeto na Vercel.

## Questões e materiais de estudo

O banco anterior tem 46 questões. As 30 anteriores foram preservadas com seus IDs e gabaritos; sua origem não foi reclassificada como oficial. As 16 novas (IDs 31–46) são autorais, com quatro questões por domínio, duas delas com seleção de duas respostas entre cinco alternativas. Não são transcrições nem traduções de questões oficiais ou de provas aplicadas.

Cada nova questão inclui referências da documentação AWS e data de revisão (19/11/2026). A correção imediata e o gabarito detalhado exibem essas referências. O arquivo features/exam/data/practice-questions.ts concentra os novos itens. O modo Banco inteiro usa a quantidade atual de questões, limitado ao domínio escolhido.

Materiais oficiais:

- [PDF com 10 exemplos e respostas](https://d1.awsstatic.com/training-and-certification/docs-sa-assoc/AWS-Certified-Solutions-Architect-Associate_Sample-Questions.pdf)
- [Preparação no AWS Skill Builder](https://skillbuilder.aws/category/exam-prep/solutions-architect-associate-SAA-C03)
- [Guia do exame SAA-C03](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html)

O exame oficial possui 65 questões (50 pontuadas e 15 não pontuadas) em 130 minutos. Este banco não garante perguntas que aparecerão no exame. O sorteio existente do simulado não impõe os pesos por domínio do exame.

## Simulados comentados DPCN

Foram importadas 85 ocorrências dos cinco PDFs enviados: 15, 10, 25, 15 e 20 questões, respectivamente. Dez questões são idênticas entre os simulados 3 e 4. Elas compartilham uma entrada com todas as origens preservadas: são 75 novas questões únicas e 121 questões no banco total. O filtro de origem recupera a quantidade integral de cada simulado.

Os arquivos em features/exam/data/dpcn contêm enunciados, alternativas e comentários completos por alternativa. Os IDs são estáveis a partir de 1101, sem alterar as 46 questões anteriores. A classificação por domínio foi adicionada para permitir os filtros do aplicativo; não representa uma classificação atribuída pelos PDFs.

A questão 18 do Simulado 3 não tem página de comentários. Seu enunciado e alternativas são idênticos aos da questão 3 do Simulado 4, cujo gabarito C e comentários foram usados com indicação explícita dessa origem. A questão 10 do Simulado 1 foi extraída da página 31, onde todas as cinco alternativas estão separadas corretamente.

O gabarito dos materiais foi mantido para o treino. As questões 11 e 16 do Simulado 5 incluem notas separadas com documentação AWS sobre os limites de API keys como autorização e sobre a política KMS necessária ao Auto Scaling. Isso sinaliza ressalvas identificadas no material, sem apresentar os PDFs como questões oficiais ou como uma revisão técnica completa.

Os PDFs e caminhos locais não são publicados. Cada questão mostra arquivo, número e páginas de origem. Todas disponíveis acompanha o banco e o domínio selecionados; a seleção é registrada nas novas tentativas sem invalidar históricos anteriores.
