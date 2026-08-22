# Coopluz Goiás — site de captação da energia por compensação

Site em `coopluz.roilabs.com.br`, operado pela **Autogestor**, representante
autorizado da cooperativa **Coopluz**. Extraído do hub `autogestor`
(`C:\dev\autogestor`) como projeto irmão independente.

Specs: a `002-coopluz-standalone-site` (extração) vive **no repositório do
hub**; a `003-identidade-coopluz` (identidade própria + fim da canibalização de
SEO) vive em [`specs/003-identidade-coopluz/`](specs/003-identidade-coopluz/),
aqui.

## Rodando localmente

```powershell
npm install
$env:DATABASE_URL = "<mesma connection string do hub>"
npm run dev
```

O Astro carrega `.env` só para `import.meta.env`; o código lê `process.env`,
que é o que a Vercel entrega em runtime — por isso a variável precisa ser
**exportada** no shell antes de `npm run dev`, copiar `.env.example` para
`.env` não basta.

```bash
npm test        # node --test test/*.test.mjs
npm run build
npm run check   # astro check (tipos)
npm run marca   # regera símbolo, ícones e imagem de compartilhamento
npm run contraste   # mede todos os pares de cor, nos dois temas
```

**Verificar tela é sobre o build, não sobre o dev server.** O `astro dev`
injeta a barra de ferramentas do Astro: DOM extra e ~1,8 MB de JavaScript que
não existem em produção. Rode `npm run build` e sirva `.vercel/output/static`.

## Decisões que não são óbvias no código

**A identidade é da Coopluz; o site não é da Coopluz.** A paleta
(verde `#40AC68`, teal `#248CA0`, azul `#1C68B4`), o símbolo lâmpada-folha e o
tom vêm do material institucional da cooperativa. Quem opera o site é a
Autogestor, e isso é declarado em três lugares obrigatórios — cabeçalho,
rodapé e JSON-LD (`publisher` = Autogestor, `about` = Coopluz). É o Princípio VI
da constituição, não uma boa prática opcional: se um desses três sumir numa
refatoração, o site passa a insinuar que é o canal oficial da cooperativa.

**O símbolo é próprio, o lockup oficial é atribuição.** A marca do cabeçalho é
gerada por fórmula em `logos/gerar-marca.py` — não é a marca registrada da
cooperativa redesenhada. O lockup oficial aparece só na faixa "quem está por
trás" da home, onde é atribuição de terceiro. O arquivo em
`public/img/parceiros/coopluz.png` foi extraído do material de abril/2026; o que
existia antes era uma geração anterior da marca (verde/lima) e estava errado.

**Nenhum ativo de marca é editado à mão.** `npm run marca` regenera
`logo.svg`, `logo-mono.svg`, `favicon.svg`, os três PNGs de ícone e a imagem de
Open Graph. A OG é renderizada no navegador (Playwright) e não montada no
sharp, porque a Outfit não está instalada no sistema e um SVG rasterizado
cairia numa grotesca qualquer justamente no lugar onde a marca aparece para
quem ainda não entrou no site.

**Contraste é medido, não estimado.** `npm run contraste` roda os pares dos dois
temas e falha com código 1 se algum reprovar. O verde da marca sobre branco dá
2.87:1 e reprova em AA — o botão primário é verde com **texto tinta** (5.96:1).
A cor da marca não é escurecida para passar; o texto é que muda.

**Fonte de exibição é Outfit, não Archivo.** A Archivo é a do hub, e o site
existe para não parecer o hub. O `@font-face` de métrica casada
(`"Outfit capa"`) tem `size-adjust` **medido** em `logos/metricas-fonte.mjs`,
não chutado: número errado ali troca um reflow por outro e ninguém percebe.

**Mesmo banco do hub, de propósito.** `src/lib/db.ts` e `src/pages/api/lead.ts`
são cópias sem alteração de lógica do hub. Os leads deste site caem nas mesmas
tabelas `crm_leads`/`crm_eventos`, nos pipelines `coopluz` e `parceiro-coopluz`
que o painel administrativo do hub **já lê**. Não existe painel próprio deste
site e não deve existir.

**`consts.ts` e `data/solucoes.ts` são duplicados, não importados.** Este
repositório não tem dependência de build no hub. Os dois arquivos têm comentário
no topo explicando a duplicação; ao mudar NAP, telefone ou horário de
atendimento no hub, replicar aqui manualmente.

**Duas organizações em `consts.ts`, separadas.** `EMPRESA` é quem opera o site
(Autogestor); `COOPERATIVA` é sobre quem o site fala (Coopluz, com o NAP público
dela e o canal oficial `coopluz.eco.br`). Fundir as duas num objeto só seria
erro de veracidade, não só de manutenção.

**GA4 reaproveitado.** Mesma propriedade do hub (`G-SHG12H2NZX`). Tráfego deste
site é distinguível por hostname na mesma propriedade. Trocar por uma
propriedade dedicada é uma linha em `src/consts.ts`.

**Sem página `/contato` própria.** Contato mora em `/sobre` (endereço, WhatsApp,
e-mail), não numa rota separada.

**Sem menção a SUSEP.** O registro SUSEP é da vertical de seguros da Autogestor,
não desta.

**A duplicação com o hub acabou.** O hub deixou de publicar `/coopluz`,
`/coopluz/parceiro` e os dois artigos do cluster de energia; as quatro URLs
respondem 301 para cá. Foi a spec 003 que fechou isso — a spec 002 tinha
registrado a duplicação como trade-off temporário.

## Deploy

Projeto Vercel próprio (não o mesmo do hub), variáveis de ambiente
`DATABASE_URL` (idêntica à do hub) e `SITE_URL=https://coopluz.roilabs.com.br`,
domínio `coopluz.roilabs.com.br` apontado no projeto — passo manual, fora do
código.

`SITE_URL` inválida (vazia ou sem esquema) não derruba mais o build: o
`astro.config.mjs` valida com `URL.canParse` e cai no domínio de produção. O
build para de quebrar, mas o canonical fica errado — conferir a variável
continua sendo obrigação.
