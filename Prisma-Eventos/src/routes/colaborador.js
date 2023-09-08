const express = require('express')

const router = express.Router()

const Colaborador = require("../controller/colaborador.js")
const Middle = require("../middleware/middleware.js")

router.get('/listar', Colaborador.listar)
router.post('/criar', Colaborador.criar)
router.post('/buscar', Colaborador.buscar)
router.post('/token', Colaborador.token)
router.post('/validar', Middle.validar)
router.post('/decodifica', Colaborador.decodifica)

module.exports = router