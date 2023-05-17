const express = require('express');

const router = express.Router();

const venda = require("../controller/venda");


router.post('/criar', venda.criar);
router.put('/atualizar/:id', venda.atualizar);
router.get('/listar', venda.listar);
router.get('/listar/:id', venda.listarV);


module.exports = router;