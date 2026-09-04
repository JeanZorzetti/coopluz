# Feature Specification: Linguagem do cooperado, regra de qualificação e declarações da auditoria 1

**Feature Branch**: `004-linguagem-cooperado`

**Created**: 2026-09-04

**Status**: Clarified — pronto para `speckit-plan`

**Input**: User description: "Aplicar a auditoria 1 na parte que não é troca de
frase: a terminologia `associado` → `cooperado`, a regra dos R$ 250 e as
declarações jurídicas."

## Contexto

A [auditoria 1](../../docs/auditorias/auditoria1.md) revisou 14 blocos de copy
do site. Quatro deles são redação pura — trocam uma frase e morrem no arquivo
onde estão (itens 2, 3, 6, 7 e a metade redacional do 8/9/10). Esses saem em um
commit direto e estão **fora desta feature**.

Os outros arrastam três sistemas que já existem no site, cada um com mais de um
ponto de verdade:

| Frente | O que a auditoria pede | Onde isso vive hoje |
|---|---|---|
| **Terminologia** | `associado` → `cooperado`, `associação` → `ativação`/`adesão` | 57 ocorrências de `associa*` em 14 arquivos, incluindo `llms.txt`, JSON-LD, LGPD e 3 posts do blog |
| **Regra de qualificação** | abaixo de R$ 250 deixa de ser corte seco e passa a entrar em análise da Coopluz | 7 lugares: aviso do formulário, 2 FAQs, seção "quem pode participar", termos, `llms.txt`, artigo pilar |
| **Declarações e papéis** | "contrato de ativação/admissão", adesão "totalmente gratuita", Sicoob fora de dois blocos, "zerar a conta" | termos, privacidade, cartão da Sobre, faixa "quem está por trás", JSON-LD |

O que torna isto uma feature e não um `sed`: **a palavra e a regra são a
interface pública do produto**. O `llms.txt` e o JSON-LD são o texto que um
motor generativo cita quando alguém pergunta sobre conta de luz em Goiás
(Princípio VI e a razão de ser da spec 003); a página de privacidade usa
"associação" como **termo jurídico da base legal LGPD**, não como jargão de
marketing; e um dos slugs do blog carrega `associacao` na própria URL, já
indexada. Aplicar em metade dos lugares publica duas versões do mesmo produto
no mesmo domínio — a falha que o Princípio II existe para evitar.

## Clarifications

### Session 2026-09-04

Sete perguntas, sete respostas do dono do projeto. Nenhuma pendência.

- Q: Qual o nome do documento que a Coopluz emite — a auditoria usa três
  (itens 4, 11 e 12)? → A: **"Termo de adesão"**, em todas as páginas,
  substituindo "termo de associação" e "contrato de ativação/admissão".
- Q: O desconto entra na próxima fatura após aprovação (item 1) ou o primeiro
  crédito aparece em até 90 dias (itens 13 e 14)? → A: **Os dois, na ordem
  certa** — a aprovação sai rápido, o primeiro crédito depende do ciclo de
  leitura da Equatorial e continua em até 90 dias. O site não promete prazo que
  a distribuidora controla.
- Q: A faixa abaixo de R$ 250 continua sendo recusa ou passa a análise? → A:
  **Entra para análise da Coopluz**, nos 7 pontos onde a regra aparece —
  inclusive no argumento do parceiro, que precisa ser reescrito.
- Q: "Dá para zerar sua conta de energia" (item 5) é promessa de produto? → A:
  **Não, é sobre o parceiro**: a comissão da carteira pode cobrir a própria
  conta de luz de quem indica. O bloco é de captação de parceiro e deve dizer
  isso com todas as letras — sem a condição escrita, a frase vira promessa de
  resultado ao cooperado.
- Q: "Totalmente gratuito" (item 1) convive com o saldo residual devido na
  saída? → A: **Sim, adotar a frase da auditoria** nas páginas de produto; a
  cláusula do residual permanece nos termos de uso, onde já está. Decisão do
  dono, ciente de que a condição não aparece na mesma tela da promessa.
- Q: O Sicoob Secovicred sai do cartão da Coopluz e do fecho dos termos? → A:
  **Não — mantido nos três lugares.** A parceria continua válida; o sumiço em
  dois blocos da auditoria foi corte de redação, não decisão.
- Q: O slug `cancelar-associacao-cooperativa-energia-goias` é renomeado? → A:
  **Não.** URL é endereço, não vocabulário: o texto do post troca de palavra, a
  URL fica, e nenhum 301 novo é criado.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A palavra do site é a palavra do contrato (Priority: P1)

Alguém lê a home, decide pedir análise, é atendida no WhatsApp e recebe o
documento da Coopluz. A palavra que descreve o que ela está virando é a mesma
nos quatro momentos — no site, no formulário, no atendimento e no papel.

**Why this priority**: é o motivo da auditoria existir. Divergência de termo
entre o site e o contrato é exatamente o tipo de ruído que faz a pessoa parar
no meio da assinatura para perguntar se é a mesma coisa.

**Independent Test**: pesquisar `associad` e `associaç` em `src/` e obter
somente as ocorrências da lista de exceções aprovada (base legal LGPD e slug
legado, se mantido); abrir `/llms.txt` e o JSON-LD de qualquer página e
encontrar a mesma palavra da home.

**Acceptance Scenarios**:

1. **Given** qualquer página do site, **When** o texto visível é lido, **Then**
   a pessoa que se cadastra é chamada pelo mesmo termo em todas elas.
2. **Given** o `llms.txt` e o `@graph` do JSON-LD, **When** comparados ao texto
   da home, **Then** usam o mesmo termo — o que a IA cita é o que o site diz.
3. **Given** a página de privacidade, **When** a base legal é lida, **Then** o
   termo jurídico continua descrevendo com precisão o vínculo tratado, mesmo
   que difira do termo de marketing — e a divergência está justificada em
   comentário no código.
4. **Given** os três posts do blog, **When** lidos, **Then** nenhum deles
   contradiz o vocabulário das páginas de produto.

---

### User Story 2 - Conta abaixo de R$ 250 recebe uma resposta, não uma porta (Priority: P1)

Quem tem conta média abaixo de R$ 250 escolhe essa faixa no formulário e, em
vez de ler que "o desconto não compensa a operação", entende que o cadastro
segue para análise da Coopluz.

**Why this priority**: muda o resultado do funil, não a redação. Hoje o site
dispensa esse público em 7 lugares; a auditoria passa a aceitá-lo condicionado
a análise. Metade aplicada significa o formulário aceitando e o FAQ recusando
a mesma pessoa.

**Independent Test**: selecionar "Até R$ 250" no formulário da home e conferir
que o aviso exibido, o FAQ da home, o FAQ de `/parceiro`, a seção "quem pode
participar", os termos, o `llms.txt` e o artigo pilar dizem a mesma coisa.

**Acceptance Scenarios**:

1. **Given** o formulário da home, **When** "Até R$ 250" é selecionada,
   **Then** o aviso descreve o encaminhamento para análise — e continua **não
   bloqueante**, como já é hoje.
2. **Given** a seção "quem pode participar", **When** lida, **Then** a faixa
   abaixo de R$ 250 não aparece mais na coluna de quem está fora, ou aparece
   com a condição correta.
3. **Given** o FAQ de `/parceiro`, **When** o parceiro lê o critério de
   indicação, **Then** ele encontra a mesma regra da página de produto.
4. **Given** os termos de uso, **When** a cláusula de limites é lida, **Then**
   ela não contradiz o que o formulário aceitou.

---

### User Story 3 - Quem emite o quê continua declarado sem contradição (Priority: P1)

Quem lê os termos, a Sobre e a faixa "quem está por trás" entende, nas três,
que a Coopluz emite o documento e a Autogestor opera o site — sem que uma
página cite o Sicoob e a outra o omita, e sem que o nome do documento mude de
página para página.

**Why this priority**: é o Princípio VI da constituição, que não é boa prática
opcional. As frases que a auditoria mexe são justamente as que sustentam a
declaração de papéis.

**Independent Test**: ler os quatro blocos de papéis (faixa da home, dois
cartões da Sobre, dois primeiros parágrafos dos termos) e não encontrar
divergência sobre quem emite o quê, nem sobre quem participa.

**Acceptance Scenarios**:

1. **Given** as páginas de produto e as legais, **When** o documento emitido
   pela Coopluz é citado, **Then** é sempre pelo mesmo nome.
2. **Given** qualquer página, **When** o texto é lido, **Then** nenhum trecho
   sugere que o site é o canal oficial da cooperativa (FR-015 da spec 003
   permanece válido).
3. **Given** a menção ao Sicoob Secovicred, **When** aparece, **Then** aparece
   de forma consistente nos blocos que descrevem a mesma relação.
4. **Given** o JSON-LD, **When** validado, **Then** `publisher` continua sendo
   a Autogestor e `about` continua sendo a Coopluz.

---

### Edge Cases

- **"3.865 associados" é dado de terceiro.** O número da seção "números da
  cooperativa" veio do material institucional da Coopluz. A palavra pode mudar;
  o dado, não — e se o material usa "associados", trocar a legenda cria
  divergência com a fonte citada.
- **`privacidade.astro` usa "associação" como termo jurídico.** Aparece na base
  legal (LGPD art. 7º, V), no prazo de retenção e na finalidade do tratamento.
  Trocar por "ativação" ali muda o sentido de uma cláusula legal, não de uma
  chamada de marketing.
- **Slug indexado.** `cancelar-associacao-cooperativa-energia-goias` tem o termo
  na URL. Decidido manter (FR-016): o texto do post fala a língua nova e a URL
  continua sendo endereço. Consequência aceita: quem lê a URL na SERP vê o
  vocabulário antigo.
- **Contradição interna da auditoria.** O item 1 promete desconto na próxima
  fatura após aprovação; os itens 13 e 14 mantêm 90 dias para o primeiro
  crédito. Resolvida em FR-010: aprovação rápida, crédito em até 90 dias.
- **Gratuidade sem a ressalva na mesma tela.** FR-013 mantém o saldo residual
  nos termos, não nas páginas de produto. É decisão consciente do dono; o link
  para os termos precisa continuar alcançável de qualquer página, senão a
  condição deixa de existir para quem decide.
- **O parceiro vende o critério de recusa.** O FAQ de `/parceiro` usa a recusa
  abaixo de R$ 250 como argumento ("para você não gastar seu relacionamento com
  uma indicação que vai voltar"). Mudar a regra sem reescrever o argumento
  entrega ao parceiro uma promessa que a operação não sustenta mais.
- **Texto que a IA cita.** `llms.txt` e JSON-LD são reescritos por último em
  qualquer refatoração e são os primeiros a serem lidos por um motor
  generativo. Se ficarem para trás, o site passa a ser citado com o vocabulário
  e a regra antigos.

## Requirements *(mandatory)*

### Functional Requirements

**Terminologia**

- **FR-001**: O site MUST usar um único termo para a pessoa que se cadastra, em
  todas as páginas, no formulário, no `llms.txt`, no JSON-LD e nos posts do
  blog.
- **FR-002**: O documento emitido pela Coopluz MUST ser chamado de **"termo de
  adesão"** em todas as páginas, no `llms.txt` e nos comentários do JSON-LD.
- **FR-003**: Os trechos de valor jurídico da página de privacidade MUST manter
  o termo que descreve corretamente o vínculo tratado, e cada divergência
  deliberada em relação ao termo de marketing MUST estar justificada em
  comentário no código (Princípio III).
- **FR-004**: Dados atribuídos ao material institucional da Coopluz MUST
  continuar iguais à fonte citada, mesmo que a legenda mude de palavra.
- **FR-005**: A troca MUST ser aplicada em uma única entrega — o site não MUST
  ser publicado com os dois vocabulários coexistindo.

**Regra de qualificação**

- **FR-006**: A faixa abaixo de R$ 250 MUST ser descrita como **encaminhada
  para análise da Coopluz**, com o mesmo tratamento nos 7 pontos onde a regra
  aparece hoje. Nenhuma página MUST continuar dizendo que "o desconto não
  compensa a operação".
- **FR-007**: O aviso da faixa no formulário MUST continuar informativo e não
  bloqueante — a pessoa MUST poder enviar o pedido.
- **FR-008**: O texto do FAQ de `/parceiro` MUST descrever a mesma regra das
  páginas de produto, incluindo o que o parceiro deve dizer a uma indicação
  dessa faixa.
- **FR-009**: A regra publicada MUST ser a que o atendimento consegue executar
  — o site não MUST prometer análise que a Coopluz não faz.

**Declarações e promessas**

- **FR-010**: O prazo MUST ser declarado em dois tempos, iguais em todas as
  páginas: a aprovação sai rápido e o **primeiro crédito na fatura aparece em
  até 90 dias**, conforme o ciclo de leitura da Equatorial Goiás. Nenhum texto
  MUST prometer desconto na próxima fatura como se fosse o prazo de ativação.
- **FR-011**: O percentual de desconto anunciado MUST ser o mesmo em todas as
  páginas, incluindo títulos, CTAs e `llms.txt`.
- **FR-012**: "Zerar a conta" MUST aparecer somente no bloco de captação de
  parceiro e MUST vir com a condição escrita — é a comissão da carteira que
  pode cobrir a própria conta de luz de quem indica, não um resultado oferecido
  ao cooperado. Nenhuma página de produto MUST prometer conta zerada.
- **FR-013**: As páginas de produto MUST descrever a adesão como gratuita
  ("sem taxa de adesão, sem multa para cancelar"), e a cláusula do saldo
  residual devido na saída MUST permanecer nos termos de uso, acessível a
  partir de qualquer página.
- **FR-014**: O Sicoob Secovicred MUST continuar citado nos três blocos onde
  aparece hoje — faixa "quem está por trás", cartão da Coopluz na Sobre e fecho
  dos termos.
- **FR-015**: A declaração de papéis exigida pela spec 003 (FR-012 a FR-015)
  MUST permanecer intacta: cabeçalho, rodapé e JSON-LD continuam nomeando a
  Autogestor como operadora e a Coopluz como entidade descrita.

**URLs e busca**

- **FR-016**: Nenhuma URL MUST ser renomeada por causa do vocabulário — o slug
  `cancelar-associacao-cooperativa-energia-goias` permanece como está, e o
  corpo do post troca de palavra normalmente.
- **FR-017**: A feature MUST terminar sem nenhum 301 novo e sem alterar o
  `sitemap.xml`.

**Guarda**

- **FR-018**: O repositório MUST ter uma verificação automática, rodando em
  `npm test`, que falhe quando o vocabulário antigo reaparecer fora da lista de
  exceções aprovada — a troca não MUST depender de revisão manual em cada PR
  futuro.

### Key Entities

- **Termo do cooperado** — a palavra que nomeia quem se cadastra. Tem uma
  versão de marketing e pode ter uma versão jurídica distinta; ambas precisam
  ser explícitas e justificadas.
- **Faixa abaixo de R$ 250** — segmento de consumo que hoje é desqualificado em
  7 pontos do site e que a auditoria passa a encaminhar para análise. É regra
  de negócio, não texto.
- **Bloco de auditoria** — cada um dos 14 itens do documento de origem, com
  destino no código e delta contra o que está no ar.
- **Ponto de citação por IA** — `llms.txt` e JSON-LD. Texto lido por motor
  generativo, sempre o último a ser atualizado e o primeiro a ser citado.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Zero ocorrências do vocabulário antigo em `src/`, fora da lista
  de exceções aprovada e documentada.
- **SC-002**: Os 7 pontos da regra de R$ 250 declaram o mesmo tratamento —
  verificável lendo os 7 trechos lado a lado.
- **SC-003**: Uma única promessa de prazo e uma única promessa de percentual em
  todo o site, incluindo `llms.txt` e JSON-LD.
- **SC-004**: Zero URLs alteradas e zero 301 novos — o `sitemap.xml` gerado
  depois da feature é idêntico ao de antes.
- **SC-005**: `npm test` e `npm run build` passam, com a verificação de
  vocabulário do FR-018 incluída na suíte.
- **SC-006**: A expressão "zerar a conta" aparece em no máximo um bloco do
  site, e nele a condição (comissão da carteira do parceiro) está na mesma
  frase.
- **SC-007**: A declaração de papéis do Princípio VI continua alcançável em
  cabeçalho, rodapé e JSON-LD depois da mudança.

## Assumptions

- A auditoria 1 reflete a intenção do dono do produto, não uma sugestão em
  aberto: os itens são para aplicar, e as ambiguidades listadas em
  Clarifications são lacunas de informação, não recusas.
- O texto do documento de origem está verbatim, com erros de digitação
  preservados. Corrigir português na aplicação é esperado e não conta como
  mudança de conteúdo.
- A Coopluz não mudou de produto: continua sendo compensação de energia com
  desconto na fatura da Equatorial Goiás, sem obra e sem troca de titularidade.
- Nada nesta feature depende do hub `autogestor` — os 301 da spec 003 já estão
  no ar e não são tocados aqui.

## Out of Scope

- Os blocos puramente redacionais da auditoria (itens 2, 3, 6, 7 e a parte de
  redação de 8, 9 e 10) — aplicados em commit direto, sem spec.
- Qualquer mudança visual: paleta, símbolo, tipografia e layout continuam como
  a spec 003 deixou.
- Novos artigos de blog ou expansão de conteúdo.
- Alteração no endpoint de lead, no schema do banco ou no painel do hub.
- Propriedade GA4 dedicada e migração de domínio — seguem fora, como na 003.
