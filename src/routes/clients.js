const express = require('express');
var router = express.Router();

var knex = require('../services/knexConnection');


router.get('/', (req, res) => {

    knex('clients')
        .then(rows => { res.status(200).json(rows); });

});

router.get('/:id', (req, res) => {

    knex('clients').where('id', req.params.id)
        .then(rows => { res.status(200).json(rows); })

});

router.post('/', (req, res) => {

    client_to_insert = {
        name: req.body.name,
        address: req.body.address,
        type: req.body.type,
        attributes: JSON.stringify(req.body.attributes),
        description: req.body.description,
    };

    knex('clients').insert(client_to_insert)
        .then(data => { res.status(200).json(data); });

});

router.put('/:id', (req, res) => {

    client_to_update = {
        name: req.body.name,
        address: req.body.address,
        type: req.body.type,
        attributes: JSON.stringify(req.body.attributes),
        description: req.body.description,
    };

    knex('clients').where('id', req.params.id).update(client_to_update)
        .then(data => { res.status(200).json(data); });

});

router.delete('/:id', (req, res) => {

    knex('clients').where('id', req.params.id).del()
        .then(data => { res.status(200).json(data); })

});

module.exports = router;