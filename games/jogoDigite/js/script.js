var min = 0, seg = 0, cen = 0, ativo = false, final = false;

var arrayDigitar1 = [
  "informatica",
  "computacao",
  "internet",
  "tecnologia",
  ""
];
var arrayDigitar2 = [
  "informatica",
  "nivel dois"
];
var arrayDigitar3 = [
  "tres",
  "nivel tres"
];
var arrayDigitar4 = [
  "quatro",
  "nivel quatro"
];
var arrayDigitar5 = [
  "cinco",
  "nivel cinco"
];
var digitar = '';
var nivel = 1;

function iniciarPagina(){
  $('#min').text('00:');
  $('#seg').text('00:');
  $('#cen').text('00');
  min = 0, seg = 0, cen = 0;
  sortearFrase();
  $('#input').val('');
  $('#nivel').text(nivel);
  $('#input').prop('disabled', true);
  $('#contentMensagem').hide();
}
function sortearFrase(){
  if(nivel == 1){
    digitar = arrayDigitar1[Math.floor(Math.random() * 2)];
  }else if(nivel == 2){
    digitar = arrayDigitar2[Math.floor(Math.random() * 2)];
  }else if(nivel == 3){
    digitar = arrayDigitar3[Math.floor(Math.random() * 2)];
  }else if(nivel == 4){
    digitar = arrayDigitar4[Math.floor(Math.random() * 2)];
  }else{
    digitar = arrayDigitar5[Math.floor(Math.random() * 2)];
  }
  $('#digitar').text(digitar);
}
function cronometro(){
  if(cen < 100){
    if(cen < 10){
      $('#cen').text("0"+cen);
    }else{
      $('#cen').text(cen);
    }
    cen++;
  }else if(seg < 60){
    if(nivel == 3 && seg == 6){
      clearInterval(crono);
      passouDoTempo();
    }else if(nivel == 4 && seg == 4){
      clearInterval(crono);
      passouDoTempo();
    }else if(nivel == 5 && seg == 2){
      clearInterval(crono);
      passouDoTempo();
    }
    if(seg < 10){
      $('#seg').text("0"+seg+":");
    }else{
      $('#seg').text(seg+":");
    }
    seg++;
    cen = 0;
  }else{
    passouDoTempo();
  }
}
function clickEnter(){
  if(final == false){
    if(event.keyCode == 13 && ativo == false){
      ativo = true;
      $('#input').prop('disabled', false);
      $('#input').focus();
      crono = setInterval(cronometro, 10);
    }else if(event.keyCode == 13 && ativo == true){
      ativo = false;
      clearInterval(crono);
      conferir();
    }
  }
}
function conferir(){
  $('#input').prop('disabled', true);
  final = true;
  if(digitar == $('#input').val()){
    if(nivel == 1){
      nivel++;
      $('#contentMensagem').show();
      $('#mensagem').text('fácil né quero ver nos próximos níveis. partiu nível 2?');
      $('#button').text('Partiu');
    }else if(nivel == 2){
      nivel++;
      $('#contentMensagem').show();
      $('#mensagem').text('Partiu para o nivel 3, agora vc tem 30 segundos para resolver');
      $('#button').text('ir');
    }else if(nivel == 3){
      nivel++;
      $('#contentMensagem').show();
      $('#mensagem').text('Partiu para o nivel 4, agora vc tem 20 segundos para resolver');
      $('#button').text('ir');
    }else if(nivel == 4){
      nivel++;
      $('#contentMensagem').show();
      $('#mensagem').text('Partiu para o nivel 5, agora vc tem 10 segundos para resolver');
      $('#button').text('ir');
    }else{
      nivel = 1;
      $('#contentMensagem').show();
      $('#mensagem').text('Parabens você concluiu todos os niveis');
      $('#button').text('ir');
    }
  }else{
    alert('opss, você errou a escrita');
  }
}
function passouDoTempo(){
  final = true;
  nivel = 1;
  $('#contentMensagem').show();
  $('#mensagem').text('ixxii, esgotou seu tempo :( Tente de novo...');
  $('#button').text('tentar novamente');
}
function fecharMensagem(){
  final = false;
  iniciarPagina();
  $('#contentMensagem').hide();
}
document.body.onkeypress = clickEnter;