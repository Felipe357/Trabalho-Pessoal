const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const criar = async (req, res) => {

    const filialRe = await prisma.Filial.findMany({
        where: {
            OR: req.body
        }
    })

    let filialDuplicado = []

    filialRe.forEach((e) => {
        req.body.forEach((f, indiceF) => {
            if (e.id == f.id) {
                filialDuplicado.push(f)
                req.body.splice(indiceF, 1)
            }
        })
    })

    await prisma.Filial.createMany({
        data: req.body
    });

    const filialCad = await prisma.Filial.findMany({
        where: {
            OR: req.body
        }

    })

    res.status(200).json([{ "Cadastrado": filialCad }, { "Duplicado": filialDuplicado }]).end();

};

const listar = async (req, res) => {
    let filial = await prisma.Filial.findMany({})
    res.status(200).json(filial).end();
}

const buscar = async (req, res) => {
    let filial = await prisma.Filial.findMany({
        where: { id: req.body.id },
        select: {
            id: true,
            fazenda: true,
            regiao: true,
            colaborador: true
        }
    })
    res.status(200).json(filial).end();
}

module.exports = {
    criar,
    listar,
    buscar
}