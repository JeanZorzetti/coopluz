/** A régua da capa da home e a faixa do formulário falam a mesma língua.
 *
 *  O formulário pede a conta em faixas (COOPLUZ.campo.opcoes, em solucoes.ts:
 *  até 250, 251–500, 501–1.000, acima de 1.000); a régua dá o valor exato.
 *  Esta função é a única ponte entre os dois — o servidor usa para já pintar o
 *  <select> marcado, o script da capa usa a cada movimento. Duas cópias da
 *  regra divergiriam no primeiro ajuste de faixa, e o CRM receberia uma faixa
 *  que não é a que a pessoa viu na tela.
 *
 *  Devolve a opção (texto) ou `undefined` quando a lista não tem as 4 faixas
 *  esperadas: aí quem chama mostra o <select> em vez de adivinhar.
 */
export function faixaDaConta(valor, opcoes) {
  if (!Array.isArray(opcoes) || opcoes.length !== 4) return undefined;
  const i = valor <= 250 ? 0 : valor <= 500 ? 1 : valor <= 1000 ? 2 : 3;
  return opcoes[i];
}
