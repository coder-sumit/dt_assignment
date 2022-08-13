const express = require('express');
const router = express.Router();

router.use('/v3', require('./v3'));

module.exports = router;