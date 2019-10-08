  function iniciaJogo() {
  rodada = 1;
  matriz_jogo = Array(3);
  deu_velha = true;
  matriz_jogo['a'] = Array(3);
  matriz_jogo['b'] = Array(3);
  matriz_jogo['c'] = Array(3);

  matriz_jogo['a'][1] = 0;
  matriz_jogo['a'][2] = 0;
  matriz_jogo['a'][3] = 0;

  matriz_jogo['b'][1] = 0;
  matriz_jogo['b'][2] = 0;
  matriz_jogo['b'][3] = 0;

  matriz_jogo['c'][1] = 0;
  matriz_jogo['c'][2] = 0;
  matriz_jogo['c'][3] = 0;

  $('#primeirojogar').show();
  $('#segundojogar').hide();
}

iniciaJogo();

// Se o usuário clicar no botão verde isso será executado
$(document).ready(function () {
  $('#btn_iniciar_jogo').click(function () {
    entraApelido();
  });

  // Se o usuário pressionar a tecla ENTER isso será executado
  document.addEventListener('keydown', function (event) {
    if (event.keyCode == 13) {
      entraApelido();
    }
  });

  function entraApelido() {
    // Valida a digitação do apelido dos jogadores
    //.val() vai ver o que está escrito no campo e vai pegar o valor

    $('#primeirojogar').show();
    $('#segundojogar').hide();

    if ($('#entrada_apelido_jogador_1').val() == '') {
      alert("Apelido do jogador 1 não foi preenchido");
      return false;
    }

    if ($('#entrada_apelido_jogador_2').val() == '') {
      alert("Apelido do jogador 2 não foi preenchido");
      return false;
    }

    // Exibir os apelidos nas imagens lado a lado com o jogo da velha
    $('#nome_jogador_1').html($('#entrada_apelido_jogador_1').val());
    $('#nome_jogador_2').html($('#entrada_apelido_jogador_2').val());

    // Controla visualização das divs
    $('#pagina_inicial').hide();
    $('#palco_jogo').show();
  }

  $('.jogada').click(function () {
    var id_campo_clicado = this.id; //this faz referencia ao elemento do contexo do click
    $('#' + id_campo_clicado).off();
    jogada(id_campo_clicado);
  });

  // Função capaz de entender qual foi a posição clicada e atribuir uma imagem
  function jogada(id) {
    var icone = '';
    var ponto = 0;

    if ((rodada % 2) == 1) {
      icone = 'url("../../img/marcador_1.png")';
      ponto = -1;
      $('#primeirojogar').hide();
      $('#segundojogar').show();

    } else {
      icone = 'url("../../img/marcador_2.png")';
      ponto = 1;
      $('#segundojogar').hide();
      $('#primeirojogar').show();
    }

    rodada++;

    $('#' + id).css('background-image', icone);

    var linha_coluna = id.split('-');

    matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;

    setTimeout(verifica_combinacao, 50);
  }

  function verifica_combinacao() {
    //Verifica na horizontal
    var pontos = 0;
    for (var i = 1; i <= 3; i++) {
      pontos = pontos + matriz_jogo['a'][i];
    }
    ganhador(pontos);

    pontos = 0;
    for (var i = 1; i <= 3; i++) {
      pontos = pontos + matriz_jogo['b'][i];
    }
    ganhador(pontos);

    pontos = 0;
    for (var i = 1; i <= 3; i++) {
      pontos = pontos + matriz_jogo['c'][i];
    }
    ganhador(pontos);

    // Verifica na vertical
    for (var l = 1; l <= 3; l++) {
      pontos = 0;
      pontos += matriz_jogo['a'][l];
      pontos += matriz_jogo['b'][l];
      pontos += matriz_jogo['c'][l];

      ganhador(pontos);
    }

    // Verifica na diagonal
    pontos = 0;
    pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
    ganhador(pontos);

    pontos = 0;
    pontos = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];
    ganhador(pontos);

    if (rodada > 9 && deu_velha == true) {
      alert('Xiiiii, deu velha');
      $('.jogada').off();
      recarregar();
    }
  }

  function ganhador(pontos) {
    if (pontos == -3) {
      var jogada_1 = $('#entrada_apelido_jogador_1').val();
      alert(jogada_1 + " é o vencedor");
      $('.jogada').off();
      deu_velha = false;
      recarregar();
    } else if (pontos == 3) {
      var jogada_2 = $('#entrada_apelido_jogador_2').val();
      alert(jogada_2 + " é o vencedor");
      $('.jogada').off();
      deu_velha = false;
      recarregar();
    }
  }

  // Faz a página reiniciar
  function recarregar() {
    iniciaJogo();

    $('.jogada').css('background-image', 'none');
    $('.jogada').click(function () {
      var id_campo_clicado = this.id;
      $('#' + id_campo_clicado).off();
      jogada(id_campo_clicado);
    });
  }

});