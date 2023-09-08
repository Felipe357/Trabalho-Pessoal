const express = require('express')

const router = express.Router()

const Filial = require("../controller/filial.js")

router.get('/listar', Filial.listar)
router.post('/criar', Filial.criar)
router.post('/buscar', Filial.buscar)

module.exports = router