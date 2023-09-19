import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import moment from 'moment';

const prisma = new PrismaClient()

interface Dependente {
    id: Number;
    nome: String;
    nasc: string | number | Date;
    ativo?: Boolean;
    cf: Boolean;
    cracha_col: String;
}

const criar = async (req: Request, res: Response) => {

    req.body.forEach((f: Dependente) => {
        f.nasc = new Date(f.nasc).toISOString()
    })
    const dependente = await prisma.dependente.createMany({
        data: req.body
    });

    const dependentes = await prisma.dependente.findMany({
        where: {
            OR: req.body
        }

    })

    dependentes.forEach((c: Dependente) => {
        c.nasc = moment(c.nasc).format("DD/MM/YYYY")
    })

    res.status(200).json({
        "status": 200,
        "message": "Dependetes registrados com sucesso!",
        "Dependentes": dependentes
    }).end();

};

export const listar = async (req: Request, res: Response) => {
    let dependente = await prisma.dependente.findMany({})

    dependente.forEach((c: { nasc: moment.MomentInput; }) => {
        c.nasc = moment(c.nasc).format("DD/MM/YYYY")
    })
    res.status(200).json({
        "status": 200,
        "message": "Dependentes listados com sucesso!",
        "dependentes": dependente
    }).end();

}

export default {
    criar,
    listar
}