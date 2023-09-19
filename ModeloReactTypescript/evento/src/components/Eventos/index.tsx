import Evento from "../Evento";

import { useEffect, useState } from "react";
import Rota from "../Rota";
import "./style.css"

interface EventoFetch {
    id: Number,
    nome: String,
    data: String,
    cep: String,
    endereco: String,
    numero: String,
    bairro: String,
    cidade: String,
    complemento: String,
    col: Col[]
}

interface Col {
    cracha_col: String
}
interface Props {
    cra: String
}

const Eventos: React.FC<Props> = ({ cra }) => {

    const [eventos, setEventos] = useState<EventoFetch[]>([])

    useEffect(() => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'User-Agent': 'Insomnia/2023.5.7' },
            body: JSON.stringify({ "filial": "001001" })
        };

        fetch('http://10.0.2.207:3000/eventos/evento/listar', options)
            .then(response => response.json())
            .then(ev => {
                setEventos(ev.eventos)
            })

    }, [eventos])

    return (
        <>
            <Rota route={"eventos"} />
            <div className="Eventos">
                {
                    eventos.map((e, indice) => {

                        let tem = false

                        e.col.forEach(col => {
                            
                            if (col.cracha_col === cra) {
                                tem = true
                            }
                        });

                        let end = e.endereco + ", " + e.numero + ", " + e.bairro + ", " + e.cidade + ", " + e.cep

                        if (!tem) {
                            return (
                                <Evento key={indice} id={e.id} titulo={e.nome} data={e.data} end={end} disable={false} />
                            )
                        } else {
                            return (
                                <Evento key={indice} id={e.id} titulo={e.nome} data={e.data} end={end} disable={true} />
                            )
                        }

                    })
                }
            </div>
        </>
    )
}

export default Eventos;