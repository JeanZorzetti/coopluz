# Implementation Plan: Identidade própria da Coopluz e fim da canibalização

**Spec**: [spec.md](./spec.md) · **Branch**: `003-identidade-coopluz` · **Data**: 2026-08-21

## Resumo técnico

Dois repositórios, dois recortes independentes:

- **`C:\dev\coopluz`** — troca de identidade. É reescrita de **tokens**, não de
  componentes: `global.css` já expõe papéis semânticos (`--marca`, `--acento`,
  `--superficie-marca`…) que todo componente lê. Trocar o valor de cada token
  troca o site inteiro sem tocar em markup. O que sai do token são quatro
  coisas: o símbolo (`Logo.astro` + `public/img/*.svg`), a fonte de exibição
  (`Base.astro`), a imagem de compartilhamento e os textos de marca
  (cabeçalho, rodapé, `og:site_name`, JSON-LD).
- **`C:\dev\autogestor`** — remoção das quatro URLs migradas + 301 + ajuste de
  link interno. Nada de identidade; o hub continua sendo o hub.

## Constitution Check

Avaliado contra `.specify/memory/constitution.md` v1.0.0.

| Princípio | Antes da Phase 0 | Depois da Phase 1 |
|---|---|---|
| **I. HTML estático primeiro, JS por exceção** | ✅ Identidade é CSS, SVG inline e `@font-face`. Zero JS novo. O gesto de marca usa `animation-timeline: scroll()`/`view()`, que é CSS nativo. | ✅ Confirmado: nenhum byte de JS somado; o script do tema é o mesmo de antes, só as duas cores literais mudam. |
| **II. Fonte única por domínio** | ✅ Cor mora em `global.css`; NAP em `consts.ts`; o símbolo é gerado por `logos/gerar-marca.py` e nenhum arquivo derivado é editado à mão. | ✅ `consts.ts` ganha **um** dono novo (`COOPLUZ`, a cooperativa) — separado de `EMPRESA` (a operadora), porque são duas entidades com NAP diferente e misturá-las é exatamente o erro que o princípio previne. |
| **III. Simplicidade deliberada e marcada** | ✅ Nenhuma dependência nova: geração do símbolo em Python puro, rasterização com o `sharp` que o Astro já traz, fonte pelo Google Fonts como já era. | ✅ A OG é gerada por script (`logos/gerar-og.mjs`) com o mesmo `sharp` — a alternativa (arquivo de design mantido à mão) foi recusada porque desatualiza em silêncio, que é como o PNG antigo da marca ficou errado. |
| **IV. Falhar fechado, nunca mentir** | ⚠️ Risco novo e específico desta feature: adotar a identidade de terceiro **é** uma afirmação sobre quem publica. | ✅ Endereçado por requisito, não por bom senso: FR-012 a FR-015 obrigam divulgação no cabeçalho, no rodapé e no JSON-LD (`publisher` = Autogestor, `about` = Coopluz). Não é letra miúda: é a mesma regra de "nenhuma tela afirma o que não ocorreu". |
| **V. Acessibilidade e contraste são requisito** | ⚠️ Paleta nova = todos os pares precisam ser medidos de novo. | ✅ Medidos antes de escritos (FR-009). O verde da marca reprova com branco (2,87:1) e passa com tinta (5,98:1) — mesma decisão do laranja do hub: troca-se o texto, não a cor. Superfície de marca `#0B3D47` dá 11,85:1 com branco e **4,13:1 com o verde da marca**, o que permite usar a cor real da cooperativa como acento sobre ela. |

**Complexity Tracking**: nenhuma violação a registrar. Nenhuma abstração nova,
nenhuma dependência nova, nenhuma rota dinâmica nova.

## Phase 0 — decisões de pesquisa

| Questão | Decisão | Alternativa recusada e por quê |
|---|---|---|
| De onde vem a paleta? | Amostragem direta do lockup vetorial embutido na apresentação institucional de abril/2026 da Coopluz (extraído do PDF, 827×309 com máscara alfa). Verde `#40AC68`, teal `#248CA0`, azul `#1C68B4`. | Amostrar `public/img/parceiros/coopluz.png` — é a geração **anterior** da marca (verde/lima, wordmark cinza-escuro) e não bate com o material atual. O arquivo será substituído. |
| Superfície de marca | `#0B3D47`, teal profundo — o meio do gradiente do símbolo. | Azul profundo tipo `#0F3F6E`: on-brand, mas a poucos graus do `#002B74` da Autogestor. Teal separa as duas marcas de longe, que é o pedido. |
| Fonte de exibição | **Outfit** (variável, geométrica, Google Fonts). Mesma mecânica e mesmo custo do Archivo de hoje: `preconnect` + subset latino por `unicode-range`. | **Montserrat**, que é o que o lockup da Coopluz usa: on-brand, mas é a fonte mais genérica da web. **Archivo**: é a do hub, o que anula FR-005. |
| Símbolo | Lâmpada-folha gerada por fórmula (`logos/gerar-marca.py`): bulbo por superelipse, anel em "C" com abertura, folha por duas arestas de círculo, nervura no eixo. | Traçar a máscara alfa do PNG oficial: produziria uma cópia da marca registrada de terceiro como se fosse nossa. Símbolo próprio, na paleta da cooperativa, é a leitura honesta. |
| Onde entra o lockup oficial | Só na faixa "quem está por trás", como atribuição de terceiro, na versão atual e correta. | Usar o lockup no cabeçalho: aí o site passa a **se apresentar** como a cooperativa, que é o que FR-015 proíbe. |
| Como o hub para de canibalizar | Remoção dos arquivos + `redirects` no `astro.config.mjs` (o adaptador Vercel os emite como 301 de verdade na configuração de rota). | `canonical` cruzada: mantém as duas páginas servindo 200 e depende de o buscador acatar uma dica. 301 é instrução. |

## Phase 1 — desenho

### Mapa de tokens (o que cada papel passa a valer)

Papéis e nomes **não mudam** — é isso que mantém o diff dentro de um arquivo.

| Token semântico | Autogestor (antes) | Coopluz (depois) | Contraste medido |
|---|---|---|---|
| `--marca` | `#005CA6` | `#1C68B4` | 5,69:1 sobre branco |
| `--marca-forte` | `#002B74` | `#12518F` | 8,15:1 sobre branco |
| `--acento` (CTA) | `#E47A45` | `#40AC68` | 5,98:1 com texto tinta |
| `--acento-texto` | tinta | tinta | — (mesma decisão do hub) |
| `--superficie-marca` | `#002B74` | `#0B3D47` | 11,85:1 com branco |
| `--tinta` | `#0B1B2B` | `#0B1F1C` | 17,3:1 sobre branco |
| `--brasa` (gesto) | `#FE9D41` | `#5FD08F` | 6,15:1 sobre a superfície de marca |
| `--lamina` (gesto) | `#6CA4F9` | `#63C6E0` | — (só decorativo, atrás de `@supports`) |

A escala de cinza passa de azulada para levemente esverdeada, pelo mesmo motivo
de sempre: cinza neutro ao lado de verde lê como cinza sujo.

### Arquivos tocados

**`C:\dev\coopluz`**

| Arquivo | Mudança |
|---|---|
| `logos/gerar-marca.py` | **novo** — gera `logo.svg`, `logo-mono.svg`, `favicon.svg` e o corpo de `Logo.astro` |
| `logos/rasterizar.mjs` | **novo** — `favicon.png`, `icon-512.png`, `apple-touch-icon.png` (usa o `sharp` do Astro) |
| `logos/gerar-og.mjs` | **novo** — `public/img/og.png` 1200×630 |
| `src/styles/global.css` | reescrita dos primitivos e dos semânticos, nos dois temas; gradiente do `.selo` |
| `src/components/Logo.astro` | símbolo novo, gerado |
| `src/components/Header.astro` | lockup marca + selo "Representante autorizado" |
| `src/components/Footer.astro` | nome do site, divulgação da operadora, link do site oficial |
| `src/layouts/Base.astro` | fonte Outfit, `theme-color`, `og:site_name`, `@graph` (`publisher`/`about`) |
| `src/consts.ts` | entidade `COOPLUZ` (NAP público da cooperativa) |
| `src/pages/*.astro` | títulos terminando em "Coopluz Goiás"; classes que citavam laranja |
| `public/img/parceiros/coopluz.png` | substituído pelo lockup atual |
| `README.md`, `.specify/memory/constitution.md` | título e decisões atualizados |

**`C:\dev\autogestor`**

| Arquivo | Mudança |
|---|---|
| `astro.config.mjs` | `redirects` das quatro URLs |
| `src/pages/coopluz.astro`, `src/pages/coopluz/parceiro.astro` | removidos |
| `src/content/blog/*energia*` (2 arquivos) | removidos |
| `src/data/solucoes.ts` | `COOPLUZ` e `PARCEIRO_COOPLUZ` ganham `externo` (URL absoluta) |
| `src/components/*`, `src/layouts/Vertical.astro` | link da vertical de energia respeita `externo` |
| `src/pages/llms.txt.ts` | deixa de listar as URLs migradas |

### Contratos de verificação

- `npm test` na raiz do `coopluz` e do `autogestor`.
- `npm run build` nos dois — o build do hub falha se sobrar link para uma
  página removida.
- Verificação em navegador (`ui-verification`): três larguras, passagem de
  teclado, console limpo, screenshot antes/depois.
- Checagem de contraste por script, com os valores anotados no CSS.

## Phase 2 — ordem de execução

Ver [tasks.md](./tasks.md).
