import { useEffect, useState } from "react"
import CampoSN from "../campoSN"

interface Props {
    nome: String,
    s: boolean,
    n: boolean,
    h: Boolean,
    recusaN: Boolean,
    tipo: Number,
    id: Number
}

function Familiar({ nome, s, n, h, recusaN, tipo, id }: Props) {

    const [ nomeD, setNomeD ] = useState(String)

    useEffect(() => {
        
        let acompanhante = JSON.parse(localStorage.getItem("acompanhante") || '[]')

        acompanhante[0].nomeDigitado = nomeD

        localStorage.setItem("acompanhante", JSON.stringify(acompanhante))

    }, [nomeD])

    const disable = () => {
        if (h === true) {
            return (
                <input type="text" placeholder={nome.toString()} disabled style={{ width: "375px", backgroundColor: "#ededed" }} />
            )
        } else {
            return (
                <input type="text" onChange={(e : any) => setNomeD(e.target.value)} placeholder={nome.toString()} style={{ width: "375px" }} />
            )
        }
    } 

    return (
        <>
            <div className="campo">
                <div className="titulo">
                    <span>Nome</span>
                </div>
                {disable()}
            </div>

            <CampoSN recusaN={recusaN} tipo={tipo} campo={0} id={id.toString()} titulo="Vai á Festa" obrigatorio={s} />

            <CampoSN recusaN={recusaN} tipo={tipo} campo={1} id={id.toString()}  titulo="Vai Beber" obrigatorio={n} />
        </>
    )
}

export default Familiar