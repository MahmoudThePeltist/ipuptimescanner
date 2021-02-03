const express = require('express');
var router = express.Router();

var generalController = require('../controllers/general.controller');

router.get('/routes', generalController.getRoutes);

module.exports = router;