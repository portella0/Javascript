import instrutores from './instrutores.json'
import { SuperArray } from '../src/super-array'

let INSTRUTORES; 

beforeEach(() => {
  INSTRUTORES = SuperArray(instrutores);
})

describe('Exemplo de testes', () => {
  it('Valor importado deve ser true', () => {
    expect(true).toBeTruthy()
  })
  
  it('push deve adicionar um novo instrutor ao meu super array', () => {
    INSTRUTORES.push({ "nome": "Carlos da Silva", "dandoAula": true });

    const esperado = [
      { "nome": "Fabio Junqueira", "dandoAula": false },
      { "nome": "Pablo Oliveira", "dandoAula": false },
      { "nome": "Sergio Andrade", "dandoAula": false },
      { "nome": "Gustavo Büttenbender Rodrigues", "dandoAula": true },
      { "nome": "William Cardozo", "dandoAula": true },
      { "nome": "Diandra Rocha", "dandoAula": false },
      { "nome": "Rafael Zorzanelo", "dandoAula": false },
      { "nome": "Victor Herzog Damke", "dandoAula": false },
      { "nome": "Carlos da Silva", "dandoAula": true }
    ]
    const resultado = INSTRUTORES.itens;

    console.log("esperado:", esperado);
    console.log("resultado:",resultado);

    expect(esperado).toEqual(resultado);
  })

  
  it('forEach deve passar por todos os instrutores e chamando o callback esperado', () => {
    let i = 0;
    let resultado =[];

    function filtraSoNomes(instrutores) {
      resultado[i] = instrutores.nome;
      i++;
    }

    const esperado = [
      "Fabio Junqueira",
      "Pablo Oliveira",
      "Sergio Andrade",
      "Gustavo Büttenbender Rodrigues",
      "William Cardozo",
      "Diandra Rocha",
      "Rafael Zorzanelo",
      "Victor Herzog Damke"
    ]

    INSTRUTORES.forEach(filtraSoNomes);

    console.log("esperado:", esperado);
    console.log("resultado:",resultado);

    expect(esperado).toEqual(resultado);
  })

  it('filter deve retornar um novo array apenas com os instrutores que estão dando aula', () => {
    function instrutoresDandoAula(instrutores) {
      if(instrutores.dandoAula == true)
      return true;
    }

    const esperado = [
      { "nome": "Gustavo Büttenbender Rodrigues", "dandoAula": true },
      { "nome": "William Cardozo", "dandoAula": true },
    ]

    const resultado = INSTRUTORES.filter(instrutoresDandoAula);

    console.log("esperado:", esperado);
    console.log("resultado:",resultado);

    expect(esperado).toEqual(resultado);
  })

  
  it('map deve retornar um novo array com o numero de nomes que o instrutor tem', () => {
    let nomes = [];

    function contaNomes(instrutores) {
      nomes = instrutores.nome.split(" ");

      return Object.keys(nomes).length;
    }

    const esperado = [2,2,2,3,2,2,2,3]
    const resultado = INSTRUTORES.map(contaNomes);

    console.log("esperado:", esperado);
    console.log("resultado:",resultado);

    expect(esperado).toEqual(resultado);
  })

  it('find deve retornar o primeiro instrutor que está dando aula', () => {
    function primeiroIntrutorDandoAula(instrutores) {
      if(instrutores.dandoAula == true)
      return true;
    }

    const esperado = { "nome": "Gustavo Büttenbender Rodrigues", "dandoAula": true };
    
    const resultado = INSTRUTORES.find(primeiroIntrutorDandoAula);

    console.log("esperado:", esperado);
    console.log("resultado:", resultado);

    expect(esperado).toEqual(resultado);
  })

  it('reduce deve retornar o total de letras no nome dos instrutores', () => {
    let nomeCompleto;
    let nomeLetras;

    function totalDeLetras(quantidade, instrutores) {
      nomeCompleto = instrutores.nome;

      nomeLetras = nomeCompleto.replace(/ /g, "");

      quantidade += nomeLetras.length;

      return quantidade;
    }
    
    const esperado = 126;

    const resultado = INSTRUTORES.reduce(totalDeLetras, 0);

    console.log("esperado:", esperado);
    console.log("resultado:", resultado);

    expect(esperado).toEqual(resultado);
  })

  it('reduce deve retornar um boolean se todos os instrutores estão dando aula', () => {
    function todosDandoAula(estaoDandoAula, instrutores) {
      if(instrutores.dandoAula == true)
      estaoDandoAula = true;
      else
      estaoDandoAula = false;

      return estaoDandoAula;
    }
    
    const esperadoFalse = false;
    const resultadoFalse = INSTRUTORES.reduce(todosDandoAula, false);

    console.log("esperado false:", esperadoFalse);
    console.log("resultado false:", resultadoFalse);

    //teste com lista só com instrutores dando aula
    function instrutoresDandoAula(instrutores) {
      if(instrutores.dandoAula == true)
      return true;
    }

    const instrutoresDandoAulaTrue = INSTRUTORES.filter(instrutoresDandoAula);
    const esperadoTrue = true;
    const resultadoTrue = instrutoresDandoAulaTrue.reduce(todosDandoAula, false);

    console.log("esperado true:", esperadoTrue);
    console.log("resultado true:", resultadoTrue);

    //testes
    expect(esperadoFalse).toEqual(resultadoFalse);
    expect(esperadoTrue).toEqual(resultadoTrue);
  })
})
