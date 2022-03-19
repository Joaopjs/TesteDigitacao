var texto = "Foi divulgado nesta terça-feira (14) o levantamento do Ipec para as eleições presidenciais de 2022. O estudo foi feito de 9 a 13 de dezembro e ouviu 2.002 pessoas em 144 municípios. O levantamento trouxe a informação que o ex-presidente Luiz Inácio Lula da Silva (PT) tem 48% das intenções de voto. No segundo lugar vem o atual presidente Jair Bolsonaro (PL) com 21% e em terceiro lugar Sergio Moro (Podemos) com 6%. A margem de erro é de 2 pontos para mais e para menos." +
    "O Ipec é um instituto criado por ex-executivos após o encerramento do Ibope Inteligência. O novo instituto de pesquisa atua na área de consultoria e inteligência em pesquisas de mercado, opinião pública e política." +
    "Os dados apurados não podem ser comparados com pesquisas anteriores em virtude da mudança dos nomes testados. O nível de confiança do levantamento é de 95%.";


$(document).ready(function() {


    $.getJSON("http://localhost/json/textos.json", function(data) {
        console.log(data[0].tiutlo);
    });
    // $.ajax({
    //     url: 'http://34.125.100.157/src/index.php',
    //     dataType: "json",
    //     type: "GET",
    //     contentType: "application/json",
    //     crossDomain: true,
    //     success: (data) => {
    //         console.log("hjjhjh");
    //     },
    //     error: (erro) => {
    //         console.log(erro);
    //     }
    // });
});



// $.getJSON('C:/Users/computador/Desktop/TesteDigitar/src/textos.json', function(data) {
//     alert("hjjhhj");
// });

// var textosjson = JSON.parse(file: "C:/Users/computador/Desktop/TesteDigitar/src/textos.json");

// alert("hjjh");
//var texoregula = texto.replace(/[^a-zA-Zá-úÁ-Ú., ]/g, ""); //match("[^0-9a-zA-Z]+", "");

var index = 0;
var i = 60;
var erros = 0;
var digitadoAgora = 0;
var digitados = 0;
var digitaOk = 0;
var acertos = 0;

//converte a string em array
var textoarry = texto.split(' ');

//formata a primeira palavra do texto em negrito
textoarry[0] = "<strong>" + textoarry[0] + "</strong>";

//variavel para simples manipulação de dados para nao acontecer alterações indesejaveis no array
var textjoin = textoarry;

//Imprime o texto na tela apenas uma vez na inicialização da pagina web
if ($('#textarea').text() == "") {
    $('#textarea').html('<p>' + textjoin.join(' ') + '<p>');

}

//Responsavel por escutar o event do checkbox
var checkbox = document.querySelector("input[name=checkbox]");
checkbox.addEventListener('change', function() {
    if (this.checked) {

        SemCaracterEsp();

    } else {

        ComCaracterEsp();
    }
});

//responsavel por escutar o evento da digitação 
const inputEle = document.getElementById('textareadigitar');
inputEle.addEventListener('keyup', function(e) {
    var key = e.which || e.keyCode;

    //conta quantas vezes o teclado foi clicado
    if (key != undefined) {
        digitados++;
        let first = GetFirstWord();

        if (first.substring(0, this.value.length) != this.value) {
            $('#textareadigitar').attr('style', 'color:#ff0000');

        } else {
            $('#textareadigitar').attr('style', 'color:#030303');
        }

        digitadoAgora++;
    }


    //Inicia o contador 
    if (digitados <= 1) {
        var interval = setInterval(() => {
            //inicia em 60 segundos e diminui até 0
            $('.contador').html(i--);

            if (i < 0) {
                //Mensagem para tentar novamente
                $('#msgatualizar').html("Atualize a pagina para tentar novamente ou aperte F5");
                //PPM palavar por minuto
                let ppm = acertos + 2;
                $('.ppm').html(ppm);

                //Presisão 
                let precision = (digitaOk * 100) / digitados;
                $('.precisao').html(precision.toFixed(1) + "%");

                //Digitados
                $('.digitados').html(digitados);

                //Palavras digitadas corretamente
                $('.acertos').html(acertos);

                //Palavras digitadas erradas
                $('.erros').html(erros);

                clearInterval(interval);
            }

        }, 1000);
    }

    // codigo da tecla espaço
    if (key == 32 || this.value == this.value + " ") {

        //pega a primeira palavra do texto 
        var first = GetFirstWord();

        //Acrescenta um espaço no final do texto, Para ser possivel uma comparação no if (first == this.value)
        first = first + " ";

        //confere se a palavra digitada é igual a primeira palavra do texto
        if (first == this.value) {

            //Incrementa digitação correta em numeros de tecla
            digitaOk = digitaOk + this.value.length;
            //Palavras corretas
            acertos++;
            //apaga a palavra digitada do texto
            textoarry[index] = '';
            //passa para a proxima palavra do texto
            textoarry[index + 1] = "<strong>" + textoarry[index + 1] + "</strong>";
            //atualiza a variavel Textjoin
            textjoin = textoarry;

            //Imprime na tela os valores e atributos
            $('#textarea').html('<p">' + textjoin.join(' ') + '</p>');
            $('#textareadigitar').val('');
            $('#textareadigitar').attr('style', 'color:#030303');

            //incrementa o indice 
            index = index + 1;

            //Zera a variavel digitadoagora - esta variavel é usada para identificar a letra atual da palavra
            digitadoAgora = 0;

        } else {
            //adiciona 1 ao erro caso digitar uma palavra errada
            erros++;

            //apaga o texto digitado errado
            $('#textareadigitar').val('');
            //Zera a variavel digitadoagora - esta variavel é usada para identificar a letra atual da palavra
            digitadoAgora = 0;
        }

    }

});

////pega a primeira palavra do texto 
function GetFirstWord() {
    var first = $('#textarea').text().split(' ')[index];
    return first;
}

//Função para remover caracteres especiais e também imprimir o texto na tela
function SemCaracterEsp(params) {

    //expecifica caracteres permitidos
    var texoregula = texto.replace(/[^a-zA-Zá-úÁ-Ú.,-- ]/g, "");
    //converte a string em array
    textoarry = texoregula.split(' ');
    //Remove os espaçoes em branco deixados pela remoção de caracteres especiais
    textoarry = textoarry.filter(function(value) {
        return value !== "" && value !== null;
    });

    //torna em negrito a primeira palavra do texto
    textoarry[0] = "<strong>" + textoarry[0] + "</strong>";
    //atualiza a variavel textjoin
    textjoin = textoarry;
    //Imprime na tela o texto atualizado
    $('#textarea').html('<p>' + textjoin.join(' ') + '<p>');
}

function ComCaracterEsp() {
    //converte a string em array
    var textoarry = texto.split(' ');
    //formata negrito na primeira palavra do texto
    textoarry[0] = "<strong>" + textoarry[0] + "</strong>";
    //atualiza a variavel textjoin
    textjoin = textoarry;
    //Imprime na tela o texto atualizado
    $('#textarea').html('<p>' + textjoin.join(' ') + '<p>');
}