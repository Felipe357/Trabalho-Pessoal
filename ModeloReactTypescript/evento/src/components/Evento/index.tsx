import { useState } from 'react'
import natal from '../../assets/images/natal.png'
import './style.css'
import { useNavigate } from "react-router-dom"

interface Props {
    id: Number,
    titulo: String,
    data: String,
    end: String,
    disable?: Boolean
}

const Evento: React.FC<Props> = ({id, titulo, data, end, disable}) => {

    
    const navigate = useNavigate()

    const [ color, setColor ] = useState(disable ? "#ECECEC" : "#FFF")

    const exibir = () => {
        if (disable) {
            return(
                <button className="btn-card-evento" style={{backgroundColor: "#ECECEC", cursor: "default"}} ></button>
            )
        } else {
            return(
                <button className="btn-card-evento" onClick={() => navigate('/formularioCadastro', { state: { id: id } })}>Registrar</button>
            )
        }
    }

    return (
        <div className="evento" style={{backgroundColor: color}}>
            <div className="img-evento">
                <img src={natal} />
            </div>
            <div className="info-card-evento">
                <span className="titulo-card-evento">{titulo}</span>
                <span className="data-card-evento">{data}</span>
                <span className="end-card-evento">{end}</span>
            </div>
            {exibir()}
        </div>
    )
}

export default Evento