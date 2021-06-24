export const OPERACAO_INVALIDA = 'OPERACAO_INVALIDA'

var resultado = 0;
var i;

export const calculadora = (operacao, valores) => { 
  switch (operacao) {
    case 'soma':
      for (i = 0; i < valores.length; i++) {
        resultado += valores[i];
      }
      return resultado;
    case 'subtracao':
      resultado = valores[0];
      for (i = 1; i < valores.length; i++) {
        resultado -= valores[i];
      }
      return resultado;
    case 'multiplicacao':
      resultado = valores[0];
      for (i = 1; i < valores.length; i++) {
        resultado *= valores[i];
      }
      return resultado;
    case 'divisao':
      resultado = valores[0];
      for (i = 1; i < valores.length; i++) {
        resultado /= valores[i];
      }
      return resultado;
    default:
      return OPERACAO_INVALIDA;
  }
}
