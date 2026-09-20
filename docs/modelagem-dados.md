# Modelagem de Dados do FixFlow

Modelo conceitual do MVP, implementado em `api/prisma/schema.prisma` e nas migrations SQLite. A API já usa o modelo para autenticação, categorias, solicitações e histórico de status. `id` é chave primária UUID de cada entidade; datas representam instante de criação ou atualização.

## Entidades e campos

### User

| Campo | Obrigatório | Finalidade ou restrição |
| --- | --- | --- |
| `id` | Sim | Identificador e chave primária. |
| `name` | Sim | Nome exibido do usuário. |
| `email` | Sim | Identificação para acesso; único. |
| `passwordHash` | Sim | Hash da senha; nunca exposto em respostas da API. |
| `role` | Sim | `USER` ou `ADMIN`; cadastro público cria `USER`. |
| `createdAt`, `updatedAt` | Sim | Datas de criação e atualização. |

### Category

| Campo | Obrigatório | Finalidade ou restrição |
| --- | --- | --- |
| `id` | Sim | Identificador e chave primária. |
| `name` | Sim | Nome da classificação padronizada. |
| `active` | Sim | Indica se a categoria pode ser escolhida em novos pedidos. |
| `createdAt` | Sim | Data de criação. |

Categorias poderão ser pré-cadastradas. O MVP não prevê tela ou API de administração de categorias.

### MaintenanceRequest

| Campo | Obrigatório | Finalidade ou restrição |
| --- | --- | --- |
| `id` | Sim | Identificador e chave primária. |
| `title`, `description` | Sim | Dados originais do problema. |
| `priority` | Sim | `BAIXA`, `MEDIA` ou `ALTA`; inicial informada pelo `USER`. |
| `status` | Sim | `ABERTA`, `EM_ANALISE`, `EM_ANDAMENTO`, `CONCLUIDA` ou `CANCELADA`; inicial `ABERTA`. |
| `createdById` | Sim | Chave estrangeira para `User.id`; autoria imutável. |
| `categoryId` | Sim | Chave estrangeira para `Category.id`. |
| `createdAt`, `updatedAt` | Sim | Datas de criação e última alteração. |
| `canceledAt` | Não | Preenchida quando o pedido muda para `CANCELADA`. |
| `completedAt` | Não | Preenchida quando o pedido muda para `CONCLUIDA`. |

`canceledAt` e `completedAt` não devem estar preenchidos simultaneamente. Pedidos cancelados e concluídos permanecem armazenados e consultáveis.

### RequestImage

| Campo | Obrigatório | Finalidade ou restrição |
| --- | --- | --- |
| `id` | Sim | Identificador e chave primária. |
| `filename` | Sim | Nome único gerado pelo servidor para armazenamento. |
| `originalName` | Sim | Nome recebido, preservado apenas como metadado; não determina o caminho. |
| `mimeType` | Sim | Tipo validado em conjunto com extensão e conteúdo. |
| `size` | Sim | Tamanho em bytes; limite planejado de 5 MB por arquivo. |
| `path` | Sim | Caminho ou identificador do arquivo armazenado. |
| `requestId` | Sim | Chave estrangeira para `MaintenanceRequest.id`. |
| `createdAt` | Sim | Data do vínculo da imagem. |

Uma solicitação pode não ter imagem ou ter várias. O arquivo aceito deve ter metadados vinculados a uma solicitação; arquivo rejeitado não deve gerar registro.

### StatusHistory

| Campo | Obrigatório | Finalidade ou restrição |
| --- | --- | --- |
| `id` | Sim | Identificador e chave primária. |
| `requestId` | Sim | Chave estrangeira para `MaintenanceRequest.id`. |
| `changedById` | Sim | Chave estrangeira para `User.id`; usuário autenticado que fez a transição. |
| `previousStatus` | Não | Status antes da alteração; nulo somente no evento de criação inicial. |
| `newStatus` | Sim | Status após a alteração. |
| `note` | Não | Observação da mudança, quando houver. |
| `createdAt` | Sim | Data e hora da alteração. |

O status inicial `ABERTA` fica em `MaintenanceRequest` e também gera um evento de criação com `previousStatus` nulo e `newStatus` igual a `ABERTA`. As transições posteriores sempre possuem status anterior e novo status definidos.

## Relacionamentos e integridade

| Relacionamento | Cardinalidade | Regra de integridade |
| --- | --- | --- |
| User → MaintenanceRequest | 1:N | Cada pedido tem exatamente um criador (`createdById` obrigatório); um usuário pode criar nenhum ou vários pedidos. |
| Category → MaintenanceRequest | 1:N | Cada pedido tem exatamente uma categoria (`categoryId` obrigatório); uma categoria pode classificar nenhum ou vários pedidos. |
| MaintenanceRequest → RequestImage | 1:N | Cada imagem pertence a exatamente um pedido (`requestId` obrigatório); um pedido pode ter nenhuma ou várias imagens. |
| MaintenanceRequest → StatusHistory | 1:N | Cada evento pertence a exatamente um pedido (`requestId` obrigatório); a criação da solicitação gera o primeiro evento. |
| User → StatusHistory | 1:N | Cada evento tem exatamente um responsável (`changedById` obrigatório); um usuário pode não ter alterações registradas. |

`User.email` deve ser único. As chaves estrangeiras acima não são nulas. Como o MVP preserva solicitações e histórico, não há operação de exclusão física de pedidos ou usuários; nenhuma remoção em cascata faz parte do fluxo planejado.

## Decisões de Modelagem

- **Category como entidade:** evita categorias em texto livre, garante classificação consistente e permite eventual administração futura sem incluí-la no MVP.
- **StatusHistory separado:** registra autoria, momento e direção das mudanças de estado, dando rastreabilidade às regras de transição. O status atual permanece em `MaintenanceRequest` para consulta direta.
- **Cancelamento sem exclusão física:** `CANCELADA` e `canceledAt` preservam o pedido, suas imagens e seu histórico para consulta e auditoria do fluxo.
- **RequestImage separado:** mantém metadados do arquivo fora do pedido e permite zero ou várias imagens relacionadas a uma solicitação.

## Decisões técnicas do Prisma e SQLite

- O schema usa enums Prisma para `Role`, `Priority` e `RequestStatus`. No SQLite gerado, esses valores são armazenados em colunas de texto; a tipagem é fornecida pelo Prisma Client. As transições entre estados continuam sendo regra futura da camada de serviço.
- `Category.name`, `RequestImage.filename` e `RequestImage.path` são únicos para reforçar classificação e identificação de arquivos sem duplicidade.
- As relações obrigatórias usam `onDelete: Restrict`, evitando exclusão acidental de usuários, categorias, solicitações, imagens ou histórico. O cancelamento lógico continua sendo a operação prevista para solicitações.
- O banco local fica em `api/prisma/dev.db`, é criado pelas migrations e não é versionado. As migrations permanecem versionáveis.
