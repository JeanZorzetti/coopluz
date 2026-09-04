# Tasks: Linguagem do cooperado, regra de qualificação e declarações

**Spec**: [spec.md](./spec.md) · **Plan**: [plan.md](./plan.md)

Ordem por dependência. `[P]` = pode rodar em paralelo com a tarefa anterior.
As fases B a E saem em **um único commit** (FR-005): o site não pode ser
publicado com os dois vocabulários nem com metade da regra dos R$ 250.

## Fase A — a linha de base e a guarda que falha primeiro

- [ ] **T001** `npm run build` **antes de qualquer edição** e guardar
      `dist/sitemap-0.xml` fora de `dist/`. É a linha de base do SC-004 — sem
      ela não há como provar que nenhuma URL mudou.
- [ ] **T002** `test/vocabulario.test.mjs` — varre `src/**` com `node:fs`, três
      padrões proibidos (`/associa/i` → FR-001, `/não compensa a operação/i` →
      FR-006, `/zerar (sua |a )?conta/i` → FR-012), lista de exceções vazia. A
      falha imprime arquivo, linha e o FR violado.
- [ ] **T003** Rodar `npm test` e **ver a lista das 57 ocorrências**. É o mapa
      de trabalho das fases seguintes; teste que nasce verde não guarda nada.
- [ ] **T004** Preencher a lista de exceções com as **7 entradas aprovadas**,
      cada uma com `{arquivo, trecho, motivo}` citando o requisito:
      `privacidade.astro` linhas da base legal, da finalidade e da retenção
      (FR-003); `index.astro` título e legenda dos 3.865 (FR-004);
      `parceiro.astro` "Associações, sindicatos e entidades" e "Base associada"
      (palavra no sentido de entidade, não de vínculo).

## Fase B — páginas de produto

- [ ] **T005** `src/data/solucoes.ts` — `descricao` (é a meta description da
      home) e `campo.avisoPara.texto`: a faixa "Até R$ 250" passa a descrever
      encaminhamento para análise da Coopluz (ponto 1 de 7, FR-006).
- [ ] **T006** `src/pages/index.astro` — o arquivo mais denso da feature:
      - FAQ "quem pode" (regra dos R$ 250, ponto 2) e FAQ do prazo em dois
        tempos: aprovação rápida, primeiro crédito em até 90 dias (FR-010);
      - FAQ do SPC/Serasa e chamada do topo: vocabulário;
      - seção "quem pode participar" — a faixa sai da coluna de quem está fora
        (ponto 3);
      - faixa "quem está por trás" — "termo de adesão" (FR-002), Sicoob
        **intacto** (FR-014);
      - legenda dos 3.865: **não muda**, ganha comentário citando o material
        institucional (FR-004);
      - bloco "Do outro lado do balcão": "zerar a conta" com a condição na
        mesma frase — é a comissão da carteira do parceiro (FR-012).
- [ ] **T007** `src/pages/parceiro.astro` — FAQ do critério de indicação: a
      regra vira a mesma da página de produto **e o argumento é reescrito**
      (hoje ele vende a recusa: "para você não gastar seu relacionamento").
      O parceiro precisa saber o que dizer a uma indicação dessa faixa (ponto 4,
      FR-008). Bullet do SPC/Serasa: vocabulário.
- [ ] **T008** [P] `src/components/Fatura.astro` — passos "Você se associa" e
      "unidade associada" (o carimbo do desenho da fatura), comentário do
      propósito da unidade.
- [ ] **T009** [P] `src/components/Footer.astro` (ressalva + "termo de adesão"),
      `src/pages/obrigado.astro` (`descricao`), `src/consts.ts` e
      `src/components/LeadForm.astro` (comentários que descrevem a regra
      antiga — comentário que mente é o mesmo defeito do texto que mente).

## Fase C — páginas legais

- [ ] **T010** `src/pages/termos.astro` — abertura, declaração de papéis,
      ressalva da estimativa, prazo em dois tempos, cláusula de limites (ponto
      5 dos R$ 250). O saldo residual **permanece** onde está (FR-013) e o
      Sicoob **permanece** no fecho (FR-014).
- [ ] **T011** `src/pages/privacidade.astro` — trocar apenas a linha de prosa
      sobre os dados pedidos no atendimento. Os três trechos de valor jurídico
      ficam e ganham comentário explicando por que divergem do termo de
      marketing (FR-003).

## Fase D — blog

- [ ] **T012** `reduzir-conta-equatorial-sem-placa-solar.md` — artigo pilar:
      regra dos R$ 250 (ponto 7 de 7) e vocabulário no corpo, `titulo` e
      `descricao`.
- [ ] **T013** [P] `fio-b-60-por-cento-2026-conta-equatorial-goias.md` — uma
      ocorrência ("associando-se").
- [ ] **T014** `cancelar-associacao-cooperativa-energia-goias.md` — 11
      ocorrências, incluindo `titulo` e `descricao`. **O arquivo não é
      renomeado** (FR-016). Anotar no frontmatter ou em comentário que o slug é
      legado deliberado, senão a próxima pessoa "conserta" e cria um 301.

## Fase E — o texto que a IA cita (sempre por último)

- [ ] **T015** `src/pages/llms.txt.ts` — descrição do papel, "termo de adesão",
      regra dos R$ 250 (ponto 6) e prazo em dois tempos. Conferir que o
      percentual anunciado é o mesmo da home (FR-011).
- [ ] **T016** `src/layouts/Base.astro` — `description` do JSON-LD e o
      comentário do `@graph`. `publisher` continua Autogestor e `about`
      continua Coopluz, sem exceção (FR-015).

## Fase F — verificação (portão de conclusão da constituição)

- [ ] **T017** `npm test` verde, com a guarda do FR-018 inclusa (SC-005).
      Saída vista, não presumida.
- [ ] **T018** `grep -rniE "associa" src/` — o resultado deve ser **exatamente**
      as 7 exceções da T004, nada além (SC-001).
- [ ] **T019** `npm run build` e `diff` do `sitemap-0.xml` contra a linha de
      base da T001. Zero diferença, zero 301 novo (SC-004, FR-017).
- [ ] **T020** Ler os **7 trechos da regra lado a lado** e confirmar que
      declaram o mesmo tratamento (SC-002). Depois os **4 blocos de papéis** —
      faixa da home, dois cartões da Sobre, abertura dos termos — e o Sicoob
      nos três lugares (SC-007, FR-014).
- [ ] **T021** Conferir promessa única de prazo e de percentual em todo o site,
      incluindo `llms.txt` e JSON-LD (SC-003), e que "zerar a conta" aparece em
      no máximo um bloco, com a condição na mesma frase (SC-006).
- [ ] **T022** `ui-verification`: home em três larguras, selecionar "Até R$ 250"
      no formulário e confirmar que o aviso novo é anunciado pelo leitor de tela
      e **não bloqueia o envio** (FR-007), console limpo.
- [ ] **T023** Commit único das fases B a E (FR-005) e push.
