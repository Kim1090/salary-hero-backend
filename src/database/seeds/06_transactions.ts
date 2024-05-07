import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("transactions").del();

  // Inserts seed entries
  await knex("transactions").insert([
    {
      user_id: 1,
      amount: 1612.9,
      transaction_date: "2024-05-02T04:16:51Z",
      status: "success",
      type: "credit",
    },
    {
      user_id: 1,
      amount: 1612.9,
      transaction_date: "2024-05-02T05:16:51Z",
      status: "success",
      type: "credit",
    },
    {
      user_id: 1,
      amount: 1612.9,
      transaction_date: "2024-05-02T04:16:51Z",
      status: "success",
      type: "credit",
    },
    {
      user_id: 1,
      amount: 2000,
      transaction_date: "2024-05-02T04:16:51Z",
      status: "success",
      type: "withdrawals",
    },
    {
      user_id: 2,
      amount: 2419.35,
      transaction_date: "2024-05-02T04:16:51Z",
      status: "success",
      type: "credit",
    },
    {
      user_id: 2,
      amount: 2419.35,
      transaction_date: "2024-05-02T04:16:51Z",
      status: "success",
      type: "credit",
    },
    {
      user_id: 2,
      amount: 2419.35,
      transaction_date: "2024-05-02T04:16:51Z",
      status: "success",
      type: "credit",
    },
    {
      user_id: 3,
      amount: 967.74,
      transaction_date: "2024-05-02T04:16:51Z",
      status: "success",
      type: "credit",
    },
    {
      user_id: 3,
      amount: 967.74,
      transaction_date: "2024-05-02T04:16:51Z",
      status: "success",
      type: "credit",
    },
    {
      user_id: 3,
      amount: 967.74,
      transaction_date: "2024-05-02T04:16:51Z",
      status: "success",
      type: "credit",
    },
    {
      user_id: 4,
      amount: 450,
      transaction_date: "2024-05-02T04:16:51Z",
      status: "success",
      type: "credit",
    },
    {
      user_id: 4,
      amount: 450,
      transaction_date: "2024-05-02T04:16:51Z",
      status: "success",
      type: "credit",
    },
    {
      user_id: 5,
      amount: 750,
      transaction_date: "2024-05-02T04:16:51Z",
      status: "success",
      type: "credit",
    },
    {
      user_id: 5,
      amount: 750,
      transaction_date: "2024-05-02T04:16:51Z",
      status: "success",
      type: "credit",
    },
    {
      user_id: 5,
      amount: 750,
      transaction_date: "2024-05-02T04:16:51Z",
      status: "success",
      type: "credit",
    },
    {
      user_id: 5,
      amount: 1500,
      transaction_date: "2024-05-02T04:16:51Z",
      status: "success",
      type: "withdrawals",
    },
  ]);
}
