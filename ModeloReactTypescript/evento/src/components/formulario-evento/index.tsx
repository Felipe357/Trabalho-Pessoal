import "./style.css"
import Divisao from "../divisao-form";

import close from "../../assets/images/fechar.png"
import Rota from "../Rota";

import { useState, useEffect } from 'react'
import Hora from "../hora";
import Calendario from "../calendario/index";

interface Filiais {
    id: String
}

export default function Formulario() {

    const [name, setName] = useState("");
    const [isFocus, setIsFocus] = useState(false);

    const [filiais, setFiliais] = useState<Filiais[]>([])
    const [filiaisConst, setFiliaisConst] = useState<Filiais[]>([])
    const [filial, setFilial] = useState<Filiais[]>([])

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
        setName(value)
        setFiliais(filiaisConst.filter((f) => f.id.includes(value)))
    };

    const pressKey = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === "Enter" && filiaisConst.filter((f) => f.id.includes(name)).length === 1) {
            setFilial([...filial, filiaisConst.filter((f) => f.id.includes(name))[0]])
            setName("")
            setFiliaisConst(filiaisConst.filter((f) => !f.id.includes(name)))
            setFiliais(filiaisConst.filter((f) => !f.id.includes(name)))
        }
    }

    const focusHandler = () => {
        if (filiais.length > 0) {
            setIsFocus(true)
        }
    }

    const blurHandler = () => {
        setIsFocus(false)
    }

    const removeFilial = (e: String) => {
        let modelo = {
            id: e
        }
        setFiliaisConst([...filiaisConst, modelo])
        setFilial(filial.filter((f) => !f.id.includes(e.toString())))
        setFiliais([...filiaisConst, modelo])
    }

    useEffect(() => {
        const options = { method: 'GET', headers: { 'User-Agent': 'Insomnia/2023.5.7' } };

        fetch('http://localhost:3000/eventos/filial/listar', options)
            .then(response => response.json())
            .then(filiais => {
                setFiliais(filiais.Filiais)
                setFiliaisConst(filiais.Filiais)
            })
    }, [])

    const [isOpen1, setIsOpen1] = useState(false)
    const [isOpen2, setIsOpen2] = useState(false)

    const open = (e: number) => {
        if (e === 0) {
            setIsOpen1(true)
            setIsOpen2(false)
        } else if (e === 1) {
            setIsOpen1(false)
            setIsOpen2(true)
        }
        console.log(e);
        
    }

    return (
        <>
            <Rota route={"evento"} />
            <div className="formulario">
                <Divisao titulo="Título" />
                <div className="campos">
                    <div className="campo">
                        <div className="titulo">
                            <span>Nome</span>
                            <span className="obrigatorio">*</span>
                        </div>
                        <input type="text" placeholder="Nome" />
                    </div>

                    <div className="campo">
                        <div className="titulo">
                            <span>Descrição</span>
                        </div>
                        <input type="text" placeholder="Descrição" />
                    </div>

                    <div className="campo">
                        <div className="titulo">
                            <span>Data</span>
                            <span className="obrigatorio">*</span>
                        </div>
                        <input type="text" placeholder="Data" style={{ width: "200px" }} />
                    </div>

                    <div className="campo">
                        <div className="titulo">
                            <span>Início</span>
                            <span className="obrigatorio">*</span>
                        </div>
                        <input type="text" placeholder="Horas" style={{ width: "100px" }} />
                    </div>

                    <div className="campo">
                        <div className="titulo">
                            <span>Duração</span>
                            <span className="obrigatorio">*</span>
                        </div>
                        <input type="text" placeholder="Horas" style={{ width: "100px" }} />
                    </div>
                </div>
                <Divisao titulo="Local" />
                <div className="campos">
                    <div className="campo">
                        <div className="titulo">
                            <span>CEP</span>
                            <span className="obrigatorio">*</span>
                        </div>
                        <input type="text" placeholder="CEP" style={{ width: "75px" }} />
                    </div>

                    <div className="campo">
                        <div className="titulo">
                            <span>Endereço</span>
                            <span className="obrigatorio">*</span>
                        </div>
                        <input type="text" placeholder="Endereço" style={{ width: "250px" }} />
                    </div>

                    <div className="campo">
                        <div className="titulo">
                            <span>Número</span>
                            <span className="obrigatorio">*</span>
                        </div>
                        <input type="text" placeholder="Número" style={{ width: "80px" }} />
                    </div>

                    <div className="campo">
                        <div className="titulo">
                            <span>Bairro</span>
                            <span className="obrigatorio">*</span>
                        </div>
                        <input type="text" placeholder="Bairro" style={{ width: "200px" }} />
                    </div>

                    <div className="campo">
                        <div className="titulo">
                            <span>Cidade</span>
                            <span className="obrigatorio">*</span>
                        </div>
                        <input type="text" placeholder="Cidade" style={{ width: "250px" }} />
                    </div>

                    <div className="campo">
                        <div className="titulo">
                            <span>Complemento</span>
                        </div>
                        <input type="text" placeholder="Complemento" style={{ width: "300px" }} />
                    </div>
                </div>
                <Divisao titulo="Filiais" />
                <div className="campos">
                    <div className="campo">
                        {isFocus && (
                            <div className="model-filial">
                                {
                                    filiais.map((f, indice) => {
                                        return (
                                            <span key={indice}>{f.id}</span>
                                        )
                                    })
                                }
                            </div>
                        )}
                        <div className="titulo">
                            <span>Código</span>
                            <span className="obrigatorio">*</span>
                        </div>
                        <input type="text"
                            onFocus={focusHandler}
                            onBlur={blurHandler}
                            value={name}
                            onChange={changeHandler}
                            onKeyDown={pressKey}
                            maxLength={6}
                            placeholder="Código" style={{ width: "75px" }} />
                    </div>

                    <div className="campo">
                        <div className="titulo">
                            <span>Filiais</span>
                        </div>
                        <div className="filiais">
                            {
                                filial.map((f, indice) => {
                                    return (
                                        <div key={indice} className="filial">
                                            <span>{f.id}</span>
                                            <button onClick={() => removeFilial(f.id)}><img src={close} alt="fechar" /></button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                </div>
                <Divisao titulo="Participantes" />
                <div className="campos">

                    <div className="select">
                        <div className="center">
                            <span>Acompanhante</span>
                            <button></button>
                        </div>
                    </div>

                    <div className="select">
                        <div className="center">
                            <span>Dependente</span>
                            <button></button>
                        </div>
                    </div>

                    <div className="campo">
                        <div className="titulo">
                            <span>Idade Dependente</span>
                        </div>
                        <input type="text" placeholder="Idade" style={{ width: "120px" }} />
                    </div>

                </div>
                <Divisao titulo="Formulário" />
                <div className="campos">
                    <div className="campo">
                        <div className="titulo">
                            <span>Data</span>
                            <span className="obrigatorio">*</span>
                        </div>
                        <Calendario />
                    </div>

                    <div className="campo">
                        <div className="titulo">
                            <span>Horário Início</span>
                            <span className="obrigatorio">*</span>
                        </div>
                        {<Hora onclick={() => open(0)} aberto={isOpen1} />}
                    </div>

                    <div className="campo">
                        <div className="titulo">
                            <span>Horário Fim</span>
                            <span className="obrigatorio">*</span>
                        </div>
                        {<Hora onclick={() => open(1)} aberto={isOpen2} />}
                    </div>

                </div>
            </div>
        </>
    )
}