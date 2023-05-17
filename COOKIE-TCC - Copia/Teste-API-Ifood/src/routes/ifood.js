const express = require('express');

const router = express.Router();

const ifood = require("../controller/ifood");

router.post('/linkIfood', ifood.link);

module.exports = router;