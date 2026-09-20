# Roadmap incremental do FixFlow

Este plano organiza entregas possíveis, sem autorizar sua implementação antecipada. Cada etapa de código ou diagrama depende de pedido específico do usuário. Os limites e critérios abaixo poderão ser ajustados quando requisitos e persona forem definidos.

## Ponto de partida — concluído

- Problema, público-alvo genérico, proposta e objetivos registrados em `docs/problema.md`.
- Base React Native + Expo + TypeScript criada em `mobile/`.
- Fundação da API REST implementada em `api/` com Express e TypeScript, rota de saúde e tratamento básico de 404/erros. A persistência SQLite existe, mas endpoints de domínio ainda não.
- Rubrica, roadmap e orientações de trabalho documentados.
- Mobile integrado: Expo Router protege grupos autenticados, React Context restaura a sessão, Axios centraliza a API e telas compartilhadas entregam autenticação e CRUD para `USER` e `ADMIN`.
- Persona acadêmica e requisitos do MVP documentados em `docs/persona.md` e `docs/requisitos.md`. Não houve validação com cliente real nem implementação dos fluxos.
- Regras, cinco entidades e DER documentados; schema Prisma e migrations SQLite correspondem à modelagem.
- Cadastro, login, restauração e logout estão implementados no mobile e na API, com JWT persistido em SecureStore no ambiente nativo e localStorage na web.
- CRUD de solicitações, propriedade, filtros, cancelamento lógico, prioridade administrativa, máquina de estados e histórico estão integrados entre mobile, API e SQLite.

## Etapas do produto

| Etapa | Entrega pretendida | Critério para considerá-la concluída |
| --- | --- | --- |
| 1. Produto e requisitos — documentação concluída | Persona representativa, jornada, escopo do MVP e requisitos funcionais e não funcionais em `docs/persona.md` e `docs/requisitos.md`. | Documento rastreável ao problema; validação com cliente real ainda não realizada. |
| 2. Modelagem e regras — documentação concluída | Regras de prioridade, edição, cancelamento e status; entidades, relacionamentos, perfis e DER em `docs/regras-negocio.md`, `docs/modelagem-dados.md` e `docs/der.md`. | Documentos conceituais consistentes com os requisitos; implementação ainda prevista. |
| 3. Fundação da API — concluída | Node.js, Express e TypeScript; rota `GET /api/health`, 404 e middleware de erro. | Typecheck e build passaram; respostas 200 e 404 verificadas localmente. |
| 4. Persistência — concluída | Prisma 7.10.0, SQLite, schema das cinco entidades, migration inicial e Prisma Client centralizado. | Schema validado, migration aplicada, tabelas e consulta do client verificadas. |
| 5. Autenticação e autorização da API — concluída | Cadastro público `USER`, login, JWT, `/auth/me`, RBAC e `ADMIN` opcional por seed; categorias iniciais idempotentes. | Cenários 201, 400, 401, 403 e 409 verificados; `ADMIN` autorizado no servidor. Integração mobile ainda prevista. |
| 6. Solicitações ponta a ponta — concluída | Autenticação e CRUD acadêmico no mobile, API e SQLite, com propriedade, autorização, cancelamento lógico, prioridade, máquina de estados e histórico. | Fluxos `USER` e `ADMIN` verificados pelo Expo Web; criação e edição pelo app confirmadas diretamente no SQLite. |
| 7. Imagens | Upload com Multer e vínculo com solicitações; validação de extensão, tamanho e nomes sem colisão. | Upload válido funciona; arquivos inválidos e excessivos são rejeitados; nomes não sobrescrevem arquivos. |
| 8. Experiência e segurança | Refinar navegação, feedback, erros, acessibilidade, compatibilidade e proteção de dados. | Fluxos principais verificados nos ambientes escolhidos e falhas tratadas. |
| 9. Documentação acadêmica | Dois diagramas de casos de uso, dois de atividades e dois de sequência; revisar DER, requisitos e evolução. | Diagramas e documentos refletem o comportamento efetivamente entregue. |

## Regra de acompanhamento

Antes de cada incremento, verificar o estado real do repositório e confirmar o escopo pedido. Ao terminar, atualizar `docs/rubrica.md` e `docs/evolucao.md` com evidências da entrega. Não marcar etapas futuras como concluídas apenas porque aparecem neste plano.
