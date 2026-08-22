// ponytail: duplicado de C:\dev\autogestor\src\consts.ts (Princípio II da
// constituição do hub — "Fonte única por domínio", exceção deliberada). Os
// dois repositórios não compartilham pacote nem monorepo (decisão do hub:
// "nenhum import atravessando a fronteira"), então o NAP da Autogestor
// existe fisicamente nos dois lugares. Não importa daqui o original: os
// builds são independentes. Atualizar aqui manualmente sempre que o hub
// mudar endereço, telefone, e-mail, fundação ou o prazo/horário de
// atendimento — os dois arquivos precisam continuar batendo.
//
// EXTERNOS (cotação de seguro/viagens, consulta SUSEP) não migrou: nenhuma
// página deste site usa esses links, são específicos de outras verticais.

/** Dados de NAP (nome/endereço/telefone). Ficam num lugar só porque saem em três
 *  lugares — rodapé, JSON-LD e página de contato — e divergir entre eles é o
 *  erro clássico que derruba SEO local. */
export const EMPRESA = {
  nome: "Autogestor",
  nomeLegal: "Grupo Autogestor Adm de Serviços — Seguros, Financiamentos e Turismo",
  fundacao: "2004",
  susep: "202070004",
  telefone: "+5562982622220",
  telefoneExibicao: "(62) 98262-2220",
  email: "atendimento@autogestor.com.br",
  endereco: {
    rua: "Av. Itália, 1326",
    bairro: "Jardim Europa",
    cidade: "Goiânia",
    uf: "GO",
    cep: "74325-110",
    pais: "BR",
  },
  geo: { lat: -16.7089, lon: -49.2325 },
  redes: [
    "https://www.instagram.com/autogestorseguros/",
    "https://www.facebook.com/autogestorseguros/",
    "https://twitter.com/autogestors",
  ],
} as const;

export const enderecoLinha = `${EMPRESA.endereco.rua} — ${EMPRESA.endereco.bairro}, ${EMPRESA.endereco.cidade}/${EMPRESA.endereco.uf}, CEP ${EMPRESA.endereco.cep}`;

/** Link de WhatsApp com mensagem pronta. O contexto no texto poupa a primeira
 *  pergunta do atendente — é o passo que o formulário de 3 campos economizou. */
export function whatsapp(mensagem: string): string {
  return `https://wa.me/${EMPRESA.telefone.replace("+", "")}?text=${encodeURIComponent(mensagem)}`;
}

/** Prazo e horário de atendimento. Ficam aqui pelo mesmo motivo do NAP acima:
 *  saem no formulário, no /obrigado, no JSON-LD e no llms.txt — e uma promessa
 *  que diverge entre esses quatro é promessa quebrada em pelo menos um deles. */
export const ATENDIMENTO = {
  /** Encaixa depois de um verbo: "responde <prazo>". */
  prazo: "no mesmo dia útil",
  horario: "de segunda a sexta, das 8h às 18h",
  horarioCurto: "seg–sex, 8h–18h",
  /** openingHoursSpecification do JSON-LD. Mesmo horário de cima, no formato
   *  que o schema.org exige — derivar um do outro por parse não vale o código. */
  horarioSchema: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
} as const;

/** Medição. Mesma propriedade GA4 do hub (decisão registrada em
 *  specs/002-coopluz-standalone-site/research.md do hub) — troca fácil,
 *  uma linha, se um dia fizer sentido medir em propriedade própria. */
export const GA4 = "G-SHG12H2NZX";

/** Data da última revisão dos textos legais. Sai nas duas páginas e no llms.txt;
 *  política sem data é política que ninguém sabe se ainda vale. */
export const LEGAL_ATUALIZADO = "2026-08-21";
