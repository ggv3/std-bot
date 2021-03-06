/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('feedback', table => {
    table.increments();
    table.string('text', 1000).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('feedback');
};
