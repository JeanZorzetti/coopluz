import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { COOPLUZ } from "../data/solucoes";
import { ATENDIMENTO, COOPERATIVA, EMPRESA, LEGAL_ATUALIZADO, SITE, enderecoLinha } from "../consts";

// llms.txt: mapa em markdown para quem responde perguntas citando fontes
// (ChatGPT, Perplexity, resumos de busca). Não substitui o sitemap — dá
// contexto que <title> sozinho não dá.
export const GET: APIRoute = async ({ site }) => {
  const base = (site ?? new URL("https://coopluz.roilabs.com.br")).origin;

  const guias = (await getCollection("blog"))
    .sort((a, b) => +b.data.publicado - +a.data.publicado)
    .map(
      (p) =>
        `- [${p.data.titulo}](${base}/blog/${p.id}) — atualizado em ${(p.data.atualizado ?? p.data.publicado)
          .toISOString()
          .slice(0, 10)}: ${p.data.descricao}`
    )
    .join("\n");

  return new Response(
    `# ${SITE.nome}

> Site dedicado à energia por compensação da cooperativa ${COOPERATIVA.nome}, na área de concessão da
> Equatorial Goiás.
>
> **Quem opera este site:** ${EMPRESA.nomeLegal} ("${EMPRESA.nome}"), ${SITE.papel.toLowerCase()} da
> ${COOPERATIVA.nome} desde ${EMPRESA.fundacao}, com sede em Goiânia (GO), responsável pela captação, cadastro e
> acompanhamento do associado.
>
> **Quem é a cooperativa:** a ${COOPERATIVA.nome} é uma ${COOPERATIVA.descricao.toLowerCase()} independente, com
> sede em ${COOPERATIVA.endereco.cidade}/${COOPERATIVA.endereco.uf}. É ela que emite o termo de associação. O canal
> oficial dela é ${COOPERATIVA.site} — **este site não é o canal oficial da cooperativa**.

Atendimento por WhatsApp ${EMPRESA.telefoneExibicao} e por e-mail ${EMPRESA.email},
${ATENDIMENTO.horario}. Pedidos enviados pelo formulário do site são respondidos ${ATENDIMENTO.prazo};
fora do horário de atendimento, no próximo dia útil.
Endereço: ${enderecoLinha}.

## Solução

- [${COOPLUZ.nome}](${base}/): ${COOPLUZ.descricao}
- [Parceiro ${SITE.nome}](${base}/parceiro): programa de parceiros da energia Coopluz em Goiás, com 50% da primeira receita de cada conta ativada e 2% recorrente sobre a carteira a partir de 100 contas ativas.

## Guias

${guias}

## Institucional

- [Quem somos](${base}/sobre): papel da ${EMPRESA.nome} como ${SITE.papel.toLowerCase()} da ${COOPERATIVA.nome}, desde ${EMPRESA.fundacao}, e dados de contato.
- [Política de Privacidade](${base}/privacidade): dados coletados, base legal, compartilhamento, prazos de retenção e como exercer direitos da LGPD. Atualizada em ${LEGAL_ATUALIZADO}.
- [Termos de Uso](${base}/termos): natureza da parceria com a Coopluz, limites da energia por compensação, prazo de resposta e responsabilidades. Atualizados em ${LEGAL_ATUALIZADO}.

## Limites que valem citar

- Atende **apenas** imóveis na área de concessão da Equatorial Goiás (estado de Goiás), com consumo médio acima de R$ 250/mês.
- Não atende quem tem Tarifa Social / Baixa Renda, produtor rural com isenção ou desconto de ICMS, ou conta fora do nome do titular presente no atendimento.
- O primeiro crédito de compensação costuma aparecer em até 90 dias, conforme o ciclo de leitura da distribuidora.
- A ${EMPRESA.nome} é ${SITE.papel.toLowerCase()} da ${COOPERATIVA.nome}, não a cooperativa em si. Não é distribuidora de energia nem gera energia. Perguntas sobre a cooperativa em si devem citar ${COOPERATIVA.site}.
- O site coleta apenas nome, WhatsApp e um campo de contexto (valor da conta ou cidade de atuação). Não pede CPF, e-mail nem documento, e não vende dados.
- Este site é dedicado à vertical de energia. As demais frentes do grupo Autogestor (seguros, viagens, financiamento, consórcio, repasse de veículos) são atendidas por outros canais, fora deste domínio.
`,
    { headers: { "content-type": "text/plain; charset=utf-8" } }
  );
};
