let numMax = 10;
let nTentativas = 1;
let numerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();


exibirMensagemInicial();

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto) {
        let palavraTentativa = nTentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemFinal = `Você descobriu o número secreto
         com ${nTentativas} ${palavraTentativa}`;
        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', mensagemFinal);
        toggleButaoReiniciar();
        let btnChute = document.getElementById('chuteBtn');
        btnChute.setAttribute('disabled', 'True');
    } else {
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', `O número secreto é menor!`); 
        } else {
            exibirTextoNaTela('p', `O número secreto é maior!`);
        }
        nTentativas++;
        limparCampo();
    }
}
function gerarNumeroAleatorio() {
    let nEscolhido = parseInt(Math.random()*numMax+1);
    if(numerosSorteados.length == numMax)
        numerosSorteados = [];
    if (numerosSorteados.includes(nEscolhido)) {
        return gerarNumeroAleatorio();
    }
    numerosSorteados.push(nEscolhido);
    console.log(numerosSorteados);
    return nEscolhido;
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do Numero Secreto');
    exibirTextoNaTela('p', `Escolha um numero entre 1 e ${numMax}:`);
}

function toggleButaoReiniciar(){
    document.getElementById('reiniciar').toggleAttribute('disabled');
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    nTentativas = 1;
    limparCampo();
    toggleButaoReiniciar();
    let btnChute = document.getElementById('chuteBtn');
    btnChute.toggleAttribute('disabled');
    exibirMensagemInicial();
}