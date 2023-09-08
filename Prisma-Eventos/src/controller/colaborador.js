const { PrismaClient } = require('@prisma/client');

const jwt = require('jsonwebtoken')
require('dotenv').config()

const prisma = new PrismaClient();

const criar = async (req, res) => {

    req.body.forEach(f => {
        console.log(f.nasc);
        f.nasc = new Date(f.nasc).toISOString()
    })

    const colaboradorReg = await prisma.Colaborador.findMany({
        where: {
            OR: req.body
        }
    })
    
    let colaboradorDuplicado = []

    colaboradorReg.forEach((e) => {
        req.body.forEach((f, indiceF) => {
            if (e.cracha == f.cracha) {
                colaboradorDuplicado.push(f)
                req.body.splice(indiceF, 1)
            }
        })
    })

    const colaborador = await prisma.Colaborador.createMany({
        data: req.body
    });

    const colaboradorCad = await prisma.Colaborador.findMany({
        where: {
            OR: req.body
        }
        
    })

    res.status(200).json([{"Cadastrado": colaboradorCad}, {"Duplicado": colaboradorDuplicado}]).end();

};

const listar = async (req, res) => {
    let colaborador = await prisma.Colaborador.findMany({})
    res.status(200).json(colaborador).end();

}

const token = async (req, res) => {
    let colaborador = await prisma.colaborador.findUnique({
        where: req.body
    })

    jwt.sign(colaborador, process.env.KEY, { expiresIn: '8h' }, function (err, token) {
        if (err === null) {
            colaborador["token"] = token;
            res.status(200).json(colaborador).end();
        } else {
            res.status(500).json({ error: 'Erro ao gerar o token' }).end();
        }
    })

}

const decodifica = async (req, res) => {
    let tk = req.body.token

    const partesTK = tk.split('.')

    if (partesTK.length === 3) {
        const [header64, dados64, assinatura64] = partesTK

        const header = JSON.parse(Buffer.from(header64, 'base64url').toString('utf-8'))
        const dados = JSON.parse(Buffer.from(dados64, 'base64url').toString('utf-8'))

        dados["appsAcess"] = ["0000001", "0000002"]

        const novosdados = Buffer.from(JSON.stringify(dados)).toString('base64url')

        const novoToken = header64+"."+novosdados+"."+assinatura64

        res.status(200).json({ novoToken: novoToken}).end();
    } else {
        res.status(200).json({ err: "Token invalido" }).end();
    }
}

const buscar = async (req, res) => {
    let colaborador = await prisma.Colaborador.findMany({
        where: { cracha: req.body.cracha },
        include: {
            dependentes: true
        }
    })
    res.status(200).json(colaborador).end();
}

module.exports = {
    criar,
    listar,
    token,
    decodifica,
    buscar
}