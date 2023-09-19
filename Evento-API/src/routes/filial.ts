import express from 'express';

const router = express.Router()

import filial from '../controller/filial'

router.get('/listar', filial.listar)
router.post('/criar', filial.criar)
router.post('/buscar', filial.buscar)

export default router