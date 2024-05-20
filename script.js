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
}

const selecionarCases = (indiceCases) => {
    //p/ cada item do array (remove o item da classe do banner)
    listaCases.forEach(conjunto => solucoes.classList.remove(conjunto));
    casesAtuais = indiceCases;
    solucoes.classList.add(listaCases[indiceCases]);
}