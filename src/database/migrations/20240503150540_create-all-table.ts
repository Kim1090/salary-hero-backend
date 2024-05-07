import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable("salary_type", (table) => {
      table.increments("id").primary();
      table.enum("type", ["monthly", "daily"]).defaultTo("daily");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("companies", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.text("info");
      table.string("address").notNullable();
      table.string("mobile_number").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("marital_status", (table) => {
      table.increments("id").primary();
      table.string("status_name").notNullable();
    })
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("last_name").notNullable();
      table.string("address").notNullable();
      table.string("mobile_number").notNullable();
      table.enum("gender", ["male", "female"]).defaultTo("male");
      table.date("date_of_birth");
      table.string("position_of_work");
      table.decimal("salary_rate", 10, 2).notNullable().defaultTo(0.0);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.integer("salary_type_id").references("id").inTable("salary_type");
      table.integer("company_id").references("id").inTable("companies");
      table
        .integer("marital_status_id")
        .references("id")
        .inTable("marital_status");
    })
    .createTable("user_balance", (table) => {
      table.increments("id").primary();
      table.decimal("balance", 10, 2).notNullable().defaultTo(0.0);
      table.integer("user_id").references("id").inTable("users");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("transactions", (table) => {
      table.increments("id").primary();
      table.decimal("amount", 10, 2).notNullable();
      table.timestamp("transaction_date").notNullable();
      table.enum("type", ["credit", "withdrawals"]).notNullable();
      table.integer("user_id").references("id").inTable("users");
      table.enum("status", ["success", "pending", "fail"]).notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());

      table.index("transaction_date");
      table.index("user_id");
    });
}

export async function down(knex: Knex): Promise<void> {
  await Promise.all([
    knex.schema.dropTable("salary_type"),
    knex.schema.dropTable("companies"),
    knex.schema.dropTable("users"),
    knex.schema.dropTable("user_balance"),
    knex.schema.dropTable("transactions"),
    knex.schema.dropTable("marital_status"),
  ]);
}
