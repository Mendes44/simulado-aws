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
