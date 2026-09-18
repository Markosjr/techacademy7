# Persona do FixFlow

## Contexto

Esta é uma **persona acadêmica representativa**, criada para orientar decisões de escopo e usabilidade. Ela não corresponde a uma pessoa real entrevistada e ainda não foi validada com um cliente. O perfil parte do problema descrito em `docs/problema.md`: pedidos de manutenção dispersos em conversas e mensagens.

## Persona principal

**Marina (nome fictício)**, aproximadamente 30 a 40 anos, é assistente administrativa em uma empresa. Durante a rotina, percebe problemas em salas, equipamentos e áreas comuns e costuma avisar a equipe responsável por mensagem ou verbalmente. Usa smartphone diariamente para tarefas comuns e espera registrar uma ocorrência sem precisar aprender um fluxo complexo.

## Objetivos

- Registrar o problema rapidamente, com título, descrição e categoria.
- Acrescentar uma imagem quando ela ajudar a mostrar a ocorrência.
- Saber se o pedido foi recebido e acompanhar seu andamento até a conclusão.
- Encontrar depois o que já comunicou.

## Dores

- Não saber se uma mensagem foi recebida ou quem dará andamento.
- Precisar perguntar repetidamente sobre o estado do atendimento.
- Perder o histórico quando as conversas ficam dispersas.
- Ter dificuldade para explicar um problema visualmente.

## Necessidades

Marina precisa de um canal único para abrir solicitações, consultar as próprias ocorrências, ver estado e histórico e anexar uma imagem quando útil. O cadastro e a identificação do usuário deverão associar cada solicitação a quem a abriu. Essas capacidades estão **planejadas** em `docs/requisitos.md`; a tela mobile atual é apenas uma demonstração da fundação visual.

## Jornada resumida

Identifica um problema → abre o FixFlow → registra a solicitação → acompanha o status → visualiza a conclusão.

Essa jornada descreve o **fluxo pretendido**, ainda não disponível na aplicação.

## Relação persona x solução

| Dor ou necessidade | Resposta planejada no FixFlow |
| --- | --- |
| Avisos dispersos e sem histórico | Registro padronizado e consulta das próprias solicitações. |
| Dúvida sobre recebimento e andamento | Estado visível e histórico de mudanças relevantes. |
| Dificuldade de explicar o problema | Descrição, categoria e imagem opcional vinculada ao pedido. |
| Necessidade de registrar rapidamente | Formulário mobile com campos claros, validação e feedback. |

## Perfil administrativo

O **usuário administrador**, responsável pelo gerenciamento do atendimento, precisa consultar todas as solicitações, analisar ocorrências, ajustar a prioridade quando permitido, alterar o status e acompanhar o fluxo de atendimento. O perfil administrativo e suas permissões serão implementados em etapas futuras. Esta descrição é um papel do sistema, não uma segunda pessoa entrevistada.
