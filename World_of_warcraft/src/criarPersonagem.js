import { useLocalStorage } from "./services/local-storage/use-local-storage";
import axios from "axios";
import { cheats } from "./cheats";

const localStorage = useLocalStorage();

export const equipamentoDefault = {
  nome: "Corpo",
  tipo: "Nada",
  preço: 0,
  aprimoramento: 0,
  lvlMinimo: 0,
};

export async function criarPersonagem(nome, idraca, array) {
  let arrayDeExpansoesDoUsuario = null;

  if (localStorage.getObject("expansoesDoUsuario")) {
    arrayDeExpansoesDoUsuario = localStorage.getObject("expansoesDoUsuario");
  } else if (!localStorage.getObject("expansoesDoUsuario")) {
    arrayDeExpansoesDoUsuario = [7, 8];
  }

  //console.log(arrayDeExpansoesDoUsuario)

  const racas = await axios.get(
    "https://gustavobuttenbender.github.io/gus.github/woe/races.json"
  );

  const arrayDeRacas = [...racas.data];
  let nomePersonagem = nome;
  let idRacaJogador = idraca;
  let arrayDeJogadores = array;
  let jogador;

  const racasDeExpansoesEAliadas = arrayDeRacas.filter((item) => {
    return item.idExpansao != undefined;
  });

  const racasNormais = arrayDeRacas.filter((item) => {
    return item.idExpansao == undefined;
  });

  if (arrayDeJogadores) {
    for (let i = 0; i < arrayDeJogadores.length; i++) {
      if (arrayDeJogadores[i].nome == nomePersonagem) {
        console.log("Nome já utilizado!");
        return "Nome já utilizado!";
      }
    }
  }

  if (idRacaJogador >= 1 && idRacaJogador <= 12) {
    if (idRacaJogador <= 6) {
      racas.data.forEach((item) => {
        if (item.id == idRacaJogador) {
          jogador = {
            ...item,
            nome: nomePersonagem,
            level: 1,
            equipamentos: {
              vida: equipamentoDefault,
              vigor: equipamentoDefault,
              dano: equipamentoDefault,
            },
            dinheiro: 0,
          };
        }
      });
    } else if (idRacaJogador >= 7 && arrayDeJogadores) {
      //cadeias de filtros para verificar se jogador com expanso pode ser obtido
      const jogadorDeExpansao = racasDeExpansoesEAliadas.filter((item) => {
        return item.id == idRacaJogador;
      });

      let filtroPorIdExpansao;
      if (arrayDeExpansoesDoUsuario) {
        for (let y = 0; y < arrayDeExpansoesDoUsuario.length; y++) {
          if (arrayDeExpansoesDoUsuario[y] == jogadorDeExpansao[0].idExpansao) {
            filtroPorIdExpansao = arrayDeExpansoesDoUsuario[y];
          }
        }
      }

      let filtroPorLevel;
      for (let x = 0; x < arrayDeJogadores.length; x++) {
        if (
          arrayDeJogadores[x].level >= jogadorDeExpansao[0].lvlMinimoParaObter
        ) {
          filtroPorLevel = arrayDeJogadores[x];
        }
      }

      if (filtroPorIdExpansao && filtroPorLevel) {
        jogador = {
          ...jogadorDeExpansao[0],
          nome: nomePersonagem,
          level: 10,
          equipamentos: {
            vida: equipamentoDefault,
            vigor: equipamentoDefault,
            dano: equipamentoDefault,
          },
          dinheiro: 0,
        };
      } else {
        console.log("Level ou expansao não adquiridos.");
        return "Level ou expansao não adquiridos.";
      }
    } else {
      console.log("Level e expansao não adquiridos.");
      return "Level ou expansao não adquiridos.";
    }
  } else {
    console.log("Valor invalido.");
    return "Valor invalido.";
  }

  return jogador;
}
