var knex = require("../services/knexConnection");

exports.getAll = (req, res) => {
  knex("clients").then((rows) => res.status(200).json(rows));
};

exports.getSpecific = (req, res) => {
  knex("clients")
    .where("id", req.params.id)
    .then((rows) => res.status(200).json(rows));
};

exports.create = (req, res) => {
  data_to_insert = {
    name: req.body.name,
    address: req.body.address,
    type: req.body.type,
    attributes: JSON.stringify(req.body.attributes),
    description: req.body.description,
  };

  knex("clients")
    .insert(data_to_insert)
    .then((inserted_id) => {
      knex("clients")
        .where("id", inserted_id)
        .then((rows) => res.status(200).json(rows));
    });
};

exports.put = (req, res) => {
  data_to_update = {
    name: req.body.name,
    address: req.body.address,
    type: req.body.type,
    attributes: JSON.stringify(req.body.attributes),
    description: req.body.description,
  };

  knex("clients")
    .where("id", req.params.id)
    .update(data_to_update)
    .then((inserted_id) => {
      knex("clients")
        .where("id", inserted_id)
        .then((rows) => res.status(200).json(rows));
    });
};

exports.delete = (req, res) => {
  knex("clients")
    .where("id", req.params.id)
    .del()
    .then((data) => res.status(200).json(data));
};
