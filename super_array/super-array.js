export const SuperArray = (itens = []) => {

  const array = {
    /**
     * Propriedade para acessar os itens
     */

    itens: [...itens],
  }


  /**
   * Adicionar um novo item ao final dos items
   */

  array.push = item => {
    array.itens[itens.length] = item;
    console.log("deu push");
  }

  
  /**
   * Itera sobre cada um dos elementos do SuperArray enviando o item e o index
   * como segundo parametro
   */

  array.forEach = callback => {
    for (let i = 0; i < array.itens.length; i++)
     {
      callback(itens[i]);
     }
     console.log("for each");
  }

  /**
   * Retorna um novo SuperArray com os itens mapeados
   */

  array.map = callback => {
    let newArray = [];

    for (let i = 0; i < array.itens.length; i++)
    {
      newArray[i] = callback(array.itens[i]);
    }

    console.log("fez map");

    return newArray;
  }


  /**
   * Retorna um SuperArray novo com os itens filtrados
   */

  array.filter = callback => {
    let filterArray = [];
    let contador = 0;

    for (let i = 0; i < array.itens.length; i++)
    {
      for (let j = contador; j < array.itens.length; j++) 
      {
        if(callback(array.itens[j]) == true)
        {
          filterArray[i] = array.itens[j];   
          contador = j + 1;
          break;
        }
      }
    }

    console.log("filtrou");

    return filterArray;
  }


  /**
   * Retorna o primeiro elemento do SuperArray que satisfazer o callback recebido
   * se não encontrar, deve retornar undefined
   */

  array.find = callback => {
    console.log("finding");
    for (let i = 0; i < array.itens.length; i++)
    {
      if(callback(itens[i]) == true)
      {
        return itens[i];
      }
    }
    return undefined;
  }

  /**
   * Reduz o SuperArray em um único valor
   */


  array.reduce = (callback, valorInicial) => {
    let acumulador = valorInicial;

    for (let i = 0; i < array.itens.length; i++)
    {
      acumulador = callback(acumulador, itens[i]);
    }

    console.log("acumulou");

    return acumulador
  }
  
  return array;
}
