
let listaDeNumerosSorteados = [];
let numeroMaximo = 10;

// Função que gera um número aleatório;
function gerarNumeroAleatorio() {
    let numeroAleatorio = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    // condição para não repetir o mesmo número; o tamanho da lista vai ser igual a quantidade de números; quando chegar no limite a lista é resetada;
    if (quantidadeDeElementosNaLista == numeroMaximo) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroAleatorio)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroAleatorio);
        return numeroAleatorio;
    }
}

// Chamando a função e atribuindo a uma variavel;
let numeroSecreto = gerarNumeroAleatorio();

// Função para alterar o texto em determinado campo;
function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    // Esse trecho do código permite que o os textos sejam lidos;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.8;
        window.speechSynthesis.speak(utterance);
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

//Função que auxilia na reinicialização do jogo, mostrando as mensagens iniciais;
function mensagemInicial() {
    exibirTexto("h1", "Jogo do Número Secreto");
    exibirTexto("p", `Escolha um número entre 1 e ${numeroMaximo}`);
}

// Chamando a função para ter certeza que o jogo será iniciado com a mensagem;
mensagemInicial();

// função que limpa o input de chute quando o jogador erra a tentiva;
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

// Função que verifica se o chute do usuário é o mesmo que o númeroSecreto;
let contadorTentativas = 1;
function verificarChute() {
    let chute = document.querySelector("input").value;
    let palavraTentativas = contadorTentativas > 1 ? "tentativas" : "tentativa";
    let mensagemTentativas = `Você acertou o número secreto com ${contadorTentativas} ${palavraTentativas}.`

    if (chute == numeroSecreto) {
        exibirTexto("h1", "Acertou!");
        exibirTexto("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (chute > numeroSecreto) {
            exibirTexto("p", "O número secreto é menor");
        } else {
            exibirTexto("p", "O número secreto é maior");
        }
        contadorTentativas++
        limparCampo();
    }
}

// Função do botão que reseta o jogo;
function reiniciarJogo() {
    limparCampo();
    contadorTentativas = 1;
    numeroSecreto = gerarNumeroAleatorio();
    mensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}