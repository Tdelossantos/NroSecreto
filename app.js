let listaNro = [];
let nroLimite = 50;
let numeroSecreto = gerarNroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${nroLimite}`);   
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    console.log(chute == numeroSecreto);
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela ('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela ('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNroAleatorio() {
    let nroEscolhido = parseInt(Math.random() * nroLimite + 1);
    let quantidadeNros = listaNro.length;
    if (quantidadeNros == nroLimite) {
        listaNro = [];
    }
    if (listaNro.includes(nroEscolhido)) {
        return gerarNroAleatorio();
    } else {
        listaNro.push(nroEscolhido);
        return nroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}