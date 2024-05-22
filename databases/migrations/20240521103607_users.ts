import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
        table.increments('id').primary().notNullable()
        table.enum('user_type', ['admin', 'customer']).notNullable().defaultTo('customer')
        table.string('name',255).notNullable()
        table.string("phone_number").nullable()
        table.string('email', 255).notNullable().unique()
        table.string('password', 255).notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users')
}

