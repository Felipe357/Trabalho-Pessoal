const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const criar = async (req, res) => {

    req.body.forEach(d => {
        d.nasc = new Date(d.nasc).toISOString()
    })

    const dependenteRe = await prisma.Dependente.findMany({
        where: {
            OR: req.body
        }
    })

    let dependenteDuplicado = []

    dependenteRe.forEach((e) => {
        req.body.forEach((f, indiceF) => {
            if (e.id == f.id) {
                dependenteDuplicado.push(f)
                req.body.splice(indiceF, 1)
            }
            if (e.cf == 0 && f.cf == 0) {
                alterCF(e.id)
            }
        })
    })

    await prisma.Dependente.createMany({
        data: req.body
    });

    const dependenteCad = await prisma.Dependente.findMany({
        where: {
            OR: req.body
        }

    })

    res.status(200).json([{ "Cadastrado": dependenteCad }, { "Duplicado": dependenteDuplicado }]).end();

};

const alterCF = async (id) => {
    let dependente = await prisma.Dependente.upadate({
        where: {
            id: id
        },
        data: {
            ativo: false
        }
    })
    res.status(200).json(dependente).end();
}


const listar = async (req, res) => {
    let filial = await prisma.Dependente.findMany({})
    res.status(200).json(filial).end();
}

module.exports = {
    criar,
    listar
}