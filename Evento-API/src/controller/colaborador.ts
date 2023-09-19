import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import moment from 'moment';

const prisma = new PrismaClient()

interface Colaborador {
    cracha: string;
    nome: string;
    aut: boolean;
    nasc: string | number | Date;
    id_filial: string;
    dependentes?: Dependente | undefined
}

interface Dependente {
    id: Number;
    nome: String;
    nasc: string | number | Date;
    ativo: Boolean;
    cf: Boolean;
    cracha_col: String;
}

const criar = async (req: Request, res: Response) => {

    req.body.forEach((f: Colaborador) => {
        f.nasc = new Date(f.nasc).toISOString()
    })

    const colaboradorReg = await prisma.colaborador.findMany({
        where: {
            OR: req.body
        }
    })

    let colaboradorDuplicado: Colaborador[] = []

    colaboradorReg.forEach((e) => {
        req.body.forEach((f: Colaborador, indiceF: Number) => {
            if (e.cracha == f.cracha) {
                colaboradorDuplicado.push(f)
                req.body.splice(indiceF, 1)
            }
        })
    })

    await prisma.colaborador.createMany({
        data: req.body
    });

    const colaboradorCad = await prisma.colaborador.findMany({
        where: {
            OR: req.body
        }

    })

    colaboradorCad.forEach((c: Colaborador) => {
        c.nasc = moment(c.nasc).format("DD/MM/YYYY")
    })

    res.status(200).json({
        "status": 200,
        "message": "Colaboradores cadastrados!",
        "Cadastrado": colaboradorCad,
        "Duplicado": colaboradorDuplicado
    }).end();

};

export const listar = async (req: Request, res: Response) => {
    let colaborador = await prisma.colaborador.findMany({})

    colaborador.forEach((c: { nasc: moment.MomentInput; }) => {
        c.nasc = moment(c.nasc).format("DD/MM/YYYY")
    })
    res.status(200).json({
        "status": 200,
        "message": "Colaboradores listados com sucesso!",
        "colaboradores": colaborador
    }).end();

}

const buscar = async (req: Request, res: Response) => {

    if (typeof req.body.cracha == "string") {
        let colaborador = await prisma.colaborador.findMany({
            where: { cracha: req.body.cracha },
            include: {
                dependentes: true
            }
        })
    
        if (colaborador.length > 0) {
            colaborador.forEach((c: { nasc: moment.MomentInput, dependentes: Dependente[] }) => {
                c.nasc = moment(c.nasc).format("DD/MM/YYYY")
                c.dependentes.forEach((d: Dependente) => {
                    d.nasc = moment(d.nasc).format("DD/MM/YYYY")
                })
            })
            res.status(200).json({
                "status": 200,
                "message": "Colaboradores listados com sucesso!",
                "colaborador": colaborador[0]
            }).end();
        } else {
            res.status(200).json({
                "status": 200,
                "message": "Nenhum colaborador encontrado!"
            }).end();
        }
    
    } else {
        res.status(200).json({
            "status": 200,
            "message": "Informe o compo cracha corretamente!"
        }).end();
    }
    

    
}


export default {
    criar,
    listar,
    buscar
}