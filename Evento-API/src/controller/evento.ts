import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';
const prisma = new PrismaClient();

import moment from "moment";

const criar = async (req: Request, res: Response) => {

    req.body['data'] = new Date(req.body['data']).toISOString()
    req.body['form_inicio'] = new Date(req.body['form_inicio']).toISOString()
    req.body['form_fim'] = new Date(req.body['form_fim']).toISOString()

    let filiais = req.body.filiais

    delete req.body.filiais

    const evento = await prisma.evento.create({
        data: req.body
    });

    filiais.forEach(async (f: string) => {
        const filiais = await prisma.filialEventos.create({
            data: {
                "id_evento": evento.id,
                "id_filial": f
            }
        })
    });

    res.status(200).json({
        "status": 200,
        "message": "Evento criado com sucesso",
        "evento": evento
    }).end();

};

const listar = async (req: Request, res: Response) => {

    if (typeof req.body.filial === "string") {
        let evento = await prisma.evento.findMany({
            include: {
                Dep_Evento: true,
                col: true,
                filiais: {
                    select: {
                        id_filial: true
                    }
                }
            }
        })

        if (evento.length > 0) {
            var dataAtual = moment(new Date()).format("YYYYMMDD")

            evento = evento.filter(e => moment(new Date(e.data)).format("YYYYMMDD") > dataAtual && moment(new Date(e.form_inicio)).format("YYYYMMDD") <= dataAtual)

            if (req.body.filial !== "") {
                evento = evento.filter(e => e.filiais.find((ef) => ef.id_filial == req.body.filial))
            }

            evento.forEach((e: any) => e.data = moment(new Date(e.data)).format("DD/MM/YYYY"))

            if (evento.length > 0) {
                return res.status(200).json({
                    "status": 200,
                    "message": "Eventos listados com sucesso!",
                    "eventos": evento
                }).end();
            } else {
                return res.status(200).json({
                    "status": 200,
                    "message": "Nenhum evento encontrado!"
                }).end();
            }

        } else {
            return res.status(200).json({
                "status": 200,
                "message": "Nenhum evento encontrado!"
            }).end();
        }

    } else {
        return res.status(200).json({
            "status": 200,
            "message": "Compo informado incorretamente!"
        }).end();
    }

}

const buscar = async (req: Request, res: Response) => {
    if (typeof req.body.id == "number") {
        let evento = await prisma.evento.findMany({
            where: { id: req.body.id },
            include: {
                col: {
                    include: {
                        colaborador: true
                    }
                },
                Dep_Evento: {
                    include: {
                        dependente: true
                    }
                }
            }
        })

        if (evento.length > 0) {
            res.status(200).json({
                "status": 200,
                "message": "Evento encontrado!",
                "eventos": evento
            }).end();
        } else {
            res.status(200).json({
                "status": 200,
                "message": "Evento não encontrado!",
            }).end();
        }
    } else {
        res.status(200).json({
            "status": 200,
            "message": "Campo id informado incorretamente!",
        }).end();
    }
}

export default {
    criar,
    listar,
    buscar
}