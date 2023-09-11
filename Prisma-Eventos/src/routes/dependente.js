const express = require('express')

const router = express.Router()

const Dependente = require("../controller/dependente.js")

router.post('/listar', Dependente.listar)
router.post('/criar', Dependente.criar)

module.exports = router