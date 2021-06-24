import axios from "axios";

export async function fazerMissao(jogador, personagem, temTimer) {
  //missoes
  const listaMissoes = await axios.get(
    "https://gustavobuttenbender.github.io/gus.github/woe/quests.json"
  );
  let missaoSelecionada;
  let missaoAprovada;

  const jogadorMissao = [...jogador];
  //console.log(jogadorMissao)

  do {
    missaoSelecionada =
      listaMissoes.data[Math.floor(Math.random() * listaMissoes.data.length)];

    if (jogadorMissao.includes(missaoSelecionada.idExpansao))
      missaoAprovada = missaoSelecionada;

    if (missaoSelecionada.idExpansao == undefined)
      missaoAprovada = missaoSelecionada;
  } while (missaoAprovada == undefined);

  if(temTimer == undefined)
  return comecarMissao(missaoAprovada, personagem);
  else
  return comecarMissaoSemTimer(missaoAprovada, personagem);
}

export async function fazerMissaoExpansao(jogador, personagem, temTimer) {
  //missoes
  const listaMissoes = await axios.get(
    "https://gustavobuttenbender.github.io/gus.github/woe/quests.json"
  );
  let missaoSelecionada;
  let missaoAprovada;

  const jogadorMissao = [...jogador];
  //console.log(jogadorMissao)

  do {
    missaoSelecionada = listaMissoes.data[Math.floor(Math.random() * listaMissoes.data.length)];

    if (jogadorMissao.includes(missaoSelecionada.idExpansao) && missaoSelecionada.idExpansao != undefined)
      missaoAprovada = missaoSelecionada;

  } while (missaoAprovada == undefined);

  if(temTimer == undefined)
  return comecarMissao(missaoAprovada, personagem);
  else
  return comecarMissaoSemTimer(missaoAprovada, personagem);
}

function comecarMissaoSemTimer(missao, personagem) {
  console.log(
    "Fazendo missão: " + missao.descricao,
    "\n",
    "Tempo estimado: " + missao.tempoEstimado / 1000 + "s"
  );
  return terminarMissao(personagem, missao)   
}

async function comecarMissao(missao, personagem) {
  console.log(
    "Fazendo missão: " + missao.descricao,
    "\n",
    "Tempo estimado: " + missao.tempoEstimado / 1000 + "s"
  );

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(terminarMissao(personagem, missao));
    }, missao.tempoEstimado);
  });
}

function terminarMissao(personagem, missao) {
  console.log(
    "Missão completa!\n",
    "Recompensa:\n",
    "Levels: " + missao.niveisRecebidos,
    "\n",
    "Dinheiro: " + missao.dinheiroRecebido
  );

  return [{
    ...personagem,
    level: personagem.level + missao.niveisRecebidos,
    dinheiro: personagem.dinheiro + missao.dinheiroRecebido,
    levelAnterior: personagem.level,
  },missao];
}
