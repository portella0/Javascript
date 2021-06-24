export function aumentarAtributosACadaDoisLeveis(bancoDeDados) {
  const arrayDePersonagens = bancoDeDados;
  for (let i = 0; i < arrayDePersonagens.length; i++) {
    if (arrayDePersonagens[i].level > arrayDePersonagens[i].levelAnterior) 
    {
      if (arrayDePersonagens[i].level % 2 == 1 && arrayDePersonagens[i].level != 1) 
      {
        if (arrayDePersonagens[i].tipo == "NORMAL") 
        {
          arrayDePersonagens[i].vigorBase += 1 * Math.ceil(((arrayDePersonagens[i].level - arrayDePersonagens[i].levelAnterior)/2));
          arrayDePersonagens[i].vidaBase += 2 * Math.ceil(((arrayDePersonagens[i].level - arrayDePersonagens[i].levelAnterior)/2));
        }
        else 
        {
          arrayDePersonagens[i].vigorBase += 1 * Math.ceil(((arrayDePersonagens[i].level - arrayDePersonagens[i].levelAnterior - 1) / 2));
          arrayDePersonagens[i].vidaBase += 2 * Math.ceil(((arrayDePersonagens[i].level - arrayDePersonagens[i].levelAnterior - 1) / 2));
        }
        arrayDePersonagens[i].vigor = arrayDePersonagens[i].vigorBase;
        arrayDePersonagens[i].vida = arrayDePersonagens[i].vidaBase;
        //console.log(arrayDePersonagens)
      } 
      else 
      {
        if (arrayDePersonagens[i].tipo == "NORMAL") 
        {
          arrayDePersonagens[i].vigorBase += 1 * Math.ceil(((arrayDePersonagens[i].level - arrayDePersonagens[i].levelAnterior - 1) / 2));
          arrayDePersonagens[i].vidaBase += 2 * Math.ceil(((arrayDePersonagens[i].level - arrayDePersonagens[i].levelAnterior - 1) / 2));
        }
        else 
        {
          arrayDePersonagens[i].vigorBase += 1 * Math.ceil(((arrayDePersonagens[i].level - arrayDePersonagens[i].levelAnterior) / 2));
          arrayDePersonagens[i].vidaBase += 2 * Math.ceil(((arrayDePersonagens[i].level - arrayDePersonagens[i].levelAnterior) / 2));
        }
        arrayDePersonagens[i].vigor = arrayDePersonagens[i].vigorBase;
        arrayDePersonagens[i].vida = arrayDePersonagens[i].vidaBase;
         //console.log(arrayDePersonagens)
      }
    } 
  }
  return arrayDePersonagens;
}
