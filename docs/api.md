# API FixFlow

## Objetivo

A API REST será a camada de comunicação entre o aplicativo mobile e a persistência. Nesta etapa, ela apenas confirma que o servidor HTTP está em execução; ainda não acessa banco de dados.

## Tecnologias

- Node.js
- Express
- TypeScript

`dotenv` lê a porta do ambiente e `tsx` executa o servidor durante o desenvolvimento.

## Estrutura atual

- `api/src/app.ts`: configura Express, JSON, rotas e middlewares.
- `api/src/server.ts`: inicia o servidor HTTP na porta configurada.
- `api/src/routes/`: reúne as rotas sob o prefixo `/api`.
- `api/src/middlewares/`: responde a rotas inexistentes e trata erros em JSON.
- `api/src/config/env.ts`: lê e valida `PORT` (padrão `3333`).

Para executar, entre em `api/`, instale as dependências com `npm install` e use `npm run dev`. `npm run typecheck` verifica os tipos; `npm run build` compila para `dist/`; `npm start` executa o build. `api/.env.example` mostra a variável opcional de porta.

## Endpoint disponível nesta etapa

`GET /api/health` retorna HTTP 200 e `{"status":"ok","service":"fixflow-api"}`. Ele atesta somente que a API está no ar, sem verificar banco ou outros serviços. Rotas inexistentes retornam HTTP 404 e `{"message":"Rota não encontrada."}`.

## Funcionalidades ainda planejadas

Autenticação, usuários, solicitações, categorias, persistência com Prisma e SQLite e upload de imagens permanecem para etapas futuras. Nenhum endpoint dessas áreas existe nesta versão.
