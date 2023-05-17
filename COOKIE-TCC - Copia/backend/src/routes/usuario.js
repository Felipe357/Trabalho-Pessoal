const express = require('express')

const router = express.Router()

const Usuario = require("../controller/usuario")
const middle = require("../middleware/middleware")

router.post('/login', Usuario.login)
router.post('/cadastrar', Usuario.criar)
router.get('/listar', Usuario.listar)
// router.post('/validar', middle.verificar)

router.post('/cadastrarEnd', Usuario.criarEnd)

module.exports = router