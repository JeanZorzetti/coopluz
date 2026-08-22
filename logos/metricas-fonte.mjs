// Mede o `size-adjust` do fallback de métrica casada da fonte de exibição.
//   node logos/metricas-fonte.mjs
//
// Existe porque chutar esse número é pior que não ter fallback nenhum: um
// size-adjust errado troca um reflow por outro, e ninguém percebe. O valor sai
// da razão entre a largura da MESMA frase renderizada na Outfit e na pilha de
// fonte do sistema, medida no navegador de verdade.
//
// Rode de novo se a fonte de exibição mudar, e copie os três números para o
// @font-face "Outfit capa" em src/styles/global.css.
import { chromium } from "playwright";

// A frase é o H1 mais longo do site: é ele que reflui e empurra a página.
const FRASE = "Pague 20% menos na conta da Equatorial Goiás, sem obra e sem placa no telhado";
const PESO = 800;

// Métricas da própria Outfit, em unidades de em (unitsPerEm 1000).
const ASCENT = 1.0;
const DESCENT = 0.25;

const navegador = await chromium.launch();
const pagina = await navegador.newPage();
await pagina.setContent(`<!doctype html><html><head>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=block">
<style>
  span { position:absolute; white-space:nowrap; font-size:100px; font-weight:${PESO}; }
  #outfit { font-family:"Outfit"; }
  #sistema { font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
</style></head><body>
<span id="outfit">${FRASE}</span><span id="sistema">${FRASE}</span>
</body></html>`);
await pagina.evaluate(() => document.fonts.ready);

const { outfit, sistema } = await pagina.evaluate(() => ({
  outfit: document.getElementById("outfit").getBoundingClientRect().width,
  sistema: document.getElementById("sistema").getBoundingClientRect().width,
}));
await navegador.close();

if (!outfit || !sistema) throw new Error("medição vazia — a Outfit não carregou");

// O fallback precisa ficar com a largura da Outfit; ele parte da pilha do
// sistema, então o fator é outfit/sistema.
const fator = outfit / sistema;
const pct = (v) => `${(v * 100).toFixed(1)}%`;

console.log(`frase: ${FRASE.length} caracteres, peso ${PESO}`);
console.log(`  Outfit  ${outfit.toFixed(2)}px`);
console.log(`  sistema ${sistema.toFixed(2)}px`);
console.log("\n@font-face {");
console.log('  font-family: "Outfit capa";');
console.log('  src: local("Roboto"), local("Segoe UI"), local("Helvetica Neue"), local("Arial");');
console.log(`  size-adjust: ${pct(fator)};`);
console.log(`  ascent-override: ${pct(ASCENT / fator)};`);
console.log(`  descent-override: ${pct(DESCENT / fator)};`);
console.log("  line-gap-override: 0%;");
console.log("}");
