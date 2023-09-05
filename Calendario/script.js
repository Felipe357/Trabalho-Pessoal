const diasTag = document.querySelector(".dias"),
    dataAtual = document.querySelector(".data"),
    antproxIcon = document.querySelectorAll(".icons img");

let date = new Date(),
    ano = date.getFullYear(),
    mes = date.getMonth();

const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
    "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

var diaHoje = parseInt(moment(date).format("DD"))
var mesComeco = mes + 1
var anoComeco = ano

const carregarCalendario = () => {
    dataAtual.innerText = `${meses[mes]} ${ano}`

    let numAtual = parseInt(transformNomeMes(dataAtual.innerHTML.slice(0, -5)))
    let priData = new Date(ano, mes, 1).getDay(),
        ultData = new Date(ano, mes + 1, 0).getDate(),
        ultDataMes = new Date(ano, mes, ultData).getDay(),
        ultDataProxMes = new Date(ano, mes, 0).getDate()
    let liTag = ""

    for (let i = priData; i > 0; i--) {
        liTag += `<li class="inactive">${ultDataProxMes - i + 1}</li>`
    }

    if (mesComeco == numAtual) {
        for (let i = 1; i < date.getDate(); i++) {
            liTag += `<li class="inactive">${i}</li>`
        }

        for (let i = date.getDate(); i <= ultData; i++) {
            let hoje = i === date.getDate() && mes === new Date().getMonth() && ano === new Date().getFullYear() ? "active" : ""
            liTag += `<li class="${hoje}" onclick="selecionaData(this)" dt="${i}">${i}</li>`
        }
    } else if (mesComeco > numAtual || anoComeco > parseInt(dataAtual.innerHTML.slice(-4))) {
        for (let i = 1; i <= ultData; i++) {
            liTag += `<li class="inactive" >${i}</li>`
        }
    } else {
        for (let i = 1; i <= ultData; i++) {
            liTag += `<li onclick="selecionaData(this)" dt="${i}">${i}</li>`
        }
    }

    for (let i = ultDataMes; i < 6; i++) {
        liTag += `<li class="inactive">${i - ultDataMes + 1}</li>`
    }
    diasTag.innerHTML = liTag;
}

carregarCalendario();

antproxIcon.forEach(icon => {
    icon.addEventListener("click", () => {

        mes = icon.id === "ant" ? mes - 1 : mes + 1

        if (mes < 0 || mes > 11) {
            date = new Date(ano, mes, new Date().getDate())
            ano = date.getFullYear()
            mes = date.getMonth()
        } else {
            date = new Date()
        }
        carregarCalendario()
        alteraCorData()
    })
})

var primeiro = 0
var segundo = 0

const selecionaData = (e) => {
    var dia = parseInt(e.getAttribute("dt"))

    dia = dia.toString()
    dia = dia.length == 1 ? "0" + dia : dia

    var novaData = dataAtual.innerHTML.slice(0, -5)

    dia = moment(dia + transformNomeMes(novaData) + ano.toString(), "DDMMYYYY").format("MMDDYYYY")

    if (primeiro == 0) {
        primeiro = dia
    } else if (segundo == 0) {
        segundo = dia
    } else if (dia > segundo) {
        segundo = dia
    } else if (dia > primeiro && dia < segundo) {
        primeiro = dia
    } else if (dia < primeiro && dia < segundo) {
        primeiro = dia
    } else if (dia == primeiro || dia == segundo) {
        primeiro = dia
        segundo = dia
    }
    alteraCorData()

    if (segundo == 0) {
        document.querySelector("#dataForm").innerHTML = `${moment(primeiro, "MMDDYYYY").format("DD/MM/YYYY")} - `
    } else {
        document.querySelector("#dataForm").innerHTML = `${moment(primeiro, "MMDDYYYY").format("DD/MM/YYYY")} - ${moment(segundo, "MMDDYYYY").format("DD/MM/YYYY")}`
    }

}

const alteraCorData = () => {
    var novaData = dataAtual.innerHTML.slice(0, -5)
    var contP = moment(primeiro, "MMDDYYYY").format("DD")
    var contS = moment(segundo, "MMDDYYYY").format("DD")
    var mesP = meses[parseInt(moment(primeiro, "MMDDYYYY").format("MM")) - 1]
    var mesS = meses[parseInt(moment(segundo, "MMDDYYYY").format("MM")) - 1]

    var numMesP = parseInt(moment(primeiro, "MMDDYYYY").format("MM"))
    numMesP = numMesP.toString().length == 1 ? "0" + numMesP : numMesP

    var numMesS = parseInt(moment(segundo, "MMDDYYYY").format("MM"))
    numMesS = numMesS.toString().length == 1 ? "0" + numMesS : numMesS

    var numAtual = transformNomeMes(novaData)

    document.querySelector(".dias").querySelectorAll("li").forEach(l => {
        l.classList.remove("activeM")
        l.classList.remove("active")
        if (parseInt(l.getAttribute("dt")) == contP && mesP == novaData || parseInt(l.getAttribute("dt")) == contS && mesS == novaData) {
            l.classList.add("active")
            l.classList.remove("activeM")
        } else if (mesP == novaData && mesS == novaData) {
            if (parseInt(l.getAttribute("dt")) > contP && parseInt(l.getAttribute("dt")) < contS) {
                l.classList.add("activeM")
                l.classList.remove("active")
            } else {
                l.classList.remove("activeM")
                l.classList.remove("active")
            }
        } else if (mesP == novaData) {
            if (parseInt(l.getAttribute("dt")) > contP) {
                l.classList.add("activeM")
                l.classList.remove("active")
            }
        } else if (mesS == novaData) {
            if (parseInt(l.getAttribute("dt")) < contS) {
                l.classList.add("activeM")
                l.classList.remove("active")
            }
        }
        if (parseInt(numMesP) < parseInt(numAtual) && parseInt(numMesS) > parseInt(numAtual) && l.getAttribute("dt") != null) {
            l.classList.add("activeM")
        }

    })

}

function transformNomeMes (mes) {
    switch (mes) {
        case "Janeiro":
            return "01"
        case "Fevereiro":
            return "02"
        case "Março":
            return "03"
        case "Abril":
            return "04"
        case "Maio":
            return "05"
        case "Junho":
            return "06"
        case "Julho":
            return "07"
        case "Agosto":
            return "08"
        case "Setembro":
            return "09"
        case "Outubro":
            return "10"
        case "Novembro":
            return "11"
        case "Dezembro":
            return "12"
        default:
            break;
    }
}

const openCalendario = (e) => {
    if (e.getAttribute("open") == 0) {
        document.querySelector(".fundo").classList.remove("model")
        e.setAttribute("open", 1)
        e.querySelector("img").style.transform = "rotate(90deg)"
    } else {
        document.querySelector(".fundo").classList.add("model")
        e.setAttribute("open", 0)
        e.querySelector("img").style.transform = "rotate(-90deg)"
    }
}

const openRelogio = (e) => {
    if (e.getAttribute("open") == 0) {
        e.parentNode.querySelector(".relogio").classList.remove("model")
        e.setAttribute("open", 1)
        e.querySelector("img").style.transform = "rotate(90deg)"
    } else {
        e.parentNode.querySelector(".relogio").classList.add("model")
        e.setAttribute("open", 0)
        e.querySelector("img").style.transform = "rotate(-90deg)"
    }

}

var horaInicio = 0
var spanHora = ""

const carregarHorario = () => {

    for (let index = 0; index < 24; index++) {
        spanHora+= `<span id="hora" onclick="selecionaHora(this)" hora="${index.toString().length == 1  ? "0"+index : index}00">${index.toString().length == 1  ? "0"+index : index}:00</span>`
        spanHora+= `<span id="hora" onclick="selecionaHora(this)" hora="${index.toString().length == 1  ? "0"+index : index}30">${index.toString().length == 1  ? "0"+index : index}:30</span>`
    }

    document.querySelector(".inicio").innerHTML = spanHora
    document.querySelector(".fim").innerHTML = spanHora

}

carregarHorario()

const selecionaHora = (e) => {
    e.parentNode.querySelectorAll("span").forEach(e => { e.classList.remove("horaActive") });
    e.classList.add("horaActive")

    let horaPai = e.parentNode.parentNode
    horaPai.querySelector("#horaForm").innerHTML = e.innerHTML

    if (e.parentNode.classList[1] == "inicio") {
        document.querySelector(".fim").querySelectorAll("span").forEach((s, indice) => {
            if (parseInt(s.getAttribute("hora")) <= parseInt(e.getAttribute("hora"))) {
                s.classList.add("horaInactive")
                s.classList.remove("horaActive")
                s.removeAttribute("onclick")
            } else {
                s.setAttribute("onclick", "selecionaHora(this)")
                s.classList.remove("horaInactive")
            }
        })
    } else {
        document.querySelector(".inicio").querySelectorAll("span").forEach((s, indice) => {
            if (parseInt(s.getAttribute("hora")) >= parseInt(e.getAttribute("hora"))) {
                s.classList.add("horaInactive")
                s.classList.remove("horaActive")
                s.removeAttribute("onclick")
            } else {
                s.setAttribute("onclick", "selecionaHora(this)")
                s.classList.remove("horaInactive")
            }
        })
    }

}