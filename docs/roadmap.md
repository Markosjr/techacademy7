# Roadmap incremental do FixFlow

Este plano organiza entregas possíveis, sem autorizar sua implementação antecipada. Cada etapa de código ou diagrama depende de pedido específico do usuário. Os limites e critérios abaixo poderão ser ajustados quando requisitos e persona forem definidos.

## Ponto de partida — concluído

- Problema, público-alvo genérico, proposta e objetivos registrados em `docs/problema.md`.
- Base React Native + Expo + TypeScript criada em `mobile/`.
- Fundação da API REST implementada em `api/` com Express e TypeScript, rota de saúde e tratamento básico de 404/erros. Banco e endpoints de domínio ainda não existem.
- Rubrica, roadmap e orientações de trabalho documentados.
- Fundação mobile concluída: Expo Router preservado em `src/app/`, componentes base em `src/components/`, tokens em `src/theme/` e tela inicial temporária. Ainda não há funcionalidades de domínio.
- Persona acadêmica e requisitos do MVP documentados em `docs/persona.md` e `docs/requisitos.md`. Não houve validação com cliente real nem implementação dos fluxos.
- Regras planejadas, cinco entidades conceituais e DER documentados em `docs/regras-negocio.md`, `docs/modelagem-dados.md` e `docs/der.md`; banco ainda não existe.

## Etapas do produto

| Etapa | Entrega pretendida | Critério para considerá-la concluída |
| --- | --- | --- |
| 1. Produto e requisitos — documentação concluída | Persona representativa, jornada, escopo do MVP e requisitos funcionais e não funcionais em `docs/persona.md` e `docs/requisitos.md`. | Documento rastreável ao problema; validação com cliente real ainda não realizada. |
| 2. Modelagem e regras — documentação concluída | Regras de prioridade, edição, cancelamento e status; entidades, relacionamentos, perfis e DER em `docs/regras-negocio.md`, `docs/modelagem-dados.md` e `docs/der.md`. | Documentos conceituais consistentes com os requisitos; implementação ainda prevista. |
| 3. Fundação da API — concluída | Node.js, Express e TypeScript; rota `GET /api/health`, 404 e middleware de erro. | Typecheck e build passaram; respostas 200 e 404 verificadas localmente. |
| 4. Persistência — prevista | Adicionar Prisma e SQLite conforme a modelagem documentada, sem antecipar autenticação ou CRUD. | Schema e acesso ao banco verificáveis em etapa autorizada. |
| 5. Autenticação e autorização | Cadastro e login, JWT e perfis ADMIN/comum. | Rotas protegidas e permissões verificadas no servidor. |
| 6. Solicitações ponta a ponta | CRUD acadêmico de solicitações na API e no app, usando Axios. | Criar, listar/consultar, editar e cancelar a partir do app com dados persistidos, conforme as regras planejadas. |
| 7. Imagens | Upload com Multer e vínculo com solicitações; validação de extensão, tamanho e nomes sem colisão. | Upload válido funciona; arquivos inválidos e excessivos são rejeitados; nomes não sobrescrevem arquivos. |
| 8. Experiência e segurança | Refinar navegação, feedback, erros, acessibilidade, compatibilidade e proteção de dados. | Fluxos principais verificados nos ambientes escolhidos e falhas tratadas. |
| 9. Documentação acadêmica | Dois diagramas de casos de uso, dois de atividades e dois de sequência; revisar DER, requisitos e evolução. | Diagramas e documentos refletem o comportamento efetivamente entregue. |

## Regra de acompanhamento

Antes de cada incremento, verificar o estado real do repositório e confirmar o escopo pedido. Ao terminar, atualizar `docs/rubrica.md` e `docs/evolucao.md` com evidências da entrega. Não marcar etapas futuras como concluídas apenas porque aparecem neste plano.
