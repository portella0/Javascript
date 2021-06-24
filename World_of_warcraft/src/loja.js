import axios from "axios";
import { useLocalStorage } from "./services/local-storage/use-local-storage";
import { personagemAtualizado, personagem, goldDoPersonagem, bancoAtualizadoComPersonagem, possuiNivelNecessario } from "../index";
import { cheats, listaAposCheat } from "./cheats";

export let expansoesAdquiridas = [];

export const equipamentoDefault = {
  nome: "Corpo",
  tipo: "Nada",
  preço: 0,
  aprimoramento: 0,
  lvlMinimo: 0,
};

const localStorage = useLocalStorage();

export async function personagemCompraitem(loja, personagem, idItem, test) {
  let personagemAtualizado = { ...personagem };
  let itemPosicao;
  let possuiExpansaoNecessaria;
  let possuiNivelNecessario;

  console.log(personagemAtualizado.dinheiro);

  const numeroItensLoja = loja;

  for (let i = 0; i < numeroItensLoja.length; i++) {
    if (loja[i].id == idItem) {
      itemPosicao = i;
    }
  }
  possuiExpansaoNecessaria = possuiExpansao(loja, itemPosicao, idItem);
  possuiNivelNecessario = possuiNivel(loja, personagemAtualizado, itemPosicao);

  if (possuiNivelNecessario && possuiExpansaoNecessaria) {
    let goldDoPersonagem = personagemAtualizado.dinheiro;

    if (goldDoPersonagem >= loja[itemPosicao].preco) {
      goldDoPersonagem = goldDoPersonagem - loja[itemPosicao].preco;
      personagemAtualizado.dinheiro = goldDoPersonagem;

      switch (loja[itemPosicao].tipo) {
        case "EXPANSAO":
          console.log("Entrei");
          expansoesAdquiridas = [2];

          if (localStorage.getObject("expansoesDoUsuario")) {
            for (
              let i = 0;
              i < localStorage.getObject("expansoesDoUsuario").length;
              i++
            ) {
              if (
                localStorage.getObject("expansoesDoUsuario")[i] ==
                loja[itemPosicao].idExpansao
              ) {
                console.log("Expansão já foi adquirida!");
                return "Expansão já foi adquirida!";
              }
            }
          }

          console.log("Entrei");
          if (localStorage.getObject("expansoesDoUsuario")) {
            expansoesAdquiridas = [2];
            localStorage.setObject("expansoesDoUsuario", [
              ...localStorage.getObject("expansoesDoUsuario"),
              loja[itemPosicao].idExpansao,
            ]);
            expansoesAdquiridas.push(loja[itemPosicao].idExpansao);
            console.log("Você comprou uma expansão global./n");
          } else {
            expansoesAdquiridas = [2];
            expansoesAdquiridas.push(loja[itemPosicao].idExpansao);
            console.log("Você comprou uma expansão global./n");
          }
          break;

        case "DANO":
          personagemAtualizado.equipamentos.dano = loja[itemPosicao];
          break;

        case "VIGOR":
          personagemAtualizado.equipamentos.vigor = loja[itemPosicao];
          break;

        case "VIDA":
          personagemAtualizado.equipamentos.vida = loja[itemPosicao];
          break;
      }
      console.log("Compra efetuada!");
    }
    else {
      console.log("Seu personagem não possui gold suficiente.");
    }
  } else {
    console.log("Você não possui a expansão ou level necessário.");
  }

  //atualiza banco de dados
  let bancoAtual = localStorage.getObject("array-personagens");
  for (let i = 0; i < bancoAtual.length; i++) {
    if (bancoAtual[i].nome == personagemAtualizado.nome) {
      bancoAtual[i] = personagemAtualizado;
    }
  }
  localStorage.setObject("array-personagens", bancoAtual);
  return personagemAtualizado;
}

export function possuiExpansao(loja, itemPosicao, id) {
  let possuiExpansao = false;

  const localStorage = useLocalStorage();

  if (loja[itemPosicao].tipo == "EXPANSAO") {
    possuiExpansao = true;
  } else if (!loja[itemPosicao].idExpansao) {
    possuiExpansao = true;
  } else {
    if (
      localStorage.getObject("expansoesDoUsuario") != null &&
      localStorage.getObject("expansoesDoUsuario").some((value) => {
        return (value = id);
      })
    ) {
      possuiExpansao = true;
    }
  }
  return possuiExpansao;
}

export async function possuiNivel(loja, personagem, itemPosicao) {
  let possuiNivel = false;

  if (
    !loja[itemPosicao].lvlMinimo ||
    personagem.nivel >= loja[itemPosicao].lvlMinimo
  ) {
    possuiNivel = true;
  }

  return possuiNivel;
}

export async function personagemVendaItem(nomeItem, personagem) {
  const loja = await axios.get(
    "https://gustavobuttenbender.github.io/gus.github/woe/store.json"
  );

  const localStorage = useLocalStorage();

  let personagemVenda = { ...personagem };

  //console.log(loja);

  let itemDaLoja;
  loja.data.forEach((item) => {
    if (item.nome == nomeItem) {
      itemDaLoja = item;
    }
  });

  if (itemDaLoja) {
    switch (itemDaLoja.tipo) {
      case "DANO":
        if (personagemVenda.equipamentos.dano.nome == itemDaLoja.nome) {
          personagemVenda.dinheiro += itemDaLoja.preco / 2;
          personagemVenda.equipamentos.dano = equipamentoDefault;
          console.log("Item vendido com sucesso!");
        } else {
          console.log("Tu não tem esse item zé mané.");
        }
        break;
      case "VIDA":
        if (personagemVenda.equipamentos.vida.nome == itemDaLoja.nome) {
          personagemVenda.dinheiro += itemDaLoja.preco / 2;
          personagemVenda.equipamentos.vida = equipamentoDefault;
          console.log("Item vendido com sucesso!");
        } else {
          console.log("Tu não tem esse item zé mané.");
        }
        break;
      case "VIGOR":
        if (personagemVenda.equipamentos.vigor.nome == itemDaLoja.nome) {
          personagemVenda.dinheiro += itemDaLoja.preco / 2;
          personagemVenda.equipamentos.vigor = equipamentoDefault;
          console.log("Item vendido com sucesso!");
        } else {
          console.log("Tu não tem esse item zé mané.");
        }
        break;
      default:
        console.log("Item não existe ou é expansão!");
        break;
    }
  } else {
    console.log("Item não vendivel, apenas substituivel!");
  }

  //Atualiza o banco de dados
  if (localStorage.getObject("array-personagens")) {
    let bancoAtual = localStorage.getObject("array-personagens");
    let bancoAtualizadoComPersonagem = [];
    for (let i = 0; i < bancoAtual.length; i++) {
      if (bancoAtual[i].nome == personagemVenda.nome) {
        bancoAtual[i] = personagemVenda;
      }
      bancoAtualizadoComPersonagem.push(bancoAtual[i]);
    }
    localStorage.setObject("array-personagens", bancoAtualizadoComPersonagem);
  }
  return personagemVenda;
}


