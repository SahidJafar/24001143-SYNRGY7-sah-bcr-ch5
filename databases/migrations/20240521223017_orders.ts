import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("orders", (table: Knex.TableBuilder) => {
        table.increments("id").primary();
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
        table.integer('car_id').unsigned().references('id').inTable('cars').onDelete('CASCADE').onUpdate('CASCADE');
        table.timestamp("start_rent").defaultTo(knex.fn.now());
        table.timestamp("end_rent").notNullable();
        table.integer("total_price").notNullable();
        table
        .enum("status", [
          "pending",
          "on-process",
          "approved",
          "rejected",
          "completed",
        ])
        .defaultTo("pending");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("orders");
}

