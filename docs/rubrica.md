# Rubrica acadêmica e estado atual

Este documento separa o que foi encontrado no repositório do que está previsto para etapas futuras. Estado atualizado em 20/09/2026. **Planejado** não significa implementado.

## Evidências atuais

- `README.md` define o objetivo, a estrutura inicial e tecnologias previstas.
- `docs/problema.md` descreve problema, público-alvo, proposta e objetivos. `docs/persona.md` define uma persona acadêmica representativa, sem alegar entrevista ou validação com cliente real.
- `docs/requisitos.md` registra requisitos planejados, critérios de aceite, escopo do MVP e rastreabilidade com a persona.
- `docs/regras-negocio.md`, `docs/modelagem-dados.md` e `docs/der.md` documentam regras, entidades e DER; schema, migrations e serviços implementam o domínio no SQLite.
- `docs/api.md` descreve autenticação, categorias e o CRUD de solicitações disponível.
- `docs/evolucao.md` registra as etapas do produto até a fundação da API REST.
- `mobile/` contém Expo Router com rotas protegidas, contexto de autenticação, Axios, armazenamento de sessão, serviços tipados e telas compartilhadas de solicitações para `USER` e `ADMIN`.
- `api/` contém servidor Express, persistência Prisma/SQLite, autenticação JWT, RBAC e serviços de solicitações.
- A API implementa cadastro `USER`, login, categorias ativas, CRUD de solicitações, propriedade, filtros, cancelamento lógico, transições administrativas, prioridade e histórico.

## Critérios

| Critério | Estado verificado | Evidência ou entrega esperada |
| --- | --- | --- |
| Arquitetura e padronização | Amplamente atendida | Mobile separa rotas, contexto, serviços, tipos, utilitários e componentes; API separa HTTP, regras e Prisma. |
| Componentização e Clean Code | Amplamente atendida | Formulário, cards, badges, seletores, botões e estados de tela são reutilizados; chamadas HTTP ficam nos serviços tipados. |
| CRUD completo app → API → banco | Implementado | Create, Read, Update e cancelamento lógico foram executados no Expo Web via Axios e confirmados no SQLite. |
| Regras de negócio | Implementadas e refletidas no mobile, exceto imagens | A interface oferece somente ações compatíveis com perfil e estado; o backend permanece como autoridade. |
| Usabilidade, compatibilidade e segurança | Parcialmente atendida | Há loading, empty, retry, validação, mensagens de API, bloqueio de envio duplicado, labels e proteção de rotas. Expo Web foi testado; Android/iOS ainda requerem validação em dispositivo. |
| Contextualização e evolução do produto | Parcial: documentação ampliada | Problema, persona e versões 0.1 a 0.8 em `docs/evolucao.md`; validação com cliente real ainda não realizada. |
| DER | Documentado e refletido no schema | Mermaid em `docs/der.md` coerente com as cinco entidades, relações e chaves implementadas no schema Prisma e na migration. |
| Requisitos funcionais e não funcionais | Documentados e atualizados | `docs/requisitos.md` contém RF001–RF015 e RNF001–RNF012; RF005 e RF015 estão implementados ponta a ponta. |
| Dois diagramas de casos de uso | Planejado | Produzir dois diagramas coerentes com atores e requisitos aprovados. |
| Dois diagramas de atividades | Planejado | Produzir dois diagramas para fluxos principais aprovados. |
| Dois diagramas de sequência | Planejado | Produzir dois diagramas refletindo app, API e persistência reais. |
| Upload de imagens com Multer | Atendido | Expo Image Picker → FormData/Axios → Multer → arquivo local → Prisma/SQLite → detalhe mobile. |
| Validação de imagens: extensão, tamanho e colisão | Atendido | Extensão e MIME restritos, assinatura binária conferida, limite de 5 MB e filename com UUID; testes A–O aprovados. |
| Validação de extensão, tamanho e colisão de nomes | Planejado | Definir limites e formatos aceitos; aplicar validação no servidor e estratégia de nome único; cobrir rejeições. |
| Usuário ADMIN e usuário comum | Implementado na API e interface | `USER` acessa pedidos próprios, criação, edição e cancelamento; `ADMIN` vê autoria e visão global, altera prioridade e avança status. |
| Conexão com persona/cliente | Documentada com persona fictícia | `docs/persona.md` relaciona dores a respostas planejadas; `docs/requisitos.md` mapeia requisitos a necessidades. Falta validação com cliente real. |

## Tecnologias alvo

Mobile: React Native, Expo e TypeScript. API: Node.js, Express e TypeScript. Persistência: Prisma e SQLite. Comunicação: Axios. Autenticação: JWT. Imagens: Expo Image Picker e Multer. Todos esses elementos estão integrados no fluxo atual.

Atualize esta tabela somente após verificar o artefato correspondente. Registre decisões e evidências em `docs/evolucao.md` durante as próximas etapas autorizadas.
