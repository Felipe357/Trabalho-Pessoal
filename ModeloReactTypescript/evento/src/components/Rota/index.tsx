import "./style.css"
import Calendario from "../../assets/images/calendario.png"
import { useNavigate } from "react-router-dom"

interface Props {
    route: String,
    idEvento?: Number
}

const Rota: React.FC<Props> = ({ route, idEvento }) => {

    const navigate = useNavigate()

    const alterButton = () => {

        if (route === "aceitar") {

            return (
                <button onClick={() => aceitar()}>salvar</button>
            )
        } else if (route === "eventos") {
            return (
                <button onClick={() => navigate('/formularioEvento')}>novo evento</button>
            )
        } else if (route === "evento") {
            return (
                <button onClick={() => navigate('/')}>salvar</button>
            )
        }

    }

    const aceitar = () => {

        let colaborador = JSON.parse(localStorage.getItem("colaborador") || "{}")

        let acompanhante = JSON.parse(localStorage.getItem("acompanhante") || "[]")[0]

        let dependentes = JSON.parse(localStorage.getItem("dependentes") || "[]")

        let acp = JSON.parse(localStorage.getItem("acompanhante") || "[]")[0]

        if (acompanhante.nomeDigitado !== "" && acompanhante.nomeDigitado !== undefined) {
            acp.cad = true
            acp.nome = acompanhante.nomeDigitado
            delete acp.nomeDigitado
            delete acp.id_dependente
            acompanhante.presenca = false
            acompanhante.bebe = false
        } else {
            acp.cad = false
            delete acp.nomeDigitado
            delete acp.nome
            delete acp.presenca
            delete acp.bebe
            delete acp.id_dependente
        }

        delete acompanhante.nomeDigitado
        delete acompanhante.nome 
        dependentes.push(acompanhante)

        dependentes.forEach((d : any) => {
            d.id_dependente = parseInt(d.id_dependente)
        });

        let bodyEvento = {
            "cracha_col": colaborador.cracha_col,
            "presenca": colaborador.presenca,
            "bebe": colaborador.bebe,
            "trans": colaborador.trans,
            "id_evento": idEvento,
            "acompanhante": acp,
            "dependentes": dependentes
        }

        console.log(bodyEvento);

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8' },
            body: JSON.stringify(bodyEvento)
        };

        fetch('http://localhost:3000/eventos/convite/aceitar', options)
            .then(response => response.json())
            .then(response => console.log(response))

        navigate('/')

    }


    return (
        <div className="rota-menu">
            <div className="rota">
                <img src={Calendario} alt="inicio" onClick={() => navigate('/')} />
                <span id="rota-span-maior">&gt;</span>
                <span id="rota-span">Eventos</span>
            </div>
            <div className="rota-title">
                <span id="titulo-menu-rota" >Eventos</span>
                {alterButton()}
            </div>
        </div>
    )
}

export default Rota