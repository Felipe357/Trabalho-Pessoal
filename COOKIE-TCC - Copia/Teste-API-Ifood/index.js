const express = require('express');
const cors = require('cors');

const ifood = require('./src/routes/ifood');

const app = express();

app.use(cors());
app.use(express.json());
app.use(ifood);

app.listen(3000, () => { console.log("Ifood") })