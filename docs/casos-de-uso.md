# Diagramas de Casos de Uso

Os diagramas representam os recursos disponíveis no MVP do FixFlow para os perfis `USER` e `ADMIN`.

## Diagrama 1 — Solicitações pelo USER

```mermaid
flowchart LR
    USER([USER])

    subgraph FixFlow[FixFlow — solicitações do usuário]
        UC1([Cadastrar-se])
        UC2([Autenticar-se])
        UC3([Visualizar próprias solicitações])
        UC4([Criar solicitação])
        UC5([Anexar imagem])
        UC6([Visualizar detalhes])
        UC7([Editar solicitação ABERTA])
        UC8([Cancelar solicitação permitida])
        UC9([Acompanhar histórico])
    end

    USER --- UC1
    USER --- UC2
    USER --- UC3
    USER --- UC4
    USER --- UC5
    USER --- UC6
    USER --- UC7
    USER --- UC8
    USER --- UC9

    UC4 -. imagem opcional .-> UC5
    UC6 -. inclui .-> UC9
```

O usuário comum cadastra e autentica sua conta, cria e acompanha somente as próprias solicitações. A edição e o envio de imagens são permitidos em `ABERTA`; o cancelamento é permitido em `ABERTA` ou `EM_ANALISE`.

## Diagrama 2 — Gerenciamento pelo ADMIN

```mermaid
flowchart LR
    ADMIN([ADMIN])

    subgraph FixFlow[FixFlow — gerenciamento administrativo]
        UC1([Autenticar-se])
        UC2([Visualizar todas as solicitações])
        UC3([Consultar detalhes])
        UC4([Visualizar criador])
        UC5([Alterar prioridade])
        UC6([Avançar status])
        UC7([Acompanhar histórico])
    end

    ADMIN --- UC1
    ADMIN --- UC2
    ADMIN --- UC3
    ADMIN --- UC4
    ADMIN --- UC5
    ADMIN --- UC6
    ADMIN --- UC7

    UC3 -. apresenta .-> UC4
    UC3 -. apresenta .-> UC7
```

O administrador consulta todas as solicitações e seus criadores, visualiza imagens e histórico, ajusta a prioridade de pedidos não finalizados e executa apenas a próxima transição operacional permitida.

## Requisitos relacionados

- **Diagrama 1:** RF001, RF002, RF004, RF005, RF006, RF007, RF008, RF009, RF013, RF014 e RF015.
- **Diagrama 2:** RF002, RF007, RF010, RF011, RF012, RF013 e RF014.
