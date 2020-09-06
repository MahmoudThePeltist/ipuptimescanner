const express = require('express');
const knex = require('knex');
const port = 3000;

const app = express();
const knexCon = knex({
    client: 'mysql2',
    debug: true,
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'ip_uptime_scanner'
    }
})

const indexRouter = require('./routes/index.js');

// clients = knexCon('clients').unionAll();
// console.log('clients: ', clients);

app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`Test app listening on http://localhost:${port}`);
})