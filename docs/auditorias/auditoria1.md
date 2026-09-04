# Auditoria 1 — revisão de copy do site

Texto revisado pelo cliente para as telas de `coopluz.roilabs.com.br`, item a
item, com o destino de cada bloco no código e a diferença em relação ao que
está no ar hoje. **O texto citado (`>`) está verbatim, inclusive erros de
digitação e acentuação** — quem aplicar decide o que é correção de português e
o que é mudança de conteúdo.

| # | Bloco | Destino |
|---|---|---|
| 1 | Chamada do topo | [`index.astro:47`](../../src/pages/index.astro#L47) |
| 2 | O problema | [`index.astro:73-77`](../../src/pages/index.astro#L73-L77) |
| 3 | A saída conhecida | [`index.astro:79-82`](../../src/pages/index.astro#L79-L82) |
| 4 | Quem está por trás | [`index.astro:204-213`](../../src/pages/index.astro#L204-L213) |
| 5 | Do outro lado do balcão | [`index.astro:233-240`](../../src/pages/index.astro#L233-L240) |
| 6 | Próximo passo (fechamento) | [`solucoes.ts:48`](../../src/data/solucoes.ts#L48) + [`Vertical.astro:102-108`](../../src/layouts/Vertical.astro#L102-L108) |
| 7 | Topo de `/parceiro` | [`parceiro.astro:91-96`](../../src/pages/parceiro.astro#L91-L96) |
| 8 | Quem somos | [`sobre.astro:58-63`](../../src/pages/sobre.astro#L58-L63) |
| 9 | Cartão Coopluz | [`sobre.astro:74-80`](../../src/pages/sobre.astro#L74-L80) |
| 10 | Cartão Autogestor | [`sobre.astro:82-88`](../../src/pages/sobre.astro#L82-L88) |
| 11 | Termos — o que este site é | [`termos.astro:14-24`](../../src/pages/termos.astro#L14-L24) |
| 12 | Termos — estimativa não é contrato | [`termos.astro:26-32`](../../src/pages/termos.astro#L26-L32) |
| 13 | Termos — prazo de resposta | [`termos.astro:34-41`](../../src/pages/termos.astro#L34-L41) |
| 14 | Termos — limites | [`termos.astro:43-57`](../../src/pages/termos.astro#L43-L57) |

---

## Home (`/`)

### 1 · Chamada do topo

> A Coopluz é uma cooperativa de compensação de energia por assinatura. Você se
> torna um cooperado e recebe 20% de desconto em sua próxima fatura de energia
> após aprovação. Sem mudar a titularidade da UC (Unidade Consumidora) sem
> instalar placas ou equipamentos, sem trocar de distribuidora e o melhor
> totalmente gratuito sua adesão.

**No ar hoje:** não fala em "20% na próxima fatura após aprovação", em
titularidade da UC nem em gratuidade da adesão; fala em créditos de fazendas
solares cooperadas e em "sem taxa de adesão". O h1 acima da chamada já carrega
os 20%.

### 2 · O problema — *A conta de luz subiu e não tem como consumir menos*

> Bandeira tarifária, reajuste anual, calor de Goiás no ar-condicionado. Em
> residências e comércios da região, a energia virou uma das três maiores
> despesas fixas do mês — e cortar consumo já não resolve, porque o que subiu
> foi o preço do kWh, não o seu uso.

**No ar hoje:** idêntico. Sem mudança.

### 3 · A saída conhecida

> A saída conhecida era investir em um sistema solar próprio, com obra, projeto
> e anos de retorno. A compensação de energia resolve o mesmo problema sem o
> investimento: em vez de gerar no seu telhado, você usa a energia de uma
> fazenda solar da Coopluz.

**No ar hoje:** diz "investir **dezenas de milhares de reais**" e "a geração de
uma fazenda solar **que já existe**". A revisão tira o número e atribui a fazenda
à Coopluz.

### 4 · Quem está por trás — *Uma cooperativa de energia, uma de crédito e um representante autorizado*

> A Coopluz é uma cooperativa independente com sede em Goiânia e opera em
> parceria com o Sicoob Secovicred. A Autogestor é representante autorizado: é
> com a gente que você fala e é a Coopluz que emite o contrato de ativação.
> Nenhuma das três consulta SPC ou Serasa para fazer analise do titular da conta
> (unidade consumidora).
>
> No material institucional da própria Coopluz, a Autogestor aparece listada
> como Representante Autorizado, ao lado do Sicoob Nova Central e do Sicoob
> Secovicred — não é só o que a gente diz sobre si.

**No ar hoje:** "contrato de **associação**" e "não consulta SPC ou Serasa **para
associar você**". Segundo parágrafo idêntico.

### 5 · Do outro lado do balcão

> **Dá para zerar sua conta de energia com a Coopluz, e não só economizar**
>
> Se você tem rede de contatos em Goiás, a Autogestor está selecionado parceiros
> em varias cidades do Estado de Goiás para apresentar um plano de negócios e
> carreira, sem investimento e com treinamento gratuito. Veja como funciona o
> programa de parceiros da Autogestor

**No ar hoje:** o título é "Dá para **ganhar** com a Coopluz" e o parágrafo
descreve a remuneração ("comissão na ativação de cada conta e renda recorrente
sobre a carteira"). A revisão troca por "plano de negócios e carreira".

⚠️ "Zerar sua conta de energia" é promessa diferente de 20% de desconto — o
resto do site inteiro promete 20%.

### 6 · Próximo passo — *Peça a análise da sua conta de luz*

> Um consultor da Autogestor responde no seu WhatsApp no mesmo dia útil.
> Representante autorizado da Coopluz, com sede em Goiânia, atendendo a área de
> concessão da Equatorial Goiás.

**No ar hoje:** igual, mais "Representante autorizado da Coopluz **desde 2004**".
A revisão tira o ano. Prazo, cidade e ano vêm de
[`consts.ts`](../../src/consts.ts) — mudar aqui muda em todas as páginas.

---

## Parceiro (`/parceiro`)

### 7 · Topo — "Seja um parceiro agora ok"

> Representante autorizado · Energia Coopluz
>
> Energia boa se compartilha, seja parceiro da Autogestor e construa sua renda
> recorrente.

**No ar hoje:** o h1 é "Seja parceiro da energia Coopluz e construa sua renda
recorrente". A revisão propõe "Energia boa se compartilha" na frente. O olho
("Representante autorizado · Energia Coopluz") já é o que está lá.

---

## Sobre (`/sobre`)

### 8 · Quem somos

> A Autogestor foi fundada em 2004 em Goiânia como Administração de Serviços e
> Seguros, através do reconhecimento do trabalho se torna um parceiro da
> cooperativa de energia Coopluz na área de expansão comercial — cuidando de
> todo o relacionamento com os novos cooperados e parceiros.

**No ar hoje:** "nasceu em 2004 em Goiânia como **corretora de serviços** e hoje
representa a cooperativa Coopluz **na área de concessão da Equatorial Goiás**".

### 9 · Quem faz o quê — cartão **Coopluz**

> Cooperativa de energia por compensação, independente, com sede em Goiânia.
> Responsável pela gestão da energia gerada (em fazendas solares cooperadas) e
> quem emite o contrato e as faturas ao cooperado ativo.

**No ar hoje:** "**É quem gera** a energia" e menciona a parceria com o Sicoob
Secovicred, que a revisão retira. A revisão acrescenta a emissão das faturas.

### 10 · Quem faz o quê — cartão **Autogestor**

> Parceira comercial credenciada da Coopluz. É com a Autogestor que o futuro
> cooperado inicia seu processo de cadastro junto a Coopluz, tira dúvidas,
> acompanha o processo até o primeiro crédito aparecer na fatura, e segue
> disponível depois disso.

**No ar hoje:** mesma estrutura, com "futuro **associado**".

---

## Termos de uso (`/termos`)

### 11 · O que este site é

> Este site apresenta a energia por compensação da cooperativa Coopluz e permite
> pedir associação por um formulário de três campos. Usar o site significa
> concordar com as regras desta página.
>
> A Grupo Autogestor Adm de Serviços — Seguros, Financiamentos e Turismo atua
> neste site como representante autorizado da cooperativa de energia Coopluz:
> faz a captação, o cadastro e o acompanhamento do COOPERADO. A Autogestor não é
> a cooperativa Coopluz, não gera energia e não emite o contrato de admissão ao
> programa de compensação energetica da Coopluz — quem faz isso é a própria
> Coopluz.

**No ar hoje:** "acompanhamento do **associado**", "contrato de **associação**" e
o fecho "— quem faz isso é a própria Coopluz, **em conjunto com o Sicoob
Secovicred**". A revisão retira o Sicoob. A razão social sai de
[`consts.ts`](../../src/consts.ts), não é literal na página.

### 12 · Estimativa não é contrato

> Valores, descontos e prazos apresentados neste site ou no atendimento são
> estimativas e não substituem o termo de adesão formal da Coopluz. Toda
> ativação depende de análise e aceitação da Coopluz, e pode sair em condição
> diferente da estimada conforme o consumo real da unidade.
>
> Cadastro, simulação e análise são gratuitos. Não há taxa de adesão nem multa
> de cancelamento — ao sair, paga-se apenas o saldo residual dos créditos já
> usados e não faturados.

**No ar hoje:** "termo de **associação** formal" e "Toda **associação** depende de
análise e aceitação **da cooperativa**". Segundo parágrafo idêntico.

### 13 · Prazo de resposta

> Pedidos enviados pelo formulário são respondidos por WhatsApp no mesmo dia
> útil. O atendimento funciona de segunda a sexta, das 8h às 18h; pedidos
> enviados fora desse horário, em fim de semana ou feriado são respondidos no
> próximo dia útil. Esse prazo é de resposta, não de conclusão da ativação — o
> primeiro crédito na fatura costuma aparecer em até 90 dias, conforme o ciclo
> de leitura da Equatorial Goiás.

**No ar hoje:** idêntico, com "conclusão da **associação**". Prazo e horário vêm
de `ATENDIMENTO` em [`consts.ts`](../../src/consts.ts).

### 14 · Limites da energia por compensação

> - Vale apenas para imóveis atendidos pela Equatorial Goiás, no estado de
>   Goiás, com consumo médio acima de R$ 250 por mês. Abaixo disso, o cadastro
>   entra para analise da Coopluz.
> - Não é aceita a ativação de quem tem Tarifa Social / Baixa Renda, produtor
>   rural com isenção ou desconto de ICMS, ou conta que não esteja no nome do
>   titular presente no atendimento.
> - O primeiro crédito costuma aparecer em até 90 dias, prazo que depende do
>   ciclo de leitura da distribuidora e não é controlado pela Autogestor nem
>   pela Coopluz isoladamente.

**No ar hoje:** abaixo de R$ 250, "**o desconto não compensa a operação**" (corte
seco). A revisão passa a mandar o cadastro para análise da Coopluz — muda a
regra de qualificação, não só o texto.

---

## Temas transversais

1. **"associado" → "cooperado"**, **"associação" → "ativação" / "adesão"**. A
   troca aparece em 8 dos 14 blocos e não para neles: o site usa "associado"
   também no formulário, no FAQ, nos posts do blog, no `llms.txt` e no JSON-LD.
   Aplicar só nos trechos acima deixa o site falando dois idiomas.
2. **O Sicoob some de dois lugares** (cartão Coopluz e termos) e continua no
   bloco "Quem está por trás". Decidir se é remoção deliberada ou esquecimento.
3. **Consistência da promessa:** o item 5 fala em "zerar a conta"; todo o resto
   do site vende 20% de desconto.
