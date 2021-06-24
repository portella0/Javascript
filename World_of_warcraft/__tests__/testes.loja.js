import index from "../index";
import { cheats } from "../src/cheats";
import { personagemCompraitem, personagemVendaItem, possuiExpansao, possuiNivel } from "../src/loja";
import axios from "axios";
import { expansoesAdquiridas } from "../src/loja"

//Por favor, esvazie o banco de dados expansoesDoUsuario para rodar os testes.

let loja;

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
    dinheiro: 200000,
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
    dinheiro: 300,
  },
  {
    id: 1,
    raca: "Elfo Sangrento",
    danoBase: 4,
    vidaBase: 5,
    vigorBase: 1,
    tipo: "NORMAL",
    nome: "BobEsponja",
    level: 19,
    equipamentos: {
      vida: {
        id: 8,
        nome: "Talismã do Tinhoso",
        tipo: "VIDA",
        preco: 2000,
        aprimoramento: 90,
      },
      vigor: {
        id: 10,
        nome: "Bracelete de vigor M",
        tipo: "VIGOR",
        preco: 90,
        aprimoramento: 7,
      },
      dano: {
        id: 2,
        nome: "Espada longa",
        tipo: "DANO",
        preco: 90,
        aprimoramento: 7,
      },
    },
    dinheiro: 90,
  },
  {
    id: 1,
    raca: "Elfo Sangrento",
    danoBase: 4,
    vidaBase: 5,
    vigorBase: 1,
    tipo: "NORMAL",
    nome: "BobEsponja",
    level: 15,
    equipamentos: {
      vida: {
        nome: "Corpo",
        tipo: "Nada",
        preço: 0,
        aprimoramento: 0,
        lvlMinimo: 0,
      },
      vigor: {
        id: 21,
        nome: "Armadura do Lich King",
        tipo: "VIGOR",
        preco: 250,
        aprimoramento: 25,
        lvlMinimo: 15,
        idExpansao: 2,
      },
      dano: {
        id: 2,
        nome: "Espada longa",
        tipo: "DANO",
        preco: 90,
        aprimoramento: 7,
      },
    },
    dinheiro: 92000,
  },
  {
    id: 3,
    raca: "Elfo Sangrento",
    danoBase: 4,
    vidaBase: 5,
    vigorBase: 1,
    tipo: "NORMAL",
    nome: "BobEsponja",
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
        id: 2,
        nome: "Espada longa",
        tipo: "DANO",
        preco: 90,
        aprimoramento: 7,
      },
    },
    dinheiro: 0,
  }
];

beforeAll(async () => {
  loja = await axios.get(
    "https://gustavobuttenbender.github.io/gus.github/woe/store.json"
  );
});

describe("Testes da Loja", () => {
  it("Deve conseguir comprar um item do tipo VIGOR com sucesso", async () => {
    //passou
    const personagem = await personagemCompraitem(
      loja.data,
      personagensLocais[0],
      9
    );
    console.log(personagem);

    expect(personagem.equipamentos.vigor.tipo).toBe("VIGOR");
  });

  it("Deve conseguir comprar um item do tipo DANO com sucesso", async () => {
    //passou
    const personagem = await personagemCompraitem(
      loja.data,
      personagensLocais[0],
      1
    );
    console.log(personagem);

    expect(personagem.equipamentos.dano.tipo).toBe("DANO");
  });

  it("Deve conseguir comprar um item do tipo VIDA com sucesso", async () => {
    //passou
    const personagem = await personagemCompraitem(
      loja.data,
      personagensLocais[0],
      5
    );
    console.log(personagem);

    expect(personagem.equipamentos.vida.tipo).toBe("VIDA");
  });

  it("Deve conseguir comprar um item do tipo EXPANSAO com sucesso", async () => {
    //passou
    const valorEsperado = 1;

    const personagem = await personagemCompraitem(
      loja.data,
      personagensLocais[0],
      14
    );

    console.log(expansoesAdquiridas[0]);

    expect(expansoesAdquiridas[1]).toBe(valorEsperado);
  });

  /* it("Deve conseguir comprar um equipamento de alguma expansão apenas se já tiver obtido a expansão", async () => {
    const personagem = await personagemCompraitem(
      loja.data,
      personagensLocais[1],
      13
    );
    console.log(personagem);

    const retornoEsperado = {
      id: 13,
      nome: "Glaives do Illidan",
      tipo: "DANO",
      preco: 200,
      aprimoramento: 20,
      lvlMinimo: 10,
      idExpansao: 1,
    };

    expect(retornoEsperado).toEqual(personagem.equipamentos.dano);
  }); */

  it("Deve conseguir vender um item de dano e receber metade do preço de volta", async () => {
    const valorEsperado = 135;

    const personagemObtido = await personagemVendaItem(
      "Espada longa",
      personagensLocais[2]
    );

    expect(valorEsperado).toBe(personagemObtido.dinheiro);
  });

  it("Deve conseguir vender um item de vigor e receber metade do preço de volta", async () => {
    const valorEsperado = 135;

    const personagemObtido = await personagemVendaItem(
      "Bracelete de vigor M",
      personagensLocais[2]
    );

    expect(valorEsperado).toBe(personagemObtido.dinheiro);
  });

  it("Deve conseguir vender um item de vida e receber metade do preço de volta", async () => {
    const valorEsperado = 1090;

    const personagemObtido = await personagemVendaItem(
      "Talismã do Tinhoso",
      personagensLocais[2]
    );

    expect(valorEsperado).toBe(personagemObtido.dinheiro);
  });

  it("Deve subtituir um item equipado se o item recém comprado for do mesmo tipo que o que já está sendo usado", async () => {
    //passou
    console.log(personagensLocais[3]);

    const valorEsperado = personagensLocais[3].equipamentos.dano;

    const personagem = await personagemCompraitem(
      loja.data,
      personagensLocais[3],
      2
    );

    expect(personagem.equipamentos.dano).toEqual(valorEsperado);
  });

  it("Deve validar o nível do personagem para permitir a venda de itens com um nível mínimo necessário", async () => {
    const resultado = await personagemVendaItem(
      "Armadura do Lich King",
      personagensLocais[3]
    );

    expect(personagensLocais[3].level).toBe(loja.data[20].lvlMinimo);
  });
});
