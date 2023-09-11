const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const moment = require("moment");

const criar = async (req, res) => {

    req.body['data'] = new Date(req.body['data']).toISOString()
    req.body['form_inicio'] = new Date(req.body['form_inicio']).toISOString()
    req.body['form_fim'] = new Date(req.body['form_fim']).toISOString()

    let filiais = req.body.filiais

    delete req.body.filiais

    const evento = await prisma.Evento.create({
        data: req.body
    });

    filiais.forEach(async f => {
        const filiais = await prisma.FilialEventos.create({
            data: {
                "id_evento": evento.id,
                "id_filial": f
            }
        })
    });

    res.status(200).json({
        "status": 200,
        "message": "Evento criado com sucesso",
        "evento": evento
    }).end();

};

const listar = async (req, res) => {
    let evento = await prisma.Evento.findMany({
        include: {
            Dep_Evento: true,
            col: true,
            filiais: {
                select: {
                    id_filial: true
                }
            }
        }
    })

    var dataAtual = moment(new Date()).format("YYYYMMDD")



    evento = evento.filter(e => moment(new Date(e.data)).format("YYYYMMDD") > dataAtual && moment(new Date(e.form_inicio)).format("YYYYMMDD") <= dataAtual)

    evento = evento.filter(e => e.filiais.find((ef) => ef.id_filial==req.body.filial))

    evento.forEach((e) => e.data = moment(new Date(e.data)).format("DD/MM/YYYY"))

    res.status(200).json({
        "status": 200,
        "message": "Eventos listados com sucesso!",
        "eventos": evento
    }).end();

}

const buscar = async (req, res) => {
    let evento = await prisma.Evento.findMany({
        where: { id: req.body.id },
        include: {
            col: {
                include: {
                    colaborador: true
                }
            },
            Dep_Evento: {
                include: {
                    dependente: true
                }
            }
        }
    })
    res.status(200).json({
        "status": 200,
        "message": "Evento encontrado!",
        "eventos": evento
    }).end();
}

module.exports = {
    criar,
    listar,
    buscar
}