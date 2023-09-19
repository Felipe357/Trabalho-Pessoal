import express from 'express';

const router = express.Router()

import dependente from '../controller/dependete'

router.post('/criar', dependente.criar)
router.get('/listar', dependente.listar)

export default router