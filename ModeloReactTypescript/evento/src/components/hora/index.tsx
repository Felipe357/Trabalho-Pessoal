import "./style.css"

import Open from "../../assets/images/open.png"

interface Props {
    onclick: () => void,
    aberto: boolean
}

const Hora: React.FC<Props> = ({ onclick, aberto }) => {


    const spans: string[] = []

    const carregarHorario = () => {

        for (let index = 0; index < 24; index++) {
            spans.push(index.toString().length === 1 ? "0" + index.toString() + ":00" : index.toString() + ":00")
            spans.push(index.toString().length === 1 ? "0" + index.toString() + ":30" : index.toString() + ":30")
        }

    }

    carregarHorario()

    return (
        <div className="inputHora"  onClick={onclick}>
            {
                aberto ? (
                    <div className="relogio inicio ">
                        {
                            spans.map((m, indice) => {
                                return (
                                    <span key={indice} id="hora">{m}</span>
                                )
                            })
                        }
                    </div>
                ) : (
                    <></>
                )
            }
            <div className="hora-selecionada">
                <span id="horaForm">Início <span>00:00</span></span>
                <img src={Open} alt="close" />
            </div>

        </div>
    )
}

export default Hora