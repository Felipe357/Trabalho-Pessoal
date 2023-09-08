const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
	
const moment = require("moment");

const criar = async (req, res) => {

    req.body['data'] = new Date(req.body['data']).toISOString()
    req.body['form_inicio'] = new Date(req.body['form_inicio']).toISOString()
    req.body['form_fim'] = new Date(req.body['form_fim']).toISOString()

    const evento = await prisma.Evento.create({
        data: req.body
    });

    res.status(200).json(evento).end();

};

const listar = async (req, res) => {
    let evento = await prisma.Evento.findMany({
        select: {
            id: true,
            nome: true,
            descricao: true,
            data: true,
            inicio: true,
            duracao: true,
            cep: true,
            endereco: true,
            numero: true,
            bairro: true,
            cidade: true,
            complemento: true,
            part: true,
            idade: true,
            form_inicio: true,
            form_fim: true,
            form_hora_inicio: true,
            form_hora_fim: true,
            col: true,
            Dep_Evento: true
        }
    })

    var dataAtual = moment(new Date()).format("YYYYMMDD")

    evento = evento.filter(e => moment(new Date(e.data)).format("YYYYMMDD") > dataAtual)

    res.status(200).json(evento).end();

}

const buscar = async (req, res) => {
    let evento = await prisma.Evento.findMany({
        where: { id: req.body.id },
        include: {
            col: {
                include : {
                    colaborador: true
                }
            },
            Dep_Evento: {
                include : {
                    dependente: true
                }
            }
        }
    })
    res.status(200).json(evento).end();
}

module.exports = {
    criar,
    listar,
    buscar
}