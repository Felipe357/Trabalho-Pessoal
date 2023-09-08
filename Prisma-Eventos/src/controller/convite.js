const { PrismaClient } = require('@prisma/client');

require('dotenv').config()

const prisma = new PrismaClient();

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
    });

    var deps = []

    req.body.dependentes.forEach(d => {
        let dep = {
            "id_dependente": d.id_dependente,
            "id_evento": req.body.id_evento,
            "presenca": d.presenca,
            "bebe": d.bebe
        }

        deps.push(dep)
    });

    const conviteD = await prisma.Dep_Evento.createMany({
        data: deps
    });

    res.status(200).json([convite, conviteD]).end();

};

const confirmar = async (req, res) => {

    const convite = await prisma.Col_Evento.findMany({
        where: {
            id_evento: req.body.id_evento,
            cracha_col: req.body.cracha_col
        }
    });

    const confirmarConvite = await prisma.Col_Evento.update({
        where: {
            id: convite[0].id
        },
        data: {
            confirmar: req.body.confirmar
        }
    });

    req.body.dependentes.forEach(async (d) => {
        const confirmarDependente = await prisma.Dep_Evento.findMany({
            where: {
                id_evento: req.body.id_evento,
                id_dependente: d.id_dependente
            }
        });

        const conviteD = await prisma.Dep_Evento.update({
            where: {
                id: confirmarDependente[0].id
            },
            data: {
                "confirmar": d.confirmar
            }
        });
    });



    res.status(200).json("Convidados comfirmados com sucesso").end();
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
            id_evento: req.body.id_evento
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

    // carregando o colaborador e seus dependentes

    let acompanhante = dependente.filter(d => d.dependente.cf == false)
    let dependentes = dependente.filter(d => d.dependente.cf == true)

    
    console.log(dependente);
    console.log(convidado);
}


module.exports = {
    aceitar,
    confirmar,
    convidados,
    convidado
}