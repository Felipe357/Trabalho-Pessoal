import express from 'express';

const router = express.Router()

import evento from '../controller/evento'

router.post('/criar', evento.criar)
router.post('/listar', evento.listar)
router.post('/buscar', evento.buscar)

export default router