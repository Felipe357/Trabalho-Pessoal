const express = require('express')

const router = express.Router()

const Evento = require("../controller/evento.js")

router.post('/listar', Evento.listar)
router.post('/criar', Evento.criar)
router.post('/buscar', Evento.buscar)

module.exports = router