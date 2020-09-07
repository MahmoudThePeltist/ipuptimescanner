
exports.up = function(knex) {
    return knex.schema
        .createTable('clients_hist', table => {
            table.increments('hist_id').primary();
            table.integer('id');
            table.string('address', 1000).notNullable();
            table.string('status', 1000).notNullable();
            table.timestamps();
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('clients_hist');
};
