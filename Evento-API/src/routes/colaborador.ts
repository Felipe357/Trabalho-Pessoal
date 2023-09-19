import express from 'express';

const router = express.Router()

import colaborador from '../controller/colaborador'

router.post('/criar', colaborador.criar)
router.get('/listar', colaborador.listar)
router.get('/buscar', colaborador.buscar)

export default router