import { useQuestion } from "./src/services/question/use-question";
import { useLocalStorage } from "./src/services/local-storage/use-local-storage";
import axios from "axios";
import { criarPersonagem } from "./src/criarPersonagem";
import { selecionarPersonagem } from "./src/selecionarPersonagem";
import { batalhar } from "./src/batalhar";
import { fazerMissao } from "./src/missoes";
import { personagemCompraitem, personagemVendaItem } from "./src/loja";
import { cheats } from "./src/cheats";
import { aumentarAtributosACadaDoisLeveis } from "./src/aumentarDeNivel";
export const localStorage = useLocalStorage();

const listaDeCheats = [
  "WILLIDAN",
  "GUSTHRALL",
  "PABLOTHAR",
  "ANDUINNUNES",
  "JULICHKING",
  "KEVINERZUL",
  "FABYOGGSARON",
  "VITOREXXAR",
  "ZORZARTHAS",
  "DIANDRAKA",
  "SERGIORGRIM",
];

//Cria o banco de dados para expansoes caso nao esteja criado
/*if (!localStorage.getObject("expansoesDoUsuario")) {
  localStorage.setObject("expansoesDoUsuario", []);
} */

//Cria o banco de dados para personagens caso nao esteja criado
if (!localStorage.getObject("array-personagens")) {
  localStorage.setObject("array-personagens", []);
}

let jogador = localStorage.getObject("expansoesDoUsuario");

const main = async () => {
  const loja = await axios.get(
    "https://gustavobuttenbender.github.io/gus.github/woe/store.json"
  );

  //Variaveis globais
  let personagensAtuais = [];
  let op;
  let personagemXitado;

  let arrayRenovado = localStorage.getObject("array-personagens");

  //console.log(arrayRenovado);

  if (arrayRenovado != null) {
    arrayRenovado.forEach((item) => {
      personagensAtuais.push(item);
    });
  }

  //console.log(personagensAtuais)

  do {
    //console.clear()
    op = await useQuestion(
      "\n1 - Criar personagem\n2 - Selecionar Personagem\n3 - Sair"
    );

    //Verifica se foi colocado um cheat
    for (let i = 0; i < listaDeCheats.length; i++) {
      if (listaDeCheats[i] == op) {
        personagemXitado = cheats(op, undefined, personagensAtuais);
        if (personagemXitado) {
          for (let y = 0; y < personagensAtuais.length; y++) {
            if (personagensAtuais[y].nome == personagemXitado.nome) {
              personagensAtuais[y] = personagemXitado;
            }
          }
          localStorage.setObject("array-personagens", personagensAtuais);
        }
        op = "4";
      }
    }

    switch (op) {
      case "1":
        //criarPersonagem()
        let nome = await useQuestion("Nome do novo personagem: ");

        let idRacaNovoPersonagem = await useQuestion("Digite o id da raca: ");

        //Funcao que  que cria e retorna um objeto novo
        let novoJogador = await criarPersonagem(
          nome,
          idRacaNovoPersonagem,
          personagensAtuais
        );

        if (
          novoJogador != "Nome já utilizado!" &&
          novoJogador != "Level ou expansao não adquiridos." &&
          novoJogador != "Valor invalido."
        ) {
          if (localStorage.getObject("array-personagens") != null) {
            localStorage.setObject("array-personagens", [
              ...localStorage.getObject("array-personagens"),
              novoJogador,
            ]);
            personagensAtuais.push(novoJogador);
          } else {
            localStorage.setObject("array-personagens", [novoJogador]);
            personagensAtuais.push(novoJogador);
          }
        }
        break;
      case "2":
        let personagemXitado;
        console.clear();
        let opcaoSelecionarPersonagem;

        personagensAtuais = [];
        localStorage.getObject("array-personagens").forEach((item) => {
          personagensAtuais.push(item);
        });

        personagensAtuais.forEach((item) => {
          console.log(
            "Nome: " + item.nome + "; id: " + item.id + "; Lv: " + item.level
          );
        });

        //Selecionar personagem
        const nomePersonagem = await useQuestion("Nome do personagem: ");

        let personagemSelecionado = await selecionarPersonagem(
          nomePersonagem,
          personagensAtuais
        );

        console.log(personagemSelecionado);

        if (personagemSelecionado != "Personagem não existe.") {
          do {
            opcaoSelecionarPersonagem = await useQuestion(
              "Digite a opcao desejada!: \n1 - Batalhar\n2 - Realizar missoes\n3 - Loja\n4 - Voltar"
            );
            //Verifica se foi colocado um cheat
            for (let i = 0; i < listaDeCheats.length; i++) {
              if (listaDeCheats[i] == opcaoSelecionarPersonagem) {
                personagemXitado = cheats(
                  opcaoSelecionarPersonagem,
                  personagemSelecionado,
                  personagensAtuais
                );
                if (personagemXitado) {
                  for (let y = 0; y < personagensAtuais.length; y++) {
                    if (personagensAtuais[y].nome == personagemXitado.nome) {
                      personagensAtuais[y] = personagemXitado;
                    }
                  }
                  localStorage.setObject(
                    "array-personagens",
                    personagensAtuais
                  );
                }
                opcaoSelecionarPersonagem = "5";
              }
            }

            switch (opcaoSelecionarPersonagem) {
              case "1":
                let personagemAdversario, nomeAdversario;
                let personagemVencedor;

                do {
                  personagensAtuais.forEach((item) => {
                    console.log(
                      "Nome: " +
                        item.nome +
                        "; id: " +
                        item.id +
                        "; Lv: " +
                        item.level
                    );
                  });
                  if (personagemSelecionado == undefined)
                    return "Nenhum personagem selecionado.";
                  else {
                    nomeAdversario = await useQuestion(
                      "Digite o nome do personagem adversário: "
                    );
                    personagemAdversario = await selecionarPersonagem(
                      nomeAdversario,
                      personagensAtuais
                    );
                  }

                  if (personagemAdversario == "Personagem não existe.") {
                    return "Nome inválido.";
                  } else {
                    personagemVencedor = batalhar(
                      personagemSelecionado,
                      personagemAdversario
                    );
                    for (let i = 0; i < personagensAtuais.length; i++) {
                      if (
                        personagemVencedor.nome == personagensAtuais[i].nome
                      ) {
                        personagensAtuais[i] = personagemVencedor;
                      }
                    }
                  }
                  localStorage.setObject(
                    "array-personagens",
                    personagensAtuais
                  );

                  personagensAtuais = aumentarAtributosACadaDoisLeveis(
                    personagensAtuais
                  );
                  localStorage.setObject(
                    "array-personagens",
                    personagensAtuais
                  );

                  personagensAtuais.forEach((item) => {
                    if (personagemSelecionado.nome == item.nome) {
                      personagemSelecionado = item;
                    }
                  });
                } while (personagemVencedor == undefined);

                personagensAtuais.forEach((item) => {
                  if (personagemVencedor.nome == item.nome) {
                    console.log(item);
                  }
                });

                break;
              case "2":
                let jogador = localStorage.getObject("expansoesDoUsuario");
                let personagemAposmissao;

                if (personagemSelecionado == undefined)
                  console.log("Nenhum personagem selecionado.");
                else {
                  //missao = await pegarMissao(jogador);
                  //personagemAposmissao = await fazerMissao(missao, personagemSelecionado);
                  personagemAposmissao = await fazerMissao(
                    jogador,
                    personagemSelecionado
                  );
                  for (let i = 0; i < personagensAtuais.length; i++) {
                    if (
                      personagemAposmissao[0].nome == personagensAtuais[i].nome
                    ) {
                      personagensAtuais[i] = personagemAposmissao[0];
                    }
                  }
                }
                localStorage.setObject("array-personagens", personagensAtuais);
                personagensAtuais = aumentarAtributosACadaDoisLeveis();
                localStorage.setObject("array-personagens", personagensAtuais);

                personagensAtuais.forEach((item) => {
                  if (personagemSelecionado.nome == item.nome) {
                    personagemSelecionado = item;
                  }
                });

                personagensAtuais.forEach((item) => {
                  if (personagemAposmissao[0].nome == item.nome) {
                    console.log(item);
                  }
                });
                //console.log(personagemAposmissao);
                break;
              case "3":
                let opcaoLoja;
                let idItemCompra;
                let personagemCompra;

                console.log("Welcome stranger!");

                do {
                  opcaoLoja = null;
                  opcaoLoja = await useQuestion(
                    "\n1 - Comprar\n2 - Vender\n3 - Voltar "
                  );

                  switch (opcaoLoja) {
                    case "1":
                      personagensAtuais = [];
                      localStorage
                        .getObject("array-personagens")
                        .forEach((item) => {
                          personagensAtuais.push(item);
                        });

                      personagensAtuais.forEach((item) => {
                        if (item.nome == personagemSelecionado.nome) {
                          personagemSelecionado = item;
                        }
                      });

                      idItemCompra = await useQuestion(
                        "Digite o id do item! Stranger...\n "
                      );
                      personagemCompra = personagemCompraitem(
                        loja.data,
                        personagemSelecionado,
                        idItemCompra
                      );

                      //Atualiza o array de personagens atuais
                      if (
                        personagemCompra != "Expansão já foi adquirida!" &&
                        personagemCompra != null &&
                        personagemCompra != undefined
                      ) {
                        personagensAtuais = [];
                        localStorage
                          .getObject("array-personagens")
                          .forEach((item) => {
                            personagensAtuais.push(item);
                          });
                      } else {
                        console.log("Expansão já foi adquirida!");
                      }

                      break;
                    case "2":
                      let nomeDoItem;

                      console.log(
                        "\nEntão você quer desapegar, hein? What are you selling? stranger..."
                      );
                      nomeDoItem = await useQuestion(
                        "Digite o nome do item! Stranger...\n "
                      );

                      personagensAtuais.forEach((item) => {
                        if (item.nome == personagemSelecionado.nome) {
                          personagemSelecionado = item;
                        }
                      });

                      personagemVendaItem(nomeDoItem, personagemSelecionado);

                      //Atualiza o array de personagens atuais
                      personagensAtuais = [];
                      localStorage
                        .getObject("array-personagens")
                        .forEach((item) => {
                          personagensAtuais.push(item);
                        });
                      break;
                    case "3":
                      console.log("Voltando...");
                      break;
                    default:
                      console.log("\nValor invalido!\n");
                      break;
                  }
                } while (opcaoLoja != "3");

                break;
              case "5":
                break;
              case "4":
                console.log("Voltando...");
                break;
            }
          } while (opcaoSelecionarPersonagem != "4");
        }
        break;
      case "3":
        //Mostra pro usuario que estamos saindo
        console.log("Saindo...");
        break;
      case "4":
        break;
      default:
        //Caso seja inserido um valor errado
        console.log("Valor invalido!");
        break;
    }
  } while (op != "3");
};

main();
