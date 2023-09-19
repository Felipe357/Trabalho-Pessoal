import express from 'express';

const router = express.Router()

import evento from '../controller/evento'

router.post('/criar', evento.criar)
router.get('/listar', evento.listar)
router.get('/buscar', evento.buscar)

export default router