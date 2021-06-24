import { criarPersonagem } from "../src/criarPersonagem";
import { selecionarPersonagem } from "../src/selecionarPersonagem";
import { cheats, listaAposCheat } from "../src/cheats";
import { batalhar } from "../src/batalhar";
import { aumentarAtributosACadaDoisLeveis } from "../src/aumentarDeNivel";
import { fazerMissao, fazerMissaoExpansao } from "../src/missoes";

/*
Favor, deixar o banco de dados 'expansoesDoUsuario' com a expansao 7.
OS DADOS NÃO SÃO GRAVADOS NO BANCO DE DADOS POR QUESTAO DE TESTES, POIS, NAO SE PODE CRIAR PERSONAGENS COM O MESMO NOME, OQUE DIFICULTARIA NA CRIACAO DOS EXAMES.
Precisa ter no minimo um usuario na var "personagens atuais" e um level acima do 19.
*/

let personagensLocais = [
  {
    id: 1,
    raca: "Elfo Sangrento",
    danoBase: 4,
    vidaBase: 5,
    vigorBase: 1,
    tipo: "NORMAL",
    nome: "Axel",
    level: 1,
    equipamentos: {
      vida: {
        nome: "Corpo",
        tipo: "Nada",
        preço: 0,
        aprimoramento: 0,
        lvlMinimo: 0,
      },
      vigor: {
        nome: "Corpo",
        tipo: "Nada",
        preço: 0,
        aprimoramento: 0,
        lvlMinimo: 0,
      },
      dano: {
        nome: "Corpo",
        tipo: "Nada",
        preço: 0,
        aprimoramento: 0,
        lvlMinimo: 0,
      },
    },
    dinheiro: 0,
  },
  {
    id: 1,
    raca: "Elfo Sangrento",
    danoBase: 4,
    vidaBase: 5,
    vigorBase: 1,
    tipo: "NORMAL",
    nome: "Alex",
    level: 19,
    equipamentos: {
      vida: {
        nome: "Corpo",
        tipo: "Nada",
        preço: 0,
        aprimoramento: 0,
        lvlMinimo: 0,
      },
      vigor: {
        nome: "Corpo",
        tipo: "Nada",
        preço: 0,
        aprimoramento: 0,
        lvlMinimo: 0,
      },
      dano: {
        nome: "Corpo",
        tipo: "Nada",
        preço: 0,
        aprimoramento: 0,
        lvlMinimo: 0,
      },
    },
    dinheiro: 0,
  },
];

let personagensCombate = [
  {
    id: 2,
    raca: "Humano",
    vidaBase: 13,
    vigorBase: 8,
    danoBase: 5,
    tipo: "NORMAL",
    nome: "bob",
    level: 9,
    equipamentos: {
      vida: {
        nome: "Corpo",
        tipo: "Nada",
        preço: 0,
        aprimoramento: 0,
        lvlMinimo: 0,
      },
      vigor: {
        nome: "Corpo",
        tipo: "Nada",
        preço: 0,
        aprimoramento: 0,
        lvlMinimo: 0,
      },
      dano: {
        nome: "Corpo",
        tipo: "Nada",
        preço: 0,
        aprimoramento: 0,
        lvlMinimo: 0,
      },
    },
    dinheiro: 0,
    vida: 13,
    vigor: 8,
    dano: 5,
    levelAnterior: 7,
  },
  {
    id: 1,
    raca: "Elfo Sangrento",
    danoBase: 4,
    vidaBase: 5,
    vigorBase: 1,
    tipo: "NORMAL",
    nome: "axel",
    level: 1,
    equipamentos: {
      vida: {
        nome: "Corpo",
        tipo: "Nada",
        preço: 0,
        aprimoramento: 0,
        lvlMinimo: 0,
      },
      vigor: {
        nome: "Corpo",
        tipo: "Nada",
        preço: 0,
        aprimoramento: 0,
        lvlMinimo: 0,
      },
      dano: {
        nome: "Corpo",
        tipo: "Nada",
        preço: 0,
        aprimoramento: 0,
        lvlMinimo: 0,
      },
    },
    dinheiro: 0,
  },
];

let personagensAumentarNivel = [
  {
    id: 2,
    raca: "Humano",
    vidaBase: 5,
    vigorBase: 4,
    danoBase: 5,
    tipo: "NORMAL",
    nome: "Mad",
    level: 1,
    equipamentos: {
      vida: {
        nome: "Corpo",
        tipo: "Nada",
        preço: 0,
        aprimoramento: 0,
        lvlMinimo: 0,
      },
      vigor: {
        nome: "Corpo",
        tipo: "Nada",
        preço: 0,
        aprimoramento: 0,
        lvlMinimo: 0,
      },
      dano: {
        nome: "Corpo",
        tipo: "Nada",
        preço: 0,
        aprimoramento: 0,
        lvlMinimo: 0,
      },
    },
    dinheiro: 0,
    levelAnterior: 1,
  },
];

personagensAumentarNivel.push({
  ...personagensAumentarNivel[0],
  level: 2,
  levelAnterior: 1,
});
personagensAumentarNivel.push({
  ...personagensAumentarNivel[0],
  level: 3,
  levelAnterior: 2,
});
personagensAumentarNivel.push({
  ...personagensAumentarNivel[0],
  level: 10,
  levelAnterior: 1,
});
personagensAumentarNivel.push({
  ...personagensAumentarNivel[0],
  level: 11,
  levelAnterior: 1,
});
personagensAumentarNivel.push({
  ...personagensAumentarNivel[0],
  tipo: "ALIADO",
  level: 11,
  levelAnterior: 10,
});
personagensAumentarNivel.push({
  ...personagensAumentarNivel[0],
  tipo: "ALIADO",
  level: 12,
  levelAnterior: 11,
});
personagensAumentarNivel.push({
  ...personagensAumentarNivel[0],
  tipo: "ALIADO",
  level: 15,
  levelAnterior: 10,
});
personagensAumentarNivel.push({
  ...personagensAumentarNivel[0],
  tipo: "ALIADO",
  level: 16,
  levelAnterior: 10,
});

const personagemComEquipamento = {
  ...personagensCombate[0],
  equipamentos: {
    vida: { aprimoramento: 5 },
    vigor: { aprimoramento: 5 },
    dano: { aprimoramento: 5 },
  },
};

describe("Criacao de personagem", () => {
  it("Deve conseguir criar um personagem de raça do tipo NORMAL com sucesso e ele deve estar no nível 1", async () => {
    const valorEsperado = 1;
    let novoJogador = await criarPersonagem("Alef", 2, personagensLocais);
    const valorObtido = novoJogador.level;

    expect(valorEsperado).toBe(valorObtido);
  });
  it("Deve conseguir criar um personagem de raça do tipo ALIADA com sucesso e ele deve estar no nível 10", async () => {
    const valorEsperado = [10, "ALIADA"];

    let novoJogador = await criarPersonagem(
      "personagemAliadoTestDefinitivo",
      8,
      personagensLocais
    );

    const valorObtido = [novoJogador.level, novoJogador.tipo];

    expect(valorEsperado).toEqual(valorObtido);
  });
  it("Personagem recém criado não deve possuir equipamentos", async () => {
    const valorEsperado = {
      vida: {
        nome: "Corpo",
        tipo: "Nada",
        preço: 0,
        aprimoramento: 0,
        lvlMinimo: 0,
      },
      vigor: {
        nome: "Corpo",
        tipo: "Nada",
        preço: 0,
        aprimoramento: 0,
        lvlMinimo: 0,
      },
      dano: {
        nome: "Corpo",
        tipo: "Nada",
        preço: 0,
        aprimoramento: 0,
        lvlMinimo: 0,
      },
    };

    let novoJogador = await criarPersonagem("Sergio", 6, personagensLocais);
    const valorObtido = novoJogador.equipamentos;

    expect(valorObtido).toEqual(valorEsperado);
  });
  it("Personagem recém criado não deve possuir dinheiro", async () => {
    let novoJogador = await criarPersonagem("Gabriel", 5, personagensLocais);
    const valorObtido = novoJogador.dinheiro;

    expect(valorObtido).toBeFalsy();
  });
  it("Deve conseguir criar um personagem com raça de expansão se já possuir a expansão", async () => {
    const valorEsperado = 7;

    let novoJogador = await criarPersonagem(
      "personagemAliadoTestLvMinimo",
      8,
      personagensLocais
    );

    const valorObtido = novoJogador.idExpansao;

    expect(valorEsperado).toBe(valorObtido);
  });
  it("Deve conseguir criar um personagem com raça aliada se já possuir outro personagem com o lvl mínimo necessário", async () => {
    const valorEsperado = [19, "ALIADA"];

    let novoJogador = await criarPersonagem(
      "personagemAliadoTestLvMinimo",
      8,
      personagensLocais
    );

    //Jogador com o level minimo = 'personagensAtuais[1].level'
    const valorObtido = [personagensLocais[1].level, novoJogador.tipo];

    expect(valorEsperado).toEqual(valorObtido);
  });
  it("Deve receber +2 de vida e +1 de vigor ao subir dois niveis", async () => {
    let valorEsperado = [
      [1, 5, 4],
      [2, 5, 4],
      [3, 7, 5],
      [10, 13, 8],
      [11, 15, 9],
      [11, 5, 4],
      [12, 7, 5],
      [15, 9, 6],
      [16, 11, 7],
    ];
    let valorObtido = [];

    const arrayAtualizado = aumentarAtributosACadaDoisLeveis(
      personagensAumentarNivel
    );

    for (let i = 0; i < arrayAtualizado.length; i++) {
      valorObtido.push([
        arrayAtualizado[i].level,
        arrayAtualizado[i].vidaBase,
        arrayAtualizado[i].vigorBase,
      ]);
    }

    console.log("Level - vida - vigor: ", valorObtido);

    expect(valorObtido).toEqual(valorEsperado);
  });
  it("Não deve criar personagem se nao tiver level ou expansao adquiridos", async () => {
    const valorEsperado = "Level ou expansao não adquiridos.";

    let novoJogador = await criarPersonagem(
      "personagemAliadoTestDefinitivo",
      7,
      personagensLocais
    );

    const valorObtido = novoJogador;

    expect(valorEsperado).toEqual(valorObtido);
  });
  it("Não deve criar personagem se nao tiver level ou expansao adquiridos", async () => {
    const valorEsperado = "Valor invalido.";

    let novoJogador = await criarPersonagem(
      "personagemAliadoTestDefinitivo",
      35,
      personagensLocais
    );

    const valorObtido = novoJogador;

    expect(valorEsperado).toEqual(valorObtido);
  });
  it("Não deve criar personagem se o nome já tiver sido utilizado!", async () => {
    const valorEsperado = "Nome já utilizado!";

    let novoJogador = await criarPersonagem("Axel", 1, personagensLocais);

    const valorObtido = novoJogador;

    console.log(novoJogador);

    expect(valorEsperado).toEqual(valorObtido);
  });
  it("Não deve criar personagem se não existir o array", async () => {
    const valorEsperado = "Level ou expansao não adquiridos.";

    const arrayQueNaoExiste = null;

    let novoJogador = await criarPersonagem("Axel", 8, arrayQueNaoExiste);

    const valorObtido = novoJogador;

    console.log(novoJogador);

    expect(valorEsperado).toEqual(valorObtido);
  });
});

describe("Batalha", () => {
  it("Deve conseguir finalizar a batalha e obter um vencedor com sucesso", () => {
    const esperado = { ...personagensCombate[0], levelAnterior: 9, level: 10 };
    const obtido = batalhar(personagensCombate[0], personagensCombate[1]);

    expect(esperado).toEqual(obtido);
  });
  it("Deve conseguir declarar empate em uma batalha  ", () => {
    const esperado = "Empate";
    const obtido = batalhar(personagensCombate[0], personagensCombate[0]);

    expect(esperado).toEqual(obtido);
  });
  it("Deve calcular o vigor corretamente com o atributo base de sua raça + equipamentos", () => {
    const esperado = 13;
    const obtido =
      personagemComEquipamento.vigorBase +
      personagemComEquipamento.equipamentos.vigor.aprimoramento;

    expect(esperado).toEqual(obtido);
  });
  it("Deve calcular a vida corretamente com o atributo base de sua raça + equipamentos", () => {
    const esperado = 18;
    const obtido =
      personagemComEquipamento.vidaBase +
      personagemComEquipamento.equipamentos.vida.aprimoramento;

    expect(esperado).toEqual(obtido);
  });
  it("Deve calcular o dano corretamente com o atributo base de sua raça + equipamentos", () => {
    const esperado = 10;
    const obtido =
      personagemComEquipamento.danoBase +
      personagemComEquipamento.equipamentos.dano.aprimoramento;

    expect(esperado).toEqual(obtido);
  });
});

describe("Missao", () => {
  it("Deve conseguir concluir uma missão corretamente e receber seus prêmios", async () => {
    const jogador = [];
    let aposMissao = await fazerMissao(
      jogador,
      personagensCombate[0],
      "semTimer"
    );
    let missaoEscolhida = aposMissao[1];
    let personagemAposMissao = aposMissao[0];

    const esperado = {
      ...personagensCombate[0],
      level: personagensCombate[0].level + missaoEscolhida.niveisRecebidos,
      dinheiro:
        personagensCombate[0].dinheiro + missaoEscolhida.dinheiroRecebido,
      levelAnterior: personagensCombate[0].level,
    };
    const obtido = personagemAposMissao;

    /*   console.log(esperado);
  console.log(obtido); */

    expect(esperado).toEqual(obtido);
  });

  it("Deve conseguir concluir uma missão de expansão corretamente e receber seus prêmios se já possuir a expansão", async () => {
    const jogador = [1, 2, 3, 4, 5, 6, 7];
    let aposMissao = await fazerMissaoExpansao(
      jogador,
      personagensCombate[0],
      "semTimer"
    );
    let missaoEscolhida = aposMissao[1];
    let personagemAposMissao = aposMissao[0];

    /*   console.log(aposMissao);
     */
    const esperado = {
      ...personagensCombate[0],
      level: personagensCombate[0].level + missaoEscolhida.niveisRecebidos,
      dinheiro:
        personagensCombate[0].dinheiro + missaoEscolhida.dinheiroRecebido,
      levelAnterior: personagensCombate[0].level,
    };
    const obtido = personagemAposMissao;

    /*   console.log(esperado);
  console.log(obtido); */

    expect(esperado).toEqual(obtido);
  });
});

describe("Cheats", () => {
  it("Deve conseguir aplicar o cheat WILLIDAN e subir +20 níveis do personagem selecionado", async () => {
    const valorEsperada = 21;
    const axel = await criarPersonagem("Lucas", 2, personagensLocais);
    const valorObtido = cheats("WILLIDAN", axel, personagensLocais);

    expect(valorEsperada).toBe(valorObtido.level);
  });
  it("Deve conseguir aplicar o cheat GUSTHRALL e dar +2000 de dinheiro para o personagem selecionado", async () => {
    const valorEsperada = 2000;
    const axel = await criarPersonagem("Lucas", 2, personagensLocais);
    const valorObtido = cheats("GUSTHRALL", axel, personagensLocais);

    expect(valorEsperada).toBe(valorObtido.dinheiro);
  });
  it("Deve conseguir aplicar o cheat ANDUINNUNES e dar +20000 de dinheiro para todos os personagens", async () => {
    const valorEsperado = [20000, 20000];
    const axel = await criarPersonagem("Lucas", 2, personagensLocais);
    const insercaoDoCheat = cheats("ANDUINNUNES", axel, personagensLocais);

    //listaPosCheat é uma variavel que existe dentro do cheat e está sendo importada
    const valorObtido = [
      listaAposCheat[0].dinheiro,
      listaAposCheat[1].dinheiro,
    ];

    expect(valorEsperado).toEqual(valorObtido);
  });
  it("Deve conseguir aplicar o cheat JULICHKING e subir +5 níveis de todos os personagens", async () => {
    const valorEsperado = [6, 24];
    const axel = await criarPersonagem("Lucas", 2, personagensLocais);
    const insercaoDoCheat = cheats("JULICHKING", axel, personagensLocais);

    //listaPosCheat é uma variavel que existe dentro do cheat e está sendo importada
    const valorObtido = [listaAposCheat[0].level, listaAposCheat[1].level];

    expect(valorEsperado).toEqual(valorObtido);
  });
  it("Deve conseguir aplicar o cheat KEVINERZUL e receber o item Arco do callback infinito", async () => {
    const valorEsperada = {
      nome: "Arco do callback infinito",
      tipo: "DANO",
      aprimoramento: "2000",
    };
    const axel = await criarPersonagem("Lucas", 2, personagensLocais);
    const valorObtido = cheats("KEVINERZUL", axel, personagensLocais);

    expect(valorEsperada).toEqual(valorObtido.equipamentos.dano);
  });
  it("Deve conseguir aplicar o cheat FABYOGGSARON e receber o item Talismã do Polimorfismo", async () => {
    const valorEsperada = {
      nome: "Talismã do Polimorfismo",
      tipo: "VIDA",
      aprimoramento: "2000",
    };
    const axel = await criarPersonagem("Lucas", 2, personagensLocais);
    const valorObtido = cheats("FABYOGGSARON", axel, personagensLocais);

    expect(valorEsperada).toEqual(valorObtido.equipamentos.vida);
  });
  it("Deve conseguir aplicar o cheat PABLOTHAR e receber o item Talismã do Polimorfismo", async () => {
    const valorEsperada = {
      nome: "Talismã do Polimorfismo",
      tipo: "VIDA",
      aprimoramento: "2000",
    };
    const axel = await criarPersonagem("Lucas", 2, personagensLocais);
    const valorObtido = cheats("PABLOTHAR", axel, personagensLocais);

    expect(valorEsperada).toEqual(valorObtido.equipamentos.vida);
  });
  it("Deve conseguir aplicar o cheat VITOREXXAR e receber o item Talismã do Polimorfismo", async () => {
    const valorEsperada = {
      nome: "Talismã do Polimorfismo",
      tipo: "VIDA",
      aprimoramento: "2000",
    };
    const axel = await criarPersonagem("Lucas", 2, personagensLocais);
    const valorObtido = cheats("VITOREXXAR", axel, personagensLocais);

    expect(valorEsperada).toEqual(valorObtido.equipamentos.vida);
  });
  it("Deve conseguir aplicar o cheat ZORZARTHAS e receber o item Talismã Indexado", async () => {
    const valorEsperada = {
      nome: "Talismã Indexado",
      tipo: "VIDA",
      aprimoramento: "2000",
    };
    const axel = await criarPersonagem("Lucas", 2, personagensLocais);
    const valorObtido = cheats("ZORZARTHAS", axel, personagensLocais);

    expect(valorEsperada).toEqual(valorObtido.equipamentos.vida);
  });
  it("Deve conseguir aplicar o cheat DIANDRAKA e receber o item Talismã Indexado", async () => {
    const valorEsperada = {
      nome: "Talismã Indexado",
      tipo: "VIDA",
      aprimoramento: "2000",
    };
    const axel = await criarPersonagem("Lucas", 2, personagensLocais);
    const valorObtido = cheats("DIANDRAKA", axel, personagensLocais);

    expect(valorEsperada).toEqual(valorObtido.equipamentos.vida);
  });
  it("Deve conseguir aplicar o cheat SERGIORGRIM e receber o item Armadura de Flexbox", async () => {
    const valorEsperada = {
      nome: "Armadura de Flexbox",
      tipo: "VIGOR",
      aprimoramento: "2000",
    };
    const axel = await criarPersonagem("Lucas", 2, personagensLocais);
    const valorObtido = cheats("SERGIORGRIM", axel, personagensLocais);

    expect(valorEsperada).toEqual(valorObtido.equipamentos.vigor);
  });
  it("De impedir de aplicar o cheat JULICHKING ", async () => {
    const axel = await criarPersonagem("Lucas", 2, personagensLocais);
    const insercaoDoCheat = cheats("JULICHKING", axel, undefined);

    //Retorna null
    expect(insercaoDoCheat).toBeFalsy();
  });

  it("De impedir de aplicar o cheat ANDUINNUNES ", async () => {
    const axel = await criarPersonagem("Lucas", 2, personagensLocais);
    const insercaoDoCheat = cheats("ANDUINNUNES", axel, undefined);

    //Retorna null
    expect(insercaoDoCheat).toBeFalsy();
  });

  it("De impedir de aplicar o cheat ANDUINNUNES ", async () => {
    const insercaoDoCheat = cheats("ALOHA", undefined, undefined);

    //Retorna null
    expect(insercaoDoCheat).toBeFalsy();
  });
});

describe("Selecao de personagem", () => {
  it("deve retornar o personagem local Axel", async () => {
    const valorEsperado = "Axel";
    const personagemSelecionado = await selecionarPersonagem(
      "Axel",
      personagensLocais
    );

    const valorObtido = personagemSelecionado.nome;

    expect(valorObtido).toBe(valorEsperado);
  });
  it("deve retornar 'Personagem não existe.' quando tentar buscar azevedo", async () => {
    const valorEsperado = "Personagem não existe.";
    const personagemSelecionado = await selecionarPersonagem(
      "azevedo",
      personagensLocais
    );

    const valorObtido = personagemSelecionado;

    expect(valorObtido).toBe(valorEsperado);
  });
});
