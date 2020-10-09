const knex = require('./knexConnection');
const { performance } = require('perf_hooks');
const cron = require('node-cron');
const ping = require('ping');

cron.schedule('*/10 * * * * *', () => { pingAndUpdateClients(); });

function pingAndUpdateClients() {

    time1 = performance.now();
    knex('clients')
        .then(rows => {
            rows.forEach((client, index) => {

                // check if the client is up or down and set their status if they've changed
                ping.sys.probe(client.address, isAlive => {
                    if(isAlive){
                        if(client.status != 'up') {
                            updateClientStatus(client, 'up');
                        }
                        
                    } else {
                        if(client.status != 'down') {
                            updateClientStatus(client, 'down');
                        }

                        console.log(performance.now() - time1);
                    }

                    // console.log(index, " - id: ", client.id, ' stat: ', client.status, ' pref: ', performance.now() - time1);

                })
            })
        })
}

function updateClientStatus(client, new_status) {
    
    knex('clients').where({id: client.id}).update({status: new_status, updated_at: knex.fn.now()})
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
}

module.exports = cron;