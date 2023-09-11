const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const criar = async (req, res) => {

    req.body.forEach(d => {
        d.nasc = new Date(d.nasc).toISOString()
    })

    await prisma.Dependente.createMany({
        data: req.body
    });

    const dependenteCad = await prisma.Dependente.findMany({
        where: {
            OR: req.body
        }

    })

    res.status(200).json({
        "status": 200,
        "message": "dependetes registrados com sucesso!",
        "Dependentes": dependenteCad
    }).end();

};


const listar = async (req, res) => {
    const dependente = await prisma.Dependente.findMany({
        where: {
            cracha_col: {
                contains: req.body.cracha_col
            }
        }
    })
    res.status(200).json({
        "status": 200,
        "message": "dependetes listados com sucesso!",
        "Dependentes": dependente
    }).end();
}

module.exports = {
    criar,
    listar
}