const express = require('express');
var router = express.Router();

router.get('/routes', (req, res) => {
    res.send([
        'GET /api/routes',
        'GET /api/clients',
        'GET /api/clients/:id',
        'POST /api/clients',
        'GET /api/clients/history/:id',
        'POST /api/clients/history'
    ]);
});

module.exports = router;