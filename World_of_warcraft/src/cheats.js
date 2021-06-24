import { useLocalStorage } from "./services/local-storage/use-local-storage";
const localStorage = useLocalStorage();
export let listaAposCheat = [];

export function cheats(cheat, personagem, listaPersonagems) {
  if (personagem != undefined) {
    if (cheat == "KEVINERZUL") {
      return criaPersonagem(
        personagem,
        "Arco do callback infinito",
        "DANO",
        "2000"
      );
    } else if (
      cheat == "FABYOGGSARON" ||
      cheat == "PABLOTHAR" ||
      cheat == "VITOREXXAR"
    ) {
      return criaPersonagem(
        personagem,
        "Talismã do Polimorfismo",
        "VIDA",
        "2000"
      );
    } else if (cheat == "ZORZARTHAS" || cheat == "DIANDRAKA") {
      return criaPersonagem(personagem, "Talismã Indexado", "VIDA", "2000");
    } else if (cheat == "SERGIORGRIM") {
      return criaPersonagem(personagem, "Armadura de Flexbox", "VIGOR", "2000");
    } else {
      switch (cheat) {
        case "WILLIDAN":
          return (personagem = {
            ...personagem,
            level: personagem.level + 20,
          });
        case "GUSTHRALL":
          return (personagem = {
            ...personagem,
            dinheiro: personagem.dinheiro + 2000,
          });
        case "JULICHKING":
          if (listaPersonagems != undefined) {
            listaAposCheat = [];
            for (let i = 0; i < listaPersonagems.length; i++) {
              listaAposCheat.push({
                ...listaPersonagems[i],
                level: listaPersonagems[i].level + 5,
              });
            }
            localStorage.setObject("array-personagens", listaAposCheat);
          } else {
            console.log("Cheat não pode ser usado.");
            return null;
          }
          break;
        case "ANDUINNUNES":
          if (listaPersonagems != undefined) {
            listaAposCheat = [];
            for (let i = 0; i < listaPersonagems.length; i++) {
              listaAposCheat.push({
                ...listaPersonagems[i],
                dinheiro: listaPersonagems[i].dinheiro + 20000,
              });
            }
            localStorage.setObject("array-personagens", listaAposCheat);
          } else {
            console.log("Cheat não pode ser usado.");
          }
          break;
        default:
          console.log("Cheat não pode ser usado.");
      }
    }
  } else if (listaPersonagems != undefined) {
    switch (cheat) {
      case "JULICHKING":
        listaAposCheat = [];
        for (let i = 0; i < listaPersonagems.length; i++) {
          listaAposCheat.push({
            ...listaPersonagems[i],
            level: listaPersonagems[i].level + 5,
          });
        }
        localStorage.setObject("array-personagens", listaAposCheat);
        break;
      case "ANDUINNUNES":
        listaAposCheat = [];
        for (let i = 0; i < listaPersonagems.length; i++) {
          listaAposCheat.push({
            ...listaPersonagems[i],
            dinheiro: listaPersonagems[i].dinheiro + 20000,
          });
        }
        localStorage.setObject("array-personagens", listaAposCheat);
        break;
      default:
        console.log("Cheat não pode ser usado.");
    }
  } else {
    console.log("Nenhum cheat inserido!");
    return null;
  }
}

function criaPersonagem(personagem, nome, tipo, aprimoramento) {
  if (tipo == "VIDA") {
    return (personagem = {
      ...personagem,
      equipamentos: {
        ...personagem.equipamentos,
        vida: {
          nome: nome,
          tipo: tipo,
          aprimoramento: aprimoramento,
        },
      },
    });
  } else if (tipo == "DANO") {
    return (personagem = {
      ...personagem,
      equipamentos: {
        ...personagem.equipamentos,
        dano: {
          nome: nome,
          tipo: tipo,
          aprimoramento: aprimoramento,
        },
      },
    });
  } else if (tipo == "VIGOR") {
    return (personagem = {
      ...personagem,
      equipamentos: {
        ...personagem.equipamentos,
        vigor: {
          nome: nome,
          tipo: tipo,
          aprimoramento: aprimoramento,
        },
      },
    });
  }
}
