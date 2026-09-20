# Rubrica acadêmica e estado atual

Este documento separa o que foi encontrado no repositório do que está previsto para etapas futuras. Estado atualizado em 20/09/2026. **Planejado** não significa implementado.

## Evidências atuais

- `README.md` define o objetivo, a estrutura inicial e tecnologias previstas.
- `docs/problema.md` descreve problema, público-alvo, proposta e objetivos. `docs/persona.md` define uma persona acadêmica representativa, sem alegar entrevista ou validação com cliente real.
- `docs/requisitos.md` registra requisitos planejados, critérios de aceite, escopo do MVP e rastreabilidade com a persona.
- `docs/regras-negocio.md`, `docs/modelagem-dados.md` e `docs/der.md` documentam regras, entidades e DER; schema, migrations e serviços implementam o domínio no SQLite.
- `docs/api.md` descreve autenticação, categorias e o CRUD de solicitações disponível.
- `docs/evolucao.md` registra as etapas do produto até a fundação da API REST.
- `mobile/` contém um projeto Expo com React Native, TypeScript e Expo Router. `src/app/` contém a rota inicial e o layout; `src/components/` contém AppButton, AppInput e ScreenContainer; `src/theme/` contém tokens de cor, espaçamento e tipografia. A tela inicial é uma demonstração local temporária, sem fluxo de negócio.
- `api/` contém servidor Express, persistência Prisma/SQLite, autenticação JWT, RBAC e serviços de solicitações.
- A API implementa cadastro `USER`, login, categorias ativas, CRUD de solicitações, propriedade, filtros, cancelamento lógico, transições administrativas, prioridade e histórico.

## Critérios

| Critério | Estado verificado | Evidência ou entrega esperada |
| --- | --- | --- |
| Arquitetura e padronização | Parcial: backend estruturado e fundação mobile | API separa rotas, controllers, schemas, serviços e Prisma; integração e apresentação do domínio no mobile ainda pendentes. |
| Componentização e Clean Code | Parcial: componentes base e serviços de domínio | Mobile possui componentes base; API mantém controllers simples e concentra validação e regras nos schemas e serviços. |
| CRUD completo app → API → banco | Backend + banco implementados; app pendente | Create, Read, Update e cancelamento lógico funcionam por API e SQLite; o mobile ainda não consome os endpoints com Axios. |
| Regras de negócio | Implementadas no backend, exceto imagens | Propriedade, categoria ativa, edição, cancelamento, status, prioridade, histórico, autorização e proteção do hash foram verificadas; upload permanece planejado. |
| Usabilidade, compatibilidade e segurança | Planejado | Fluxos claros, estados de carregamento e erro, validação, testes nos ambientes escolhidos e proteção das rotas e dados. |
| Contextualização e evolução do produto | Parcial: documentação ampliada | Problema, persona e versões 0.1 a 0.8 em `docs/evolucao.md`; validação com cliente real ainda não realizada. |
| DER | Documentado e refletido no schema | Mermaid em `docs/der.md` coerente com as cinco entidades, relações e chaves implementadas no schema Prisma e na migration. |
| Requisitos funcionais e não funcionais | Documentados; implementação planejada | `docs/requisitos.md` contém RF001–RF015 e RNF001–RNF012, escopo e critérios verificáveis. |
| Dois diagramas de casos de uso | Planejado | Produzir dois diagramas coerentes com atores e requisitos aprovados. |
| Dois diagramas de atividades | Planejado | Produzir dois diagramas para fluxos principais aprovados. |
| Dois diagramas de sequência | Planejado | Produzir dois diagramas refletindo app, API e persistência reais. |
| Upload de imagens com Multer | Planejado | Implementar envio do app, recepção pela API e associação à solicitação. |
| Validação de extensão, tamanho e colisão de nomes | Planejado | Definir limites e formatos aceitos; aplicar validação no servidor e estratégia de nome único; cobrir rejeições. |
| Usuário ADMIN e usuário comum | Funcional no backend; interface mobile pendente | Rotas de domínio aplicam propriedade do `USER`, visão global e operações específicas do `ADMIN`; diferenciação na interface ainda será implementada. |
| Conexão com persona/cliente | Documentada com persona fictícia | `docs/persona.md` relaciona dores a respostas planejadas; `docs/requisitos.md` mapeia requisitos a necessidades. Falta validação com cliente real. |

## Tecnologias alvo

Mobile: React Native, Expo e TypeScript. API: Node.js, Express e TypeScript. Persistência: Prisma e SQLite. Comunicação: Axios. Autenticação: JWT. Imagens: Multer. No estado atual, bases mobile e API, persistência, autenticação e CRUD do backend estão presentes; Axios, integração mobile e Multer permanecem planejados.

Atualize esta tabela somente após verificar o artefato correspondente. Registre decisões e evidências em `docs/evolucao.md` durante as próximas etapas autorizadas.
