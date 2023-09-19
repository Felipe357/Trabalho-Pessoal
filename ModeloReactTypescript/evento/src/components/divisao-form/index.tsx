import "./style.css"

interface Props {
    titulo: String
}

function Divisao({titulo} : Props) {
    return (
        <div className="divisao" >
            <div className="linha"></div>
            <span>{titulo}</span>
        </div>
    )
}

export default Divisao