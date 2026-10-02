import { test } from "node:test";
import assert from "node:assert/strict";
import { faixaDaConta } from "../src/lib/regua.mjs";

// As mesmas 4 faixas de COOPLUZ.campo.opcoes (src/data/solucoes.ts).
const FAIXAS = ["Até R$ 250", "R$ 251 a R$ 500", "R$ 501 a R$ 1.000", "Acima de R$ 1.000"];

test("cada valor da régua cai na faixa que o formulário manda ao CRM", () => {
  assert.equal(faixaDaConta(150, FAIXAS), "Até R$ 250");
  assert.equal(faixaDaConta(600, FAIXAS), "R$ 501 a R$ 1.000");
  assert.equal(faixaDaConta(2000, FAIXAS), "Acima de R$ 1.000");
});

test("as bordas ficam na faixa de baixo, como o rótulo diz ('até', 'a')", () => {
  assert.equal(faixaDaConta(250, FAIXAS), "Até R$ 250");
  assert.equal(faixaDaConta(251, FAIXAS), "R$ 251 a R$ 500");
  assert.equal(faixaDaConta(500, FAIXAS), "R$ 251 a R$ 500");
  assert.equal(faixaDaConta(1000, FAIXAS), "R$ 501 a R$ 1.000");
  assert.equal(faixaDaConta(1010, FAIXAS), "Acima de R$ 1.000");
});

test("lista de faixas fora do formato: não adivinha", () => {
  assert.equal(faixaDaConta(600, FAIXAS.slice(0, 3)), undefined);
  assert.equal(faixaDaConta(600, undefined), undefined);
});
