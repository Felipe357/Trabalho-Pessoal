const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const criar = async (req, res) => {
    const cliente = await prisma.Cliente.createMany({
        data: req.body
    })

    const clienteCriados = await prisma.Cliente.findMany({
        where: {
            OR: req.body
        }
    })
    res.status(200).json(clienteCriados).end();
}

const criarEnd = async (req, res) => {
    const cliente = await prisma.EnderecoCli.createMany({
        data: req.body
    })

    const clienteCriados = await prisma.EnderecoCli.findMany({
        where: {
            OR: req.body
        }
    })
    res.status(200).json(clienteCriados).end();
}

const listar = async (req, res) => {
    const cliente = await prisma.Cliente.findMany({
        select: {
            id:true,
            nome: true,
            celular: true,
            endereco: true
        }
    })
    res.status(200).json(cliente).end()
}

const listarP = async (req, res) => {
    const cliente = await prisma.Cliente.findMany({
        where: req.body,
        select: {
            id:true,
            nome: true,
            celular: true,
            endereco: true
        }
    })

    res.status(200).json(cliente).end()
}

const atualizar = async (req, res) => {
    var info = req.body

    const cliente = await prisma.Cliente.update({
        where: {
            id: Number(req.params.id)
        },
        data: info
    })

    res.status(200).json(cliente).end()
}


module.exports = {
    criar,
    atualizar,
    listar,
    listarP,
    criarEnd
}