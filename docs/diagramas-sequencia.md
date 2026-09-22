# Diagramas de Sequência

## Diagrama 1 — Criar solicitação com imagem

```mermaid
sequenceDiagram
    actor USER
    participant Mobile
    participant Axios
    participant API
    participant Service as MaintenanceRequestService
    participant Prisma
    participant SQLite
    participant Multer
    participant FileSystem

    USER->>Mobile: Preenche dados e seleciona imagem
    Mobile->>Axios: POST /api/requests com JSON
    Axios->>API: Dados e token JWT
    API->>Service: createMaintenanceRequest
    Service->>Prisma: Criar MaintenanceRequest e StatusHistory
    Prisma->>SQLite: Transação de criação
    SQLite-->>Prisma: Registros persistidos
    Prisma-->>Service: Solicitação criada
    Service-->>API: ID da solicitação
    API-->>Axios: HTTP 201
    Axios-->>Mobile: Solicitação com ID

    Mobile->>Mobile: Montar FormData no campo image
    Mobile->>Axios: POST /api/requests/:id/images
    Axios->>API: multipart/form-data e token JWT
    API->>API: Validar propriedade e estado ABERTA
    API->>Multer: Processar uma imagem
    Multer->>Multer: Validar extensão, MIME e 5 MB
    Multer->>FileSystem: Salvar com nome UUID
    FileSystem-->>API: Arquivo salvo
    API->>API: Validar assinatura binária
    API->>Prisma: Criar RequestImage
    Prisma->>SQLite: Persistir metadados e requestId
    SQLite-->>Prisma: RequestImage persistida
    Prisma-->>API: Imagem com URL relativa
    API-->>Axios: HTTP 201
    Axios-->>Mobile: Imagem vinculada
    Mobile->>Axios: GET /api/requests/:id
    Axios->>API: Consultar detalhes
    API->>Prisma: Buscar solicitação e images
    Prisma->>SQLite: Consultar dados
    SQLite-->>Prisma: Solicitação completa
    Prisma-->>API: Dados e URLs das imagens
    API-->>Axios: Detalhes da solicitação
    Axios-->>Mobile: Dados e URLs das imagens
    Mobile-->>USER: Exibir imagem nos detalhes
```

O fluxo separa a criação JSON do upload multipart. O arquivo só recebe um registro `RequestImage` depois das validações; uma falha posterior à gravação provoca a remoção do arquivo recém-criado.

## Diagrama 2 — ADMIN altera status

```mermaid
sequenceDiagram
    actor ADMIN
    participant Mobile
    participant Axios
    participant API
    participant Authenticate
    participant Authorize
    participant Service as MaintenanceRequestService
    participant Prisma
    participant SQLite

    ADMIN->>Mobile: Seleciona a próxima ação de status
    Mobile->>Axios: PATCH /api/requests/:id/status
    Axios->>API: Novo status, observação e token JWT
    API->>Authenticate: Validar JWT
    Authenticate-->>API: Usuário autenticado
    API->>Authorize: Validar role ADMIN
    Authorize-->>API: Operação autorizada
    API->>Service: changeMaintenanceRequestStatus
    Service->>Prisma: Consultar status atual
    Prisma->>SQLite: Buscar MaintenanceRequest
    SQLite-->>Prisma: Status atual
    Prisma-->>Service: Solicitação encontrada
    Service->>Service: Validar máquina de estados
    Service->>Prisma: Iniciar transação
    Prisma->>SQLite: Atualizar MaintenanceRequest
    Prisma->>SQLite: Criar StatusHistory
    SQLite-->>Prisma: Transação concluída
    Prisma-->>Service: Solicitação atualizada
    Service-->>API: Detalhes e histórico atualizados
    API-->>Axios: HTTP 200
    Axios-->>Mobile: Solicitação atualizada
    Mobile-->>ADMIN: Atualizar status e histórico na interface
```

Autenticação e autorização acontecem antes da regra de domínio. O serviço aceita somente a próxima transição definida e usa uma transação Prisma para manter solicitação e histórico consistentes.

## Requisitos relacionados

- **Diagrama 1:** RF004, RF005, RF007, RF013, RF015, RNF003, RNF006, RNF007, RNF009 e RNF011.
- **Diagrama 2:** RF007, RF010, RF011, RF013, RF014, RNF003, RNF006, RNF007 e RNF009.
