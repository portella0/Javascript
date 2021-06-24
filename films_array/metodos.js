export function filtarPorAnoERetornarNome(series, ano) {
  let seriesPorAno = []
  for (let i = 0; i < series.length; i++) {
    if(series[i].anoEstreia == ano)
    {
      seriesPorAno.push(series[i].titulo);
    }
  }
  return seriesPorAno
}

export function verificarSeAtorEstaEmSeriado(serie, nomeAtor) {
  for (let i = 0; i < serie.elenco.length; i++) 
  {
    if(serie.elenco[i] == nomeAtor)
    {
      return true;
    }
  }
  return false;
}

export function calcularMediaTotalDeEpisodios(series) {
  const numeroDeSeries = series.length;
  let numeroDeEps = 0;

  for (let i = 0; i < series.length; i++) {
    numeroDeEps = numeroDeEps + series[i].numeroEpisodios;
  }
  const media = numeroDeEps/numeroDeSeries;
  return media;
}

export function agruparTituloDasSeriesPorPropriedade(series, propriedade) {
  return series.reduce((acumulador, serie) => {
    let valorPropriedade = serie[propriedade];

    if (!acumulador[valorPropriedade]) {
      acumulador[valorPropriedade] = [];
    }
    acumulador[valorPropriedade].push(serie.titulo);
    return acumulador;
  }, {})
}
