const express = require('express')

const router = express.Router()

const Convite = require("../controller/convite.js")

router.post('/aceitar', Convite.aceitar)
router.post('/confirmar', Convite.confirmar)
router.post('/convidados', Convite.convidados)
router.post('/convidado', Convite.convidado)

module.exports = router