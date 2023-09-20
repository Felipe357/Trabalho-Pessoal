import express from 'express';

const router = express.Router()

import convite from '../controller/convite'

router.post('/aceitar', convite.aceitar)
router.post('/convidados', convite.convidados)
router.post('/convidado', convite.convidado)
router.put('/confirmar', convite.confirmar)

export default router