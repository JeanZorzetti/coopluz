// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { escopoDeCabecalho } from "./src/lib/tabela.mjs";

// URL base vem do ambiente pelo mesmo motivo do hub autogestor (origem deste
// arquivo): canonical e sitemap saem daqui — errar isso publica canonical
// apontando para o domínio de preview. SITE_URL vazia ou sem esquema derrubava
// o build inteiro ("site: Invalid url"); cair no domínio de produção é o pior
// caso aceitável, build quebrado não é.
const site = URL.canParse(process.env.SITE_URL ?? "")
  ? process.env.SITE_URL
  : "https://coopluz.roilabs.com.br";

export default defineConfig({
  site,
  // Estático: só o endpoint de lead (/api/lead) e /obrigado são dinâmicos —
  // mesma filosofia do hub.
  output: "static",
  adapter: vercel(),
  integrations: [sitemap({ filter: (page) => !page.includes("/obrigado") })],
  trailingSlash: "never",
  markdown: { rehypePlugins: [escopoDeCabecalho] },
  build: { inlineStylesheets: "always" },
  image: { responsiveStyles: true },
});
