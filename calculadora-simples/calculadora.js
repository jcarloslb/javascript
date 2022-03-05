// Calculadora simples
//Declarando função Calculadora
function calculadora() {

    /* Declarando uma constante com uma mensagem solicitando a entrada de dados do usuário para 
    selecionar a operação desejada */
    const operacao = Number(prompt('Escolha uma operação:\n 1 - Soma (+)\n 2 - Subtração (-)\n 3 - Multiplicação (*)\n 4 - Divisão Real (/)\n 5 - Divisão Inteira (%)\n 6 - Potenciação (**)'));

    // Realizando verificação da operação selecionada pelo usuário
    if (!operacao || operacao < 1 || operacao >= 7) {
        alert('Erro: Operação inválida');
        calculadora();
    } else {

        // Declarando variáveis que receberão os números digitados
        let n1 = Number(prompt('Insira o primeiro número'));
        let n2 = Number(prompt('Insira o segundo número'));
        // Declarando a variável que receberá o resultado das operações
        let resultado;

        // Realização verificação dos valores digitados pelo usuário para realizar as operações
        if (!n1 || !n2) {
            alert('Erro: parâmetros inválidos');
            calculadora();
        } else {

            function soma() {
                // Atribuindo valor da operação à variável resultado
                resultado = n1 + n2;
                // Exibindo mensagem com o resultado da operação
                alert(`${n1} + ${n2} = ${resultado}`);
                // Chamada da função que verifica se o usuário deseja realizar uma nova operação
                novaOperacao();
            }

            function subtracao() {
                // Atribuindo valor da operação à variável resultado
                resultado = n1 - n2;
                // Exibindo mensagem com o resultado da operação
                alert(`${n1} - ${n2} = ${resultado}`);
                // Chamada da função que verifica se o usuário deseja realizar uma nova operação
                novaOperacao();
            }

            function multiplicacao() {
                // Atribuindo valor da operação à variável resultado
                resultado = n1 * n2;
                // Exibindo mensagem com o resultado da operação
                alert(`${n1} * ${n2} = ${resultado}`);
                // Chamada da função que verifica se o usuário deseja realizar uma nova operação
                novaOperacao();
            }

            function divisaoReal() {
                // Atribuindo valor da operação à variável resultado
                resultado = n1 / n2;
                // Exibindo mensagem com o resultado da operação
                alert(`${n1} / ${n2} = ${resultado}`);
                // Chamada da função que verifica se o usuário deseja realizar uma nova operação
                novaOperacao();
            }

            function divisaoInteira() {
                // Atribuindo valor da operação à variável resultado
                resultado = n1 % n2;
                // Exibindo mensagem com o resultado da operação
                alert(`O resto da divisão real entre ${n1} e ${n2} é igual a ${resultado}`);
                // Chamada da função que verifica se o usuário deseja realizar uma nova operação
                novaOperacao();
            }

            function potenciacao() {
                // Atribuindo valor da operação à variável resultado
                resultado = n1 ** n2;
                // Exibindo mensagem com o resultado da operação
                alert(`${n1} elevado a ${n2}ª potência é igual a ${resultado}`);
                // Chamada da função que verifica se o usuário deseja realizar uma nova operação
                novaOperacao();
            }

            function novaOperacao() {
                // Declarando variável para escolha de uma nova operação
                let opcao = prompt('Deseja realizar uma nova operação:\n 1 - Sim\n 2 - Não');

                // Verificação da escolha feita pelo usuário
                if (opcao == 1) {
                    calculadora();
                } else if (opcao == 2) {
                    alert('Obrigado por usar a calculadora. Até mais.');
                } else {
                    alert('Digite uma opção válida');
                    novaOperacao();
                }
            }
        }

        switch (operacao) {
            case 1:
                soma();
                break;
            case 2:
                subtracao();
                break;
            case 3:
                multiplicacao();
                break;
            case 4:
                divisaoReal();
                break;
            case 5:
                divisaoInteira();
                break;
            case 6:
                potenciacao();
                break;
        }

    }

}

calculadora();

function opa(){
    let teste = 'AAA';
}
console.log(teste);