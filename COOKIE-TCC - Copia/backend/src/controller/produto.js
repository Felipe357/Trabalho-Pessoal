const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const criar = async (req, res) => {
    const produtos = await prisma.Produtos.createMany({
        data: req.body
    })

    const produtosCriados = await prisma.Produtos.findMany({
        where: {
            OR: req.body
        }
    })
    res.status(200).json(produtosCriados).end();
}

const listar = async (req, res) => {
    const produtoss = await prisma.Produtos.findMany({
        select: {
            id:true,
            nome: true,
            valor: true,
            dispo: true,
            qntd: true
        }
    })
    res.status(200).json(produtoss).end()
}

const listarP = async (req, res) => {
    const produtos = await prisma.Produtos.findMany({
        where: req.body,
        select: {
            nome: true,
            valor: true,
            dispo: true,
            qntd: true
        }
    })

    res.status(200).json(produtos).end()
}

const atualizar = async (req, res) => {
    var info = req.body

    const produtos = await prisma.Produtos.update({
        where: {
            id: Number(req.params.id)
        },
        data: info
    })

    res.status(200).json(produtos).end()
}


module.exports = {
    criar,
    atualizar,
    listar,
    listarP
}