//recebe todas as respostas
var biblioteca = [
	/*1*/
	"paris",
	/*2*/
	"felipao",
	/*3*/
	"jabulani",
	/*4*/
	"russia",
	/*5*/
	"dougras",
	/*6*/
	"fifa",
	/*7*/
	"irineu",
	/*8*/
	"frança",
	/*9*/
	"despacito",
	/*10*/
	"alemanha",
	/*11*/
	"suiça"
];

//recebe todas as dicas
var bibliotecaDica = [
	/*1*/
	"Torre Eiffel",
	/*2*/
	"Seleção Brasileira, Copa de 2014",
	/*3*/
	"Qual o nome da bola da Copa de 2010",
	/*4*/
	"Copa do Mundo 2018",
	/*5*/
	"você não é o ...",
	/*6*/
	"Organização, copa do mundo",
	/*7*/
	"..., você não sabe nem eu",
	/*8*/
	"Seleção que eliminou o Brasil na copa de 2006",
	/*9*/
	"Musica, youtube, views",
	/*10*/
	"Segunda Seleção com mais copa do mundo",
	/*11*/
	"Primeiro jogo da Seleção, copa 2018"
];

//sorteia um numero
var sorteio = Math.floor(Math.random() * 11);

//recebe a resposta
var resposta = biblioteca[sorteio];

//recebe a dica
var dica = bibliotecaDica[sorteio];

//total de chances
var chances = 6;

//os chutes
var chutes = "";

//contem a imagem da forca
var img = document.getElementById('boneco-img');

//recebe as letras corretas
var palavraMontada = "";

function iniciarJogo() {
	for (var i = 0; i < resposta.length; ++i) { /* Percorrendo a resposta*/

		palavraMontada += "_ ";
	}
	//mostra a palavra
	var divPalavra = document.getElementById("palavra");
	divPalavra.innerText = palavraMontada;

	var divChances = document.getElementById("chances");
	divChances.innerText = chances;

	var divDica = document.getElementById("dica");
	divDica.innerText = "Dica: " + dica;

}

//função acionada quando clica em alguma letra
function clique(botao) {

	//verifica os erros
	verificarErro(botao.name);

	//checa se as chances acabaram
	if (chances == 0) {
		window.setTimeout('semChances()', 100);
	}
	//se não atualiza a palavra
	else {
		chutes += botao.name;
		atualizarPalavra();
	}

	//verifica se a palavra esta correta
	if (palavraMontada == resposta) {
		window.setTimeout('acerto()', 10);
	}

	//desabilita o botão clicado
	botao.disabled = true;

}

//se as chances acabam essa função é chamada
function semChances() {
	alert("suas chances acabaram,tente novamente");
	location.reload(true);
}

function acerto() {
	alert("Parabens, você acertou!!");
	location.reload(true);
}

//verifica se o chute corresponde a alguma letra da resposta
function atualizarPalavra(letra) {
	palavraMontada = "";

	//confere se a letra tem na palavra chave
	for (var i = 0; i < resposta.length; ++i) { /* Percorrendo a resposta*/

		var acerto = false;

		for (var j = 0; j < chutes.length; ++j) { /* Percorrendo o chute */

			if (chutes[j] == resposta[i]) {
				palavraMontada += chutes[j];
				acerto = true;
				break;
			}
		}

		//verifica se o chute esta errado
		if (acerto == false) {
			palavraMontada += "_ ";
		}

	}
	//mostra a palavra
	var divPalavra = document.getElementById("palavra");
	divPalavra.innerText = palavraMontada;

	//mostra os chutes
	var divChutes = document.getElementById("chutes");
	divChutes.innerText = chutes;
}

//verifica se ele errou e diminui a chance
function verificarErro(letra) {
	var tamanho = 0;
	for (var i = 0; i < resposta.length; i++) {

		if (letra == resposta[i]) {
			tamanho++;
		}
	}


	if (tamanho == 0) {
		tamanho = 0;
		chances--;
	}
	//exibe quantas chances ele ainda tem
	var divChances = document.getElementById("chances");
	divChances.innerText = chances;

	//troca o boneco se ele tiver uma chance a menos
	if (chances == 5) {
		document.getElementById('boneco-img').src = "imgForca/segunda.png";
	}

	if (chances == 4) {
		document.getElementById('boneco-img').src = "imgForca/terceira.png";
	}

	if (chances == 3) {
		document.getElementById('boneco-img').src = "imgForca/quarta.png";
	}

	if (chances == 2) {
		document.getElementById('boneco-img').src = "imgForca/quinta.png";
	}

	if (chances == 1) {
		document.getElementById('boneco-img').src = "imgForca/sexta.png";
	}

	if (chances == 0) {
		document.getElementById('boneco-img').src = "imgForca/setima.png";
	}

}