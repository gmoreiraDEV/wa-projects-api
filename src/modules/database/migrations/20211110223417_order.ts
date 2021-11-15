import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Order', table => {
    table
      .increments('id')
      .notNullable()
      .primary();

    table.string('name', 150);
    table.string('description');
    table.integer('quantity');
    table.integer('value');
    table.dateTime('createdDate').notNullable();
    table.dateTime('updatedDate').notNullable();

    table
      .integer('userId')
      .nullable()
      .unsigned()
      .references('id')
      .inTable('User')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('Order');
}
