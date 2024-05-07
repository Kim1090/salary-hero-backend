import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("marital_status").del();

  // Inserts seed entries
  await knex("marital_status").insert([
    { id: 1, status_name: "โสด" },
    { id: 2, status_name: "แต่งงาน" },
    { id: 3, status_name: "หย่าร้าง" },
  ]);
}
