import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("salary_type").del();

  // Inserts seed entries
  await knex("salary_type").insert([
    { id: 1, type: "monthly" },
    { id: 2, type: "daily" },
  ]);
}
