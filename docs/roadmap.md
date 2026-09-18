# Roadmap incremental do FixFlow

Este plano organiza entregas possíveis, sem autorizar sua implementação antecipada. Cada etapa de código ou diagrama depende de pedido específico do usuário. Os limites e critérios abaixo poderão ser ajustados quando requisitos e persona forem definidos.

## Ponto de partida — concluído

- Problema, público-alvo genérico, proposta e objetivos registrados em `docs/problema.md`.
- Base React Native + Expo + TypeScript criada em `mobile/`.
- Pasta `api/` reservada, sem implementação.
- Rubrica, roadmap e orientações de trabalho documentados.
- Fundação mobile concluída: Expo Router preservado em `src/app/`, componentes base em `src/components/`, tokens em `src/theme/` e tela inicial temporária. Ainda não há funcionalidades de domínio.
- Persona acadêmica e requisitos do MVP documentados em `docs/persona.md` e `docs/requisitos.md`. Não houve validação com cliente real nem implementação dos fluxos.

## Etapas do produto

| Etapa | Entrega pretendida | Critério para considerá-la concluída |
| --- | --- | --- |
| 1. Produto e requisitos — documentação concluída | Persona representativa, jornada, escopo do MVP e requisitos funcionais e não funcionais em `docs/persona.md` e `docs/requisitos.md`. | Documento rastreável ao problema; validação com cliente real ainda não realizada. |
| 2. Modelagem e regras — prevista | Definir regras detalhadas de prioridade, edição, cancelamento e transição de estados; entidades, relacionamentos, perfis e DER; revisar o escopo do CRUD. | DER e regras consistentes com os requisitos documentados. |
| 3. Fundação da API | Configurar Node.js, Express, TypeScript, Prisma e SQLite; organizar rotas, serviços, validação e erros. | API iniciável e persistência verificável. |
| 4. Autenticação e autorização | Cadastro e login, JWT e perfis ADMIN/comum. | Rotas protegidas e permissões verificadas no servidor. |
| 5. Solicitações ponta a ponta | CRUD de solicitações na API e no app, usando Axios. | Criar, listar/consultar, editar e excluir a partir do app com dados persistidos. |
| 6. Imagens | Upload com Multer e vínculo com solicitações; validação de extensão, tamanho e nomes sem colisão. | Upload válido funciona; arquivos inválidos e excessivos são rejeitados; nomes não sobrescrevem arquivos. |
| 7. Experiência e segurança | Refinar navegação, feedback, erros, acessibilidade, compatibilidade e proteção de dados. | Fluxos principais verificados nos ambientes escolhidos e falhas tratadas. |
| 8. Documentação acadêmica | Dois diagramas de casos de uso, dois de atividades e dois de sequência; revisar DER, requisitos e evolução. | Diagramas e documentos refletem o comportamento efetivamente entregue. |

## Regra de acompanhamento

Antes de cada incremento, verificar o estado real do repositório e confirmar o escopo pedido. Ao terminar, atualizar `docs/rubrica.md` e `docs/evolucao.md` com evidências da entrega. Não marcar etapas futuras como concluídas apenas porque aparecem neste plano.
