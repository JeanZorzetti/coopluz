# Feature Specification: Identidade própria da Coopluz e fim da canibalização de SEO

**Feature Branch**: `003-identidade-coopluz`

**Created**: 2026-08-21

**Status**: Draft

**Input**: User description: "Eram pra ser sites diferentes, pra não ter
canibalismo de SEO. Autogestor é um apanhado geral de todos os 6 serviços; a
Coopluz precisa ter identidade própria — paleta, logo, design."

## Contexto

A spec 002 extraiu o site da Coopluz do hub como projeto irmão, mas fez
**extração, não diferenciação**: o site herdou a paleta azul/laranja da
Autogestor, a logo do vórtice hexagonal, a fonte de exibição (Archivo), a
imagem de compartilhamento e o nome de marca ("Autogestor Energia"). Herdou
também o conteúdo — e o hub **continuou publicando as mesmas quatro URLs**.

Duas consequências, uma visual e uma de busca:

1. **Visualmente o site é a Autogestor.** Quem chega por "conta de luz cara em
   Goiânia" vê a marca de um grupo de seguros/consórcio/viagens. A promessa da
   spec 002 ("um site inteiramente sobre energia em Goiás") não se cumpre
   porque a casca contradiz o conteúdo.
2. **Quatro URLs existem em dois domínios ao mesmo tempo.** A spec 002 registrou
   isso como trade-off temporário e adiou a decisão. O prazo chegou.

| Conteúdo | No hub | No site da Coopluz |
|---|---|---|
| Página da vertical de energia | `/coopluz` | `/` |
| Credenciamento de parceiro de energia | `/coopluz/parceiro` | `/parceiro` |
| Artigo pilar (reduzir conta sem placa) | `/blog/reduzir-conta-equatorial-sem-placa-solar` | idem |
| Artigo satélite (Fio B 60% em 2026) | `/blog/fio-b-60-por-cento-2026-conta-equatorial-goias` | idem |

Os dois domínios competem pelas mesmas consultas, com o mesmo texto, sem
sinal de qual é o preferido. É canibalização literal, não risco teórico.

## Clarifications

### Session 2026-08-21

Sessão conduzida em modo autônomo, a pedido do dono do projeto ("tome todas as
decisões por mim, amanhã eu reviso"). As ambiguidades de maior impacto foram
resolvidas com a opção recomendada, registradas aqui para revisão.

- Q: A identidade própria do site deve ser **uma marca nova inventada** para a
  operação de energia da Autogestor, ou a **identidade real da cooperativa
  Coopluz**? → A: A identidade real da Coopluz. A marca que a pessoa procura,
  vê no contrato e reconhece no material impresso é "Coopluz"; inventar uma
  terceira marca criaria confusão em vez de resolvê-la. A paleta
  (verde/teal/azul), o símbolo (lâmpada-folha) e o tom vêm da apresentação
  institucional de abril/2026 da própria cooperativa.
- Q: Se o site adota a identidade da Coopluz, como fica claro que ele **não é**
  o site oficial da cooperativa (`coopluz.eco.br`)? → A: Por divulgação
  explícita e permanente, não por letra miúda: o cabeçalho carrega o selo
  "Representante autorizado" junto da marca; o rodapé nomeia a Autogestor como
  operadora do site e linka o site oficial da cooperativa; o JSON-LD declara a
  Autogestor como `publisher` e a Coopluz como entidade sobre a qual o site
  fala (`about`), nunca como autora dele. Isto é requisito, não recomendação
  (FR-012 a FR-014).
- Q: A canibalização se resolve com `canonical` cruzada (hub aponta para o site
  novo) ou removendo o conteúdo do hub? → A: Removendo, com 301. `canonical`
  cruzada mantém as duas páginas servindo 200 e depende do buscador respeitar
  uma dica; 301 é instrução, consolida autoridade de link e não deixa a página
  duplicada acessível. As quatro URLs saem do hub e redirecionam.
- Q: A logo do site deve ser a marca registrada da Coopluz reproduzida? → A:
  Não. O site gera um **símbolo próprio** (lâmpada-folha construída por
  fórmula, na paleta da cooperativa) para a marca do cabeçalho, favicon e
  textura. O lockup oficial da Coopluz aparece onde é atribuição de terceiro —
  a faixa "quem está por trás" —, na versão vetorial correta, não numa cópia
  desenhada à mão.
- Q: Trocar a propriedade GA4 para uma dedicada? → A: Não nesta feature. É uma
  linha em `consts.ts` e a decisão de medir separado é do dono, não de
  engenharia. Fora de escopo, registrado.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Chegar pela dor e reconhecer a marca certa (Priority: P1)

Alguém em Goiânia com a conta da Equatorial alta pesquisa como pagar menos,
cai no site e, na primeira dobra, vê a marca **Coopluz** — a mesma que vai
aparecer no termo de associação que assinar. Não vê a marca de um grupo de
seguros. Entende, sem procurar, que quem opera o atendimento é a Autogestor,
representante autorizado.

**Why this priority**: é o motivo da feature existir. Marca errada na primeira
dobra é atrito de confiança exatamente no momento em que a pessoa decide se
fica ou volta para a busca.

**Independent Test**: abrir a home num navegador limpo e, sem rolar, conseguir
responder "de quem é esse site?" com "Coopluz, operado por um representante
autorizado" — sem abrir o rodapé nem a página Sobre.

**Acceptance Scenarios**:

1. **Given** a home carregada no topo, **When** o visitante olha o cabeçalho,
   **Then** vê o símbolo lâmpada-folha, a palavra "Coopluz" e o selo
   "Representante autorizado Autogestor" — os três visíveis sem rolagem.
2. **Given** qualquer página do site, **When** o visitante chega ao rodapé,
   **Then** lê quem opera o site (Autogestor, CNPJ/razão social) e encontra
   link para o site oficial da cooperativa.
3. **Given** a home compartilhada no WhatsApp, **When** o cartão de
   pré-visualização é gerado, **Then** ele exibe a marca Coopluz — não a
   imagem de compartilhamento do hub.

---

### User Story 2 - O buscador para de ver duas páginas iguais (Priority: P1)

Um rastreador de busca visita as quatro URLs duplicadas no hub e recebe, em
todas, um 301 para o endereço equivalente no site da Coopluz. O hub deixa de
concorrer consigo mesmo e a autoridade acumulada pelos dois artigos já
indexados passa para o domínio que deve ranquear.

**Why this priority**: é a metade do pedido que não é visual, e é a que tem
prazo — quanto mais tempo as duas versões coexistem, mais sinal contraditório
se acumula.

**Independent Test**: requisitar as quatro URLs do hub e conferir status 301 e
o `Location` exato; requisitar o `sitemap.xml` do hub e confirmar que nenhuma
delas aparece.

**Acceptance Scenarios**:

1. **Given** o hub publicado, **When** `/coopluz` é requisitada, **Then** a
   resposta é 301 para `https://coopluz.roilabs.com.br/`.
2. **Given** o hub publicado, **When** `/coopluz/parceiro` é requisitada,
   **Then** a resposta é 301 para `https://coopluz.roilabs.com.br/parceiro`.
3. **Given** o hub publicado, **When** qualquer um dos dois artigos do cluster
   de energia é requisitado, **Then** a resposta é 301 para o mesmo caminho no
   site da Coopluz.
4. **Given** a home do hub, **When** o visitante clica no card da vertical de
   energia, **Then** ele vai direto ao site da Coopluz — sem passar por um
   redirect do próprio hub.
5. **Given** o `sitemap.xml` do hub, **When** ele é lido, **Then** nenhuma das
   quatro URLs migradas consta nele.

---

### User Story 3 - O site parece desenhado, não configurado (Priority: P2)

Quem chega ao site percebe um sistema visual coerente e específico de energia
solar cooperada: verde de geração, teal de compensação, azul de rede elétrica.
Não é um tema trocado por cima do layout antigo — o gesto da marca, os estados
e a tipografia acompanham.

**Why this priority**: a identidade só cumpre a função de diferenciação se for
sistêmica. Trocar cinco variáveis de cor e manter o vórtice hexagonal da
Autogestor no herói entregaria metade do problema resolvido.

**Independent Test**: abrir o site lado a lado com o hub e não encontrar
nenhum elemento visual compartilhado — nem cor, nem símbolo, nem fonte de
exibição.

**Acceptance Scenarios**:

1. **Given** qualquer página, **When** o tema escuro é ativado, **Then** a
   paleta continua sendo a mesma marca com a luz apagada — sem cor da
   Autogestor reaparecendo em nenhum estado.
2. **Given** o herói da home, **When** a página é rolada, **Then** o gesto de
   marca em movimento usa o símbolo da Coopluz, não o vórtice hexagonal.
3. **Given** o favicon na aba do navegador, **When** comparado ao do hub,
   **Then** são símbolos diferentes.

---

### Edge Cases

- **Contraste da marca.** O verde da Coopluz (`#40AC68`) sobre branco dá
  2,87:1 e reprova em AA. Como no hub, a cor da marca não é escurecida: o
  botão primário usa verde com **texto tinta** (5,98:1). A regra do Princípio V
  vale igual para a marca nova.
- **Link já compartilhado do hub.** Alguém pode ter salvo ou enviado o link
  antigo de `/coopluz`. O 301 preserva esse acesso; nenhuma URL vira 404.
- **Navegação interna do hub.** Removida a página, todo link interno para
  `/coopluz` no hub (nav, grade da home, grade "outras soluções" das outras
  cinco verticais, blog) precisa apontar para o domínio externo, ou o hub
  manda o próprio visitante para um redirect.
- **Lead de energia enviado ao hub.** O endpoint do hub continua aceitando os
  slugs `coopluz` e `parceiro-coopluz`: leads já gravados usam esses valores e
  o painel os lê. Remover a página não pode invalidar o histórico.
- **Sem suporte a `mask-image` ou a `light-dark()`.** O gesto de marca e o
  tema escuro já nascem atrás de `@supports`; a identidade nova mantém esse
  fallback — sem máscara, a página continua composta no tema claro.
- **Marca de terceiro sem ativo vetorial.** O lockup oficial da Coopluz não
  existia em vetor no repositório; a versão em uso era um PNG desatualizado,
  de uma geração anterior da marca (verde/lima), diferente da atual.

## Requirements *(mandatory)*

### Functional Requirements

**Identidade visual**

- **FR-001**: O sistema de design MUST usar a paleta da Coopluz, derivada do
  material institucional da cooperativa: verde `#40AC68`, teal `#248CA0` e
  azul `#1C68B4` como primitivos de marca.
- **FR-002**: Nenhum token semântico MUST resolver para uma cor da paleta da
  Autogestor (azul `#005CA6`/`#002B74`, laranja `#E47A45`) em nenhum dos dois
  temas.
- **FR-003**: O site MUST ter símbolo próprio — lâmpada-folha — usado como
  marca do cabeçalho, favicon, ícone de aplicativo e textura de marca.
- **FR-004**: O símbolo MUST ser gerado por fórmula, em vetor, e MUST herdar as
  cores dos tokens da página, de modo a acompanhar o tema claro/escuro.
- **FR-005**: A fonte de exibição MUST ser diferente da usada pelo hub.
- **FR-006**: O gesto de marca em movimento (textura do herói, carimbo do card,
  transição de rota) MUST usar o símbolo da Coopluz.
- **FR-007**: A imagem de compartilhamento (Open Graph) MUST ser própria do
  site e exibir a marca Coopluz.
- **FR-008**: Favicon, ícone de aplicativo e `theme-color` MUST corresponder à
  identidade nova.

**Acessibilidade da identidade** (Princípio V da constituição)

- **FR-009**: Todo par de texto/fundo introduzido MUST passar em WCAG AA
  (4,5:1 texto normal; 3:1 texto grande e contorno de controle), nos dois
  temas, com o valor medido registrado no código.
- **FR-010**: Quando a cor da marca reprovar em contraste, o **texto** MUST ser
  trocado — a cor da marca não MUST ser escurecida para passar.
- **FR-011**: O anel de foco MUST permanecer visível sobre todas as superfícies
  novas, incluindo a superfície de marca.

**Divulgação de quem opera o site**

- **FR-012**: O cabeçalho MUST exibir, junto da marca, que o site é de um
  representante autorizado — visível sem rolagem, em qualquer largura.
- **FR-013**: O rodapé MUST nomear a Autogestor como operadora do site e MUST
  linkar o site oficial da cooperativa.
- **FR-014**: O JSON-LD MUST declarar a Autogestor como `publisher` do site e a
  Coopluz como entidade descrita (`about`), com os dados de contato públicos da
  cooperativa e `sameAs` para o site oficial dela.
- **FR-015**: Nenhum texto do site MUST afirmar ou sugerir que o site é o canal
  oficial da cooperativa.

**Fim da canibalização**

- **FR-016**: O hub MUST deixar de publicar as quatro URLs migradas.
- **FR-017**: Cada uma das quatro URLs MUST responder 301 para o caminho
  equivalente em `coopluz.roilabs.com.br`.
- **FR-018**: O `sitemap.xml` e o `llms.txt` do hub MUST deixar de listá-las.
- **FR-019**: Todo link interno do hub que apontava para as URLs migradas MUST
  apontar para o domínio externo, sem passar pelo redirect.
- **FR-020**: O hub MUST manter a vertical de energia visível na navegação e na
  grade da home — o que muda é o destino do link, não a existência da oferta.
- **FR-021**: O endpoint de lead do hub MUST continuar aceitando os slugs
  `coopluz` e `parceiro-coopluz`.

**Nomeação**

- **FR-022**: O nome do site MUST ser "Coopluz Goiás" em `og:site_name`,
  `WebSite.name`, cabeçalho e rodapé — não "Autogestor Energia".
- **FR-023**: Os títulos de página MUST terminar na marca do site, não na do
  hub.

### Key Entities

- **Coopluz (cooperativa)** — entidade descrita pelo site. Cooperativa de
  geração distribuída de energia solar, sede em Goiânia, site oficial
  `coopluz.eco.br`. Emite o termo de associação. Não opera este site.
- **Autogestor (representante autorizado)** — operadora deste site. Faz
  captação, cadastro e acompanhamento do associado. É o `publisher` do JSON-LD
  e a titular do WhatsApp de atendimento.
- **Token semântico** — cada papel de cor da interface. A troca de identidade
  reescreve o valor de cada token; os papéis e os nomes permanecem, para que
  nenhum componente precise ser reescrito por causa de cor.
- **URL migrada** — cada uma das quatro páginas que existiam nos dois domínios.
  Tem origem (hub) e destino (site da Coopluz), e vira uma regra de 301.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Zero elementos visuais compartilhados entre o hub e o site da
  Coopluz: nenhuma cor de marca, nenhum símbolo, nenhuma fonte de exibição em
  comum.
- **SC-002**: 100% das quatro URLs migradas respondem 301 com o destino exato;
  zero delas responde 200 no hub.
- **SC-003**: Zero das quatro URLs migradas aparece no `sitemap.xml` ou no
  `llms.txt` do hub.
- **SC-004**: 100% dos pares de contraste da paleta nova passam em WCAG AA nos
  dois temas, com o valor medido registrado ao lado da declaração.
- **SC-005**: O orçamento de JavaScript enviado ao navegador não aumenta —
  identidade é CSS e vetor, não script.
- **SC-006**: `npm test` e `npm run build` passam nos dois repositórios.
- **SC-007**: A divulgação de "representante autorizado" é alcançável sem
  rolagem em telas de 360px de largura.

## Assumptions

- A Autogestor é representante autorizado da Coopluz e está autorizada a usar a
  identidade da cooperativa em material de captação — a apresentação
  institucional de abril/2026 da própria Coopluz lista a Autogestor como
  Representante Autorizado, ao lado do Sicoob Nova Central e do Sicoob
  Secovicred.
- A paleta oficial vigente é a do material de abril/2026 (verde/teal/azul). O
  PNG que estava no repositório é de uma geração anterior da marca e será
  substituído.
- Os textos de conteúdo permanecem como estão. Esta feature troca a casca e
  resolve a duplicação; reescrever ou aprofundar conteúdo continua sendo
  iniciativa separada, como já registrado na spec 002.
- O domínio de produção continua sendo `coopluz.roilabs.com.br`. A eventual
  migração para `coopluz.autogestor.com.br` prevista no documento de estrutura
  do hub é decisão de infraestrutura, fora desta feature.

## Out of Scope

- Propriedade GA4 dedicada para o site (decisão do dono, uma linha em
  `consts.ts`).
- Reescrita ou expansão de conteúdo, novos artigos de blog.
- Sites próprios das outras cinco verticais.
- Painel administrativo — continua sendo o do hub, sem alteração.
- Migração de domínio.
