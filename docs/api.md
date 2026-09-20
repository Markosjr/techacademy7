# API FixFlow

## Objetivo e tecnologias

A API REST liga o aplicativo FixFlow à persistência SQLite. Usa Node.js, Express, TypeScript, Prisma, Zod, JWT, bcrypt e CORS. O upload com Multer ainda não faz parte desta versão.

Todas as rotas protegidas recebem `Authorization: Bearer <token>`. Entradas inválidas retornam 400; ausência ou invalidade de autenticação, 401; perfil sem permissão, 403; recurso não encontrado, 404; e violação do estado atual, 409. IDs são UUIDs, conforme o schema Prisma.

## Endpoints implementados

| Método | Rota | Autenticação e perfil | Objetivo |
| --- | --- | --- | --- |
| `GET` | `/api/health` | Público | Confirmar que o servidor HTTP está ativo. |
| `POST` | `/api/auth/register` | Público | Criar conta com perfil `USER`. |
| `POST` | `/api/auth/login` | Público | Validar credenciais e emitir JWT. |
| `GET` | `/api/auth/me` | `USER` ou `ADMIN` | Retornar dados públicos do usuário autenticado. |
| `GET` | `/api/admin/check` | `ADMIN` | Comprovar autorização administrativa. |
| `GET` | `/api/categories` | `USER` ou `ADMIN` | Listar categorias ativas em ordem alfabética. |
| `POST` | `/api/requests` | `USER` | Criar solicitação própria em `ABERTA`. |
| `GET` | `/api/requests` | `USER` ou `ADMIN` | Listar próprias solicitações para `USER` e todas para `ADMIN`. |
| `GET` | `/api/requests/:id` | `USER` proprietário ou `ADMIN` | Consultar detalhes, categoria, criador público, imagens e histórico. |
| `PATCH` | `/api/requests/:id` | `USER` proprietário | Alterar título, descrição, categoria ou prioridade enquanto `ABERTA`. |
| `PATCH` | `/api/requests/:id/cancel` | `USER` proprietário | Cancelar logicamente pedido em `ABERTA` ou `EM_ANALISE`. |
| `PATCH` | `/api/requests/:id/status` | `ADMIN` | Executar a próxima transição administrativa permitida. |
| `PATCH` | `/api/requests/:id/priority` | `ADMIN` | Ajustar prioridade de pedido não finalizado. |

`GET /api/requests` aceita os filtros opcionais `status`, `priority` e `categoryId`. Os filtros respeitam o mesmo escopo: um `USER` nunca amplia a consulta além das próprias solicitações. A consulta por ID de uma solicitação alheia retorna 404 para não revelar sua existência.

## CRUD principal

- **Create:** `POST /api/requests` valida título, descrição, prioridade e categoria ativa. Autoria e status `ABERTA` vêm do servidor. Solicitação e evento inicial de histórico são gravados atomicamente.
- **Read:** listagem e detalhes aplicam propriedade para `USER`; `ADMIN` pode consultar todas. Seleções públicas nunca retornam `passwordHash`.
- **Update:** `PATCH /api/requests/:id` aceita somente título, descrição, categoria e prioridade do próprio pedido `ABERTA`. Os endpoints administrativos separados controlam status e prioridade.
- **Cancelamento lógico:** `PATCH /api/requests/:id/cancel` muda o status para `CANCELADA`, preenche `canceledAt` e gera histórico na mesma transação.

Não existe `DELETE /api/requests/:id`. O projeto preserva solicitação, relações e histórico para rastreabilidade; o cancelamento lógico representa a remoção no CRUD acadêmico.

## Máquina de estados e histórico

O `ADMIN` pode executar somente `ABERTA → EM_ANALISE → EM_ANDAMENTO → CONCLUIDA`. O `USER` proprietário pode executar `ABERTA → CANCELADA` ou `EM_ANALISE → CANCELADA` pelo endpoint de cancelamento. `CONCLUIDA` e `CANCELADA` são terminais.

Cada criação, cancelamento ou transição administrativa gera `StatusHistory` com responsável, data, status anterior, novo status e observação. No evento inicial, `previousStatus` é nulo. A entrada em `CONCLUIDA` preenche `completedAt`; o cancelamento preenche `canceledAt`.

## Persistência e dados iniciais

O schema está em `api/prisma/schema.prisma`, as migrations em `api/prisma/migrations/` e o acesso compartilhado em `api/src/database/prisma.ts`. `npm run db:seed` mantém as cinco categorias iniciais e configura um `ADMIN` opcional somente quando as três variáveis de seed são fornecidas.

O banco local, o Prisma Client gerado e credenciais de ambiente não são versionados. Imagens aparecem como relação vazia nos detalhes até a etapa futura de upload.

## Consumo pelo mobile

O aplicativo centraliza o endereço em `EXPO_PUBLIC_API_URL` e envia o JWT por Axios. Para Expo Web no mesmo computador, pode-se usar `http://localhost:3333/api`; em dispositivo físico, deve-se usar o IP local alcançável do computador, pois `localhost` apontaria para o próprio celular. Nenhum IP pessoal fica no código versionado.

No navegador, a API aceita origens configuradas em `CORS_ORIGIN`, separadas por vírgula. O valor de desenvolvimento documentado contempla as portas 8081 e 8088. A proteção real continua no Express por autenticação, propriedade e RBAC, independentemente dos controles visuais do aplicativo.
