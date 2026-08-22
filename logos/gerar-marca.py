"""Gera a marca da Coopluz Goias por formula e escreve os arquivos derivados.

O simbolo NAO e uma copia da marca registrada da cooperativa: e um simbolo
proprio deste site, construido com a mesma familia de formas (anel aberto,
lampada, folha) e a paleta oficial amostrada do material institucional de
abril/2026 da propria Coopluz. O lockup registrado aparece so na faixa de
atribuicao ("quem esta por tras"), no arquivo original.

Geometria, em viewBox 0 0 100 100:

  anel   arco aberto com abertura no canto superior direito, a forma que
         carrega o simbolo a 24px quando todo o resto vira mancha
  base   duas barras + tampa, abaixo do anel: e o que faz o olho ler
         "lampada" e nao "letra C"
  folha  lente de duas arestas de circulo, inclinada, com nervura vazada

Nada aqui e desenhado a mao: os arcos saem de `A` do SVG com raio e angulo
calculados, e a folha sai da intersecao de dois circulos de mesmo raio, cuja
distancia entre centros determina a largura da lente.

Uso:  python logos/gerar-marca.py
Depois:  node logos/rasterizar.mjs   (icones PNG, usa o sharp do projeto)
         node logos/gerar-og.mjs     (imagem de compartilhamento)
"""

import math
import os

# ---------------------------------------------------------------- paleta
# Amostrada do lockup vetorial embutido na apresentacao institucional da
# Coopluz (abril/2026), nao do PNG antigo do repositorio — aquele e de uma
# geracao anterior da marca, verde/lima, e nao bate com o material atual.
VERDE = "#40ac68"   # ponta superior do gradiente (LUZ, no wordmark)
TEAL = "#248ca0"    # meio do gradiente (anel, na altura do equador)
AZUL = "#1c68b4"    # base do gradiente (COOP, no wordmark)

# Versao para tema escuro: mesma marca com a luz acesa. So a luminosidade sobe;
# matiz e saturacao ficam, senao vira uma segunda marca.
VERDE_ESCURO = "#6fd394"
TEAL_ESCURO = "#4fbcd0"
AZUL_ESCURO = "#5fa3e8"

# ---------------------------------------------------------------- geometria
CX, CY = 50.0, 41.5     # centro do anel
R = 30.0                # raio do eixo do anel
ESP = 9.5               # espessura do anel
ESP_BASE = 6.0          # base mais fina que o anel: o soquete e detalhe, o
                        # anel e o que precisa sobreviver a 24px

# Abertura no canto superior direito. Angulos em graus, 0 = leste, anti-horario
# positivo (convencao matematica; o SVG tem y invertido e `pt` cuida disso).
# A abertura fica ACIMA E A DIREITA, nao no topo: centrada no topo o anel lia
# como ferradura, simetrica demais para ser lampada. Deslocada, o olho fecha a
# forma sozinho e a ponta do gancho vira o gesto que distingue a marca.
A_INI = 33.0            # ponta de baixo da abertura, no flanco direito
A_VOLTA = -298.0        # varredura, negativa = horario na tela

BASE_Y = 78.5           # primeira barra da base, logo abaixo do anel
BASE_PASSO = 7.0
BASE_LARG = (18.0, 11.5)

# viewBox recortado na bbox real do desenho (anel + base + folha), medida por
# amostragem dos arcos/curvas acima, com 2 de margem. Sem isto o desenho usa
# so 69.5% da largura e 89.7% da altura de um viewBox "0 0 100 100" cru — a
# marca lia pequena mesmo em caixas grandes porque sobrava moldura invisivel.
VB_X, VB_Y, VB_W, VB_H = 13.0, 4.9, 74.0, 93.7


def pt(r, th, cx=CX, cy=CY):
    """Polar -> cartesiano no sistema do SVG (y para baixo)."""
    return (cx + r * math.cos(math.radians(th)), cy - r * math.sin(math.radians(th)))


def f(v):
    """Formata numero curto: 3 casas viram ruido de bytes num arquivo de icone."""
    return f"{v:.2f}".rstrip("0").rstrip(".")


def arco(r, a0, varredura, cx=CX, cy=CY):
    """Path de arco, quebrado em trechos de no maximo 90 graus.

    Um `A` unico daria conta ate 360, mas os dois flags (`large-arc`, `sweep`)
    passam a depender do sinal da varredura E da diferenca de angulo, e errar
    um deles nao da erro: da o arco complementar, silenciosamente. Trechos
    curtos tornam os dois flags constantes — `large-arc` sempre 0, `sweep`
    so o sinal da varredura — e o caso degenerado deixa de existir.
    """
    n = max(1, math.ceil(abs(varredura) / 90.0))
    passo = varredura / n
    # varredura negativa = angulo matematico diminuindo = horario na tela, e
    # horario na tela e sweep=1 no SVG (que tem o eixo y invertido).
    sweep = 1 if varredura < 0 else 0
    x0, y0 = pt(r, a0, cx, cy)
    d = [f"M{f(x0)} {f(y0)}"]
    for i in range(1, n + 1):
        x, y = pt(r, a0 + passo * i, cx, cy)
        d.append(f"A{f(r)} {f(r)} 0 0 {sweep} {f(x)} {f(y)}")
    return "".join(d)


def folha():
    """Lente entre dois circulos de mesmo raio, inclinada sobre o eixo da folha.

    A lente e o lugar geometrico entre dois arcos simetricos: fixado o
    comprimento L da folha e a largura W no meio, o raio que satisfaz os dois
    e (L^2/4 + W^2)/(2W) — nao ha o que calibrar a olho.
    """
    L, W = 31.0, 8.2        # comprimento e meia-largura da lente
    ang = 45.0              # inclinacao, ponta apontando para a abertura do anel
    fcx, fcy = 48.0, 42.5   # centro da folha, dentro do anel

    r = (L * L / 4.0 + W * W) / (2.0 * W)
    dx, dy = math.cos(math.radians(ang)), -math.sin(math.radians(ang))
    # pontas da lente, sobre o eixo
    p0 = (fcx - dx * L / 2, fcy - dy * L / 2)
    p1 = (fcx + dx * L / 2, fcy + dy * L / 2)

    corpo = (
        f"M{f(p0[0])} {f(p0[1])}"
        f"A{f(r)} {f(r)} 0 0 1 {f(p1[0])} {f(p1[1])}"
        f"A{f(r)} {f(r)} 0 0 1 {f(p0[0])} {f(p0[1])}Z"
    )

    # Nervura: vazada por fill-rule evenodd, para a folha continuar sendo UM
    # path — importante porque este mesmo arquivo vira mascara CSS, e mascara
    # le alfa, nao ordem de pintura.
    nx, ny = -dy, dx                     # normal do eixo
    e = 1.5                              # meia-espessura da nervura
    q0 = (p0[0] + dx * 4.5, p0[1] + dy * 4.5)
    q1 = (p1[0] - dx * 6.0, p1[1] - dy * 6.0)
    # leve barriga para a nervura seguir a curvatura da folha, nao cortar reto
    bar = 2.2
    m = ((q0[0] + q1[0]) / 2 + nx * bar, (q0[1] + q1[1]) / 2 + ny * bar)
    nervura = (
        f"M{f(q0[0])} {f(q0[1])}"
        f"Q{f(m[0])} {f(m[1])} {f(q1[0])} {f(q1[1])}"
        f"Q{f(m[0] - nx * e * 2)} {f(m[1] - ny * e * 2)} {f(q0[0])} {f(q0[1])}Z"
    )
    return corpo + nervura


def corpo_traco():
    """(espessura, paths) do anel aberto e da base da lampada.

    Sao tracos, nao contornos preenchidos: espessura constante nao precisa de
    fita com duas bordas, e `stroke-linecap=round` ja entrega a ponta
    arredondada da marca de graca."""
    # Sem gancho na ponta do anel. A espiral para dentro (que o simbolo da
    # cooperativa tem) foi construida, renderizada e descartada: a 300px ela
    # brigava com a ponta da folha e, abaixo de 40px, as duas viravam uma
    # mancha so. A abertura deslocada ja entrega a leitura de "G" sozinha, e
    # o que sobra le como lampada em qualquer tamanho.
    base = []
    for i, larg in enumerate(BASE_LARG):
        y = BASE_Y + i * BASE_PASSO
        base.append(f"M{f(CX - larg / 2)} {f(y)}H{f(CX + larg / 2)}")
    # tampa do soquete: arco raso fechando embaixo
    yt = BASE_Y + len(BASE_LARG) * BASE_PASSO
    base.append(f"M{f(CX - 4.0)} {f(yt - 0.5)}Q{f(CX)} {f(yt + 2.6)} {f(CX + 4.0)} {f(yt - 0.5)}")
    return [(ESP, [arco(R, A_INI, A_VOLTA)]), (ESP_BASE, base)]


# ---------------------------------------------------------------- saida
PARADAS = ((0.0, "0"), (0.58, "1"), (1.0, "2"))


def gradiente(id_, cores, atrib="stop-color"):
    """Gradiente na diagonal do simbolo: verde no ombro superior esquerdo,
    azul no soquete. E a direcao do gradiente da marca da cooperativa."""
    paradas = "".join(
        f'<stop offset="{o}" {atrib}="{c}"/>' for (o, _), c in zip(PARADAS, cores)
    )
    return (
        f'<linearGradient id="{id_}" gradientUnits="userSpaceOnUse" '
        f'x1="24" y1="2" x2="62" y2="99">{paradas}</linearGradient>'
    )


def marca(fill, stroke_extra=""):
    grupos = "".join(
        f'<g fill="none" stroke="{fill}" stroke-width="{f(esp)}" '
        f'stroke-linecap="round" stroke-linejoin="round"{stroke_extra}>'
        + "".join(f'<path d="{d}"/>' for d in paths)
        + "</g>"
        for esp, paths in corpo_traco()
    )
    return grupos + f'<path fill="{fill}" fill-rule="evenodd" d="{folha()}"/>'



def svg(interno, extra_defs=""):
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" '
        f'viewBox="{f(VB_X)} {f(VB_Y)} {f(VB_W)} {f(VB_H)}" '
        'role="img" aria-label="Coopluz">'
        f"{extra_defs}{interno}</svg>"
    )


def escrever(caminho, conteudo):
    os.makedirs(os.path.dirname(caminho) or ".", exist_ok=True)
    with open(caminho, "w", encoding="utf-8", newline="\n") as fp:
        fp.write(conteudo)
    print(f"{len(conteudo):7d} B  {caminho}")


raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
p = lambda *xs: os.path.join(raiz, *xs)

# 1. logo.svg — cores fixas. E o que a rasterizacao le e o que serve de reserva
#    para quem pede o vetor sem contexto de pagina.
escrever(
    p("public", "img", "logo.svg"),
    svg(marca("url(#g)"), f"<defs>{gradiente('g', (VERDE, TEAL, AZUL))}</defs>"),
)

# 2. logo-mono.svg — uma cor so, em currentColor. E a MASCARA do gesto de marca
#    (.selo no global.css): mascara le alfa, entao gradiente aqui seria
#    desperdicio, e o recorte pega o gradiente da propria pagina.
escrever(p("public", "img", "logo-mono.svg"), svg(marca("currentColor")))

# 3. favicon.svg — troca sozinho no tema escuro do sistema, sem JS. O PNG de
#    reserva (rasterizar.mjs) fica na versao clara.
favicon = svg(
    marca("url(#g)"),
    "<defs>"
    + gradiente("g", (VERDE, TEAL, AZUL))
    + "<style>@media (prefers-color-scheme: dark){"
    + f"#g stop:nth-child(1){{stop-color:{VERDE_ESCURO}}}"
    + f"#g stop:nth-child(2){{stop-color:{TEAL_ESCURO}}}"
    + f"#g stop:nth-child(3){{stop-color:{AZUL_ESCURO}}}"
    + "}</style></defs>",
)
escrever(p("public", "favicon.svg"), favicon)

# 4. Logo.astro — inline na pagina para os gradientes lerem os tokens do tema,
#    inclusive o seletor manual (data-tema), que um <img> externo nao enxerga.
paradas_claro = "".join(
    f'<stop offset="{o}" style="stop-color:var(--lg-{i})"/>' for o, i in PARADAS
)
astro = f"""---
/* Gerado por logos/gerar-marca.py — nao editar a mao, rode o script.
   Inline em vez de <img>: assim o gradiente le tokens da propria pagina e a
   marca acompanha o tema, inclusive o seletor manual (data-tema), que um .svg
   externo nao enxerga. */
interface Props {{ size?: number; class?: string }}
const {{ size = 40, class: klass }} = Astro.props;
---

<svg
  class:list={{["logo", klass]}}
  width={{size}}
  height={{size}}
  viewBox="{f(VB_X)} {f(VB_Y)} {f(VB_W)} {f(VB_H)}"
  role="img"
  aria-label="Coopluz"
  focusable="false"
>
  <defs>
    <linearGradient id="lg" gradientUnits="userSpaceOnUse" x1="24" y1="2" x2="62" y2="99">{paradas_claro}</linearGradient>
  </defs>
  {marca("url(#lg)")}
</svg>

<style>
  /* Valores claros crus: e o que sobra se light-dark() nao existir — o bloco
     do @supports cai fora e a marca fica na versao clara. */
  .logo {{
    --lg-0: {VERDE};
    --lg-1: {TEAL};
    --lg-2: {AZUL};

    display: block;
  }}

  @supports (color: light-dark(#fff, #000)) {{
    .logo {{
      --lg-0: light-dark({VERDE}, {VERDE_ESCURO});
      --lg-1: light-dark({TEAL}, {TEAL_ESCURO});
      --lg-2: light-dark({AZUL}, {AZUL_ESCURO});
    }}
  }}
</style>
"""
escrever(p("src", "components", "Logo.astro"), astro)
