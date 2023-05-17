const express = require('express');

const router = express.Router();

const cliente = require("../controller/cliente");


router.post('/criar', cliente.criar);
router.put('/atualizar/:id', cliente.atualizar);
router.get('/listar', cliente.listar);
router.post('/listarC', cliente.listarP);
router.post('/criarEnd', cliente.criarEnd)


module.exports = router;