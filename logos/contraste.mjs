// Mede todos os pares de contraste do sistema de design, nos dois temas.
//   node logos/contraste.mjs
// Nenhum valor entra em src/styles/global.css sem ter passado por aqui —
// Princípio V da constituição: contraste é restrição de escolha, não checagem
// final. Sai da suíte de teste de propósito: `npm test` valida lógica, isto
// valida uma decisão de design, e é rodado quando a paleta muda.
const lin = (c) => (c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
const lum = (h) => {
  const n = parseInt(h.slice(1), 16);
  return 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
};
const razao = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

// [rótulo, frente, fundo, mínimo] — 4.5 texto normal, 3 texto grande e contorno
const PARES = {
  claro: [
    ["texto / fundo", "#0b1f1c", "#ffffff", 4.5],
    ["texto-suave / fundo", "#4c5f5e", "#ffffff", 4.5],
    ["texto-suave / superficie", "#4c5f5e", "#f4f7f7", 4.5],
    ["marca / fundo", "#1c68b4", "#ffffff", 4.5],
    ["marca-forte / fundo", "#12518f", "#ffffff", 4.5],
    ["marca-forte / azul-100 (chip)", "#12518f", "#e3eefb", 4.5],
    ["marca-forte / cinza-100 (hover)", "#12518f", "#e7eeee", 4.5],
    ["link / fundo", "#17579a", "#ffffff", 4.5],
    ["CTA: acento-texto / acento", "#0b1f1c", "#40ac68", 4.5],
    ["CTA branco / acento (REPROVA de propósito)", "#ffffff", "#40ac68", 4.5],
    ["olho verde / fundo", "#1d7a45", "#ffffff", 4.5],
    ["cinza-500 (contorno campo) / fundo", "#6f8280", "#ffffff", 3],
    ["borda cartão / fundo", "#d2dedd", "#ffffff", 1],
    ["foco / fundo", "#17579a", "#ffffff", 3],
    ["texto-invertido / superficie-marca", "#ffffff", "#0b3d47", 4.5],
    ["texto-sobre-marca / superficie-marca", "#c5dde1", "#0b3d47", 4.5],
    ["texto-sobre-marca-suave / superficie-marca", "#9dbcc2", "#0b3d47", 4.5],
    ["link-sobre-marca / superficie-marca", "#cfe9ee", "#0b3d47", 4.5],
    ["brasa (olho na marca) / superficie-marca", "#5fd08f", "#0b3d47", 4.5],
    // O -500 da 4.13:1 sobre a superficie de marca e reprova; o -400 passa,
    // sem mudar a cor em nenhum outro lugar. Mesma manobra do hub com o laranja.
    ["verde-500 / superficie-marca (REPROVA de propósito)", "#40ac68", "#0b3d47", 4.5],
    ["verde-400 / superficie-marca", "#63c08a", "#0b3d47", 4.5],
    ["erro-texto / erro-fundo", "#7a1c15", "#fdeceb", 4.5],
    ["ok-texto / ok-fundo", "#14532d", "#e7f4ec", 4.5],
    ["destaque: verde-700 / verde-100", "#1d7a45", "#e4f5ea", 4.5],
    ["número da prova: verde-700 / superficie", "#1d7a45", "#f4f7f7", 3],
    ["destaque: texto-suave / verde-100", "#4c5f5e", "#e4f5ea", 4.5],
  ],
  escuro: [
    ["texto / fundo", "#e6f0f0", "#051419", 4.5],
    ["texto-suave / fundo", "#a9bcbc", "#051419", 4.5],
    ["texto-suave / superficie-alta (cartão)", "#a9bcbc", "#113039", 4.5],
    ["texto / superficie-alta", "#e6f0f0", "#113039", 4.5],
    ["marca / superficie-alta", "#6ab7ee", "#113039", 4.5],
    ["marca-forte / superficie-alta", "#8ecbf6", "#113039", 4.5],
    ["marca-forte / cinza-100 escuro (hover)", "#8ecbf6", "#14303a", 4.5],
    ["marca-forte / azul-100 escuro (chip)", "#8ecbf6", "#16344a", 4.5],
    ["link / fundo", "#6ab7ee", "#051419", 4.5],
    ["CTA: acento-texto / acento", "#0b1f1c", "#40ac68", 4.5],
    ["olho verde / fundo", "#63c08a", "#051419", 4.5],
    ["olho verde / superficie", "#63c08a", "#0a1e25", 4.5],
    ["cinza-500 escuro (contorno campo) / superficie-alta", "#5d7b84", "#113039", 3],
    ["borda / superficie-alta", "#3a5560", "#113039", 1],
    ["foco / superficie-alta", "#7cc4f2", "#113039", 3],
    ["capa-topo abaixo do cabeçalho", "#0b2830", "#113039", 1],
    ["texto-invertido / superficie-marca", "#ffffff", "#0b3d47", 4.5],
    ["texto-sobre-marca / superficie-marca", "#c5dde1", "#0b3d47", 4.5],
    ["brasa / superficie-marca", "#5fd08f", "#0b3d47", 4.5],
    ["erro-texto / erro-fundo", "#f3d5d1", "#4e2622", 4.5],
    ["ok-texto / ok-fundo", "#cdf3df", "#17452e", 4.5],
    ["destaque: verde-700 / verde-100 escuro", "#63c08a", "#153a2a", 4.5],
    ["número da prova: verde-700 / superficie escura", "#63c08a", "#0a1e25", 3],
    ["destaque: texto-suave / verde-100 escuro", "#a9bcbc", "#153a2a", 4.5],
    ["borda do destaque / verde-100 escuro", "#40ac68", "#153a2a", 1],
  ],
};

let reprovas = 0;
for (const [tema, pares] of Object.entries(PARES)) {
  console.log(`\n── tema ${tema} ─────────────────────────────────`);
  for (const [rotulo, a, b, min] of pares) {
    const r = razao(a, b);
    const proposital = rotulo.includes("REPROVA de propósito");
    const ok = r >= min || proposital;
    if (!ok) reprovas++;
    console.log(`${ok ? "  ok " : "FALHA"} ${r.toFixed(2).padStart(6)}:1  (min ${min})  ${rotulo}`);
  }
}
console.log(reprovas ? `\n${reprovas} par(es) reprovando.` : "\nTodos os pares passam.");
process.exit(reprovas ? 1 : 0);
