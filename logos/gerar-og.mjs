// Gera a imagem de compartilhamento (Open Graph) do site.
//   node logos/gerar-og.mjs
//
// Renderiza no navegador em vez de montar o PNG no sharp por um motivo só: a
// fonte. A Outfit não está instalada no sistema, então um SVG rasterizado pelo
// sharp cairia numa grotesca qualquer — e o cartão de compartilhamento é
// justamente onde a marca aparece para quem ainda não entrou no site. Aqui a
// página carrega a MESMA Outfit que o site carrega, com os MESMOS tokens.
//
// A alternativa (arquivo de design mantido à mão) foi recusada: foi assim que
// o PNG antigo da marca ficou desatualizado sem ninguém perceber.
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import sharp from "sharp";

const L = 1200;
const A = 630;
const SAIDA = "public/img/og.png";

// Tokens copiados do global.css. Poucos e estáveis; importar CSS de dentro de
// um script node custaria mais que as seis linhas que ele economizaria.
const MARCA_FUNDO = "#0b3d47";
const VERDE = "#5fd08f";
const TEXTO = "#ffffff";
const TEXTO_SUAVE = "#c5dde1";

// A marca inline, do mesmo arquivo que a página usa — não uma segunda cópia.
const simbolo = readFileSync("public/img/logo.svg", "utf8");
// No pé, sobre o teal profundo, o gradiente da marca some: a base dele é azul,
// que é vizinho do fundo. Ali entra a versão de uma cor só — a mesma que o
// gesto de marca usa como máscara — pintada de branco por currentColor.
const simboloMono = readFileSync("public/img/logo-mono.svg", "utf8");

const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=block">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${L}px;height:${A}px;background:${MARCA_FUNDO};color:${TEXTO};
       font-family:"Outfit",sans-serif;overflow:hidden;position:relative}
  /* Marca-d'água sangrando pela direita: o mesmo gesto que o herói do site faz
     com .selo, parado. 0.16 de opacidade mantém o texto acima em 8:1.
     Sem o grão que o site tem: ruído aleatório derrota a paleta indexada e
     custava 120KB por uma textura invisível a 5% num cartão de 1200px. */
  .agua{position:absolute;right:-130px;top:-90px;width:760px;opacity:.16}
  .agua svg{width:100%;height:auto;display:block}
  .quadro{position:relative;height:100%;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between}
  .olho{font-size:22px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${VERDE}}
  h1{font-size:68px;font-weight:800;line-height:1.05;letter-spacing:-.025em;max-width:15ch;margin-top:22px}
  h1 em{font-style:normal;color:${VERDE}}
  .sub{font-size:26px;line-height:1.45;color:${TEXTO_SUAVE};max-width:26ch;margin-top:22px}
  .pe{display:flex;align-items:center;gap:16px}
  .pe svg{width:56px;height:56px;display:block;color:${TEXTO}}
  .pe b{font-size:26px;font-weight:700;letter-spacing:-.01em}
  .pe span{display:block;font-size:16px;font-weight:500;letter-spacing:.04em;
           text-transform:uppercase;color:${TEXTO_SUAVE};margin-top:2px}
</style></head><body>
  <div class="agua">${simbolo}</div>
  <div class="quadro">
    <div>
      <span class="olho">Energia por compensação · Goiás</span>
      <h1><em>20% menos</em> na conta da Equatorial Goiás</h1>
      <p class="sub">Sem obra, sem placa no telhado e sem taxa de adesão.</p>
    </div>
    <div class="pe">
      ${simboloMono}
      <div><b>Coopluz Goiás</b><span>Representante autorizado Autogestor</span></div>
    </div>
  </div>
</body></html>`;

const navegador = await chromium.launch();
const pagina = await navegador.newPage({ viewport: { width: L, height: A }, deviceScaleFactor: 1 });
await pagina.setContent(html);
await pagina.evaluate(() => document.fonts.ready);
const bruto = await pagina.screenshot();
await navegador.close();

// Paleta indexada: o cartão tem 6 cores chapadas mais o grão, então 256 cores
// não perdem nada visível e o arquivo cai de ~400KB para a casa das dezenas —
// e o WhatsApp descarta pré-visualização de imagem grande demais.
const { size } = await sharp(bruto).png({ palette: true, quality: 90, compressionLevel: 9 }).toFile(SAIDA);

console.log(`${L}×${A}  ${(size / 1024).toFixed(0)} KB  ${SAIDA}`);
