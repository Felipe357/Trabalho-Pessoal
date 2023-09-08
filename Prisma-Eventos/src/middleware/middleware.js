const jwt = require('jsonwebtoken');
require('dotenv').config();

const validar = (req, res) => {
    const token = req.headers.authorization

    jwt.verify(token, process.env.KEY, (err, data) => {
        if (err != null) res.status(401).json({ ...err, "validar": false }).end()
        else {
            if (data["cracha"] == req.body.cracha) {
                res.status(200).json({ "validar": true}).end()
            }
            else {
                res.status(401).json({ "validar": false }).end()
            }
        }

    })
}

module.exports = {
    validar
}