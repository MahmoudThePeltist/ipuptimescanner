
exports.up = function(knex) {
    return knex.schema
        .createTable('users', table => {
            table.increments('id');
            table.string('name', 1000).notNullable();
            table.string('email', 1000).notNullable();
            table.string('phone', 1000).notNullable();
            table.string('password', 1000).notNullable();
            table.timestamps(false, true);
        });
};

exports.down = function(knex) {
  
};
