# Regras de Negócio do FixFlow

As regras abaixo definem o comportamento do MVP. As regras de autenticação e do domínio de solicitações estão implementadas na API; a regra de imagens permanece planejada. Esconder ações no aplicativo não substitui autorização no servidor. `USER` representa o solicitante comum; `ADMIN`, o responsável pelo gerenciamento.

## Perfis e permissões planejadas

| Operação | USER | ADMIN |
| --- | --- | --- |
| Cadastrar conta comum | Sim | Não há cadastro administrativo no MVP |
| Autenticar-se e encerrar sessão | Sim | Sim |
| Criar e consultar solicitações | Próprias | Consultar todas |
| Editar dados do pedido | Próprios, somente em `ABERTA` | Não altera dados originais do solicitante |
| Cancelar pedido | Próprios, em `ABERTA` ou `EM_ANALISE` | Não previsto no MVP |
| Anexar imagem | Próprios, somente em `ABERTA` | Não previsto no MVP |
| Alterar status operacional | Não | Sim, nas transições permitidas |
| Ajustar prioridade | Não após a criação | Sim, em pedido não finalizado |

### RN001 - Cadastro com perfil comum

**Descrição:** O cadastro público cria apenas contas com perfil `USER`. A atribuição de `ADMIN` não é uma opção do cadastro público.

**Aplicação:** Validar o perfil no backend ao criar a conta; contas administrativas serão preparadas por procedimento controlado em etapa futura.

**Atores envolvidos:** Visitante, USER, ADMIN. **Requisitos relacionados:** RF001, RF013. **Status:** Implementada na API.

### RN002 - E-mail único e senha protegida

**Descrição:** Cada conta deve ter e-mail único; a senha não pode ser persistida em texto puro.

**Aplicação:** Rejeitar cadastro com e-mail já utilizado e armazenar apenas o hash da senha.

**Atores envolvidos:** Visitante, USER, ADMIN. **Requisitos relacionados:** RF001, RF002. **Status:** Implementada na API.

### RN003 - Autenticação e autorização no servidor

**Descrição:** Operações protegidas exigem usuário autenticado, e ações administrativas exigem perfil `ADMIN`.

**Aplicação:** Verificar identidade e perfil em cada operação protegida no backend, inclusive quando a API for chamada diretamente.

**Atores envolvidos:** USER, ADMIN. **Requisitos relacionados:** RF002, RF003, RF013. **Status:** Implementada na API, inclusive nas rotas de solicitações.

### RN004 - Propriedade e alcance de consulta

**Descrição:** `USER` só pode consultar ou modificar solicitações criadas por ele. `ADMIN` pode consultar todas para gerenciamento.

**Aplicação:** Comparar `MaintenanceRequest.createdById` com o usuário autenticado no backend antes de listar, detalhar, editar, cancelar ou anexar imagem como `USER`.

**Atores envolvidos:** USER, ADMIN. **Requisitos relacionados:** RF005, RF006, RF007, RF008, RF009, RF010, RF013. **Status:** Implementada na API para consulta, edição e cancelamento; imagens permanecem pendentes.

### RN005 - Criação padronizada

**Descrição:** Uma solicitação nasce em `ABERTA`, vinculada ao solicitante e a uma categoria ativa, com título, descrição e prioridade inicial `BAIXA`, `MEDIA` ou `ALTA` informada pelo `USER`.

**Aplicação:** Validar campos, categoria e prioridade; atribuir autoria e estado inicial no backend, sem aceitar autoria enviada como autoridade pelo aplicativo.

**Atores envolvidos:** USER. **Requisitos relacionados:** RF004, RF014. **Status:** Implementada na API.

### RN006 - Transições de status controladas

**Descrição:** Apenas as transições da tabela abaixo são permitidas. `CONCLUIDA` e `CANCELADA` são terminais; não há reativação no MVP.

**Aplicação:** Rejeitar qualquer transição fora da tabela no backend, incluindo `CONCLUIDA → ABERTA` e `CANCELADA → EM_ANDAMENTO`.

**Atores envolvidos:** USER, ADMIN. **Requisitos relacionados:** RF009, RF011, RF014. **Status:** Implementada na API.

| Status atual | Próximos status permitidos | Ator autorizado |
| --- | --- | --- |
| `ABERTA` | `EM_ANALISE` | `ADMIN` |
| `ABERTA` | `CANCELADA` | `USER` criador |
| `EM_ANALISE` | `EM_ANDAMENTO` | `ADMIN` |
| `EM_ANALISE` | `CANCELADA` | `USER` criador |
| `EM_ANDAMENTO` | `CONCLUIDA` | `ADMIN` |
| `CONCLUIDA` | Nenhum | — |
| `CANCELADA` | Nenhum | — |

### RN007 - Edição do pedido pelo solicitante

**Descrição:** `USER` pode editar título, descrição, categoria e prioridade inicial somente enquanto a própria solicitação estiver `ABERTA`. Depois disso, os dados originais são preservados.

**Aplicação:** Conferir autoria e estado antes de aceitar alterações; não permitir edição de autoria, status ou campos administrativos por `USER`.

**Atores envolvidos:** USER. **Requisitos relacionados:** RF008, RF013. **Status:** Implementada na API.

### RN008 - Cancelamento como remoção lógica

**Descrição:** `USER` pode cancelar pedido próprio em `ABERTA` ou `EM_ANALISE`. O pedido muda para `CANCELADA`, recebe `canceledAt` e permanece no banco e no histórico. Não há exclusão física pelo usuário no MVP.

**Aplicação:** Tratar cancelamento como operação controlada equivalente ao Delete acadêmico; rejeitar cancelamento em outros estados e manter o registro consultável.

**Atores envolvidos:** USER. **Requisitos relacionados:** RF009, RF014. **Status:** Implementada na API.

### RN009 - Ajuste administrativo de prioridade

**Descrição:** `ADMIN` pode ajustar a prioridade para `BAIXA`, `MEDIA` ou `ALTA` enquanto a solicitação não estiver `CONCLUIDA` nem `CANCELADA`; não pode alterar autoria ou dados originais do solicitante.

**Aplicação:** Autorizar apenas o campo de prioridade nos pedidos não finalizados. A definição de um log específico para prioridade fica fora do modelo inicial.

**Atores envolvidos:** ADMIN. **Requisitos relacionados:** RF012, RF013. **Status:** Implementada na API.

### RN010 - Imagens válidas e vinculadas

**Descrição:** `USER` pode anexar imagem à própria solicitação somente em `ABERTA`. São previstos JPEG/JPG, PNG e WEBP, até 5 MB por arquivo. O nome armazenado deve ser gerado com identificador único, sem reutilizar diretamente o nome enviado.

**Aplicação:** O backend deverá conferir MIME/type, extensão e conteúdo legível como imagem de modo coerente, rejeitar arquivo inválido sem persisti-lo e salvar caminho e metadados apenas para imagem aceita. Um pedido pode ter várias imagens, cada uma vinculada a um único pedido.

**Atores envolvidos:** USER. **Requisitos relacionados:** RF005, RF015. **Status:** Planejada.

### RN011 - Histórico de mudança de status

**Descrição:** A criação e cada transição de status aceita geram registro com solicitação, status anterior quando existente, novo status, usuário autenticado responsável, data/hora e observação opcional. Na criação em `ABERTA`, `previousStatus` é nulo.

**Aplicação:** Gravar a mudança de status e o histórico na mesma operação; `completedAt` ou `canceledAt` deve acompanhar a transição correspondente.

**Atores envolvidos:** USER, ADMIN. **Requisitos relacionados:** RF007, RF009, RF011, RF014. **Status:** Implementada na API com transações Prisma.

### RN012 - Categoria válida

**Descrição:** A solicitação deve referenciar uma categoria existente e ativa na criação ou edição pelo solicitante. Desativar uma categoria não altera pedidos já registrados.

**Aplicação:** Validar `categoryId` no backend. Categorias poderão ser pré-cadastradas; não há CRUD administrativo de categorias no MVP.

**Atores envolvidos:** USER. **Requisitos relacionados:** RF004, RF008. **Status:** Implementada na API.

### RN013 - Proteção do hash nas respostas

**Descrição:** Respostas da API não podem retornar `passwordHash`, inclusive em dados do usuário relacionados a uma solicitação ou ao histórico.

**Aplicação:** Definir respostas públicas sem o campo sensível e verificar os retornos das rotas que consultam usuário, pedido ou histórico.

**Atores envolvidos:** USER, ADMIN. **Requisitos relacionados:** RF002, RF003, RF007, RF010, RF013. **Status:** Implementada nas respostas de autenticação e solicitações.

## Rastreabilidade

| Regra | Requisito(s) relacionado(s) | Entidade(s) envolvida(s) |
| --- | --- | --- |
| RN001 | RF001, RF013 | User |
| RN002 | RF001, RF002 | User |
| RN003 | RF002, RF003, RF013 | User |
| RN004 | RF005–RF010, RF013 | User, MaintenanceRequest, RequestImage |
| RN005 | RF004, RF014 | User, Category, MaintenanceRequest |
| RN006 | RF009, RF011, RF014 | MaintenanceRequest, StatusHistory, User |
| RN007 | RF008, RF013 | User, MaintenanceRequest, Category |
| RN008 | RF009, RF014 | User, MaintenanceRequest, StatusHistory |
| RN009 | RF012, RF013 | User, MaintenanceRequest |
| RN010 | RF005, RF015 | User, MaintenanceRequest, RequestImage |
| RN011 | RF007, RF009, RF011, RF014 | MaintenanceRequest, StatusHistory, User |
| RN012 | RF004, RF008 | Category, MaintenanceRequest |
| RN013 | RF002, RF003, RF007, RF010, RF013 | User, MaintenanceRequest, StatusHistory |
