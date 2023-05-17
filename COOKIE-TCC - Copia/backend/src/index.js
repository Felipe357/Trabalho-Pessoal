const express = require('express');
const cors = require('cors');

const routerU = require('./routes/usuario');
const routerP = require('./routes/produto');
const routerV = require('./routes/venda');
const routerC = require('./routes/cliente')

const app = express();


app.use(cors());
app.use(express.json());
app.use('/cookies/usuario' , routerU);
app.use('/cookies/produto' , routerP);
app.use('/cookies/venda' , routerV);
app.use('/cookies/cliente', routerC)



app.listen(3000, () => { console.log("ok"); })