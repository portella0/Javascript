export function criarTreinador(nome, idade, pokemonInicial, pokedex)  {
    
    const treinador = {
        nome: nome,
        idade: idade,
        pokemonInicial: pokemonInicial,
        timePokemons: [],
        pokedex: pokedex
    }

    treinador.pokemonInicial.levelAtual = treinador.pokemonInicial.levelInicial;

    if(treinador.timePokemons.length < 1)
    treinador.timePokemons.push(pokemonInicial);
    return treinador;
}

export function capturarPokemon(treinador, pokemon) {
    const listaSubirLevel = subirLevel(treinador.timePokemons);
    const listaEvoluida = evoluir(listaSubirLevel, treinador.pokedex);

    const timePokemonsAtualizado = listaEvoluida;
    timePokemonsAtualizado.push({...pokemon, levelAtual: pokemon.levelInicial});

    return {
        ...treinador,
        timePokemons: timePokemonsAtualizado
    }
}

export function subirLevel(timePokemons) 
{   
    let listaSubirLevel = [];
    for (let i = 0; i < timePokemons.length; i++) {
        listaSubirLevel.push(subirLevelPokemon(timePokemons[i]));  
    }

    return listaSubirLevel;
}

export function subirLevelPokemon(pokemon) 
{
    let pokemonSubiuLevel;

    pokemonSubiuLevel = {...pokemon, levelAtual: pokemon.levelAtual + 1}

    return pokemonSubiuLevel;
}

export function evoluir(timePokemons, pokedex) 
{
    let listaEvoluida = [];
    for (let i = 0; i < timePokemons.length; i++) {
        if(timePokemons[i].levelAtual == timePokemons[i].evolucao.level)
        listaEvoluida.push(evoluirPokemon(timePokemons[i], pokedex));  
        else
        listaEvoluida.push(timePokemons[i]);  
    }

    return listaEvoluida;
}

export function evoluirPokemon(pokemon, pokedex) 
{
    let pokemonEvoluido;

    for (let i = 0; i < pokedex.length; i++) {
        if(pokemon.evolucao.id == pokedex[i].id)
        pokemonEvoluido = {...pokedex[i], levelAtual: pokedex[i].levelInicial};  
    }

    return pokemonEvoluido
}
