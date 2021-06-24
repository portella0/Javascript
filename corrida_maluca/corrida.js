//pega a pista a cria o atributo que controla os buffs da pista
export function obterPista(pista, pistas){
  for (let i = 0; i < pistas.length; i++){
  if(pista == pistas[i].nome)
    return {...pistas[i], buffsUtilizados: new Array(pistas[i].posicoesBuffs.length)};
  }
}

//pega um corredor e adiciona nele aliado/inimigo se houverem
export function obterCorredor(corredor, listaCorredores, aliado, inimigo){
  if(aliado == undefined)
  aliado = '';

  if(inimigo == undefined)
  inimigo = '';

  for (let i = 0; i < listaCorredores.length; i++) {
    if(corredor == listaCorredores[i].nome)
    return {...listaCorredores[i], posicao:0, aliado: aliado, inimigo: inimigo};
  }
}

//aplica vantagem da pista
export function aplicarVantagem(listaCorredores, pista) {
  let corredoresComVantagem = [];

  for (let i = 0; i < listaCorredores.length; i++) {
    if(listaCorredores[i].vantagem == pista.tipo)
    {
      corredoresComVantagem.push({...listaCorredores[i], 
        velocidade: listaCorredores[i].velocidade+2, 
        drift: listaCorredores[i].drift+2, 
        aceleracao: listaCorredores[i].aceleracao+2});
    }
    else
    corredoresComVantagem.push({...listaCorredores[i]});
  }

  return corredoresComVantagem;
}

//aplica debuff da pista
export function aplicarDebuf(listaCorredores, pista) {
  let corredoresComDebuff = [];

  for (let i = 0; i < listaCorredores.length; i++) {
    corredoresComDebuff.push({...listaCorredores[i], 
        velocidade: listaCorredores[i].velocidade+pista.debuff, 
        drift: listaCorredores[i].drift+pista.debuff, 
        aceleracao: listaCorredores[i].aceleracao+pista.debuff});
  }

  return corredoresComDebuff
}

//verifica se está proximo de um aliado ou inimigo
export function checkAliadoInimigo(corredor, listaCorredores, tipoMovimento){
  let corredorComAliado = corredor; 

  if(corredor.aliado != undefined && corredor.aliado != "" && corredor.aliado != '')
  {
    for (let i = 0; i < listaCorredores.length; i++) 
    {
      if(listaCorredores[i].nome == corredor.aliado)
      {
        if(listaCorredores[i].posicao >= corredor.posicao - 2 && 
          listaCorredores[i].posicao <= corredor.posicao + 2)
        {
          corredorComAliado = {...corredor, [tipoMovimento]: corredor[tipoMovimento]+1}
        }
      }
    }
  }

  let corredorComInimigo = corredorComAliado;

  if(corredor.inimigo != undefined && corredor.inimigo != "" && corredor.inimigo != '')
  {
    for (let i = 0; i < listaCorredores.length; i++) 
    {
      if(listaCorredores[i].nome == corredor.inimigo)
      {
        if(listaCorredores[i].posicao >= corredor.posicao - 2 && 
          listaCorredores[i].posicao <= corredor.posicao + 2)
        {
          corredorComInimigo = {...corredorComAliado, [tipoMovimento]: corredorComAliado[tipoMovimento]-1}
        }
      }
    }
  }

  const corredorComAliadoInimigo = corredorComInimigo;

  return corredorComAliadoInimigo;
}

//remove buff/debuffs de alidos/inimigos e buff da pista da rodada anterior
export function removeBuffDebuffAliadoInimigo(listaCorredores){
  let corredoresSemBuffDebuff =[];

  for (let i = 0; i < listaCorredores.length; i++) {
    corredoresSemBuffDebuff.push({...listaCorredores[i], 
      velocidade: listaCorredores[i].velocidadeInicial,
      drift: listaCorredores[i].driftInicial,
      aceleracao: listaCorredores[i].aceleracaoInicial});

  }

  return corredoresSemBuffDebuff;
}

//salva os atributos do corredor antes da corrida começar
function salvarStatusInicialCorredores(listaCorredores){
  let corredoresStatusInicial = [];

  for (let i = 0; i < listaCorredores.length; i++) {
    corredoresStatusInicial.push({...listaCorredores[i], 
      velocidadeInicial: listaCorredores[i].velocidade,
      driftInicial: listaCorredores[i].drift,
      aceleracaoInicial: listaCorredores[i].aceleracao});
  }

  return corredoresStatusInicial;
}

//aplica vantagems e debuffs da pista e salva os atributos dos corredores
export function prepararCorrida(listaCorredores, pista){
  const corredoresComVantagem = aplicarVantagem(listaCorredores, pista)

  const corredoresComDebuff = aplicarDebuf(corredoresComVantagem, pista) 

  const corredoresComStatusIniciaisSalvos = salvarStatusInicialCorredores(corredoresComDebuff)

  let pistaPreparada = pista;

  for (let i = 0; i < pista.buffsUtilizados.length; i++) {
    pistaPreparada.buffsUtilizados[i] = new Array(listaCorredores.length)    
  }

  return [corredoresComStatusIniciaisSalvos, pistaPreparada];
}

//executa a corrida
export function correr(listaCorredores, pista){
  let rodada = 1;
  let pistaRodada;
  let vencedor = '';
  let corredoresSemBuffDebuff = [];
  let corredoresBuffDebuffAliadoInimigo = [];
  let arrayCorredoresPistaAposBuff = [];
  let pistaBuffControle;
  let corredoresBuffPista = [];
  let corredoresAposRodada = [];

  //coloca atributos q faltam nos corredores e na pista
  const corridaPreparada = prepararCorrida(listaCorredores, pista);
  const corredores = corridaPreparada[0];
  pistaRodada = corridaPreparada[1];

  console.log('Pista: ', pistaRodada);
  console.log('Corredores: ', corredores);
  
  //loop da corrida
  do{
    //pega a pista do fim do loop
    if(pistaBuffControle != undefined)
    pistaRodada = pistaBuffControle;

    console.log('Pista: ', pistaRodada);
    console.log('Rodada: ', rodada)

    //pega a lista inicial de corredores se um loop não tiver sido feito pelo menos 1 vez
    if(corredoresAposRodada.length > 0)
    corredoresSemBuffDebuff = removeBuffDebuffAliadoInimigo(corredoresAposRodada);
    else
    corredoresSemBuffDebuff = removeBuffDebuffAliadoInimigo(corredores);

    corredoresBuffDebuffAliadoInimigo = [];

    //remove buffs/debuffs da rodada anterior
    for (let i = 0; i < corredoresSemBuffDebuff.length; i++) {
      corredoresBuffDebuffAliadoInimigo.push(checkAliadoInimigo(corredoresSemBuffDebuff[i], corredoresSemBuffDebuff, controlaTipoMovimento(rodada)));
    }

    //aplica buffs da pista
    arrayCorredoresPistaAposBuff = buffPista(corredoresBuffDebuffAliadoInimigo, pistaRodada, controlaTipoMovimento(rodada));
    corredoresBuffPista = arrayCorredoresPistaAposBuff[0];
    pistaBuffControle = arrayCorredoresPistaAposBuff[1];

    //move os corredores
    corredoresAposRodada = executarRodada(corredoresBuffPista, pistaRodada, controlaTipoMovimento(rodada));
    rodada++;

    //verifica se alguem venceu
    vencedor = checkVitoria(corredoresAposRodada, pistaRodada);

  }while(vencedor == '');

  return vencedor;
}

//controla o tipo de movimento feito pelo corredor
function controlaTipoMovimento(rodada){
  let tipoMovimento

  if (rodada <= 3)
    {
      tipoMovimento = 'aceleracao';
    }
    else if(rodada%4 == 0)
    {
      tipoMovimento = 'drift';
    }
    else 
    {
      tipoMovimento = 'velocidade';
    }

  return tipoMovimento;
}

//executa uma rodada da corrida
export function executarRodada(listaCorredores, pista, tipoMovimento){
  let corredoresApósUmaRodada = [];

  for (let i = 0; i < listaCorredores.length; i++) {
    if(listaCorredores[i].nome == 'Dick Vigarista')
    {
      if (dickNaoPodeVencer(listaCorredores[i], pista, tipoMovimento) == true)
      {
        corredoresApósUmaRodada.push({...listaCorredores[i]})      
      }
      else 
      {
        corredoresApósUmaRodada.push(moverCorredor(listaCorredores[i], tipoMovimento));
      }
    }
    else
    corredoresApósUmaRodada.push(moverCorredor(listaCorredores[i], tipoMovimento));

    console.log('Corredor: ', corredoresApósUmaRodada[i].nome,
                '\n','Aliado: ', corredoresApósUmaRodada[i].aliado,
                '\n','inimigo: ', corredoresApósUmaRodada[i].inimigo,
                '\n','Vantagem: ', corredoresApósUmaRodada[i].vantagem, 
                '\n','Posição: ', corredoresApósUmaRodada[i].posicao, '/', pista.tamanho,
                '\n','Velocidade normal na pista: ', corredoresApósUmaRodada[i].velocidadeInicial,
                '\n','Drift normal na pista: ', corredoresApósUmaRodada[i].driftInicial,
                '\n','Aceleracao normal na pista: ', corredoresApósUmaRodada[i].aceleracaoInicial,
                '\n','Movimento sendo usado com buff/debuff: ', tipoMovimento, corredoresApósUmaRodada[i][tipoMovimento]);
  }
  return corredoresApósUmaRodada;
}

//move o corredor
export function moverCorredor(corredor, tipoMovimento){
  if(corredor[tipoMovimento] <= 0)
  return corredor;
  else
  return {...corredor, posicao: corredor.posicao + corredor[tipoMovimento]};
}

//aplica buffs da pista
export function buffPista(listaCorredores, pista, tipoMovimento){
  let corredoresAposBuff = listaCorredores;
  let pistaBuffControle = pista;

  //colocar lista de corredor em ordem decrescente de posicao
  corredoresAposBuff.sort((a, b) => parseFloat(b.posicao) - parseFloat(a.posicao));

  //percorre cada posicao de buff
  for (let i = 0; i < pistaBuffControle.buffsUtilizados.length; i++) {
    //percorre cada corredor
    for (let k = 0; k < corredoresAposBuff.length; k++) {
      //se corredor passou o buff
      if(corredoresAposBuff[k].posicao >= pistaBuffControle.posicoesBuffs[i]){
        //percorre lista de ids de corredores q passaram pelo buff
        for (let j = 0; j < pistaBuffControle.buffsUtilizados[i].length; j++) { 
          //se o item não tiver um id
          if(pistaBuffControle.buffsUtilizados[i][j] == undefined){
            //for o primeiro entao nenhum corredor passou pelo buff ainda e o valor extra é 0
            if(j == 0){
              pistaBuffControle.buffsUtilizados[i][j] = corredoresAposBuff[k].id;
            }
            //recebe bonus de velocidade baseado no numero de corredores que passaram pelo buff
            //se o id do corredor nao estiver na lista
            else if (pistaBuffControle.buffsUtilizados[i].includes(corredoresAposBuff[k].id)== false){
              pistaBuffControle.buffsUtilizados[i][j] = corredoresAposBuff[k].id;
              corredoresAposBuff[k] = {...corredoresAposBuff[k], [tipoMovimento]: corredoresAposBuff[k][tipoMovimento]+j};
            }    
          }
        }
      }
    }   
  }
  return [corredoresAposBuff, pistaBuffControle];
}

//verifica quem chegou ao final da pista
export function checkVitoria(listaCorredores, pista){
  let corredoresQueTerminaram = [];
  let corridaTerminou = false;
  let vencedor = '';

  for (let i = 0; i < listaCorredores.length; i++) {
    if(listaCorredores[i].posicao >= pista.tamanho)
    {
      corredoresQueTerminaram.push(listaCorredores[i])
      corridaTerminou = true;
    }
  }

  if(corridaTerminou == true)
  vencedor = checkVencedor(corredoresQueTerminaram);

  return vencedor;
}

//verifica quem vençou entre os que chegaram ao final
function checkVencedor(listaCorredores){
  let vencedor;
  let posicao = 0;
  let velocidade = 0;

  for (let i = 0; i < listaCorredores.length; i++) {
    if(listaCorredores[i].posicao > posicao)
    {
      posicao = listaCorredores[i].posicao;
      velocidade = listaCorredores[i].velocidade;
      vencedor = listaCorredores[i].nome;
    }  
    else if(listaCorredores[i].velocidade > velocidade && listaCorredores[i].posicao == posicao)
    {
      velocidade = listaCorredores[i].velocidade;
      vencedor = listaCorredores[i].nome;
    }
  }
  return vencedor;
}

//impede dick vigarista de vencer
export function dickNaoPodeVencer(corredor, pista, tipoMovimento){
  if(corredor[tipoMovimento] + corredor.posicao >= pista.tamanho)
     return true;
}








