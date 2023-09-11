const express = require('express');
const cors = require('cors');

const routerC = require('./routes/colaborador.js');
const routerF = require('./routes/filial.js');
const routerE = require('./routes/evento.js');
const routerD = require('./routes/dependente.js');
const routerA = require('./routes/convite.js');

const app = express();


app.use(cors());
app.use(express.json());
app.use('/eventos/colaborador' , routerC);
app.use('/eventos/filial' , routerF);
app.use('/eventos/evento' , routerE);
app.use('/eventos/dependente' , routerD);
app.use('/eventos/convite' , routerA);

app.listen(3000, () => { console.log("API Funcionando!"); })