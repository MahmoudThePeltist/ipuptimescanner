var knex = require("../services/knex.service");

exports.getAll = (req, res) => {
  knex("clients_hist")
    .then((rows) => res.status(200).json(rows));
};

exports.getSpecific = (req, res) => {
  knex("clients_hist")
    .where("id", req.params.id)
    .then((rows) => res.status(200).json(rows));
};
