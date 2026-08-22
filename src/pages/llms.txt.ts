import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { COOPLUZ } from "../data/solucoes";
import { ATENDIMENTO, EMPRESA, LEGAL_ATUALIZADO, enderecoLinha } from "../consts";

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
    `# Autogestor Energia — Coopluz

> Site da Autogestor dedicado à energia por compensação da cooperativa Coopluz, em Goiás.
> A Autogestor é parceira comercial credenciada da Coopluz desde ${EMPRESA.fundacao}, com sede em Goiânia (GO),
> responsável pela captação, cadastro e acompanhamento do associado. Não é a cooperativa, não gera energia e não
> emite o contrato de associação — isso é feito pela própria Coopluz.

Atendimento por WhatsApp ${EMPRESA.telefoneExibicao} e por e-mail ${EMPRESA.email},
${ATENDIMENTO.horario}. Pedidos enviados pelo formulário do site são respondidos ${ATENDIMENTO.prazo};
fora do horário de atendimento, no próximo dia útil.
Endereço: ${enderecoLinha}.

## Solução

- [${COOPLUZ.nome}](${base}/): ${COOPLUZ.descricao}
- [Parceiro Autogestor Energia](${base}/parceiro): programa de parceiros da energia Coopluz em Goiás, com 50% da primeira receita de cada conta ativada e 2% recorrente sobre a carteira a partir de 100 contas ativas.

## Guias

${guias}

## Institucional

- [Sobre a Autogestor Energia](${base}/sobre): papel da Autogestor como parceira credenciada da Coopluz, desde ${EMPRESA.fundacao}, e dados de contato.
- [Política de Privacidade](${base}/privacidade): dados coletados, base legal, compartilhamento, prazos de retenção e como exercer direitos da LGPD. Atualizada em ${LEGAL_ATUALIZADO}.
- [Termos de Uso](${base}/termos): natureza da parceria com a Coopluz, limites da energia por compensação, prazo de resposta e responsabilidades. Atualizados em ${LEGAL_ATUALIZADO}.

## Limites que valem citar

- Atende **apenas** imóveis na área de concessão da Equatorial Goiás (estado de Goiás), com consumo médio acima de R$ 250/mês.
- Não atende quem tem Tarifa Social / Baixa Renda, produtor rural com isenção ou desconto de ICMS, ou conta fora do nome do titular presente no atendimento.
- O primeiro crédito de compensação costuma aparecer em até 90 dias, conforme o ciclo de leitura da distribuidora.
- A Autogestor é parceira credenciada da Coopluz, não a cooperativa em si. Não é distribuidora de energia nem gera energia.
- O site coleta apenas nome, WhatsApp e um campo de contexto (valor da conta ou cidade de atuação). Não pede CPF, e-mail nem documento, e não vende dados.
- Este site é dedicado à vertical de energia. As demais frentes do grupo Autogestor (seguros, viagens, financiamento, consórcio, repasse de veículos) são atendidas por outros canais, fora deste domínio.
`,
    { headers: { "content-type": "text/plain; charset=utf-8" } }
  );
};
