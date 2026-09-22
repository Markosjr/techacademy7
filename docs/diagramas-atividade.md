# Diagramas de Atividade

## Diagrama 1 — Abertura de solicitação

```mermaid
flowchart TD
    A([Usuário autenticado]) --> B[Nova solicitação]
    B --> C[Preencher título e descrição]
    C --> D[Selecionar categoria]
    D --> E[Selecionar prioridade]
    E --> F{Selecionar imagem opcional?}
    F -- Sim --> G[Selecionar imagem e mostrar prévia]
    F -- Não --> H[Validar formulário]
    G --> H
    H --> I{Dados válidos?}
    I -- Não --> J[Exibir mensagem e permitir correção]
    J --> C
    I -- Sim --> K[Enviar JSON para a API]
    K --> L{Solicitação persistida?}
    L -- Não --> M[Exibir erro sem concluir o cadastro]
    M --> C
    L -- Sim --> N[Receber ID da solicitação]
    N --> O{Existe imagem selecionada?}
    O -- Não --> P[Abrir detalhes]
    O -- Sim --> Q[Enviar multipart/form-data]
    Q --> R[Multer salva arquivo com nome UUID]
    R --> S{Extensão, MIME, conteúdo e tamanho válidos?}
    S -- Não --> T[Remover arquivo e informar falha de upload]
    T --> P
    S -- Sim --> U[Persistir RequestImage]
    U --> V{Persistência concluída?}
    V -- Não --> W[Remover arquivo e informar falha de upload]
    W --> P
    V -- Sim --> P
    P --> X([Exibir solicitação e imagens])
```

O cadastro principal continua em JSON. A imagem opcional é enviada depois que a API devolve o ID. Se esse segundo envio falhar, a solicitação permanece criada e o usuário pode tentar novamente enquanto ela estiver `ABERTA`.

## Diagrama 2 — Fluxo de atendimento

```mermaid
flowchart LR
    A([ABERTA])
    B([EM_ANALISE])
    C([EM_ANDAMENTO])
    D([[CONCLUIDA<br/>estado final]])
    E([[CANCELADA<br/>estado final]])

    A -- ADMIN avança status --> B
    B -- ADMIN avança status --> C
    C -- ADMIN avança status --> D
    A -- USER cancela pedido próprio --> E
    B -- USER cancela pedido próprio --> E
```

O administrador segue a ordem `ABERTA → EM_ANALISE → EM_ANDAMENTO → CONCLUIDA`. O usuário proprietário pode cancelar somente em `ABERTA` ou `EM_ANALISE`. `CONCLUIDA` e `CANCELADA` não possuem transições de saída.

## Requisitos relacionados

- **Diagrama 1:** RF004, RF005, RF007, RF013, RF015, RNF007, RNF009, RNF010 e RNF011.
- **Diagrama 2:** RF007, RF009, RF011, RF013 e RF014.
