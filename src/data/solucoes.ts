// ponytail: duplicado (reduzido) de C:\dev\autogestor\src\data\solucoes.ts —
// mesmo motivo e mesma regra de atualização do comentário em consts.ts.
// Só as 2 entradas da Coopluz migraram; as outras 5 verticais, `PARCEIRO`
// (parceiro genérico) e `GERAL` (captação da home do hub) não existem
// neste site — fora de escopo (spec 002-coopluz-standalone-site, Assumptions).

/** Mantido igual ao hub para o `LeadForm`/`api/lead` funcionarem sem adaptação. */
export type Solucao = {
  slug: string;
  nome: string;
  curto: string;
  resumo: string;
  titulo: string;
  descricao: string;
  abrangencia: "BR" | "GO";
  provedor?: string;
  campo: { rotulo: string; exemplo: string; opcoes?: readonly string[]; avisoPara?: { opcao: string; texto: string } };
  cta: string;
  fechamento: string;
  icone: string;
};

export const ICONES = {
  zap: '<path d="M12 3.5c-4.7 0-8.5 3.3-8.5 7.4 0 2.4 1.3 4.5 3.3 5.9l-.8 3.2 3.5-1.6c.8.2 1.6.3 2.5.3 4.7 0 8.5-3.3 8.5-7.4s-3.8-7.4-8.5-7.4z"/>',
  energia: '<path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12z"/>',
} as const;

export const COOPLUZ: Solucao = {
  slug: "coopluz",
  nome: "Energia Coopluz",
  curto: "Energia",
  resumo: "20% de desconto na conta da Equatorial Goiás, sem obra e sem placa no telhado.",
  titulo: "20% de desconto na conta de luz da Equatorial Goiás | Coopluz Goiás",
  descricao:
    "Associe-se à Coopluz e pague 20% menos na conta da Equatorial Goiás. Sem instalar placa solar, sem obra, sem taxa de adesão e sem multa para sair.",
  abrangencia: "GO",
  provedor: "Coopluz",
  campo: {
    rotulo: "Valor médio da sua conta de luz",
    exemplo: "ex.: R$ 450",
    opcoes: ["Até R$ 250", "R$ 251 a R$ 500", "R$ 501 a R$ 1.000", "Acima de R$ 1.000"],
    avisoPara: {
      opcao: "Até R$ 250",
      texto: "Abaixo de R$ 250 o desconto não compensa a operação — a gente prefere dizer isso antes de você preencher o resto.",
    },
  },
  cta: "Quero pagar 20% menos",
  fechamento: "Peça a análise da sua conta de luz",
  icone: ICONES.energia,
};

/** As cidades do material impresso de captação, na ordem em que o parceiro
 *  reconhece a praça (capital e região metropolitana primeiro). A lista existe
 *  para o lead já chegar roteado por cidade, não para restringir: a Coopluz
 *  atende toda a área de concessão da Equatorial Goiás, e é por isso que
 *  "Outra cidade de Goiás" fecha o `<select>` em vez de ficar de fora. */
export const CIDADES_COOPLUZ = [
  "Goiânia",
  "Aparecida de Goiânia",
  "Anápolis",
  "Rio Verde",
  "Catalão",
  "Itumbiara",
  "Formosa",
  "Ceres",
  "Uruaçu",
  "Iporá",
  "Outra cidade de Goiás",
] as const;

export const PARCEIRO_COOPLUZ: Solucao = {
  slug: "parceiro-coopluz",
  nome: "Parceiro Coopluz Goiás",
  curto: "Parceiro Energia",
  resumo: "Ative contas de energia em Goiás e receba na ativação mais recorrente sobre a carteira.",
  titulo: "Seja parceiro da energia Coopluz em Goiás | Coopluz Goiás",
  descricao:
    "Represente a energia Coopluz em Goiás: 50% da primeira receita de cada conta ativada e 2% recorrente sobre toda a carteira a partir de 100 contas ativas. Sem investimento, sem instalação e sem taxa de adesão.",
  abrangencia: "GO",
  campo: {
    rotulo: "Sua cidade de atuação",
    exemplo: "Goiânia",
    opcoes: CIDADES_COOPLUZ,
  },
  cta: "Quero ser parceiro",
  fechamento: "Escolha sua cidade e comece",
  icone: ICONES.energia,
};

const TODAS = [COOPLUZ, PARCEIRO_COOPLUZ] as const;

export const porSlug = (slug: string): Solucao => {
  const s = TODAS.find((x) => x.slug === slug);
  if (!s) throw new Error(`solução desconhecida: ${slug}`);
  return s;
};

/** `areaServed` do schema.org a partir da abrangência. As duas soluções deste
 *  site são GO — BR fica só para o `type Solucao` continuar compatível com o
 *  componente `LeadForm`/`Base` copiados do hub sem alteração. */
export const AREA_SERVIDA = {
  BR: { "@type": "Country", name: "Brasil" },
  GO: { "@type": "State", name: "Goiás" },
} as const;
