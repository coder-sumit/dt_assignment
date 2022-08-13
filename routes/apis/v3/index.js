const express = require('express');
const router = express.Router();



router.use('/app/events', require('./events'));

module.exports = router;