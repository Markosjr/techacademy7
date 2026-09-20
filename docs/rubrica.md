# Rubrica acadêmica e estado atual

Este documento separa o que foi encontrado no repositório do que está previsto para etapas futuras. Estado atualizado em 17/09/2026. **Planejado** não significa implementado.

## Evidências atuais

- `README.md` define o objetivo, a estrutura inicial e tecnologias previstas.
- `docs/problema.md` descreve problema, público-alvo, proposta e objetivos. `docs/persona.md` define uma persona acadêmica representativa, sem alegar entrevista ou validação com cliente real.
- `docs/requisitos.md` registra requisitos planejados, critérios de aceite, escopo do MVP e rastreabilidade com a persona.
- `docs/regras-negocio.md`, `docs/modelagem-dados.md` e `docs/der.md` documentam regras, entidades e DER conceituais, ainda sem implementação de backend ou banco.
- `docs/api.md` descreve a fundação REST e o único endpoint disponível nesta etapa.
- `docs/evolucao.md` registra as etapas do produto até a fundação da API REST.
- `mobile/` contém um projeto Expo com React Native, TypeScript e Expo Router. `src/app/` contém a rota inicial e o layout; `src/components/` contém AppButton, AppInput e ScreenContainer; `src/theme/` contém tokens de cor, espaçamento e tipografia. A tela inicial é uma demonstração local temporária, sem fluxo de negócio.
- `api/` contém um servidor Express com TypeScript, configuração de porta, health check e tratamento básico de rotas inexistentes e erros. Não há Prisma, banco, autenticação ou CRUD.

## Critérios

| Critério | Estado verificado | Evidência ou entrega esperada |
| --- | --- | --- |
| Arquitetura e padronização | Parcial: fundações mobile e API implementadas | Mobile organizado em rotas, componentes e tema; API separa configuração Express, inicialização HTTP, rotas, ambiente e middlewares. Persistência e contratos de domínio ainda previstos. |
| Componentização e Clean Code | Parcial: componentes base e responsabilidades da API | AppButton, AppInput e ScreenContainer tipados; arquivos pequenos e responsabilidades separadas na API. Componentes e serviços de domínio ainda previstos. |
| CRUD completo app → API → banco | Planejado | Criar, consultar, atualizar e cancelar solicitações com persistência SQLite via Prisma e integração mobile via Axios; cancelamento lógico proposto para o Delete acadêmico. |
| Regras de negócio | Documentadas; implementação planejada | RN001–RN013 em `docs/regras-negocio.md`, incluindo perfis, propriedade, status, edição, prioridade, imagens e histórico. |
| Usabilidade, compatibilidade e segurança | Planejado | Fluxos claros, estados de carregamento e erro, validação, testes nos ambientes escolhidos e proteção das rotas e dados. |
| Contextualização e evolução do produto | Parcial: documentação ampliada | Problema em `docs/problema.md`, persona representativa em `docs/persona.md` e versões 0.1 a 0.6 em `docs/evolucao.md`; validação com cliente real ainda não realizada. |
| DER | Documentado; banco planejado | Mermaid `erDiagram` em `docs/der.md`, coerente com as cinco entidades conceituais de `docs/modelagem-dados.md`. |
| Requisitos funcionais e não funcionais | Documentados; implementação planejada | `docs/requisitos.md` contém RF001–RF015 e RNF001–RNF012, escopo e critérios verificáveis. |
| Dois diagramas de casos de uso | Planejado | Produzir dois diagramas coerentes com atores e requisitos aprovados. |
| Dois diagramas de atividades | Planejado | Produzir dois diagramas para fluxos principais aprovados. |
| Dois diagramas de sequência | Planejado | Produzir dois diagramas refletindo app, API e persistência reais. |
| Upload de imagens com Multer | Planejado | Implementar envio do app, recepção pela API e associação à solicitação. |
| Validação de extensão, tamanho e colisão de nomes | Planejado | Definir limites e formatos aceitos; aplicar validação no servidor e estratégia de nome único; cobrir rejeições. |
| Usuário ADMIN e usuário comum | Permissões documentadas; implementação planejada | Matriz `USER`/`ADMIN` em `docs/regras-negocio.md`; autenticação JWT e autorização no servidor ainda não implementadas. |
| Conexão com persona/cliente | Documentada com persona fictícia | `docs/persona.md` relaciona dores a respostas planejadas; `docs/requisitos.md` mapeia requisitos a necessidades. Falta validação com cliente real. |

## Tecnologias alvo

Mobile: React Native, Expo e TypeScript. API: Node.js, Express e TypeScript. Persistência: Prisma e SQLite. Comunicação: Axios. Autenticação: JWT. Imagens: Multer. No estado atual, as bases mobile e API estão presentes; Prisma, SQLite, Axios, JWT e Multer permanecem planejados.

Atualize esta tabela somente após verificar o artefato correspondente. Registre decisões e evidências em `docs/evolucao.md` durante as próximas etapas autorizadas.
