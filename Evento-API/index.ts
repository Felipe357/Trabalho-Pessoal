import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

//For env File 
dotenv.config()

const app: Application = express()
const port = 3000

import colaborador from "./src/routes/colaborador"
import filial from "./src/routes/filial"
import evento from "./src/routes/evento"
import dependente from "./src/routes/dependente"
import convite from "./src/routes/convite"

app.use(cors())
app.use(express.json())
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({"status": 200, "message": "API Funcionando"})
})
app.use('/eventos/colaborador', colaborador)
app.use('/eventos/filial' , filial);
app.use('/eventos/evento' , evento);
app.use('/eventos/dependente' , dependente);
app.use('/eventos/convite' , convite);

app.listen(port, () => {
    console.log(`Servidor rodando http://localhost:${port}`)
})