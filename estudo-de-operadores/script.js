/* // Atividade Prática - Sintaxe e Operadores (Curso MRV Fullstack da DIO)

// Função que recebe valores digitados pelo usuário
function calculaNumeros() {
    // Declarando variável para receber a opção digitada pelo usuário
    let operacao = Number(prompt("Selecione a opção desejada:\n 1 - Iniciar\n 2 - Sair"));

    // Função para realizar uma nova operação, caso o usuário deseje
    function novaOperacao() {
        // Declarando variável para receber a opção digitada pelo usuário
        let opcao = Number(prompt('Deseja realizar uma nova operação:\n 1 - Sim\n 2 - Não'));

        // Verificando a opção digitada pelo usuário
        if (opcao === 1) {
            calculaNumeros();
        } else if (opcao === 2){
            alert('Até mais.');
        } else {
            alert('Erro: digite uma opção válida')
            novaOperacao();
        }
    }

    // Verificando a opção digitada pelo usuário
    if (operacao === 1) {

        // Declarando variáveis que serão utilizadas para armazenar os valores digitados e o resultado
        let n1 = Number(prompt('Digite o primeiro número:'));
        let n2 = Number(prompt('Digite o segundo número:'));
        let resultado = n1 + n2;

        // Verificando se os valores digitados são iguais
        if (n1 === n2) {

            // Verificação para saber se o resultado é maior ou menor que 10 e maior ou menor que 20
            if (resultado < 10 && resultado < 20) {
                alert(`Os números ${n1} e ${n2} são iguais. Sua soma é ${resultado}, que é menor que 10 e menor que 20.`)
                novaOperacao();

            } else if (resultado > 10 && resultado < 20) {
                alert(`Os números ${n1} e ${n2} são iguais. Sua soma é ${resultado}, que é maior que 10 e menor que 20.`)
                novaOperacao();

            } else {
                alert(`Os números ${n1} e ${n2} são iguais. Sua soma é ${resultado}, que é maior que 20.`)
                novaOperacao();

            }

        // Caso os valores digitados não sejam iguais, será realizada uma nova verificação de resultado
        } else {
            
            // Verificação para saber se o resultado é maior ou menor que 10 e maior ou menor que 20
            if (resultado < 10 && resultado < 20) {
                alert(`Os números ${n1} e ${n2} são diferentes. Sua soma é ${resultado}, que é menor que 10 e menor que 20.`)
                novaOperacao();

            } else if (resultado > 10 && resultado < 20) {
                alert(`Os números ${n1} e ${n2} são diferentes. Sua soma é ${resultado}, que é maior que 10 e menor que 20.`)
                novaOperacao();

            } else {
                alert(`Os números ${n1} e ${n2} são diferentes. Sua soma é ${resultado}, que é maior que 20.`)
                novaOperacao();

            }
        }

    // Verificação da opção selecionada no início do procedimento
    // Se for 2, encerra a aplicação
    } else if (operacao === 2) {
        alert('Até mais.');

    // Caso seja diferente de uma das duas opções disponíveis, a mensagem abaixo é exibida
    } else {
        alert('Erro: Selecione uma opção válida.');
        calculaNumeros();
    }
}

calculaNumeros(); */

function retornaNumero(num){
    if(!num) return "envie";

    return num
}

console.log(retornaNumero());