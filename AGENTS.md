# Orientações para trabalhar no FixFlow

## Contexto e fonte da verdade

O FixFlow é um projeto acadêmico incremental para registrar e acompanhar solicitações de manutenção. Leia `README.md` e todos os arquivos de `docs/` antes de propor mudanças. Inspecione a área afetada e consulte `git status` antes e depois de editar. Preserve o que já existe; não recrie o projeto.

`docs/rubrica.md` registra os critérios acadêmicos e o estado verificado. `docs/roadmap.md` organiza as etapas previstas. `docs/evolucao.md` registra o histórico do produto. Uma funcionalidade planejada não deve ser descrita como implementada sem evidência no código e, quando cabível, verificação de funcionamento.

## Escopo e implementação

- Execute apenas a etapa autorizada pelo usuário. Não antecipe funcionalidades futuras do roadmap.
- Mantenha React Native + Expo + TypeScript no mobile; Node.js + Express + TypeScript na API; Prisma + SQLite para persistência; Axios para comunicação; JWT para autenticação; Multer para upload de imagens, conforme a etapa aprovada.
- Ao implementar código em etapas futuras, favoreça organização por responsabilidade, componentes reutilizáveis, nomes claros, validação de dados e regras de negócio na API.
- Documente decisões, critérios de aceite e evolução à medida que forem implementados. Atualize o status da rubrica com base em evidências reais.
- Preserve alterações preexistentes do usuário e evite mexer em arquivos fora do escopo solicitado.

## Git

O usuário fará todos os commits manualmente. Não execute `git add`, `git commit`, `git push`, `git pull`, `git merge`, `git rebase`, `git reset` nem comandos que alterem o histórico. Não altere a configuração de autoria e não adicione `Co-authored-by`.

## Limite de cada etapa

O pedido mais recente do usuário define o escopo autorizado da etapa vigente. Instruções de escopo de etapas anteriores são históricas e não impedem uma nova etapa explicitamente autorizada.
