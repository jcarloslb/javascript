//Função de Início do Jogo
function start() {

    //Ocultando a div inicio
    $("#inicio").hide();

    //criando novas divs com "jqAppend"
    $("#fundoGame").append(`<div id="jogador" class="anima1"></div>`);
    $("#fundoGame").append(`<div id="inimigo1" class="anima2"></div>`);
    $("#fundoGame").append(`<div id="inimigo2" class=""></div>`);
    $("#fundoGame").append(`<div id="amigo" class="anima3"></div>`);
    $("#fundoGame").append("<div id='placar'></div>");
    $("#fundoGame").append("<div id='energia'></div>");


    //Principais variáveis do jogo
    var jogo = {}
    var TECLA = {
        W: 87,
        S: 83,
        J: 74
    }
    var podeAtirar = true;
    var fimdejogo = false;

    var pontos = 0;
    var salvos = 0;
    var perdidos = 0;
    var energiaAtual = 3;

    //Variáveis para o Inimigo 1
    var velocidade = 5;
    var posicaoY = parseInt(Math.random() * 334);

    //Variáveis de som
    var somDisparo = document.getElementById("somDisparo");
    var somExplosao = document.getElementById("somExplosao");
    var musica = document.getElementById("musica");
    var somGameover = document.getElementById("somGameover");
    var somPerdido = document.getElementById("somPerdido");
    var somResgate = document.getElementById("somResgate");


    // Música de fundo do jogo
    musica.addEventListener("ended", function () { musica.currentTime = 0; musica.play(); }, false);
    musica.play();

    jogoPressionou = [];

    //Verifica se o usuário pressionou alguma tecla	
    $(document).keydown(function (e) {
        jogoPressionou[e.which] = true;
    });


    $(document).keyup(function (e) {
        jogoPressionou[e.which] = false;
    });

    //Game Loop
    jogo.timer = setInterval(loop, 30);

    //Função que movimenta o fundo do jogo
    function movefundo() {

        esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position", esquerda - 1);

    } // fim da função movefundo()

    function disparo() {

        if (podeAtirar == true) {

            podeAtirar = false;

            topo = parseInt($("#jogador").css("top"))
            posicaoX = parseInt($("#jogador").css("left"))
            tiroX = posicaoX + 190;
            topoTiro = topo + 37;
            $("#fundoGame").append("<div id='disparo'></div");
            $("#disparo").css("top", topoTiro);
            $("#disparo").css("left", tiroX);

            var tempoDisparo = window.setInterval(executaDisparo, 30);

        } //Fecha podeAtirar

        function executaDisparo() {
            posicaoX = parseInt($("#disparo").css("left"));
            $("#disparo").css("left", posicaoX + 15);

            if (posicaoX > 900) {

                window.clearInterval(tempoDisparo);
                tempoDisparo = null;
                $("#disparo").remove();
                podeAtirar = true;

            }
        } // Fecha executaDisparo()
    } // Fecha disparo()


    // Função para mover o jogador
    function moveJogador() {

        // Move pra cima
        if (jogoPressionou[TECLA.W]) {

            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo - 10);

            // Limitando a movimentação para o helicóptero não sair da tela
            if (topo <= 0) {
                $("#jogador").css("top", topo + 10);
            }
        }

        // Move pra baixo
        if (jogoPressionou[TECLA.S]) {

            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo + 10);

            // Limitando a movimentação para o helicóptero não sair da tela
            if (topo >= 434) {
                $("#jogador").css("top", topo - 10);
            }

        }

        // Disparo
        if (jogoPressionou[TECLA.J]) {
            disparo();
            somDisparo.play();
        }

    } // Fim da função para mover o jogador


    // Função que move o inimigo 1
    function moveInimigo1() {

        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left", posicaoX - velocidade);
        $("#inimigo1").css("top", posicaoY);

        if (posicaoX <= 0) {
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);

        }
    } //Fim da função moveinimigo1()

    // Função que move o inimigo 2
    function moveInimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"));
        $("#inimigo2").css("left", posicaoX - 3);

        if (posicaoX <= 0) {

            $("#inimigo2").css("left", 775);

        }
    } // Fim da função moveinimigo2()


    // Função que move o amigo
    function moveAmigo() {

        posicaoX = parseInt($("#amigo").css("left"));
        $("#amigo").css("left", posicaoX + 1);

        if (posicaoX > 906) {

            $("#amigo").css("left", 0);

        }

    } // fim da função moveamigo()

    //Função de Colisão
    function colisao() {

        var colisao1 = ($("#jogador").collision($("#inimigo1")));
        var colisao2 = ($("#jogador").collision($("#inimigo2")));
        var colisao3 = ($("#disparo").collision($("#inimigo1")));
        var colisao4 = ($("#disparo").collision($("#inimigo2")));
        var colisao5 = ($("#jogador").collision($("#amigo")));
        var colisao6 = ($("#inimigo2").collision($("#amigo")));

        // Verificando colisões
        if (colisao1.length > 0) {

            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            explosao1(inimigo1X, inimigo1Y);

            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);

            somExplosao.play();
            energiaAtual--;
        }

        // jogador com o inimigo2 
        if (colisao2.length > 0) {

            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            explosao2(inimigo2X, inimigo2Y);

            $("#inimigo2").remove();

            energiaAtual--;
            reposicionaInimigo2();

        }

        // Disparo com o inimigo1
        if (colisao3.length > 0) {


            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));

            explosao1(inimigo1X, inimigo1Y);
            $("#disparo").css("left", 950);

            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);

            somExplosao.play();
            pontos = pontos + 100;
            velocidade = velocidade + 0.3;

        }

        // Disparo com o inimigo2
        if (colisao4.length > 0) {

            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            $("#inimigo2").remove();

            explosao2(inimigo2X, inimigo2Y);
            $("#disparo").css("left", 950);

            pontos = pontos + 50;

            somExplosao.play();
            reposicionaInimigo2();

        }

        // jogador com o amigo
        if (colisao5.length > 0) {
            somResgate.play();
            reposicionaAmigo();
            $("#amigo").remove();
            salvos++;
        }

        // Inimigo 2 com o amigo
        if (colisao6.length > 0) {

            amigoX = parseInt($("#amigo").css("left"));
            amigoY = parseInt($("#amigo").css("top"));
            explosao3(amigoX, amigoY);
            $("#amigo").remove();

            somPerdido.play();
            perdidos++;
            reposicionaAmigo();

        }

    } //Fim da função colisao()



    // Função de Explosão
    //Explosão 1
    function explosao1(inimigo1X, inimigo1Y) {

        $("#fundoGame").append("<div id='explosao1'></div");
        $("#explosao1").css("background-image", "url(assets/imgs/explosao.png)");
        var div = $("#explosao1");
        div.css("top", inimigo1Y);
        div.css("left", inimigo1X);
        div.animate({ width: 200, opacity: 0 }, "slow");

        var tempoExplosao = window.setInterval(removeExplosao, 1000);

        function removeExplosao() {
            div.remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao = null;
        }
    } // Fim da função explosao1()


    //Explosão2
    function explosao2(inimigo2X, inimigo2Y) {

        $("#fundoGame").append("<div id='explosao2'></div");
        $("#explosao2").css("background-image", "url(assets/imgs/explosao.png)");
        var div2 = $("#explosao2");
        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2X);
        div2.animate({ width: 200, opacity: 0 }, "slow");

        var tempoExplosao2 = window.setInterval(removeExplosao2, 1000);

        function removeExplosao2() {

            div2.remove();
            window.clearInterval(tempoExplosao2);
            tempoExplosao2 = null;

        }
    } // Fim da função explosao2()


    function explosao3(amigoX, amigoY) {

        $("#fundoGame").append("<div id='explosao3' class='anima4'></div");
        $("#explosao3").css("top", amigoY);
        $("#explosao3").css("left", amigoX);

        var tempoExplosao3 = window.setInterval(resetaExplosao3, 1000);
        function resetaExplosao3() {
            $("#explosao3").remove();
            window.clearInterval(tempoExplosao3);
            tempoExplosao3 = null;

        }

    } // Fim da função explosao3



    //Reposiciona Inimigo2
    function reposicionaInimigo2() {

        var tempoColisao4 = window.setInterval(reposiciona4, 5000);

        function reposiciona4() {
            window.clearInterval(tempoColisao4);
            tempoColisao4 = null;

            if (fimdejogo == false) {

                $("#fundoGame").append("<div id=inimigo2></div");

            }

        }
    }

    //Reposiciona Amigo
    function reposicionaAmigo() {

        var tempoAmigo = window.setInterval(reposiciona6, 6000);

        function reposiciona6() {
            window.clearInterval(tempoAmigo);
            tempoAmigo = null;

            if (fimdejogo == false) {

                $("#fundoGame").append("<div id='amigo' class='anima3'></div>");

            }

        }

    } // Fim da função reposicionaAmigo()


    //Barra de energia
    function energia() {

        if (energiaAtual == 3) {

            $("#energia").css("background-image", "url(assets/imgs/energia3.png)");
        }

        if (energiaAtual == 2) {

            $("#energia").css("background-image", "url(assets/imgs/energia2.png)");
        }

        if (energiaAtual == 1) {

            $("#energia").css("background-image", "url(assets/imgs/energia1.png)");
        }

        if (energiaAtual == 0) {

            $("#energia").css("background-image", "url(assets/imgs/energia0.png)");

            //Game Over
            gameOver();
        }

    } // Fim da função energia()


    function placar() {

        $("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");

    } //fim da função placar()

    //Função GAME OVER
    function gameOver() {
        fimdejogo = true;
        musica.pause();
        somGameover.play();

        window.clearInterval(jogo.timer);
        jogo.timer = null;

        $("#jogador").remove();
        $("#inimigo1").remove();
        $("#inimigo2").remove();
        $("#amigo").remove();

        $("#fundoGame").append("<div id='fim'></div>");

        $("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<div id='reinicia' onClick='reiniciaJogo()'><h3>Jogar Novamente</h3></div>");
    } // Fim da função gameOver();


    function loop() {

        movefundo();
        moveJogador();
        moveInimigo1();
        moveInimigo2();
        moveAmigo();
        colisao();
        placar();
        energia();

    } // Fim da função loop()

} //Fim da função de início do jogo

// Função Reinicia Jogo
function reiniciaJogo() {
    somGameover.pause();
    $("#fim").remove();
    start();

} //Fim da função reiniciaJogo