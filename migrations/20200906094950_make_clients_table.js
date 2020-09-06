
exports.up = function(knex) {
    return knex.schema
        .createTable('clients', table => {
            table.increments('id');
            table.string('address', 1000).notNullable();
            table.string('type', 255).notNullable();
            table.string('attributes', 1000).notNullable();
            table.boolean('status').notNullable();
            table.timestamps();
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('clients');
};
