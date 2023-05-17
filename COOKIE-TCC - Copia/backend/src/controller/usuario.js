const { PrismaClient } = require('@prisma/client');

const jwt = require('jsonwebtoken')
require('dotenv').config()

const prisma = new PrismaClient();

const criar = async (req, res) => {
    let usuario = await prisma.Usuario.createMany({
        data: req.body
    })
    res.status(200).json(usuario).end();
}

const login = async (req, res) => {
    let usuario = await prisma.Usuario.findMany({
        
        where: {
            celular: req.body.celular,
            senha: req.body.senha
        },
        select: {
            nome: true,
            tipo: true,
            id: true
        }
    })
    jwt.sign(usuario[0], process.env.KEY, { expiresIn: '10m' }, function (err, token) {
        if (err === null) {
            usuario[0]["token"] = token
            res.status(200).json(usuario[0]).end()
        } else {
            res.status(404).json(err).end()
        }
    });
}

const listar = async (req, res) => {
    let usuario = await prisma.Usuario.findMany({
        where : {
            tipo: false
        },
        select: {
            id: true,
            nome: true,
            celular: true,
            endereco: true
        }
    })
    res.status(200).json(usuario).end();
}

const criarEnd = async (req, res) => {
    let endereco = await prisma.Endereco.createMany({
        data: req.body
    })
    res.status(200).json(endereco).end();
}


module.exports = {
    login,
    criar,
    listar,
    criarEnd
}