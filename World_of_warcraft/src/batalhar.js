export function batalhar(personagem1, personagem2) {
  const quemComeca = Math.round(Math.random()) + 1;
  let primeiroPersonagem, segundoPersonagem;

  if (quemComeca == 1) {
    primeiroPersonagem = personagem1;
    segundoPersonagem = personagem2;
  } else {
    primeiroPersonagem = personagem2;
    segundoPersonagem = personagem1;
  }

  console.log(primeiroPersonagem.nome + " VS " + segundoPersonagem.nome);

  primeiroPersonagem = {
    ...primeiroPersonagem,
    vida:
      primeiroPersonagem.vidaBase +
      primeiroPersonagem.equipamentos.vida.aprimoramento,
    vigor:
      primeiroPersonagem.vigorBase +
      primeiroPersonagem.equipamentos.vigor.aprimoramento,
    dano:
      primeiroPersonagem.danoBase +
      primeiroPersonagem.equipamentos.dano.aprimoramento,
  };

  segundoPersonagem = {
    ...segundoPersonagem,
    vida:
      segundoPersonagem.vidaBase +
      segundoPersonagem.equipamentos.vida.aprimoramento,
    vigor:
      segundoPersonagem.vigorBase +
      segundoPersonagem.equipamentos.vigor.aprimoramento,
    dano:
      segundoPersonagem.danoBase +
      segundoPersonagem.equipamentos.dano.aprimoramento,
  };

    if (primeiroPersonagem.vigor >= segundoPersonagem.dano &&segundoPersonagem.vigor >= primeiroPersonagem.dano)
    return "Empate";

    console.log("Começou o combate");

    while (true) 
    {  
      segundoPersonagem.vida -= Math.max(0, (primeiroPersonagem.dano - segundoPersonagem.vigor));
      combateInfo(primeiroPersonagem, segundoPersonagem);

      if(segundoPersonagem.vida <= 0){
      return {...primeiroPersonagem, level: primeiroPersonagem.level+1, levelAnterior: primeiroPersonagem.level}
      }

      primeiroPersonagem.vida -= Math.max(0, (segundoPersonagem.dano - primeiroPersonagem.vigor));
      combateInfo(primeiroPersonagem, segundoPersonagem);

      if(primeiroPersonagem.vida <= 0){
      return {...segundoPersonagem, level: segundoPersonagem.level+1, levelAnterior: segundoPersonagem.level}
      }
  }
}


function combateInfo(primeiroPersonagem, segundoPersonagem) {
  console.log(
    primeiroPersonagem.nome,
    " - ",
    primeiroPersonagem.vida,
    "vida / ",
    primeiroPersonagem.vigor,
    "vigor / ",
    primeiroPersonagem.dano,
    "dano | ",
    segundoPersonagem.nome,
    " - ",
    segundoPersonagem.vida,
    "vida / ",
    segundoPersonagem.vigor,
    "vigor / ",
    segundoPersonagem.dano,
    "dano | "
    );
  }


