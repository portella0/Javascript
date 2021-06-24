import axios from 'axios'

import {
  obterCorredor,
  obterPista,
  aplicarVantagem,
  aplicarDebuf,
  moverCorredor,
  checkAliadoInimigo,
  executarRodada,
  correr,
  prepararCorrida,
  removeBuffDebuffAliadoInimigo,
  buffPista
} from '../src/corrida'

let listaPistas, listaCorredores;

beforeAll(async() => {
  listaPistas = await axios.get('https://gustavobuttenbender.github.io/gus.github/corrida-maluca/pistas.json'); 
  listaCorredores = await axios.get('https://gustavobuttenbender.github.io/gus.github/corrida-maluca/personagens.json'); 
})

 describe('Testes', () => {
  it('Deve conseguir obter a pista corretamente', () => {

    const esperado = {
      'id': 1,
      'nome': 'Himalaia', 
      'tipo': 'MONTANHA',
      'descricao': 'Uma montanha nevada, os corredores devem dar uma volta inteira nela, como existe muita neve eles terão dificuldade em enxergar',
      'tamanho': 30,
      'debuff': -2,
      'posicoesBuffs': [6, 17],
      'buffsUtilizados': new Array(2)
    };
    const resultado = obterPista('Himalaia', listaPistas.data);

    console.log('esperado: ', esperado);
    console.log('resultado: ',resultado);

    expect(esperado).toEqual(resultado);
  })

  it('Deve conseguir obter o corredor corretamente', () => {
    const esperado = {
      'id': 2,
      'nome': 'Irmãos Rocha',
      'velocidade': 5,
      'drift': 2, 
      'aceleracao': 3,
      'vantagem': 'MONTANHA',
      'posicao': 0,
      'aliado': '',
      'inimigo': ''
    };
    const resultado = obterCorredor('Irmãos Rocha', listaCorredores.data);

    console.log('esperado: ', esperado);
    console.log('resultado: ',resultado);

    expect(esperado).toEqual(resultado);
  })

  it('Deve conseguir calcular a vantagem de tipo pista corretamente', () => {
    const pista = obterPista('Himalaia', listaPistas.data);
    let corredores = [];
    corredores.push(obterCorredor('Dick Vigarista', listaCorredores.data))
    corredores.push(obterCorredor('Irmãos Rocha', listaCorredores.data))

    const esperado = [{
      'id': 1,
      'nome': 'Dick Vigarista',
      'velocidade': 5,
      'drift': 2, 
      'aceleracao': 4,
      'vantagem': 'CIRCUITO',
      'posicao': 0,
      'aliado': '',
      'inimigo': ''
    },
    {
      'id': 2,
      'nome': 'Irmãos Rocha',
      'velocidade': 7,
      'drift': 4, 
      'aceleracao': 5,
      'vantagem': 'MONTANHA',
      'posicao': 0,
      'aliado': '',
      'inimigo': ''
    }];
    const resultado = aplicarVantagem(corredores, pista);

    console.log('esperado: ', esperado);
    console.log('resultado: ',resultado);

    expect(esperado).toEqual(resultado);
  })

  it('Deve conseguir calcular o debuff de pista corretamente', () => {
    const pista = obterPista('Himalaia', listaPistas.data);
    let corredores = [];
    corredores.push(obterCorredor('Dick Vigarista', listaCorredores.data))
    corredores.push(obterCorredor('Irmãos Rocha', listaCorredores.data))

    const esperado = [{
      'id': 1,
      'nome': 'Dick Vigarista',
      'velocidade': 3,
      'drift': 0, 
      'aceleracao': 2,
      'vantagem': 'CIRCUITO',
      'posicao': 0,
      'aliado': '',
      'inimigo': ''
    },
    {
      'id': 2,
      'nome': 'Irmãos Rocha',
      'velocidade': 3,
      'drift': 0, 
      'aceleracao': 1,
      'vantagem': 'MONTANHA',
      'posicao': 0,
      'aliado': '',
      'inimigo': ''
    }];
    const resultado = aplicarDebuf(corredores, pista);

    console.log('esperado: ', esperado);
    console.log('resultado: ',resultado);

    expect(esperado).toEqual(resultado);
  })

  it('Deve conseguir calcular o buff de posição de pista para 3 corredores', () => {
    const pista = obterPista('Deserto do Saara', listaPistas.data);
    let pistaControleBuffs;

    let buffCorredoresPista = [];
    let letCorridaPreparada = [];

    let corredores = [];
    corredores.push(obterCorredor('Dick Vigarista', listaCorredores.data))
    corredores.push(obterCorredor('Professor Aéreo', listaCorredores.data))
    corredores.push(obterCorredor('Quadrilha da Morte', listaCorredores.data))

    letCorridaPreparada = prepararCorrida(corredores, pista);
    const corredoresPreparados =  letCorridaPreparada[0];
    const pistaPreparada = letCorridaPreparada[1];

    pistaControleBuffs = pistaPreparada;

    let corredoresMovidos = [];
    corredoresMovidos[0] = corredoresPreparados[0];
    corredoresMovidos[1] = corredoresPreparados[1];
    corredoresMovidos[2] = corredoresPreparados[2];
    
    for(let i = 0; i < 10; i ++)
    {
      corredoresMovidos = removeBuffDebuffAliadoInimigo(corredoresMovidos);

      buffCorredoresPista =  buffPista(corredoresMovidos, pistaControleBuffs, 'velocidade')
      corredoresMovidos = buffCorredoresPista[0];
      pistaControleBuffs = buffCorredoresPista[1];

      corredoresMovidos[0] = moverCorredor(corredoresMovidos[0], 'velocidade');
      corredoresMovidos[1] = moverCorredor(corredoresMovidos[1], 'velocidade');
      corredoresMovidos[2] = moverCorredor(corredoresMovidos[2], 'velocidade');

      console.log('Pista: ', pistaControleBuffs);
      console.log('Corredores: ', corredoresMovidos);
    }

    //como os corredores andaram 10 rodadas só com sua velocidade é possível ver o buff da pista funcionando
    //pela diferença da posiçao do corredor com a sua velocidade x 10
    //ex: 'Dick Vigarista' posicao: 34 != 10x3=30
    const esperado = [
      {
        id: 4,
        nome: 'Professor Aéreo',
        velocidade: 6,
        drift: 2,
        aceleracao: 1,
        vantagem: 'DESERTO',
        posicao: 60,
        aliado: '',
        inimigo: '',
        velocidadeInicial: 6,
        driftInicial: 2,
        aceleracaoInicial: 1
      },
      {
        id: 8,
        nome: 'Quadrilha da Morte',
        velocidade: 5,
        drift: 1,
        aceleracao: 1,
        vantagem: 'CIDADE',
        posicao: 43,
        aliado: '',
        inimigo: '',
        velocidadeInicial: 4,
        driftInicial: 1,
        aceleracaoInicial: 1
      },
      {
        id: 1,
        nome: 'Dick Vigarista',
        velocidade: 3,
        drift: 0,
        aceleracao: 2,
        vantagem: 'CIRCUITO',
        posicao: 34,
        aliado: '',
        inimigo: '',
        velocidadeInicial: 3,
        driftInicial: 0,
        aceleracaoInicial: 2
      }
    ];
    const resultado = corredoresMovidos;

    console.log('esperado: ', esperado);
    console.log('resultado: ',resultado);

    expect(esperado).toEqual(resultado);
  })

  it('Deve conseguir calcular a próxima posição corretamente se estiver sob o buff de um aliado', () => {
    let corredores = [];
  
    corredores.push(obterCorredor('Dick Vigarista', listaCorredores.data))
    corredores.push(obterCorredor('Irmãos Rocha', listaCorredores.data, 'Dick Vigarista'))

    const corredorComVantagemAliado = checkAliadoInimigo(corredores[1], corredores, 'velocidade');

    let corredoresMovidos = [];
    corredoresMovidos.push(moverCorredor(corredores[0], 'velocidade'));
    corredoresMovidos.push(moverCorredor(corredorComVantagemAliado, 'velocidade'));

    const esperado = [5, 6]
    const resultado = [corredoresMovidos[0].posicao, corredoresMovidos[1].posicao];

    console.log('esperado: ', esperado);
    console.log('resultado: ',resultado);

    expect(esperado).toEqual(resultado);
  })

  it('Deve conseguir calcular a próxima posição corretamente se estiver sob o debuff de um inimigo', () => {
    let corredores = [];
  
    corredores.push(obterCorredor('Dick Vigarista', listaCorredores.data))
    corredores.push(obterCorredor('Irmãos Rocha', listaCorredores.data, '', 'Dick Vigarista'))

    const corredorComDebuffInimigo = checkAliadoInimigo(corredores[1], corredores, 'velocidade');

    let corredoresMovidos = [];
    corredoresMovidos.push(moverCorredor(corredores[0], 'velocidade'));
    corredoresMovidos.push(moverCorredor(corredorComDebuffInimigo, 'velocidade'));

    const esperado = [5, 4]
    const resultado = [corredoresMovidos[0].posicao, corredoresMovidos[1].posicao];

    console.log('esperado: ', esperado);
    console.log('resultado: ',resultado);

    expect(esperado).toEqual(resultado);
  })

  it('Deve conseguir completar uma corrida com um vencedor', () => {
    const pista = obterPista('Himalaia', listaPistas.data);
    let corredores = [];
    let corredoresAliadosInimigos = [];

    corredores.push(obterCorredor('Dick Vigarista', listaCorredores.data, 'Professor Aéreo'))
    corredores.push(obterCorredor('Barão Vermelho', listaCorredores.data, '', 'Peter Perfeito'))
    corredores.push(obterCorredor('Professor Aéreo', listaCorredores.data))
    corredores.push(obterCorredor('Peter Perfeito', listaCorredores.data))

    const vencedorCorrida = correr(corredores, pista)

    const esperado = 'Barão Vermelho';
    const resultado = vencedorCorrida;

    console.log('esperado: ', esperado);
    console.log('O vencedor foi ',vencedorCorrida);

    expect(esperado).toEqual(resultado);
  })

  it('Deve conseguir criar corredor corretamente somente com aliado', () => {
    const corredor = obterCorredor('Irmãos Rocha', listaCorredores.data, 'Dick Vigarista');

    const esperado = {
      'id': 2,
      'nome': 'Irmãos Rocha',
      'velocidade': 5,
      'drift': 2, 
      'aceleracao': 3,
      'vantagem': 'MONTANHA',
      'posicao': 0,
      'aliado': 'Dick Vigarista',
      'inimigo': ''
    };
    const resultado = corredor;

    console.log('esperado: ', esperado);
    console.log('resultado: ', resultado);

    expect(esperado).toEqual(resultado);
  })

  it('Deve conseguir criar corredor corretamente somente com inimigo', () => {
    const corredor = obterCorredor('Irmãos Rocha', listaCorredores.data, '', 'Professor Aéreo');

    const esperado = {
      'id': 2,
      'nome': 'Irmãos Rocha',
      'velocidade': 5,
      'drift': 2, 
      'aceleracao': 3,
      'vantagem': 'MONTANHA',
      'posicao': 0,
      'inimigo': 'Professor Aéreo',
      'aliado': ''
    };
    const resultado = corredor;

    console.log('esperado: ', esperado);
    console.log('resultado: ', resultado);

    expect(esperado).toEqual(resultado);
  })

  it('Deve conseguir criar corredor corretamente com aliado e inimigo', () => {
    const corredor = obterCorredor('Irmãos Rocha', listaCorredores.data, 'Dick Vigarista', 'Professor Aéreo');

    const esperado = {
      'id': 2,
      'nome': 'Irmãos Rocha',
      'velocidade': 5,
      'drift': 2, 
      'aceleracao': 3,
      'vantagem': 'MONTANHA',
      'posicao': 0,
      'aliado': 'Dick Vigarista',
      'inimigo': 'Professor Aéreo'
    };
    const resultado = corredor;

    console.log('esperado: ', esperado);
    console.log('resultado: ', resultado);

    expect(esperado).toEqual(resultado);
  })

  it('Deve conseguir calcular as novas posições corretamente de uma rodada para a próxima', () => {
    const pista = obterPista('Himalaia', listaPistas.data);
    let corredores = [];
  
    corredores.push(obterCorredor('Dick Vigarista', listaCorredores.data))
    corredores.push(obterCorredor('Irmãos Pavor', listaCorredores.data))
    corredores.push(obterCorredor('Professor Aéreo', listaCorredores.data))

    const corredoresPrimeiraRodada = executarRodada(corredores, pista, 'velocidade', 1); 
    const corredoresSegundaRodada = executarRodada(corredoresPrimeiraRodada, pista, 'velocidade', 2); 

    //cada personagem só andou 2 rodadas com sua velocidade
    const esperado = [10, 8, 12];
    const resultado = [corredoresSegundaRodada[0].posicao, 
                       corredoresSegundaRodada[1].posicao, 
                       corredoresSegundaRodada[2].posicao];

    console.log('esperado: ', esperado);
    console.log('resultado: ', resultado);

    expect(esperado).toEqual(resultado);
  })

  it('Deve impedir que corredor se mova negativamente mesmo se o calculo de velocidade seja negativo', () => {
    const pista = obterPista('Himalaia', listaPistas.data);

    let corredores = [];
    corredores.push(obterCorredor('Dick Vigarista', listaCorredores.data))
    corredores.push(obterCorredor('Irmãos Rocha', listaCorredores.data));

    const corredorComVelocidadeNegativa = {...corredores[1], velocidade: -5, drift: -3, aceleracao: -2};

    const corredoresVelocidadesComparacao = [corredores[0], corredorComVelocidadeNegativa]

    const corredoresPrimeiraRodada = executarRodada(corredoresVelocidadesComparacao, pista, 'velocidade', 1); 
    const corredoresSegundaRodada = executarRodada(corredoresPrimeiraRodada, pista, 'drift', 2); 

    //dick velocidade 5 + drift 2
    //Irmãos Rocha velocidade 0 + drift 0
    const esperado = [7, 0];
    const resultado = [corredoresSegundaRodada[0].posicao, 
                       corredoresSegundaRodada[1].posicao];

    console.log('esperado: ', esperado);
    console.log('resultado: ', resultado);

    expect(esperado).toEqual(resultado);
  })

  it('Deve impedir que o Dick Vigarista vença a corrida se estiver a uma rodada de ganhar', () => {
    const pista = obterPista('Himalaia', listaPistas.data);
    let dickVigarista = [obterCorredor('Dick Vigarista', listaCorredores.data)];

    for (let i = 0; i < 8; i++) {
      dickVigarista = executarRodada(dickVigarista, pista, 'velocidade', i);
    }

    for (let i = 9; i < 12; i++) {
      dickVigarista = executarRodada(dickVigarista, pista, 'aceleracao', i);
    }

    for (let i = 13; i < 16; i++) {
      dickVigarista = executarRodada(dickVigarista, pista, 'drift', i);
    }

    //na rodada 5 ele fica parado na posição 25 enquanto usa velocidade(25) 
    //até começar a usar a aceleracao(4) e então fica parado na posiçao 29
    const esperado = 29;
    const resultado = dickVigarista[0].posicao;

    console.log('esperado: ', esperado);
    console.log('resultado: ', resultado);

    expect(esperado).toEqual(resultado);
  })
})