import { useEffect, useState } from "react"

interface Props {
    titulo: String,
    obrigatorio: boolean,
    onclick?: () => void,
    recusaN: Boolean,
    campo: Number,
    tipo: Number,
    id: String
}

const CampoSN: React.FC<Props> = ({ titulo, obrigatorio, onclick, recusaN, campo, tipo, id }: Props) => {

    const [sim, setSim] = useState("")
    const [nao, setNao] = useState("")
    const [whiteS, setWhiteS] = useState("")
    const [whiteN, setWhiteN] = useState("")

    const [boo, setBoo] = useState(false)

    var tipoBtn = "trans"
    if (campo === 0) {
        tipoBtn = "presenca"
    } else if (campo === 1) {
        tipoBtn = "bebe"
    }

    var tipoP = "colaborador"
    if (tipo === 1) {
        tipoP = "acompanhante"
    } else if (tipo === 2) {
        tipoP = "dependentes"
    }

    const altera = (e: String) => {

        if (tipo === 0) {
            
            let colaborador = JSON.parse(localStorage.getItem(tipoP) || '{}')

            colaborador[tipoBtn] = boo

            localStorage.setItem("colaborador", JSON.stringify(colaborador))

        } else {

            let achou = false
            let pessoas = JSON.parse(localStorage.getItem(tipoP) || '[]')
            pessoas.forEach((d: any) => {
                if (d["id_dependente"] === id) {
                    d[tipoBtn] = boo
                    achou = true
                }
            })

            if (!achou) {
                let pessoa: any = {
                    "id_dependente": id,
                    "presenca": false,
                    "bebe": false
                }
                pessoa[tipoBtn] = boo

                pessoas.push(pessoa)
            }

            localStorage.setItem(tipoP, JSON.stringify(pessoas))

        }
    }

    useEffect(() => {
        altera("wddw")
    }, [boo])

    const validaObrigatorio = () => {
        if (obrigatorio === true) {
            return (
                <span className="obrigatorio">*</span>
            )
        }
    }

    const seleciona = (e?: boolean) => {
        if (e === true) {
            setSim("#52B032")
            setWhiteS("#fff")
            setNao("")
            setWhiteN("")
            setBoo(true)
        } else {
            setNao("#f00")
            setWhiteN("#fff")
            setSim("")
            setWhiteS("")
            setBoo(false)
        }
    }

    useEffect(() => {
        if (recusaN) {
            setSim("")
            setWhiteS("")
            setNao("")
            setWhiteN("")
        } else {
            seleciona(false)
        }
    }, [recusaN])


    const recusa = () => {
        if (onclick !== undefined) {
            return (
                <>
                    <button id="Sim" onClick={() => seleciona(true)} style={{ backgroundColor: sim, color: whiteS }}>Sim</button>
                    <button id="Nao" onClick={onclick} style={{ backgroundColor: nao, color: whiteN }}>Não</button>
                </>
            )
        } else {

            if (obrigatorio) {
                return (
                    <>
                        <button id="Sim" onClick={() => seleciona(true)} style={{ backgroundColor: sim, color: whiteS }}>Sim</button>
                        <button id="Nao" onClick={() => seleciona(false)} style={{ backgroundColor: nao, color: whiteN }}>Não</button>
                    </>
                )
            } else {
                return (
                    <>
                        <button style={{ cursor: "default" }}>Sim</button>
                        <button disabled style={{ cursor: "default" }}>Não</button>
                    </>
                )
            }

        }
    }


    return (
        <div className="campo">
            <div className="titulo SN">
                <span>{titulo}?</span>
                {validaObrigatorio()}
            </div>
            <div className="selectSN">
                {recusa()}
            </div>
        </div>
    )
}

export default CampoSN