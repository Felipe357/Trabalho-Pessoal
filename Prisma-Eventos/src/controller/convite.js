const { PrismaClient } = require('@prisma/client')

require('dotenv').config()

const prisma = new PrismaClient()

const aceitar = async (req, res) => {

    let col = {
        "cracha_col": req.body.cracha_col,
        "id_evento": req.body.id_evento,
        "presenca": req.body.presenca,
        "bebe": req.body.bebe,
        "transporte": req.body.trans
    }

    const convite = await prisma.Col_Evento.createMany({
        data: col
    })

    var deps = []

    req.body.dependentes.forEach(d => {
        if (req.body.presenca == false) {
            d.presenca = false
        }
        let dep = {
            "id_dependente": d.id_dependente,
            "id_evento": req.body.id_evento,
            "presenca": d.presenca,
            "bebe": d.bebe
        }

        deps.push(dep)
    })

    const conviteD = await prisma.Dep_Evento.createMany({
        data: deps
    })

    var acompanhante

    if (req.body.acompanhante.cad == true) {
        acompanhante = await prisma.Acompanhante.create({
            data: {
                "cracha_col": req.body.cracha_col,
                "nome": req.body.acompanhante.nome,
                "id_evento": req.body.id_evento,
                "presenca": req.body.acompanhante.presenca,
                "bebe": req.body.acompanhante.bebe
            }
        })
    }

    res.status(200).json([convite, conviteD, acompanhante]).end()

}

const confirmar = async (req, res) => {

    const convite = await prisma.Col_Evento.findMany({
        where: {
            id_evento: req.body.id_evento,
            cracha_col: req.body.cracha_col
        }
    })

    const confirmarConvite = await prisma.Col_Evento.update({
        where: {
            id: convite[0].id
        },
        data: {
            confirmar: req.body.confirmar
        }
    })

    req.body.dependentes.forEach(async (d) => {
        const confirmarDependente = await prisma.Dep_Evento.findMany({
            where: {
                id_evento: req.body.id_evento,
                id_dependente: d.id_dependente
            }
        })

        const conviteD = await prisma.Dep_Evento.update({
            where: {
                id: confirmarDependente[0].id
            },
            data: {
                "confirmar": d.confirmar
            }
        })
    })

    const acompanhanteEvento = await prisma.Acompanhante.findMany({
        where: {
            id_evento: req.body.id_evento,
            cracha_col: req.body.cracha
        }
    })
    if (acompanhanteEvento.length > 0) {
        const conviteA = await prisma.Acompanhante.update({
            where: {
                id: acompanhanteEvento[0].id
            },
            data: {
                "confirmar": req.body.acompanhante.confirmar
            }
        })
    }




    res.status(200).json("Convidados comfirmados com sucesso").end()
}

const convidados = async (req, res) => {

    const convidadosEvento = await prisma.Evento.findMany({
        where: {
            id: req.body.id_evento
        },
        select: {
            col: {
                select: {
                    colaborador: true
                }
            }
        }
    })

    res.status(200).json(convidadosEvento[0].col)

}

const convidado = async (req, res) => {
    const convidado = await prisma.Col_Evento.findMany({
        where: {
            cracha_col: req.body.cracha,
            id_evento: req.body.id_evento
        },
        include: {
            colaborador: {
                select: {
                    nome: true
                }
            }
        }
    })

    const dependente = await prisma.Dep_Evento.findMany({
        where: {
            id_evento: req.body.id_evento,
            presenca: true
        },
        include: {
            dependente: {
                select: {
                    cracha_col: true,
                    cf: true
                }
            }
        }
    })

    const acompanhanteEvento = await prisma.Acompanhante.findMany({
        where: {
            id_evento: req.body.id_evento,
            cracha_col: req.body.cracha,
            presenca: true
        }
    })

    var acompanhante

    if (acompanhanteEvento.length == 0) {
        acompanhante = dependente.filter(d => d.dependente.cf == false)
    } else {
        acompanhante = acompanhanteEvento
    }


    let dependentes = dependente.filter(d => d.dependente.cf == true)

    let jsonFinal = {
        "colaborador": convidado[0].colaborador.nome,
        "cracha": convidado[0].cracha_col,
        "acompanhante": acompanhante,
        "dependentes": dependentes
    }

    res.status(200).json(jsonFinal)

}


module.exports = {
    aceitar,
    confirmar,
    convidados,
    convidado
}