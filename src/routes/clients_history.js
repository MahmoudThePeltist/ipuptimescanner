const express = require('express');
var router = express.Router();

var knex = require('../services/knexConnection');

router.get('/', (req, res) => {

    knex('clients_hist')
        .then(rows => { res.status(200).json(rows); });

});

router.get('/:id', (req, res) => {

    knex('clients_hist').where('id', req.params.id)
        .then(rows => { res.status(200).json(rows); })
        
});

module.exports = router;