const knex = require('knex');
const knex_config = require('../../knexfile');

const knexCon = knex(knex_config.development);

module.exports = knexCon;