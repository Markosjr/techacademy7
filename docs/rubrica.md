# Rubrica acadêmica e estado atual

Este documento separa o que foi encontrado no repositório do que está previsto para etapas futuras. Estado atualizado em 20/09/2026. **Planejado** não significa implementado.

## Evidências atuais

- `README.md` define o objetivo, a estrutura inicial e tecnologias previstas.
- `docs/problema.md` descreve problema, público-alvo, proposta e objetivos. `docs/persona.md` define uma persona acadêmica representativa, sem alegar entrevista ou validação com cliente real.
- `docs/requisitos.md` registra requisitos planejados, critérios de aceite, escopo do MVP e rastreabilidade com a persona.
- `docs/regras-negocio.md`, `docs/modelagem-dados.md` e `docs/der.md` documentam regras, entidades e DER; o schema Prisma e a migration SQLite implementam a estrutura, ainda sem regras de domínio em código.
- `docs/api.md` descreve a fundação REST e o único endpoint disponível nesta etapa.
- `docs/evolucao.md` registra as etapas do produto até a fundação da API REST.
- `mobile/` contém um projeto Expo com React Native, TypeScript e Expo Router. `src/app/` contém a rota inicial e o layout; `src/components/` contém AppButton, AppInput e ScreenContainer; `src/theme/` contém tokens de cor, espaçamento e tipografia. A tela inicial é uma demonstração local temporária, sem fluxo de negócio.
- `api/` contém servidor Express, persistência Prisma/SQLite, autenticação JWT e RBAC básico. Não há endpoints ou CRUD de solicitações.
- A API implementa cadastro `USER`, login com JWT, `/auth/me`, autorização por perfil, rota de prova administrativa e seed idempotente de categorias com `ADMIN` opcional.

## Critérios

| Critério | Estado verificado | Evidência ou entrega esperada |
| --- | --- | --- |
| Arquitetura e padronização | Parcial: fundações mobile, API e persistência | Mobile organizado em rotas, componentes e tema; API separa HTTP, rotas, ambiente, middlewares e acesso central ao Prisma. Contratos e serviços de domínio ainda previstos. |
| Componentização e Clean Code | Parcial: componentes base e responsabilidades da API | AppButton, AppInput e ScreenContainer tipados; arquivos pequenos e responsabilidades separadas na API. Componentes e serviços de domínio ainda previstos. |
| CRUD completo app → API → banco | Banco preparado; fluxo planejado | SQLite e entidades existem via Prisma, mas não há endpoints, operações CRUD ou integração mobile via Axios. |
| Regras de negócio | Autenticação parcialmente implementada | RN001, RN002, RN003 e RN013 possuem evidência na API; propriedade, status, edição, prioridade, imagens e histórico continuam planejados. |
| Usabilidade, compatibilidade e segurança | Planejado | Fluxos claros, estados de carregamento e erro, validação, testes nos ambientes escolhidos e proteção das rotas e dados. |
| Contextualização e evolução do produto | Parcial: documentação ampliada | Problema, persona e versões 0.1 a 0.8 em `docs/evolucao.md`; validação com cliente real ainda não realizada. |
| DER | Documentado e refletido no schema | Mermaid em `docs/der.md` coerente com as cinco entidades, relações e chaves implementadas no schema Prisma e na migration. |
| Requisitos funcionais e não funcionais | Documentados; implementação planejada | `docs/requisitos.md` contém RF001–RF015 e RNF001–RNF012, escopo e critérios verificáveis. |
| Dois diagramas de casos de uso | Planejado | Produzir dois diagramas coerentes com atores e requisitos aprovados. |
| Dois diagramas de atividades | Planejado | Produzir dois diagramas para fluxos principais aprovados. |
| Dois diagramas de sequência | Planejado | Produzir dois diagramas refletindo app, API e persistência reais. |
| Upload de imagens com Multer | Planejado | Implementar envio do app, recepção pela API e associação à solicitação. |
| Validação de extensão, tamanho e colisão de nomes | Planejado | Definir limites e formatos aceitos; aplicar validação no servidor e estratégia de nome único; cobrir rejeições. |
| Usuário ADMIN e usuário comum | Base funcional na API; domínio e mobile pendentes | Cadastro público cria `USER`; JWT identifica ambos os perfis; `USER` recebe 403 e `ADMIN` recebe 200 em rota administrativa. Ainda faltam operações reais de solicitações e integração mobile. |
| Conexão com persona/cliente | Documentada com persona fictícia | `docs/persona.md` relaciona dores a respostas planejadas; `docs/requisitos.md` mapeia requisitos a necessidades. Falta validação com cliente real. |

## Tecnologias alvo

Mobile: React Native, Expo e TypeScript. API: Node.js, Express e TypeScript. Persistência: Prisma e SQLite. Comunicação: Axios. Autenticação: JWT. Imagens: Multer. No estado atual, as bases mobile e API, persistência e autenticação JWT no backend estão presentes; Axios, integração mobile e Multer permanecem planejados.

Atualize esta tabela somente após verificar o artefato correspondente. Registre decisões e evidências em `docs/evolucao.md` durante as próximas etapas autorizadas.
