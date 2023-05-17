const express = require('express');

const router = express.Router();

const produto = require("../controller/produto");


router.post('/criar', produto.criar);
router.put('/atualizar/:id', produto.atualizar);
router.get('/listar', produto.listar);
router.post('/listarP', produto.listarP);


module.exports = router;