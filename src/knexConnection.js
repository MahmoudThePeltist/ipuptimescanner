const knex = require('knex');

const knexCon = knex({
    client: 'mysql2',
    debug: true,
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'ip_uptime_scanner'
    }
});

module.exports = knexCon;