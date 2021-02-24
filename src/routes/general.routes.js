const express = require('express');
const { JWTAuth } = require("../services/jwt.validator");
var router = express.Router();

var generalController = require('../controllers/general.controller');

router.get('/routes', generalController.getRoutes);

module.exports = router;