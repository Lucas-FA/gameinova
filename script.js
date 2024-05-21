let menu = document.getElementById("menu");
let iconeBarras = document.getElementById("icone-barras");
let iconeX = document.getElementById("icone-x");

function abrirFecharMenu() {
    if(menu.classList.contains("menu-fechado")) {
        menu.classList.remove("menu-fechado");
        iconeX.style.display = "inline";
        iconeBarras.style.display = "none";
    }
    else {
        menu.classList.add("menu-fechado");
        iconeX.style.display = "none";
        iconeBarras.style.display = "inline";
    }
}

window.onresize = () => {
    menu.classList.remove("menu-fechado");
    iconeX.style.display = "inline";
    iconeBarras.style.display = "none";
}

const entrarEmContato = (event) => {
    let valorNome = document.getElementById("campo-nome").value;
    let valorEmail = document.getElementById("campo-email").value;
    let valorAssunto = document.getElementById("campo-assunto").value;

    let dadosForm = {
        nome: valorNome,
        email: valorEmail,
        assunto: valorAssunto
    }

    fetch("http://127.0.0.1:3000/solicitacoes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosForm)
    })
    .then(resposta => {
        console.log(resposta);
        document.querySelector("#contato form").reset();
        alert("Solicitação cadastrada com sucesso!");
    })
    .catch(erro => {
        console.error(erro);
        alert("Erro");
    })

    event.preventDefault();
}

let listaCases = [
    "cases-zero",
    "cases-um"
]

let casesAtuais = 0;

let numeroCases = listaCases.length;

let solucoes = document.querySelector(".container-cards");

solucoes.classList.add(listaCases[casesAtuais]);

const mostrarCasesAnteriores = () => {
    //Remove o slide anterior
    solucoes.classList.remove(listaCases[casesAtuais]);
    if(casesAtuais > 0) {
        casesAtuais--;
    } 
    else {
        casesAtuais = numeroCases - 1;
    }
    //Renderiza o slideAtual
    solucoes.classList.add(listaCases[casesAtuais]);
    trocarConjuntoCases(casesAtuais);
}

const mostrarProximosCases = () => {
    //Remove o slide anterior
    solucoes.classList.remove(listaCases[casesAtuais]);
    //Muda a posição da lista de slides, para mostrar o slideAtual
    if(casesAtuais < numeroCases - 1) {
        casesAtuais++;
    } 
    else {
        casesAtuais = 0;
    }
    //Renderiza o slideAtual
    solucoes.classList.add(listaCases[casesAtuais]);
    trocarConjuntoCases(casesAtuais);
}

const selecionarCases = (indiceCases) => {
    //p/ cada item do array (remove o item da classe do banner)
    listaCases.forEach(conjunto => solucoes.classList.remove(conjunto));
    casesAtuais = indiceCases;
    solucoes.classList.add(listaCases[indiceCases]);
    trocarConjuntoCases(indiceCases);
}

let listaCasesBD = [];

const carregarCases = () => {
    // Método HTTP GET - Read -> Leitura
    fetch("http://localhost:3000/cases")
    .then((resposta) => resposta.json())
    .then((dados) => {
        listaCasesBD = dados;
        trocarConjuntoCases(0);
    })
    .catch( erro => console.error(erro))
}

//essa função muda o conjunto de cases de acordo com o 0 ou 1 do indice
const trocarConjuntoCases = (indice) => {
    let conjuntoCases = document.getElementById("lista-cards");

    //Template Strings com cases de 0 a 2
    let template = ""
    //Template Strings com cases de 3 a 5
    let template1 = ""

    //pega todos os cases do db.json
    for(let i = 0; i < listaCasesBD.length; i++) {
        //recebe um case por vez
        let cardCase = listaCasesBD[i];

        //verifica se o i é menor que metade do número total de cases, no caso 3, e coloca os cases de 0 a 2 no template
        if (i < listaCasesBD.length / 2) {
            template += `<div class="card">
                <img src="${cardCase.imagem}" alt="${cardCase.alt}">
                <h3>${cardCase.titulo}</h3>
                <p>${cardCase.descricao}</p>
                <button>Ver mais</button>
            </div>`
        }
        //se o i é maior que metade do número total de cases, no caso 3, coloca os cases de 3 a 5 no template1
        else {
            template1 += `<div class="card">
                <img src="${cardCase.imagem}" alt="${cardCase.alt}">
                <h3>${cardCase.titulo}</h3>
                <p>${cardCase.descricao}</p>
                <button>Ver mais</button>
            </div>`
        }
    }

    //verifica o número do índice e coloca o template adequado
    if(indice == 0) {
        conjuntoCases.innerHTML = template;
    }
    else {
        conjuntoCases.innerHTML = template1;
    }
}

let musicaTocando = false;
const audio = new Audio('music/Peyruis - Swing (original mix).wav');
audio.volume = 0.2;
audio.loop = true;

const tocarMusica = () => {
    if (musicaTocando == false) {
        audio.play();
        musicaTocando = true;
    }
    else {
        audio.pause();
        musicaTocando = false;
    }
}