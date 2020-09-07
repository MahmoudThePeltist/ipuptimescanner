const express = require('express');
var router = express.Router();

var knex = require('../services/knexConnection');

router.get('/', (req, res) => {
    knex('clients')
        .then(rows => {
            console.log(rows);
            res.status(200).json(rows);
        });
});

router.get('/:id', (req, res) => {
    console.log(req.params);
    knex('clients').where('id', req.params.id)
        .then(rows => {
            console.log(rows);
            res.status(200).json(rows);
        })
});

router.post('/', (req, res) => {
    console.log(req.body);

    client_to_insert = {
        name: req.body.name,
        address: req.body.address,
        status: req.body.status,
        type: req.body.type,
        attributes: JSON.stringify(req.body.attributes),
        description: req.body.description,
    };
    
    console.log(req.body, client_to_insert);

    knex('clients').insert(client_to_insert)
        .then(data => {
            res.status(200).json(data);
        });
});

module.exports = router;