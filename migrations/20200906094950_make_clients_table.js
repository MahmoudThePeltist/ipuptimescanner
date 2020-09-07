
exports.up = function(knex) {
    return knex.schema
        .createTable('clients', table => {
            table.increments('id');
            table.string('name', 1000).notNullable();
            table.string('address', 1000).unique().notNullable();
            table.string('type', 255).notNullable();
            table.string('attributes', 1000).notNullable();
            table.string('status', 1000).defaultTo('unchecked');
            table.text('description');
            table.timestamps(false, true);
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('clients');
};
