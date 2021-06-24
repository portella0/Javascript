import { useLocalStorage } from "./services/local-storage/use-local-storage";
import { cheats } from "./cheats";
const localStorage = useLocalStorage();

export async function selecionarPersonagem(nomePersonagem, array) {
  localStorage.setString("nome-personagem", nomePersonagem);

  const personagensAtuais = [...array];

  const personagemSelecionado = localStorage.getString("nome-personagem");
  for (let i = 0; i < personagensAtuais.length; i++) {
    if (personagensAtuais[i].nome == personagemSelecionado) {
      //console.log(personagensAtuais[i]);
      return personagensAtuais[i];
    }
  }
  console.log("Personagem não existe.");
  return "Personagem não existe.";
}
