import "./style.css"
import Divisao from "../divisao-form";

import { useEffect, useState } from "react";
import CampoSN from "../campoSN";
import Familiar from "../familiar";
import Rota from "../Rota";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
    cra: String
}

interface Dependentes {
    "id": number,
    "nome": String,
    "nasc": String,
    "ativo": boolean,
    "cf": boolean,
    "cracha_col": String
}

interface Acompanhante {
    "id": number,
    "nome": String,
    "nasc": String,
    "ativo": boolean,
    "cf": boolean,
    "cracha_col": String
}

const FormularioCadastro = ({ cra }: Props) => {

    const [colaborador, setColaborador] = useState(String)
    const [dependentes, setDependentes] = useState<Dependentes[]>([])
    const [acompanhante, setAcompanhante] = useState<Acompanhante[]>([])
    const [cracha, setCracha] = useState("")
    const [presenca, setPresenca] = useState(true)
    
    const navigate = useNavigate()
    const location = useLocation();

    const [ idEvento, setIdEvento ] = useState(location.state ? location.state.id : "")


    if(location.state === null) {
        navigate("/")
    }

    const setarConsts = () => {
        setCracha(cra.toString())
    }

    useEffect(() => {


        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'User-Agent': 'Insomnia/2023.5.7' },
            body: JSON.stringify({
                "cracha": cra
            })
        };

        fetch('http://localhost:3000/eventos/colaborador/buscar', options)
            .then(response => response.json())
            .then(colaborador => {

                setColaborador(colaborador.colaborador.nome)
                setDependentes(colaborador.colaborador.dependentes.filter((d: any) => d.cf === true))
                setAcompanhante(colaborador.colaborador.dependentes.filter((d: any) => d.cf === false))
            })

    }, [cra])

    useEffect(() => {
        setarConsts()
        gerarStorage()
    })


    const parentToChild = () => {
        if (presenca) {
            setPresenca(false)
        } else {
            setPresenca(true)
        }
    }

    const gerarStorage = () => {

        var pessoas: any[] = []

        dependentes.forEach(e => {
            let pessoa: any = {
                "id_dependente": e.id.toString(),
                "presenca": false,
                "bebe": false
            }

            pessoas.push(pessoa)
        })

        localStorage.setItem("dependentes", JSON.stringify(pessoas))

        acompanhante.forEach((e) => {
            let pessoa: any = {
                "id_dependente": e.id.toString(),
                "presenca": false,
                "bebe": false,
                "nome": e.nome
            }

            localStorage.setItem("acompanhante", JSON.stringify([pessoa]))
        })

        localStorage.setItem("colaborador", JSON.stringify({ "cracha_col": cra, "presenca": false, "bebe": false, "trans": false }))

    }

    const calcIdade = (nasc: String) => {
        var dataEvento = "18/12/2023"

        var dataFormatNas = nasc.split("/")
        var dataFormatEvento = dataEvento.split("/")

        var concatenaNas = dataFormatNas[2] + dataFormatNas[1] + dataFormatNas[0]
        var concatenaEvento = dataFormatEvento[2] + dataFormatEvento[1] + dataFormatEvento[0]
        var data = parseInt(concatenaEvento) - parseInt(concatenaNas)

        return data.toString().slice(0, -4)
    }

    return (

        <>
            <Rota route={"aceitar"} idEvento={idEvento} />
            <div className="formulario" >

                <Divisao titulo="Colaborador" />
                <div className="campos">
                    <div className="campo">
                        <div className="titulo">
                            <span>Nome</span>
                        </div>
                        <input type="text" value={colaborador} disabled style={{ backgroundColor: "#ededed" }} />
                    </div>

                    <div className="campo">
                        <div className="titulo">
                            <span>Crachá</span>
                        </div>
                        <input type="text" value={cracha} disabled style={{ width: "60px", backgroundColor: "#ededed" }} />
                    </div>

                    <CampoSN titulo="Irei á Festa" tipo={0} campo={0} id={cracha} recusaN={presenca} obrigatorio={true} onclick={parentToChild} />

                    <CampoSN titulo="Irei Beber" tipo={0} campo={1} id={cracha} recusaN={presenca} obrigatorio={true} />

                    <CampoSN titulo="Utilizarei o ônibus da empresa" tipo={0} campo={2} id={cracha} recusaN={presenca} obrigatorio={true} />
                </div>
                <Divisao titulo="Acompanhantes" />
                <div className="campos">

                    {
                        acompanhante.map((a, indice) => {
                            return (
                                <Familiar key={indice} recusaN={presenca} tipo={1} id={a.id} nome={a.nome} s={true} n={true} h={false} />
                            )
                        })
                    }

                </div>
                <Divisao titulo="Dependentes" />
                <div className="campos">

                    {
                        dependentes.map((d, indice) => {

                            let n = false
                            if (parseInt(calcIdade(d.nasc)) > 18) {


                                n = true
                            }

                            return (
                                <Familiar key={indice} recusaN={presenca} tipo={2} id={d.id} nome={d.nome} s={true} n={n} h={true} />
                            )
                        })
                    }

                </div>

            </div>
        </>
    )
}

export default FormularioCadastro