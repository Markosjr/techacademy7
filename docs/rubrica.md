# Rubrica acadêmica e estado atual

Este documento separa o que foi encontrado no repositório do que está previsto para etapas futuras. Estado atualizado em 17/09/2026. **Planejado** não significa implementado.

## Evidências atuais

- `README.md` define o objetivo, a estrutura inicial e tecnologias previstas.
- `docs/problema.md` descreve problema, público-alvo, proposta e objetivos. A persona/cliente específico ainda precisa ser definido e validado.
- `docs/evolucao.md` registra a concepção do produto.
- `mobile/` contém um projeto Expo com React Native, TypeScript e Expo Router. `src/app/` contém a rota inicial e o layout; `src/components/` contém AppButton, AppInput e ScreenContainer; `src/theme/` contém tokens de cor, espaçamento e tipografia. A tela inicial é uma demonstração local temporária, sem fluxo de negócio.
- `api/` contém somente `.gitkeep`. Não há API, modelo Prisma ou banco implementados no repositório.

## Critérios

| Critério | Estado verificado | Evidência ou entrega esperada |
| --- | --- | --- |
| Arquitetura e padronização | Parcial: fundação mobile implementada | Rotas em `mobile/src/app/`, componentes em `mobile/src/components/` e tokens em `mobile/src/theme/`; API e contratos entre camadas ainda previstos. |
| Componentização e Clean Code | Parcial: componentes base implementados | AppButton, AppInput e ScreenContainer tipados e reutilizáveis; componentes de domínio ainda previstos. |
| CRUD completo app → API → banco | Planejado | Criar, consultar, atualizar e excluir solicitações com persistência SQLite via Prisma e integração mobile via Axios. |
| Regras de negócio | Planejado | Definir regras de solicitação, status, prioridade e permissões antes da implementação; validar na API. |
| Usabilidade, compatibilidade e segurança | Planejado | Fluxos claros, estados de carregamento e erro, validação, testes nos ambientes escolhidos e proteção das rotas e dados. |
| Contextualização e evolução do produto | Parcial | Problema e objetivos em `docs/problema.md`; versões 0.1 a 0.3 em `docs/evolucao.md`; aprofundar vínculo com persona/cliente. |
| DER | Planejado | Elaborar diagrama consistente com o modelo de dados efetivamente definido. |
| Requisitos funcionais e não funcionais | Planejado | Documentar requisitos identificados, identificadores, prioridades e critérios verificáveis. |
| Dois diagramas de casos de uso | Planejado | Produzir dois diagramas coerentes com atores e requisitos aprovados. |
| Dois diagramas de atividades | Planejado | Produzir dois diagramas para fluxos principais aprovados. |
| Dois diagramas de sequência | Planejado | Produzir dois diagramas refletindo app, API e persistência reais. |
| Upload de imagens com Multer | Planejado | Implementar envio do app, recepção pela API e associação à solicitação. |
| Validação de extensão, tamanho e colisão de nomes | Planejado | Definir limites e formatos aceitos; aplicar validação no servidor e estratégia de nome único; cobrir rejeições. |
| Usuário ADMIN e usuário comum | Planejado | Definir permissões por perfil, autenticação JWT e aplicar autorização no servidor. |
| Conexão com persona/cliente | Parcial | Público-alvo genérico descrito; explicitar persona/cliente e mostrar como necessidades orientam requisitos e telas. |

## Tecnologias alvo

Mobile: React Native, Expo e TypeScript. API: Node.js, Express e TypeScript. Persistência: Prisma e SQLite. Comunicação: Axios. Autenticação: JWT. Imagens: Multer. No estado atual, apenas a base mobile Expo/React Native/TypeScript está presente; as demais tecnologias são escolhas previstas, não entregas concluídas.

Atualize esta tabela somente após verificar o artefato correspondente. Registre decisões e evidências em `docs/evolucao.md` durante as próximas etapas autorizadas.
