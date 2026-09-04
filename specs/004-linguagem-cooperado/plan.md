# Implementation Plan: Linguagem do cooperado, regra de qualificação e declarações

**Spec**: [spec.md](./spec.md) · **Branch**: `004-linguagem-cooperado` · **Data**: 2026-09-04

## Resumo técnico

Um repositório, três frentes que atravessam os mesmos arquivos e por isso saem
juntas em um único commit (FR-005):

- **Terminologia** — 57 ocorrências de `associa*` em 14 arquivos de `src/`.
  Não é `sed`: seis delas ficam como estão (base legal LGPD, dado de terceiro,
  "Associações" no sentido de entidade) e cada forma flexionada tem um destino
  diferente.
- **Regra de qualificação** — a faixa "Até R$ 250" deixa de ser recusa e passa
  a encaminhamento para análise, nos 7 pontos onde a regra é declarada em prosa.
  Nenhum deles compartilha código hoje, e nenhum vai passar a compartilhar.
- **Declarações e promessas** — nome único do documento ("termo de adesão"),
  prazo em dois tempos, "zerar a conta" só no bloco de parceiro e com a
  condição escrita.

O que segura as três depois do commit é uma coisa só: `test/vocabulario.test.mjs`,
um teste `node:test` que varre `src/` procurando o vocabulário e as frases
proibidas contra uma lista de exceções nomeada (FR-018). É ele que substitui
"revisar no PR" — e é a única linha de código nova da feature. Todo o resto é
texto.

## Constitution Check

Avaliado contra `.specify/memory/constitution.md` v1.0.0.

| Princípio | Antes da Phase 0 | Depois da Phase 1 |
|---|---|---|
| **I. HTML estático primeiro, JS por exceção** | ✅ Nada aqui roda no navegador: é copy, comentário de código e uma string de aviso já existente no `LeadForm`. | ✅ Confirmado: zero byte de JS somado ao bundle. O único arquivo novo é um teste, que roda no Node e não é publicado. |
| **II. Fonte única por domínio** | ⚠️ O risco real da feature: a mesma regra está declarada em 7 lugares e o mesmo termo em 14 arquivos. Metade aplicada = duas versões do produto no mesmo domínio. | ✅ Resolvido por **guarda**, não por abstração. A prosa continua morando onde está (7 frases diferentes para 7 contextos), e o teste do FR-018 passa a ser o ponto único de verdade sobre *o que não pode aparecer*. Extrair a regra para `consts.ts` foi recusado na Phase 0. |
| **III. Simplicidade deliberada e marcada** | ✅ Nenhuma dependência nova: `node:test` + `node:fs`, que o `npm test` já usa. | ✅ As três divergências deliberadas ficam marcadas em comentário no código, não só na lista do teste: base legal LGPD (FR-003), legenda dos 3.865 (FR-004) e slug legado (FR-016). |
| **IV. Falhar fechado, nunca mentir** | ⚠️ Duas frases no ar hoje deixam de ser verdade no momento do commit: "o desconto não compensa a operação" e "a associação não é aceita". Publicar metade é publicar uma recusa que a operação não pratica mais. | ✅ FR-006 cobre os 7 pontos no mesmo commit, e o teste falha se qualquer um voltar. FR-013 é decisão consciente do dono e está registrada: a gratuidade aparece na página de produto e o saldo residual continua nos termos — o link para os termos no rodapé é o que mantém a condição alcançável. |
| **V. Acessibilidade e contraste** | ✅ Nenhuma cor, nenhum componente, nenhum estado novo. | ✅ Um cuidado herdado: o aviso da faixa no `LeadForm` é lido por leitor de tela via `aria-describedby` (FR-007). O texto muda; a ligação e o caráter não-bloqueante não. |
| **VI. Identidade de terceiro se declara** | ⚠️ Os blocos que a auditoria mexe são exatamente os que declaram quem emite o quê. | ✅ FR-014 e FR-015 congelam o que não muda: Sicoob nos três blocos, `publisher`=Autogestor e `about`=Coopluz no JSON-LD, e o "não somos o canal oficial" da `sobre.astro`. A troca de palavra passa por dentro dessas frases sem alterar a afirmação. |

**Complexity Tracking**: nenhuma violação. Nenhuma abstração nova, nenhuma
dependência nova, nenhuma rota nova, nenhum arquivo de configuração novo.

## Phase 0 — decisões de pesquisa

| Questão | Decisão | Alternativa recusada e por quê |
|---|---|---|
| A regra dos R$ 250 vira constante em `consts.ts`? | **Não.** Os 7 pontos continuam em prosa, cada um escrito para o seu contexto (FAQ, bullet, cláusula, `llms.txt`, artigo). | Um `REGRA_MINIMO` com `valor` e `tratamento` só centralizaria o número — que não é o que diverge. O que diverge é a frase, e frase compartilhada entre um FAQ e uma cláusula de termos fica ruim nos dois. O teste cobre o risco de graça. |
| Existe um módulo de vocabulário? | **Não.** Copy inline continua inline. | Um `TERMOS.cooperado` interpolado em 14 arquivos troca 57 palavras legíveis por 57 chamadas de template, e não impede ninguém de digitar "associado" no arquivo seguinte — que é justamente o que o FR-018 pede. |
| Como o FR-018 falha? | `test/vocabulario.test.mjs`: varre `src/**` com `node:fs`, aplica uma tabela de padrões proibidos e uma lista de exceções `{arquivo, trecho, motivo}`. Roda no `npm test` que já existe. | Hook de pre-commit (`husky`/`lint-staged`): dependência nova, não roda no CI e é contornável com `--no-verify`. Regra de ESLint: o projeto não tem ESLint e `.astro` exigiria parser. |
| O que fazer com "3.865 associados"? | **Fica.** É legenda de dado do material institucional da Coopluz (FR-004). Entra na lista de exceções com comentário no código citando a fonte. | Trocar para "cooperados" cria divergência com o material citado — o site passaria a atribuir à Coopluz um número com uma legenda que a Coopluz não usa. |
| E `privacidade.astro`? | Três trechos ficam com "associação" por serem **termo jurídico** do vínculo tratado (base legal LGPD art. 7º V, finalidade e retenção). O quarto (linha 39, prosa de marketing) troca normalmente. | Trocar todos por "adesão" mudaria o sentido de cláusula legal para casar com jargão de marketing — é o inverso da hierarquia. |
| E o slug do post? | **Fica** (FR-016). O corpo, o `titulo` e a `descricao` do post falam a língua nova; o nome do arquivo não muda e nenhum 301 é criado. | Renomear geraria um 301 novo sobre uma URL indexada há duas semanas, contra o FR-017 e sem ganho — URL é endereço. Consequência aceita: o vocabulário antigo continua visível na SERP. |
| "Zerar a conta" entra onde? | Só no bloco "Do outro lado do balcão" da home (`index.astro`), que é captação de parceiro, e com a condição na **mesma frase**: é a comissão da carteira que pode cobrir a conta de luz de quem indica. | Adotar o título da auditoria sem a condição transforma um argumento de recrutamento em promessa de produto — o resto do site inteiro promete 20%. |
| Prazo: como declarar dois tempos? | Frase única, replicada nos 5 pontos: a **análise/aprovação** sai rápido; o **primeiro crédito na fatura** aparece em até 90 dias, pelo ciclo de leitura da Equatorial. | Adotar "desconto na próxima fatura após aprovação" (item 1 da auditoria) faria o site prometer um prazo que a distribuidora controla — Princípio IV. |
| Como provar o SC-004 (zero 301, sitemap idêntico)? | `npm run build` antes, guardar `dist/sitemap-0.xml`, build depois, `diff`. | Conferir no olho: o sitemap é gerado e tem dezenas de linhas. |

## Phase 1 — desenho

### Mapa do vocabulário

Uma linha por forma que aparece hoje, para a troca não virar julgamento caso a caso.

| Forma no ar | Vira | Observação |
|---|---|---|
| `associado` / `associados` (pessoa) | `cooperado` / `cooperados` | — |
| `associada` (unidade consumidora) | `vinculada à cooperativa` | "cooperada" já nomeia as **fazendas** geradoras no site; reusar a palavra para a UC do cliente confunde duas coisas diferentes. |
| `associação` (o ato) | `adesão` | — |
| `termo de associação` / `contrato de associação` / `contrato de ativação` | **`termo de adesão`** | FR-002, decisão do dono. |
| `você se associa` / `associar-se` / `associando-se` | `você faz a adesão` / `tornar-se cooperado` | Escolha por frase, mantendo a leitura natural. |
| `pedido de associação` | `pedido de adesão` | — |
| `Associações, sindicatos e entidades` (parceiro) | **fica** | Aqui "associação" é a organização prospectada, não o vínculo do cliente. |
| `3.865 associados` (legenda de dado) | **fica** | FR-004. |
| base legal / retenção / finalidade (privacidade) | **fica** | FR-003. |

### Os 7 pontos da regra de R$ 250

| # | Onde | No ar hoje | Passa a |
|---|---|---|---|
| 1 | [solucoes.ts:44](../../src/data/solucoes.ts) `avisoPara.texto` | "o desconto não compensa a operação" | encaminhamento para análise da Coopluz; segue não-bloqueante |
| 2 | [index.astro:19](../../src/pages/index.astro) FAQ "quem pode" | recusa | análise |
| 3 | [index.astro:92-108](../../src/pages/index.astro) "quem pode participar" | linha na coluna de quem está fora | sai da coluna de fora, ou entra com a condição |
| 4 | [parceiro.astro:36](../../src/pages/parceiro.astro) FAQ do parceiro | recusa **usada como argumento** de venda | mesma regra da página de produto + o que o parceiro diz a essa indicação (FR-008) |
| 5 | [termos.astro:47](../../src/pages/termos.astro) limites | recusa | análise, sem contradizer o formulário |
| 6 | [llms.txt.ts:58](../../src/pages/llms.txt.ts) | "com consumo médio acima de R$ 250/mês" | mesma regra — é o texto que a IA cita |
| 7 | [reduzir-conta-equatorial-sem-placa-solar.md:36](../../src/content/blog/reduzir-conta-equatorial-sem-placa-solar.md) artigo pilar | recusa | análise |

O comentário do [LeadForm.astro:226](../../src/components/LeadForm.astro) também
descreve a regra antiga ("provavelmente não compensa"). Comentário que mente é o
mesmo defeito do texto que mente (Princípio III): entra na lista.

### Arquivos tocados

| Arquivo | Mudança |
|---|---|
| `test/vocabulario.test.mjs` | **novo** — a guarda do FR-018 |
| `src/data/solucoes.ts` | `descricao` (meta da home), aviso da faixa |
| `src/components/LeadForm.astro` | comentário da regra |
| `src/components/Fatura.astro` | passos 1 e 3, carimbo "Unidade associada", comentário |
| `src/components/Footer.astro` | ressalva + "termo de adesão" |
| `src/consts.ts` | comentário de quem emite o documento |
| `src/layouts/Base.astro` | comentário do `@graph` + `description` do JSON-LD |
| `src/pages/index.astro` | FAQ (2), chamada, "quem pode participar", faixa de papéis, legenda dos 3.865 (exceção), bloco do parceiro ("zerar" + condição) |
| `src/pages/llms.txt.ts` | descrição do papel, termo de adesão, regra dos R$ 250, prazo |
| `src/pages/obrigado.astro` | `descricao` |
| `src/pages/parceiro.astro` | FAQ do critério (reescrita do argumento), bullet do SPC/Serasa |
| `src/pages/privacidade.astro` | linha 39 troca; 72/105/109 ficam **com comentário justificando** |
| `src/pages/sobre.astro` | FAQ, `descricao`, dois cartões de papéis |
| `src/pages/termos.astro` | abertura, papéis, ressalva, prazo, limites |
| `src/content/blog/*.md` (3) | corpo, `titulo` e `descricao`; **nenhum arquivo renomeado** |

### Contrato do teste de vocabulário

```
padroes = [
  { re: /associa/i,                  motivo: "FR-001: vocabulário antigo" },
  { re: /não compensa a operação/i,  motivo: "FR-006: recusa abaixo de R$ 250" },
  { re: /zerar (sua |a )?conta/i,     motivo: "FR-012: promessa fora do bloco de parceiro" },
]

excecoes = [ { arquivo, trecho, motivo } ]   // 6 entradas, cada uma citando o FR
```

A falha imprime arquivo, linha e motivo — quem tropeçar nela em um PR futuro lê
qual requisito está quebrando, não só um regex. Exceção nova exige editar a
lista, que é o ponto: a decisão vira diff revisável.

### Contratos de verificação

- `npm test` — inclui a guarda nova (SC-005, FR-018).
- `npm run build` — antes e depois, com `diff` de `dist/sitemap-0.xml` (SC-004).
- `grep -rniE "associa" src/` — o resultado deve ser exatamente a lista de
  exceções (SC-001).
- Leitura lado a lado dos 7 trechos da regra (SC-002) e dos 4 blocos de papéis
  (SC-007).
- `ui-verification`: home em três larguras, seleção de "Até R$ 250" no
  formulário com o aviso lido pelo leitor de tela, console limpo.

## Phase 2 — ordem de execução

Ver [tasks.md](./tasks.md) — a gerar com `speckit-tasks`.

Ordem obrigatória, por dependência e não por conveniência: **teste primeiro**
(com a lista de exceções vazia, falhando nas 57), depois páginas de produto,
depois legais, depois blog, e `llms.txt` + JSON-LD **por último** — são o texto
que a IA cita e o primeiro a ficar para trás em qualquer refatoração.
