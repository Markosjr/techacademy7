# Evolução do Produto

Este documento registra a evolução do desenvolvimento do FixFlow.

---

## Versão 0.1 - Concepção do Produto

### Situação

Início do desenvolvimento.

### Problema

Foi identificada a necessidade de centralizar o registro e
acompanhamento das solicitações de manutenção.

### Definições realizadas

Nesta etapa foram definidos:

- problema a ser solucionado;
- público-alvo;
- proposta do aplicativo;
- objetivo principal;
- funcionalidades iniciais;
- tecnologias previstas;
- estrutura inicial do projeto.

### Tecnologias planejadas

Mobile:

- React Native
- Expo
- TypeScript

Backend:

- Node.js
- Express
- TypeScript

Persistência:

- Prisma
- SQLite

### Próxima etapa

Criar a aplicação React Native e estruturar a arquitetura inicial
do projeto mobile.

---

## Versão 0.2 - Base mobile e planejamento acadêmico

### Situação verificada em 17/09/2026

- A aplicação Expo com React Native e TypeScript existe em `mobile/`.
- As telas atuais ainda são exemplos do template Expo; não representam funcionalidades do FixFlow.
- `api/` contém apenas `.gitkeep`; API e banco de dados ainda não foram implementados.
- Foram criados `AGENTS.md`, `docs/rubrica.md` e `docs/roadmap.md` para orientar o trabalho incremental e registrar a diferença entre entregas existentes e planejadas.

### Próxima etapa prevista

Definir a persona/cliente, os requisitos e as regras de negócio em uma etapa futura autorizada pelo usuário. O roadmap não autoriza implementação antecipada.

---

## Versão 0.3 - Arquitetura e fundação do mobile

### Estrutura implementada

- Expo Router preservado; `mobile/src/app/` agora contém apenas a rota inicial e o layout de navegação.
- `mobile/src/components/` recebeu AppButton, AppInput e ScreenContainer, separados em implementação e estilos.
- `mobile/src/theme/` concentra cores, espaçamentos e tipografia reutilizáveis.
- A tela inicial temporária apresenta o FixFlow e demonstra o campo e o botão com uma interação local para limpar o texto, sem navegação ou comunicação externa.
- Rotas, componentes, hooks, estilos e constantes usados apenas pela demonstração inicial do template foram removidos. Assets e configuração Expo foram preservados.

### Validações

- `npx tsc --noEmit`: aprovado.
- `npm run lint`: não concluído; o projeto não possui configuração ESLint e o comando tentou configurá-la automaticamente, mas falhou por acesso à rede (`EACCES`).
- `npx expo start --offline --port 8088`: Metro iniciou e identificou `src/app` como raiz das rotas; servidor encerrado após a verificação.

### Próxima etapa prevista

Definir persona/cliente, cenários, requisitos e regras de negócio antes de desenvolver funcionalidades de domínio.

---

## Versão 0.4 - Definição da persona e requisitos

### Objetivo

Formalizar o perfil de quem registra solicitações, o papel administrativo e o escopo do MVP antes de implementar fluxos de negócio.

### Documentos e decisões

- `docs/persona.md` apresenta uma persona acadêmica fictícia, sua jornada e as necessidades do responsável pelo gerenciamento. Não foram realizadas entrevistas nem validação com cliente real.
- `docs/requisitos.md` registra requisitos funcionais e não funcionais planejados, critérios de aceite, estados previstos e rastreabilidade com a persona.
- O CRUD acadêmico principal será o de solicitação de manutenção. O cancelamento controlado foi proposto como ação equivalente à remoção pelo usuário para preservar o histórico; a decisão depende das regras de negócio e da validação acadêmica posterior.
- Chat, notificações push, geolocalização e demais ideias listadas como fora de escopo não integram o MVP.

### Relação com a rubrica

Esta etapa produz evidências documentais de contextualização e evolução, requisitos funcionais e não funcionais e conexão da solução com a persona. Não implementa funcionalidades nem diagramas.

### Próxima etapa prevista

Detalhar regras de negócio e modelagem de dados, incluindo estados, permissões e DER.

---

## Versão 0.5 - Regras de negócio e modelagem de dados

### Objetivo e entregas

- `docs/regras-negocio.md` formaliza 13 regras planejadas para perfis, propriedade, criação, edição, cancelamento, prioridade, imagens, segurança e histórico.
- `docs/modelagem-dados.md` define conceitualmente User, Category, MaintenanceRequest, RequestImage e StatusHistory, seus campos, chaves e relacionamentos.
- `docs/der.md` apresenta o DER em Mermaid com as cinco entidades e suas cardinalidades.
- `docs/requisitos.md` foi ajustado para refletir as decisões agora definidas de prioridade inicial, edição, cancelamento, imagens e transições de status.

### Decisões de modelagem

O cancelamento representa remoção lógica e preserva o pedido. Category padroniza a classificação; RequestImage separa metadados do arquivo; StatusHistory registra transições e responsáveis. Mudanças de status somente seguem a tabela de `docs/regras-negocio.md`.

### Relação com a rubrica e estado

Há evidência documental para regras de negócio, DER, requisitos e evolução do produto. Nenhuma regra, entidade ou transição foi implementada em código. API, Prisma, SQLite, autenticação e CRUD continuam planejados.

### Próxima etapa prevista

Criar a fundação da API e da persistência conforme os documentos, quando houver autorização específica.

---

## Versão 0.6 - Fundação da API REST

### Objetivo e estrutura

- `api/` recebeu um projeto Node.js com Express, TypeScript, `dotenv` e `tsx`.
- `src/app.ts` configura a aplicação; `src/server.ts` inicia o HTTP; `src/routes/` reúne as rotas; `src/middlewares/` trata 404 e erros; `src/config/` valida a porta.
- `GET /api/health` confirma somente que o servidor está ativo. Uma rota inexistente recebe JSON com HTTP 404; o middleware de erro responde em JSON sem expor stack trace ao cliente.
- `docs/api.md` descreve a estrutura e o endpoint disponível.

### Validações

- `npm run typecheck` e `npm run build` passaram.
- O build iniciou com `npm start`; `GET /api/health` respondeu HTTP 200 com `{"status":"ok","service":"fixflow-api"}` e a rota inexistente respondeu HTTP 404 com `{"message":"Rota não encontrada."}`.
- `npm run dev` iniciou com um ajuste temporário no ambiente de teste para contornar falha de `os.userInfo()` do Node neste sandbox Windows; as mesmas respostas 200 e 404 foram verificadas. O ajuste não foi incorporado ao projeto.

### Escopo e próxima etapa

Não foram criados banco, Prisma, autenticação, regras de solicitação, CRUD ou integração mobile. A próxima etapa lógica é a persistência com Prisma e SQLite, mediante autorização específica.

---

## Versão 0.7 - Persistência com Prisma e SQLite

### Estrutura implementada

- Prisma ORM e Prisma Client 7.10.0 adicionados com o adaptador oficial para SQLite.
- `api/prisma/schema.prisma` implementa User, Category, MaintenanceRequest, RequestImage e StatusHistory, incluindo enums, chaves, relações e restrições estruturais.
- A migration `initial_schema` criou as cinco tabelas e índices; o banco local fica em `api/prisma/dev.db` e é ignorado pelo Git.
- `api/src/database/prisma.ts` centraliza a instância do Prisma Client para futuros módulos.
- Relações usam exclusão restritiva para preservar solicitações e histórico. Enums Prisma são armazenados como texto no SQLite.

### Validações

- `prisma format`, `prisma validate` e `prisma generate`: aprovados.
- `prisma migrate dev --name initial_schema`: migration criada e aplicada.
- As tabelas User, Category, MaintenanceRequest, RequestImage e StatusHistory foram confirmadas por leitura do catálogo SQLite.
- Uma consulta de contagem com o Prisma Client conectou ao banco e retornou zero usuários, sem inserir dados.
- `npm run typecheck` e `npm run build`: aprovados.
- `GET /api/health`: continuou respondendo HTTP 200 com `{"status":"ok","service":"fixflow-api"}`.

### Escopo e próxima etapa

Não foram implementados seed, cadastro, autenticação, endpoints, CRUD, regras de transição, upload ou integração mobile. A próxima etapa sugerida é autenticação e autorização na API, mediante autorização específica.

---

## Versão 0.8 - Autenticação e autorização

### Entregas

- Cadastro público cria somente `USER`, valida nome, e-mail e senha, normaliza o e-mail e armazena hash bcrypt.
- Login retorna JWT com expiração configurável e dados públicos do usuário; falhas não distinguem e-mail de senha incorreta.
- Middleware de autenticação valida Bearer token e consulta identidade e perfil atuais no banco.
- `GET /api/auth/me` retorna o usuário autenticado sem `passwordHash`.
- Middleware de autorização protege `GET /api/admin/check`; `USER` recebe 403 e `ADMIN` recebe 200.
- Seed idempotente cria cinco categorias e aceita criação opcional de `ADMIN` por variáveis de ambiente, sem credenciais versionadas.

### Validações

Foram verificados cadastro válido (201), payload inválido (400), e-mail repetido (409), login válido (200), login inválido (401), `/me` sem token (401), `/me` com `USER` (200), rota administrativa com `USER` (403) e com `ADMIN` (200). O banco confirmou papéis `USER`/`ADMIN`, cinco categorias sem duplicação e hashes bcrypt válidos. `npm run typecheck`, `npm run build`, `npm run db:seed`, Prisma validate/generate e o health check também passaram.

### Escopo e próxima etapa

Não foram implementados CRUD de solicitações, regras de status, upload, integração mobile, refresh token ou recuperação de senha. A próxima etapa sugerida é o CRUD de solicitações na API com as regras já documentadas.

---

## Versão 0.9 - CRUD e regras de negócio das solicitações

### Entregas

- A API passou a criar, listar, detalhar e editar solicitações e a realizar cancelamento lógico, com persistência Prisma/SQLite.
- `USER` cria e consulta apenas pedidos próprios, edita dados permitidos somente em `ABERTA` e cancela em `ABERTA` ou `EM_ANALISE`; consulta alheia por ID retorna 404.
- `ADMIN` consulta todos os pedidos, avança somente `ABERTA → EM_ANALISE → EM_ANDAMENTO → CONCLUIDA` e ajusta prioridade apenas antes de estado terminal.
- Categorias ativas são listadas e validadas na criação e edição. Filtros por status, prioridade e categoria respeitam o alcance de cada perfil.
- Criação, cancelamento e mudança administrativa de status geram histórico com responsável e data. Operações compostas usam transação Prisma; `completedAt` e `canceledAt` acompanham os respectivos estados.
- O primeiro histórico usa `previousStatus` nulo, exigindo uma migration pequena e coerente com a semântica do evento de criação.

### Validações

Foram aprovados os cenários A–P definidos para autenticação, propriedade, edição, cancelamento, autorização administrativa, máquina de estados e prioridade. Também foram conferidos filtros, rejeição de campos protegidos, histórico cronológico, ausência de `passwordHash`, relação vazia de imagens e persistência direta de autoria, categoria, histórico e datas no SQLite. `npm run typecheck`, `npm run build`, `npx prisma validate`, seed, autenticação existente e `GET /api/health` passaram.

### Escopo e próxima etapa

Não foram alterados o mobile nem o fluxo de imagens. A próxima etapa é integrar React Native à autenticação e ao CRUD da API usando Axios; upload com Multer permanece para incremento posterior.

---

## Versão 1.0 - Integração mobile com API e CRUD

### Entregas

- Expo Router organiza grupos públicos e autenticados, com proteção baseada na sessão atual.
- React Context oferece cadastro, login, restauração via `/auth/me` e logout. O JWT usa SecureStore em Android/iOS e localStorage no desenvolvimento web.
- Axios centraliza `EXPO_PUBLIC_API_URL` e o Bearer token; serviços separados implementam autenticação, categorias e solicitações.
- O aplicativo oferece home por perfil, listagem com filtros, criação, detalhes, edição e cancelamento para `USER`.
- A mesma listagem e os mesmos detalhes permitem ao `ADMIN` consultar todos os pedidos, identificar o criador, ajustar prioridade e executar apenas a próxima transição válida.
- Componentes reutilizáveis apresentam formulário, cards, badges, seletores e estados de loading, vazio e erro. Datas e rótulos amigáveis ficam centralizados.
- A API recebeu CORS configurável por `CORS_ORIGIN`, necessário para o consumo pelo Expo Web, sem mudança nas regras de negócio.

### Testes

No Expo Web foram verificados os cenários A–T: redirecionamento sem sessão, cadastro, login, restauração após recarga, logout, criação, listagem, detalhes, edição, cancelamento, ausência de controles administrativos para `USER`, identificação de `ADMIN`, visão global, criador, três avanços de status, histórico, prioridade e ausência de ações em estado terminal. Credenciais inválidas exibiram mensagem da API sem quebrar a aplicação.

A criação e a edição realizadas pela interface passaram por Axios, Express, `MaintenanceRequestService`, Prisma e SQLite. Consultas diretas ao banco confirmaram o registro inicial e depois o novo título e a prioridade alterada. TypeScript e lint do mobile e typecheck e build da API foram aprovados.

### Escopo e próxima etapa

Upload e exibição de imagens continuam ausentes. A próxima etapa planejada é implementar Multer e validar extensão, MIME, conteúdo, tamanho e colisão de nomes.
