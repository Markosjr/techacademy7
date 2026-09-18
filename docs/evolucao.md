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
