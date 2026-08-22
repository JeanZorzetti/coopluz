# Coopluz — site institucional próprio

Site da vertical de energia da Autogestor (`coopluz.roilabs.com.br`),
extraído do hub `autogestor` (`C:\dev\autogestor`) como projeto irmão
independente. Ver `specs/002-coopluz-standalone-site/` **no repositório do
hub** para a spec, o plano técnico e as tarefas que geraram este projeto —
esta cópia não duplicou os documentos de spec-kit em si, só o código.

## Rodando localmente

```powershell
npm install
$env:DATABASE_URL = "<mesma connection string do hub>"
npm run dev
```

O Astro carrega `.env` só para `import.meta.env`; o código lê
`process.env`, que é o que a Vercel entrega em runtime — por isso a
variável precisa ser **exportada** no shell antes de `npm run dev`, copiar
`.env.example` para `.env` não basta.

## Decisões que não são óbvias no código

**Mesmo banco do hub, de propósito.** `src/lib/db.ts` e `src/pages/api/lead.ts`
são cópias sem alteração de lógica dos arquivos equivalentes do hub. Os leads
deste site caem nas mesmas tabelas `crm_leads`/`crm_eventos`, nos pipelines
`coopluz` e `parceiro-coopluz` que o painel administrativo do hub **já lê**.
Não existe painel próprio deste site e não deve existir — criar um
duplicaria um sistema que já funciona.

**`consts.ts` e `data/solucoes.ts` são duplicados, não importados.** Este
repositório não tem dependência de build no hub (nem monorepo, nem pacote
compartilhado — mesma regra que já vale entre o hub e o `admin/` dele). Os
dois arquivos têm um comentário no topo explicando a duplicação; ao mudar
NAP, telefone ou horário de atendimento no hub, replicar aqui manualmente.

**GA4 reaproveitado.** Mesma propriedade do hub (`G-SHG12H2NZX`), não uma
nova. Tráfego deste site é distinguível por hostname na mesma propriedade.
Trocar por uma propriedade dedicada é uma linha em `src/consts.ts`, quando
fizer sentido medir separado.

**Imagem de Open Graph reaproveitada.** `/img/og.png` é a mesma do hub —
não existe hoje uma imagem de compartilhamento específica da Coopluz.
Produzir uma é trabalho de design, não desta migração.

**Sem página `/contato` própria.** Segue o padrão do hub: contato mora em
`/sobre` (endereço, WhatsApp, e-mail), não numa rota separada.

**Sem menção a SUSEP.** O registro SUSEP é da vertical de seguros da
Autogestor, não desta. Todo texto herdado do hub que citava SUSEP foi
reescrito para "parceira credenciada da Coopluz desde 2004".

**Conteúdo duplicado com o hub, por enquanto.** O hub continua com sua
própria página `/coopluz` no ar. As duas versões existem ao mesmo tempo até
uma decisão futura de redirecionar ou remover a página do hub — decisão
fora do escopo desta migração, já prevista em
`docs/estrutura-hub-e-subdominios.md` do hub.

## Deploy

Projeto Vercel próprio (não o mesmo do hub), variáveis de ambiente
`DATABASE_URL` (idêntica à do hub) e `SITE_URL=https://coopluz.roilabs.com.br`,
domínio `coopluz.roilabs.com.br` apontado no projeto — passo manual, fora do
código.
