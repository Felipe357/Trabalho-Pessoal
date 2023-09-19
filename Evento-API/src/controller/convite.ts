import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
require('dotenv').config()

import moment from 'moment';

const prisma = new PrismaClient()

interface dep {
    id_dependente: number;
    id_evento: number;
    presenca: boolean;
    bebe: boolean;
}

interface dependente {
    confirmar?: any;
    id_dependente?: number,
    presenca?: boolean,
    bebe?: boolean
}

const aceitar = async (req: Request, res: Response) => {

    if (typeof req.body.cracha_col === "string" && typeof req.body.id_evento === "number" && typeof req.body.presenca === "boolean" && typeof req.body.trans === "boolean" && typeof req.body.bebe === "boolean") {
        let col = {
            "cracha_col": req.body.cracha_col,
            "id_evento": req.body.id_evento,
            "presenca": req.body.presenca,
            "bebe": req.body.bebe,
            "transporte": req.body.trans
        }

        const buscarEvento = await prisma.evento.findUnique({
            where: {
                id: req.body.id_evento
            }
        })
        if (buscarEvento !== null) {
            const buscarCol = await prisma.colaborador.findUnique({
                where: {
                    cracha: req.body.cracha_col
                }
            })
            if (buscarCol !== null) {
                const buscarColEvento = await prisma.col_Evento.findFirst({
                    where: {
                        id_evento: req.body.id_evento,
                        cracha_col: req.body.cracha
                    }
                })
                if (buscarColEvento == null) {
                    if (req.body.acompanhante !== undefined) {
                        if (typeof req.body.acompanhante.cad === "boolean") {

                            var deps: dep[] = []

                            if (req.body.dependentes != undefined) {
                                var erro = false
                                req.body.dependentes.forEach((d: dependente) => {
                                    if (typeof d.id_dependente == "number" && typeof d.presenca == "boolean" && typeof d.bebe == "boolean") {
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
                                    } else {
                                        erro = true
                                    }
                                })

                                if (erro) {
                                    return res.status(200).json({
                                        "status": 200,
                                        "message": "Há valores do dependente informado incorretamente!"
                                    }).end()
                                }
                            }

                            if (req.body.acompanhante.cad == true) {
                                if (typeof req.body.acompanhante.nome != "string" && typeof req.body.acompanhante.presenca != "boolean" && typeof req.body.acompanhante.bebe != "boolean") {
                                    return res.status(200).json({
                                        "status": 200,
                                        "message": "O valores do acompanhante informado incorretamente!"
                                    }).end()
                                } else {
                                    await prisma.acompanhante.create({
                                        data: {
                                            "cracha_col": req.body.cracha_col,
                                            "nome": req.body.acompanhante.nome,
                                            "id_evento": req.body.id_evento,
                                            "presenca": req.body.acompanhante.presenca,
                                            "bebe": req.body.acompanhante.bebe
                                        }
                                    })
                                }
                            }

                            await prisma.col_Evento.createMany({
                                data: col
                            })

                            await prisma.dep_Evento.createMany({
                                data: deps
                            })

                            return res.status(200).json({
                                "status": 200,
                                "message": "Convite respondido com sucesso!"
                            }).end()

                        } else {
                            return res.status(200).json({
                                "status": 200,
                                "message": "Há valores do acompanhante informado incorretamente!"
                            }).end()
                        }
                    } else {
                        return res.status(200).json({
                            "status": 200,
                            "message": "O campo acompanhante não foi informado!"
                        }).end()
                    }

                } else {
                    return res.status(200).json({
                        "status": 200,
                        "message": "Colaborador já cadastrado no evento!"
                    }).end()
                }
            } else {
                return res.status(200).json({
                    "status": 200,
                    "message": "Nenhum colaborador encontrado!"
                }).end()
            }
        } else {
            return res.status(200).json({
                "status": 200,
                "message": "Evento não encontrado!"
            }).end()
        }
    } else {
        return res.status(200).json({
            "status": 200,
            "message": "Informe corretamente os campos!"
        }).end()
    }
}

const convidados = async (req: Request, res: Response) => {

    if (typeof req.body.id_evento === "number") {
        const convidadosEvento = await prisma.evento.findMany({
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

        if (convidadosEvento.length > 0) {
            convidadosEvento[0].col.forEach((e: any) => e.colaborador.nasc = moment(e.colaborador.nasc).format("DD/MM/YYYY"))

            res.status(200).json({
                "status": 200,
                "message": "Convidados listados com sucesso!",
                "Convidados": convidadosEvento[0].col
            }).end()
        } else {
            res.status(200).json({
                "status": 200,
                "message": "Nenhum convidado registrado no evento!"
            }).end()
        }
    } else {
        res.status(200).json({
            "status": 200,
            "message": "Campo informado incorretamente!"
        }).end()
    }

}

const convidado = async (req: Request, res: Response) => {

    if (typeof req.body.id_evento === "number" && typeof req.body.cracha === "string") {
        const convidado = await prisma.col_Evento.findMany({
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

        if (convidado.length > 0) {
            const dependente = await prisma.dep_Evento.findMany({
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

            const acompanhanteEvento = await prisma.acompanhante.findMany({
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

            return res.status(200).json({
                "status": 200,
                "message": "Convidado do evento listado com sucesso!",
                "Convidado": jsonFinal
            }).end()
        } else {
            return res.status(200).json({
                "status": 200,
                "message": "Colaborador não registrado no evento"
            }).end()
        }


    } else {
        return res.status(200).json({
            "status": 200,
            "message": "Campos informados incorretamente!"
        }).end()
    }

}

const confirmar = async (req: Request, res: Response) => {

    if (typeof req.body.cracha_col === "string" && typeof req.body.confirmar === "boolean" && typeof req.body.id_evento === "number") {

        const convite = await prisma.col_Evento.findMany({
            where: {
                id_evento: req.body.id_evento,
                cracha_col: req.body.cracha_col
            }
        })

        if (convite.length > 0) {

            await prisma.col_Evento.update({
                where: {
                    id: convite[0].id
                },
                data: {
                    confirmar: req.body.confirmar
                }
            })

            if (req.body.dependentes !== undefined && req.body.dependentes > 0) {
                req.body.dependentes.forEach(async (d: dependente) => {
                    if (typeof d.id_dependente === "number" && typeof d.confirmar === "boolean") {
                        const confirmarDependente = await prisma.dep_Evento.findMany({
                            where: {
                                id_evento: req.body.id_evento,
                                id_dependente: d.id_dependente
                            }
                        })
        
                        if (confirmarDependente.length > 0) {
                            await prisma.dep_Evento.update({
                                where: {
                                    id: confirmarDependente[0].id
                                },
                                data: {
                                    "confirmar": d.confirmar
                                }
                            })
                        } else {
                            return res.status(200).json({
                                "status": 200,
                                "message": "Dependente não encontrado!"
                            })
                        }
                    }
                })
            }

            // Finalizar validação de acompanhante

            const acompanhanteEvento = await prisma.acompanhante.findMany({
                where: {
                    id_evento: req.body.id_evento,
                    cracha_col: req.body.cracha
                }
            })
            if (acompanhanteEvento.length > 0) {
                await prisma.acompanhante.update({
                    where: {
                        id: acompanhanteEvento[0].id
                    },
                    data: {
                        "confirmar": req.body.acompanhante.confirmar
                    }
                })
            }

        } else {
            return res.status(200).json({
                "status": 200,
                "message": "Colaborador não registrado no evento!"
            })
        }

    } else {
        return res.status(200).json({
            "status": 200,
            "message": "Campos informado incorretamente!"
        })
    }

}

export default {
    aceitar,
    confirmar,
    convidados,
    convidado
}