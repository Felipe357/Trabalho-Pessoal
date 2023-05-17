const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const criar = async (req, res) => {

    let id_usuario = 1
    let cliente
    if (req.body.cliente === undefined) {
        cliente = ""
    } else {
        cliente = req.body.cliente
    }
    let pagamento
    if (req.body.pagamento === undefined) {
        pagamento = ""
    } else {
        pagamento = req.body.pagamento
    }
    let marcou
    if (req.body.marcou === undefined) {
        marcou = false
    } else {
        marcou = req.body.marcou
    }
    let entrega
    if (req.body.entrega === undefined) {
        entrega = false
    } else {
        entrega = req.body.entrega
    }

    let vendaArray = {
        "id_usuario": id_usuario,
        "cliente": cliente,
        "total": req.body.total,
        "pagamento": pagamento,
        "marcou": marcou,
        "entrega": entrega
    }

    const venda = await prisma.Vendas.create({
        data: vendaArray
    })

    let itens = []

    for (const item of req.body.itens) {
        let vendaItem = {
            "id_produto": item,
            "id_venda": venda.id
        }
        const vendaI = await prisma.Itens.create({
            data: vendaItem,
            select: {
                produtos: true
            }
        })

        itens.push(vendaI)
        
    }

    venda.itens = itens

    res.status(200).json(venda).end();

}

const listar = async (req, res) => {
    const vendas = await prisma.Vendas.findMany({
        select: {
            data: true,
            cliente: true,
            total: true,
            pagamento: true,
            marcou: true,
            entrega: true,
            itens: true
        }
    })
    res.status(200).json(vendas).end()
}

const listarV = async (req, res) => {
    const venda = await prisma.Vendas.findUnique({
        "where": {
            "id": Number(req.params.id)
        },
        select: {
            data: true,
            cliente: true,
            total: true,
            pagamento: true,
            marcou: true,
            entrega: true,
            itens: true
        }
    })

    res.status(200).json(venda).end()
}

const atualizar = async (req, res) => {
    var info = req.body

    const venda = await prisma.Vendas.update({
        where: {
            id: Number(req.params.id)
        },
        data: info
    })

    res.status(200).json(venda).end()
}


module.exports = {
    criar,
    atualizar,
    listar,
    listarV
}