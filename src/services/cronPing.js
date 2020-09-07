const knex = require('./knexConnection');
const cron = require('node-cron');
const http = require('http');

cron.schedule('* * * * *', () => {
    console.log("This is a cron job running on the server.");
    knex('clients')
        .then(rows => {
            console.log("Getting clients: " + rows.length);
            rows.forEach(client => {
                console.log("Pinging client: " + client.address);

                options = {
                    host: client.address,
                }

                // check if the client is up or down and set their status if they've changed
                var req = http.get(options, res => {
                    if(client.status != 'up'){
                        console.log("Client " + client.address + " Is back up!");
                        knex('clients').where({id: client.id}).update({status: 'up', updated_at: knex.fn.now()})
                            .then(res => {
                                // save to history log
                                client_history = {
                                    'id': client.id,
                                    'address': client.address,
                                    'status': client.address
                                }
                                knex('clients_hist').insert(client_history)
                                    .then(res => {})
                            });
                        } else {
                            console.log("Client " + client.address + " Is still up.");
                        }
                })

                req.on('error', error => {
                    if(client.status != 'down'){
                        console.log("Client " + client.address + " Is down!: "+ JSON.stringify(error));
                        knex('clients').where({id: client.id}).update({status: 'down', updated_at: knex.fn.now()})
                            .then(res => {
                                // save to history log
                                client_history = {
                                    'id': client.id,
                                    'address': client.address,
                                    'status': client.address
                                }
                                knex('clients_hist').insert(client_history)
                                    .then(res => {})
                            });
                        } else {
                            console.log("Client " + client.address + " Is still down. "+ JSON.stringify(error));
                        }
                })
            })
        })
});

module.exports = cron;