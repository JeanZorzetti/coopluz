# Tasks: Identidade própria da Coopluz e fim da canibalização

**Spec**: [spec.md](./spec.md) · **Plan**: [plan.md](./plan.md)

Ordem por dependência. `[P]` = pode rodar em paralelo com a tarefa anterior.

## Fase A — símbolo e ativos (bloqueia a fase B: o CSS referencia o vetor)

- [ ] **T001** `logos/gerar-marca.py` — lâmpada-folha por fórmula. Sai
      `public/img/logo.svg` (gradiente), `public/img/logo-mono.svg`
      (`currentColor`, é a máscara do gesto), `public/favicon.svg` e o corpo de
      `src/components/Logo.astro`.
- [ ] **T002** Renderizar e **olhar** o PNG antes de seguir. Símbolo que não se
      reconhece a 24px não serve como favicon.
- [ ] **T003** `logos/rasterizar.mjs` — `favicon.png` (64), `icon-512.png`,
      `apple-touch-icon.png` (180, fundo branco: iOS ignora alfa).
- [ ] **T004** [P] Substituir `public/img/parceiros/coopluz.png` pelo lockup
      oficial atual (extraído do material de abril/2026, com máscara alfa).

## Fase B — sistema de design

- [ ] **T005** Script de contraste: mede todos os pares novos, nos dois temas.
      Nenhum valor entra no CSS sem ter passado por ele.
- [ ] **T006** `src/styles/global.css` — primitivos (verde/teal/azul + cinza
      esverdeado), semânticos claros, semânticos escuros em `light-dark()`, com
      o valor medido anotado ao lado dos pares apertados.
- [ ] **T007** `global.css` — gesto: gradiente do `.selo` para
      `--lamina`/`--brasa` novos; a máscara passa a apontar para o símbolo novo.
- [ ] **T008** `src/layouts/Base.astro` — Outfit no lugar de Archivo; ajustar o
      `@font-face` de métrica casada (`size-adjust` medido, não estimado, senão
      volta o CLS que ele existe para evitar).
- [ ] **T009** `Base.astro` — `theme-color` claro/escuro novos, nas duas metas
      e nos dois scripts inline que as sincronizam.

## Fase C — marca e divulgação

- [ ] **T010** `src/consts.ts` — entidade `COOPLUZ` (razão de existir: NAP
      público da cooperativa, separado do da operadora).
- [ ] **T011** `src/components/Header.astro` — lockup: símbolo + "Coopluz" +
      selo "Representante autorizado Autogestor", legível a 360px (FR-012).
- [ ] **T012** `src/components/Footer.astro` — nome do site, quem opera, link
      para o site oficial da cooperativa (FR-013).
- [ ] **T013** `Base.astro` — `og:site_name`, `WebSite.name`, e o `@graph` com
      `publisher` = Autogestor e `about` = Coopluz + `sameAs` (FR-014).
- [ ] **T014** Títulos das páginas terminando em "Coopluz Goiás" (FR-022/023).
- [ ] **T015** `logos/gerar-og.mjs` — imagem de compartilhamento própria.

## Fase D — hub: fim da canibalização

- [ ] **T016** `autogestor/src/data/solucoes.ts` — campo `externo` na vertical
      de energia e no credenciamento de parceiro de energia.
- [ ] **T017** Fazer todo link interno do hub respeitar `externo` (nav, grade
      da home, grade "outras soluções", CTA de blog).
- [ ] **T018** Remover `src/pages/coopluz.astro`, `src/pages/coopluz/parceiro.astro`
      e os dois artigos do cluster de energia.
- [ ] **T019** `astro.config.mjs` — `redirects` das quatro URLs para o destino
      exato no site da Coopluz.
- [ ] **T020** `src/pages/llms.txt.ts` — parar de listar as URLs migradas.

## Fase E — verificação (portão de conclusão da constituição)

- [ ] **T021** `npm test` nos dois repositórios. Saída vista, não presumida.
- [ ] **T022** `npm run build` nos dois repositórios.
- [ ] **T023** Conferir no build do hub que as quatro rotas viraram 301 com o
      destino certo e sumiram do `sitemap.xml`.
- [ ] **T024** `ui-verification`: três larguras, passagem de teclado, console,
      árvore de acessibilidade, screenshots.
- [ ] **T025** `design-review` sobre o resultado.
- [ ] **T026** Atualizar `README.md` e a constituição (o arquivo ainda se
      intitula "Autogestor Constitution" neste repositório).
