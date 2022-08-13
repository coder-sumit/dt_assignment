const express = require('express');
const router = express.Router();

router.use('/api', require('./apis'));

module.exports = router;