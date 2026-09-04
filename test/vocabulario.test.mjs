import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SRC = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src");

// FR-018: guarda o vocabulário e as regras da feature 004 sem depender de
// revisão manual em cada PR futuro. Cada padrão cita o requisito que ele
// protege; cada exceção cita o requisito que a justifica.
const PADROES = [
  { re: /associa/i, motivo: "FR-001: vocabulário antigo (associado/associação) — use cooperado/adesão" },
  { re: /não compensa a operação/i, motivo: "FR-006: faixa abaixo de R$ 250 agora vai para análise, não é recusa" },
  { re: /zerar (sua |a )?conta/i, motivo: "FR-012: só o bloco de captação de parceiro pode usar essa frase, com a condição" },
];

// Divergências deliberadas, aprovadas na spec 004 (ver plan.md Phase 0/1).
const EXCECOES = [
  { arquivo: "pages/privacidade.astro", trecho: "Responder ao seu pedido de associação", motivo: "FR-003: termo jurídico da base legal LGPD (art. 7º, V)" },
  { arquivo: "pages/privacidade.astro", trecho: "Pedidos que não viraram associação", motivo: "FR-003: finalidade do tratamento" },
  { arquivo: "pages/privacidade.astro", trecho: "Pedidos que viraram associação", motivo: "FR-003: prazo de retenção" },
  { arquivo: "pages/index.astro", trecho: "3.865 associados", motivo: "FR-004: dado de terceiro, legenda igual à fonte" },
  { arquivo: "pages/index.astro", trecho: "<b>associados</b>", motivo: "FR-004: dado de terceiro, legenda igual à fonte" },
  { arquivo: "pages/parceiro.astro", trecho: "Associações, sindicatos e entidades", motivo: "FR-001: entidade prospectada, não vínculo do cliente" },
  { arquivo: "pages/parceiro.astro", trecho: "Base associada", motivo: "FR-001: entidade prospectada, não vínculo do cliente" },
];

function* arquivos(dir) {
  for (const nome of fs.readdirSync(dir)) {
    const caminho = path.join(dir, nome);
    const stat = fs.statSync(caminho);
    if (stat.isDirectory()) yield* arquivos(caminho);
    else yield caminho;
  }
}

test("vocabulário e regras da feature 004 não regridem (FR-018)", () => {
  const violacoes = [];

  for (const caminho of arquivos(SRC)) {
    const relativo = path.relative(SRC, caminho).split(path.sep).join("/");
    const linhas = fs.readFileSync(caminho, "utf8").split("\n");

    linhas.forEach((linha, i) => {
      for (const { re, motivo } of PADROES) {
        if (!re.test(linha)) continue;
        const coberta = EXCECOES.some((e) => e.arquivo === relativo && linha.includes(e.trecho));
        if (!coberta) violacoes.push(`${relativo}:${i + 1} — ${motivo}\n  ${linha.trim()}`);
      }
    });
  }

  assert.equal(violacoes.length, 0, `\n${violacoes.join("\n")}`);
});

test("toda exceção declarada ainda existe no arquivo (lista não fica obsoleta)", () => {
  for (const { arquivo, trecho } of EXCECOES) {
    const conteudo = fs.readFileSync(path.join(SRC, arquivo), "utf8");
    assert.ok(conteudo.includes(trecho), `exceção não encontrada: ${arquivo} — "${trecho}"`);
  }
});
