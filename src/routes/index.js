const express = require('express');
var router = express.Router();

router.get('/routes', (req, res) => {
    res.send({
        1: 'GET /api/routes',
        2: 'GET /api/clients',
        3: 'GET /api/clients/:id',
        4: 'POST /api/clients'
    });
});

module.exports = router;