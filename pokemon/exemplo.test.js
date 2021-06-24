import lista_pokemons from './lista_pokemons.json'
import { criarTreinador, capturarPokemon, subirNivel, 
  subirLevelPokemon, evoluir, evoluirPokemon } from '../src/index'

let treinadorTest; 

beforeEach(() => {
  treinadorTest = criarTreinador("Ash", 14, lista_pokemons[0], lista_pokemons);
})

describe('Lista de testes', () => {
  it('Deve subir o nível do pokemon corretamente', () => {
    const esperado =  {
      "id": 1,
      "nome": "Squirtle",
      "poderAtaque": 1,
      "levelInicial": 1,
      "evolucao": {
        "level": 5,
        "id": 2
      }, 
      "levelAtual": 2
    }
    const resultado = subirLevelPokemon(treinadorTest.timePokemons[0], lista_pokemons);

    console.log("esperado:", esperado);
    console.log("resultado:",resultado);

    expect(esperado).toEqual(resultado);
  })

  it('Deve evoluir pokemon ao atingir o nível necessário', () => {
    const pokemonQueVaiEvoluir = {
      "id": 1,
      "nome": "Squirtle",
      "poderAtaque": 1,
      "levelInicial": 5,
      "evolucao": {
        "level": 5,
        "id": 2
      }, 
    }
    const treinadorComPokemonQueVaiEvoluir = criarTreinador("Ash", 14, pokemonQueVaiEvoluir, lista_pokemons);

    const esperado =  {
      "id": 2,
      "nome": "Wartortle",
      "poderAtaque": 10,
      "levelInicial": 5,
      "evolucao": {
        "level": 10,
        "id": 3
      }, 
      "levelAtual": 5
    }

    const listaEvoluida = evoluir(treinadorComPokemonQueVaiEvoluir.timePokemons, lista_pokemons);
    const resultado = listaEvoluida[0];

    console.log("esperado:", esperado);
    console.log("resultado:",resultado);

    expect(esperado).toEqual(resultado);
  })

  it('Não deve evoluir pokemon caso não possua o level necessário', () => {
    const pokemonNaoQueVaiEvoluir = {
      "id": 1,
      "nome": "Squirtle",
      "poderAtaque": 1,
      "levelInicial": 4,
      "evolucao": {
        "level": 5,
        "id": 2
      }, 
    }
    const treinadorComPokemonNaoQueVaiEvoluir = criarTreinador("Ash", 14, pokemonNaoQueVaiEvoluir, lista_pokemons);


    const esperado =  {
      id: 1,
      nome: 'Squirtle',
      poderAtaque: 1,
      levelInicial: 4,
      evolucao: { level: 5, id: 2 },
      levelAtual: 4
    };

    const listaEvoluida = evoluir(treinadorComPokemonNaoQueVaiEvoluir.timePokemons, lista_pokemons);
    const resultado = listaEvoluida[0];

    console.log("esperado:", esperado);
    console.log("resultado:",resultado);

    expect(esperado).toEqual(resultado);
  })

  it('Treinador será criado com nome correto', () => {
    const esperado =  "Ash";
    const resultado = treinadorTest.nome;

    console.log("esperado:", esperado);
    console.log("resultado:",resultado);

    expect(esperado).toEqual(resultado);
  })  

  it('Treinador será criado com a idade correta', () => {
    const esperado =  14;
    const resultado = treinadorTest.idade;

    console.log("esperado:", esperado);
    console.log("resultado:",resultado);

    expect(esperado).toEqual(resultado);
  })

  it('Treinador será criado com o pokemon inicial correto', () => {
    const esperado = {
      id: 1,
      nome: 'Squirtle',
      poderAtaque: 1,
      levelInicial: 1,
      evolucao: { level: 5, id: 2 },
      levelAtual: 1
    };
    const resultado = treinadorTest.pokemonInicial;

    console.log("esperado:", esperado);
    console.log("resultado:",resultado);

    expect(esperado).toEqual(resultado);
  })

  it('Treinador terá seus pokemons atualizados após nova captura', () => {
    const treinadorQueCapturou = capturarPokemon(treinadorTest, lista_pokemons[0])
    const treinadorQueCapturouDuasVezes = capturarPokemon(treinadorQueCapturou, lista_pokemons[1])

    const esperado = [
      {
        id: 1,
        nome: 'Squirtle',
        poderAtaque: 1,
        levelInicial: 1,
        evolucao: {
          "level": 5,
          "id": 2
        },
        levelAtual: 3
      },
      {
        id: 1,
        nome: 'Squirtle',
        poderAtaque: 1,
        levelInicial: 1,
        evolucao: {
          "level": 5,
          "id": 2
        },
        levelAtual: 2
      },
      {
        id: 2,
        nome: 'Wartortle',
        poderAtaque: 10,
        levelInicial: 5,
        evolucao: {
          "level": 10,
          "id": 3
        }, 
        levelAtual: 5
      }
    ];
    const resultado = treinadorQueCapturouDuasVezes.timePokemons;

    console.log(treinadorQueCapturouDuasVezes);

    console.log("esperado:", esperado);
    console.log("resultado:",resultado);

    expect(esperado).toEqual(resultado);
  })
})