import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("user_balance").del();

  // Inserts seed entries
  await knex("user_balance").insert([
    { id: 1, balance: 0.0, user_id: 1 },
    { id: 2, balance: 0.0, user_id: 2 },
    { id: 3, balance: 0.0, user_id: 3 },
    { id: 4, balance: 0.0, user_id: 4 },
    { id: 5, balance: 0.0, user_id: 5 },
  ]);
}
