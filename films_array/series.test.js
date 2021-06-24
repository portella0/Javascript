import axios from 'axios'

import {
  verificarSeAtorEstaEmSeriado,
  filtarPorAnoERetornarNome,
  calcularMediaTotalDeEpisodios,
  agruparTituloDasSeriesPorPropriedade,
} from '../src/metodos'

let respostaApi;

beforeAll(async() => {
  respostaApi = await axios.get('https://gustavobuttenbender.github.io/film-array/data/films.json'); 
})

describe('Testes', () => {
  it('Deve filtrar as series com ano de estreia maior ou igual a 2010 e retornar uma listagem com os nomes', () => {
    let seriesPorAno = [];

    for (let ano = 2010; ano <= 2021; ano++) {
      seriesPorAno.push.apply(seriesPorAno, filtarPorAnoERetornarNome(respostaApi.data, ano));  
    }
        
    const esperado = [
      'The Walking Dead',
      '10 Days Why',
      'Game Of Thrones',
      'Narcos',
      'Stranger Things',
      'Westworld',
      'Mr. Robot',
      'Gus and Will The Masters of the Wizards'
    ];
    const resultado = seriesPorAno;

    console.log(esperado)
    console.log(resultado)

    expect(esperado).toEqual(resultado);
  })

  it('Deve retornar true ao procurar ator que está em elenco', () => {

    const esperado = true;
    const resultado = verificarSeAtorEstaEmSeriado(respostaApi.data[0], 'Winona Ryder');

    console.log(esperado)
    console.log(resultado)

    expect(esperado).toEqual(resultado);
  })

  it('Deve retornar false ao procurar ator que não participa de elenco', () => {

    const esperado = false;
    const resultado = verificarSeAtorEstaEmSeriado(respostaApi.data[0], 'David Benioff"');

    console.log(esperado)
    console.log(resultado)

    expect(esperado).toEqual(resultado);
  })

  it('Deve calcular corretamente a media total de episódios de todas as series', () => {

    const esperado = 35.8;
    const resultado = calcularMediaTotalDeEpisodios(respostaApi.data);

    console.log(esperado)
    console.log(resultado)

    expect(esperado).toEqual(resultado);
  })

  it('Deve agrupar corretamente em um objeto os titulos das series baseado na Distribuidora', () => {
    const esperado = {
      Netflix: [ 'Stranger Things', 'Narcos' ],
      HBO: [ 'Game Of Thrones', 'Band of Brothers', 'Westworld' ],
      AMC: [ 'The Walking Dead', 'Breaking Bad' ],
      CWI: [ 'Gus and Will The Masters of the Wizards' ],
      JS: [ '10 Days Why' ],
      'USA Network': [ 'Mr. Robot' ]
    };
    const resultado = agruparTituloDasSeriesPorPropriedade(respostaApi.data, "distribuidora");

    console.log(esperado)
    console.log(resultado)

    expect(esperado).toEqual(resultado);
  })

  it('Deve agrupar corretamente em um objeto os titulos das series baseado na ano de estreia', () => {
    const esperado = {
      '2008': [ 'Breaking Bad' ],
      '2010': [ 'The Walking Dead', '10 Days Why' ],
      '2011': [ 'Game Of Thrones' ],
      '2015': [ 'Narcos' ],
      '2016': [ 'Stranger Things', 'Westworld' ],
      '2018': [ 'Mr. Robot' ],
      '2021': [ 'Gus and Will The Masters of the Wizards' ],
      '20001': [ 'Band of Brothers' ]
    };
    const resultado = agruparTituloDasSeriesPorPropriedade(respostaApi.data, "anoEstreia");

    console.log(esperado)
    console.log(resultado)

    expect(esperado).toEqual(resultado);
  })
})