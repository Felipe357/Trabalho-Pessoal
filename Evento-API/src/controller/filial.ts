import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

interface Filial {
    id: string,
    fazenda: string,
    regiao: string
}

const criar = async (req: Request, res: Response) => {

    await req.body.forEach(async (f: Filial) => {
        const buscarFilial = await prisma.filial.findUnique({
            where: {
                id: f.id
            }
        })

        if (buscarFilial == null) {
            await prisma.filial.create({
                data: f
            })
        }
        
    })
    
    res.status(200).json({
        "status": 200,
        "message": "Filiais criadas com sucesso!"
    }).end();

};

const listar = async (req: Request, res: Response) => {
    let filial = await prisma.filial.findMany({})
    res.status(200).json({
        "status": 200,
        "message": "Filiais listadas com sucesso!",
        "Filiais": filial
    }).end();
}

const buscar = async (req: Request, res: Response) => {

    if (typeof req.body.id == "string") {
        const filial = await prisma.filial.findMany({
            where: { id: req.body.id },
            select: {
                id: true,
                fazenda: true,
                regiao: true,
                colaborador: true
            }
        })

        if (filial.length > 0) {
            res.status(200).json({
                "status": 200,
                "message": "Filial encontrada com sucesso!",
                "Filiais": filial
            }).end();
        } else {
            res.status(200).json({
                "status": 200,
                "message": "Nenhuma filial encontrada!"
            }).end();
        }
    } else {
        res.status(200).json({
            "status": 200,
            "message": "Informe corretamente o campo id!"
        }).end();
    }

}

export default {
    criar,
    listar,
    buscar
}