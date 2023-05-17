const jwt = require('jsonwebtoken');
require('dotenv').config();

const validaAcesso = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(req.body)

    jwt.verify(token, process.env.KEY, (err, data) => {
        if (err != null) res.status(404).json(err).end()
        else {
            if (data.tipo === true) {
                next();
            } else {
                res.status(401).end();
            }
        }
    })
    res.status(200).end();
}

// const verificar = (req, res) => {
//     const token = req.headers.authorization
//     console.log(req.body);

//     jwt.verify(token, process.env.KEY, (err, data) => {
//         if (err != null) res.status(401).json({...err, "validar": false}).end()
//         else{
//             console.log(data["id"]);
//             console.log(req.body.teste);
//             if(data["id"] == req.body.id){
//                 res.status(200).json({"validar": true, "tipo": data["tipo"]}).end()
//             }
//             else{
//                 res.status(401).json({"validar": false}).end()
//             }
//         }

//     })
// }

module.exports = {
    validaAcesso,
    // verificar
}