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
- `api/src/controllers/`, `services/` e `schemas/`: separam HTTP, autenticação e validação de entrada.
- `api/src/middlewares/authenticate.ts` e `authorize.ts`: validam JWT, consultam o usuário atual e aplicam RBAC.
- `api/prisma/schema.prisma`: define as cinco entidades e seus relacionamentos.
- `api/prisma/migrations/`: mantém a evolução versionável do schema SQLite.
- `api/src/database/prisma.ts`: centraliza o adaptador SQLite e a instância do Prisma Client para uso futuro.

Para executar, entre em `api/`, instale as dependências com `npm install` e use `npm run dev`. `npm run typecheck` verifica os tipos; `npm run build` compila para `dist/`; `npm start` executa o build. `api/.env.example` mostra a variável opcional de porta.

## Persistência

A camada de persistência usa Prisma ORM 7.10.0 e SQLite. A URL do banco fica em `DATABASE_URL`; o arquivo local `api/prisma/dev.db` e o client gerado são ignorados pelo Git. `npm run prisma:generate` gera o client e `npm run prisma:migrate -- --name <nome>` cria e aplica migrations em desenvolvimento.

## Endpoint disponível nesta etapa

`GET /api/health` retorna HTTP 200 e `{"status":"ok","service":"fixflow-api"}`. Ele atesta somente que a API está no ar, sem verificar banco ou outros serviços. Rotas inexistentes retornam HTTP 404 e `{"message":"Rota não encontrada."}`.

## Autenticação e autorização implementadas

| Método e caminho | Acesso | Finalidade |
| --- | --- | --- |
| `POST /api/auth/register` | Público | Valida nome, e-mail e senha, normaliza o e-mail, cria sempre um `USER` e retorna HTTP 201 sem o hash. |
| `POST /api/auth/login` | Público | Valida credenciais e retorna JWT e dados públicos do usuário. Falhas usam mensagem genérica e HTTP 401. |
| `GET /api/auth/me` | Bearer JWT | Consulta e retorna os dados atuais do usuário autenticado. |
| `GET /api/admin/check` | Bearer JWT de `ADMIN` | Demonstra autorização por perfil; `USER` recebe HTTP 403. |

Senhas são armazenadas com bcrypt, e `JWT_SECRET` é obrigatório com pelo menos 32 caracteres. `JWT_EXPIRES_IN` tem padrão de uma hora. Embora o token contenha o perfil, o middleware consulta o usuário no banco e usa o perfil atual persistido para autorizar a requisição.

## Dados iniciais

`npm run db:seed` compila e executa um seed idempotente para as categorias Elétrica, Hidráulica, Equipamentos, Infraestrutura e Outros. Um `ADMIN` de desenvolvimento é criado ou atualizado somente quando `SEED_ADMIN_NAME`, `SEED_ADMIN_EMAIL` e `SEED_ADMIN_PASSWORD` estão preenchidos no ambiente; nenhuma credencial é versionada.

## Funcionalidades ainda planejadas

Endpoints de solicitações e categorias, regras de negócio do atendimento, upload de imagens e integração mobile permanecem para etapas futuras. Não há CRUD de solicitações nesta versão.
