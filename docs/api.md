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
- `api/prisma/schema.prisma`: define as cinco entidades e seus relacionamentos.
- `api/prisma/migrations/`: mantém a evolução versionável do schema SQLite.
- `api/src/database/prisma.ts`: centraliza o adaptador SQLite e a instância do Prisma Client para uso futuro.

Para executar, entre em `api/`, instale as dependências com `npm install` e use `npm run dev`. `npm run typecheck` verifica os tipos; `npm run build` compila para `dist/`; `npm start` executa o build. `api/.env.example` mostra a variável opcional de porta.

## Persistência

A camada de persistência usa Prisma ORM 7.10.0 e SQLite. A URL do banco fica em `DATABASE_URL`; o arquivo local `api/prisma/dev.db` e o client gerado são ignorados pelo Git. `npm run prisma:generate` gera o client e `npm run prisma:migrate -- --name <nome>` cria e aplica migrations em desenvolvimento.

## Endpoint disponível nesta etapa

`GET /api/health` retorna HTTP 200 e `{"status":"ok","service":"fixflow-api"}`. Ele atesta somente que a API está no ar, sem verificar banco ou outros serviços. Rotas inexistentes retornam HTTP 404 e `{"message":"Rota não encontrada."}`.

## Funcionalidades ainda planejadas

Autenticação, endpoints de usuários, solicitações e categorias, regras de negócio e upload de imagens permanecem para etapas futuras. O schema e o banco existem, mas nenhum endpoint de domínio usa a persistência nesta versão.
