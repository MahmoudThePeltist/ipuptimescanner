const knex = require('./knexConnection');
const cron = require('node-cron');
const http = require('http');

cron.schedule('*/15 * * * * *', () => {
    console.log("This is a cron job running on the server.");
    knex('clients')
        .then(rows => {
            console.log("Getting clients: " + JSON.stringify(rows.length));
            rows.forEach(client => {
                console.log("client: " + JSON.stringify(client));

                options = {
                    host: client.address,
                }

                var req = http.get(options, res => {
                    console.log("Ping " + client.address + " Success.");
                    knex('clients').where({id: client.id}).update({status: 1})
                        .then(res => {});
                })

                req.on('error', error => {
                    console.log("Ping " + client.address + " error: "+ JSON.stringify(error));
                    knex('clients').where({id: client.id}).update({status: 0})
                        .then(res => {});
                })
            })
        })
});

module.exports = cron;