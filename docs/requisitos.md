# Requisitos do FixFlow

Este documento define o comportamento do MVP acadêmico. A autenticação e autorização estão implementadas na API, mas ainda não estão integradas ao mobile; os demais fluxos funcionais continuam planejados. A persona de referência está em `docs/persona.md`; as regras e a modelagem estão em `docs/regras-negocio.md` e `docs/modelagem-dados.md`.

## Requisitos Funcionais

### RF001 - Cadastrar usuário

**Descrição:** Permitir o cadastro de uma conta de usuário comum com dados de identificação e credencial.

**Ator(es):** Visitante. **Prioridade:** Essencial. **Status:** Implementado na API; mobile planejado.

**Critério de aceite:** Um cadastro válido cria uma conta; dados inválidos ou identificação já utilizada são rejeitados com mensagem clara.

### RF002 - Entrar no aplicativo

**Descrição:** Autenticar o usuário por credenciais e iniciar uma sessão.

**Ator(es):** Usuário comum e administrador. **Prioridade:** Essencial. **Status:** Implementado na API; mobile planejado.

**Critério de aceite:** Credenciais válidas permitem acesso ao perfil correspondente; credenciais inválidas não permitem acesso.

### RF003 - Identificar usuário e encerrar sessão

**Descrição:** Exibir a identidade/perfil da sessão ativa e permitir sua finalização.

**Ator(es):** Usuário comum e administrador. **Prioridade:** Essencial. **Status:** Identificação implementada na API; sessão mobile planejada.

**Critério de aceite:** A aplicação identifica o usuário autenticado; após sair, áreas protegidas exigem nova autenticação.

### RF004 - Criar solicitação

**Descrição:** Registrar uma solicitação de manutenção com título, descrição, categoria ativa e prioridade inicial `BAIXA`, `MEDIA` ou `ALTA` informada pelo usuário, associada a quem a abriu.

**Ator(es):** Usuário comum. **Prioridade:** Essencial. **Status:** Planejado.

**Critério de aceite:** Dados válidos geram uma solicitação persistida com identificador e estado inicial `ABERTA`; campos obrigatórios inválidos são rejeitados.

### RF005 - Anexar imagem à solicitação

**Descrição:** Permitir o envio opcional de imagem para mostrar o problema e vinculá-la à própria solicitação enquanto ela estiver `ABERTA`.

**Ator(es):** Usuário comum. **Prioridade:** Importante. **Status:** Planejado.

**Critério de aceite:** Uma imagem válida enviada pelo aplicativo fica associada à solicitação e aparece nos seus detalhes.

### RF006 - Consultar próprias solicitações

**Descrição:** Listar as solicitações abertas pelo usuário autenticado, com identificação e status.

**Ator(es):** Usuário comum. **Prioridade:** Essencial. **Status:** Planejado.

**Critério de aceite:** O usuário vê suas solicitações e não recebe solicitações de outros usuários nessa consulta.

### RF007 - Visualizar detalhes e andamento

**Descrição:** Consultar dados, status atual e histórico de alterações relevantes de uma solicitação acessível ao ator.

**Ator(es):** Usuário comum e administrador. **Prioridade:** Essencial. **Status:** Planejado.

**Critério de aceite:** A tela mostra os dados registrados e o status atual; alterações de status ficam consultáveis no histórico.

### RF008 - Atualizar solicitação permitida

**Descrição:** Permitir ao solicitante editar título, descrição, categoria e prioridade inicial da própria solicitação enquanto estiver `ABERTA`.

**Ator(es):** Usuário comum. **Prioridade:** Essencial. **Status:** Planejado.

**Critério de aceite:** Uma alteração autorizada é persistida; alterações de solicitação alheia ou em estado não permitido são recusadas.

### RF009 - Cancelar solicitação permitida

**Descrição:** Oferecer ao solicitante uma ação controlada de cancelamento da própria solicitação em `ABERTA` ou `EM_ANALISE`, preservando o registro para histórico.

**Ator(es):** Usuário comum. **Prioridade:** Essencial. **Status:** Planejado.

**Critério de aceite:** Solicitação cancelável passa a `CANCELADA` e permanece consultável; cancelamento não permitido é recusado.

### RF010 - Consultar todas as solicitações

**Descrição:** Permitir ao administrador listar e abrir solicitações de todos os usuários.

**Ator(es):** Administrador. **Prioridade:** Essencial. **Status:** Planejado.

**Critério de aceite:** O administrador consulta solicitações independentemente do solicitante; usuário comum não acessa essa visão.

### RF011 - Alterar status de atendimento

**Descrição:** Permitir ao administrador atualizar o estado da solicitação e registrar a alteração no histórico.

**Ator(es):** Administrador. **Prioridade:** Essencial. **Status:** Planejado.

**Critério de aceite:** Mudança autorizada atualiza o status e gera registro de histórico; mudança proibida é rejeitada.

### RF012 - Administrar prioridade e informações permitidas

**Descrição:** Permitir ao administrador ajustar prioridade em solicitações não finalizadas, sem modificar autoria ou dados originais do solicitante.

**Ator(es):** Administrador. **Prioridade:** Importante. **Status:** Planejado.

**Critério de aceite:** Ajustes autorizados persistem e aparecem nos detalhes; campos fora da permissão não são alterados.

### RF013 - Distinguir permissões

**Descrição:** Aplicar controle de acesso entre perfis `USER` e `ADMIN` nas operações e consultas.

**Ator(es):** Usuário comum e administrador. **Prioridade:** Essencial. **Status:** RBAC base implementado na API; permissões de solicitações planejadas.

**Critério de aceite:** A API impede acesso não autenticado e recusa operações administrativas para `USER`, mesmo se chamadas diretamente.

### RF014 - Apresentar estados da solicitação

**Descrição:** Usar os estados planejados `ABERTA`, `EM_ANALISE`, `EM_ANDAMENTO`, `CONCLUIDA` e `CANCELADA` para acompanhamento, respeitando as transições de `docs/regras-negocio.md`.

**Ator(es):** Usuário comum e administrador. **Prioridade:** Essencial. **Status:** Planejado.

**Critério de aceite:** Cada solicitação mostra um desses estados, correspondente ao dado persistido; transições não previstas são recusadas.

### RF015 - Receber e validar imagem na API

**Descrição:** Receber imagem com Multer, aceitar JPEG/JPG, PNG ou WEBP até 5 MB por arquivo, verificar MIME/type e extensão e atribuir nome de armazenamento sem colisão.

**Ator(es):** Usuário comum; API. **Prioridade:** Importante. **Status:** Planejado.

**Critério de aceite:** Arquivo aceito é armazenado e vinculado à solicitação; formato ou tamanho inválido é rejeitado, e envios com mesmo nome original não sobrescrevem arquivos.

## CRUD acadêmico principal

O recurso principal é a **solicitação de manutenção**: **Create** corresponde a RF004; **Read**, a RF006, RF007 e RF010; **Update**, a RF008, RF011 e RF012. Para **Delete**, o MVP planeja o cancelamento controlado de RF009, com preservação do histórico, em vez de exclusão física pelo usuário, conforme `docs/regras-negocio.md`. A equivalência acadêmica ainda deverá ser validada na avaliação do projeto. Não há CRUD implementado nesta etapa.

## Requisitos Não Funcionais

Todos os RNFs abaixo estão **planejados**.

| ID | Área | Requisito verificável |
| --- | --- | --- |
| RNF001 | Usabilidade | Formulários deverão identificar campos obrigatórios e mostrar mensagens junto aos campos inválidos antes de confirmar a operação. |
| RNF002 | Desempenho | Em teste local com até 100 solicitações, a listagem inicial deverá carregar em até 3 segundos; o cenário e o resultado deverão ser registrados. |
| RNF003 | Segurança | Rotas e operações protegidas deverão verificar autenticação e permissão no servidor, sem confiar apenas na interface. |
| RNF004 | Compatibilidade | Os fluxos principais deverão ser verificados em Android e iOS nas versões suportadas pelo Expo adotado no projeto. |
| RNF005 | Manutenção | Rotas, componentes de interface, comunicação e regras de negócio deverão permanecer separados, com TypeScript sem uso deliberado de `any` no código novo. |
| RNF006 | Comunicação com API | O aplicativo deverá consumir a API REST por Axios, tratar respostas e falhas de rede e evitar URLs de servidor repetidas nas telas. |
| RNF007 | Validação de dados | A API deverá validar entradas independentemente das validações do aplicativo e devolver erros compreensíveis. |
| RNF008 | Senhas | Senhas não deverão ser armazenadas ou retornadas em texto puro; o servidor deverá armazenar somente um hash apropriado. |
| RNF009 | Tratamento de erros | Falhas de cadastro, login, solicitação e upload deverão gerar mensagens úteis, sem expor detalhes internos do servidor. |
| RNF010 | Feedback | Operações assíncronas relevantes deverão mostrar carregamento e impedir envios duplicados enquanto estiverem em andamento. |
| RNF011 | Imagens | A API deverá aceitar apenas os formatos e o limite de tamanho definidos para o MVP, conferir tipo/extensão e se o arquivo pode ser lido como imagem, e preservar arquivos existentes quando nomes originais coincidirem. |
| RNF012 | Organização arquitetural | A solução deverá manter rotas e apresentação separadas no mobile e, quando criada, separar rotas, serviços e persistência na API. |

## Escopo do MVP Acadêmico

O escopo **pretendido**, ainda não entregue, inclui aplicativo mobile, API REST e banco SQLite; cadastro, login e autenticação; perfis `USER` e `ADMIN`; CRUD acadêmico de solicitações conforme a decisão planejada acima; regras de negócio de edição, prioridade e status; upload e validação de imagem; validação, feedback e tratamento de erro na interface. A fundação visual do mobile já existe, mas não representa esses fluxos.

## Fora do escopo atual

Chat em tempo real, notificações push, geolocalização, integração com sistemas empresariais externos, analytics avançado, inteligência artificial, pagamentos e suporte a múltiplas organizações não fazem parte do MVP. São possibilidades, não compromissos de backlog.

## Rastreabilidade com a persona

| Requisito | Necessidade da persona atendida |
| --- | --- |
| RF001–RF003, RF013 | Identificar quem abriu o pedido e proteger o acesso ao próprio histórico. |
| RF004, RF008 | Registrar e corrigir informações de maneira padronizada. |
| RF005, RF015 | Mostrar visualmente a ocorrência sem depender de explicações dispersas. |
| RF006, RF007, RF014 | Encontrar pedidos anteriores e saber se foram recebidos, atendidos ou concluídos. |
| RF009 | Encerrar um pedido que deixou de ser necessário preservando o histórico. |
| RF010–RF012 | Dar ao responsável condições de organizar e atualizar o atendimento. |
