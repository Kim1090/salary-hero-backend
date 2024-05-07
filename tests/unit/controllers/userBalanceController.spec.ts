import Knex from "knex";
import { Model } from "objection";

import { createTransactions } from "../../../src/controllers/transactionsController";

import { UserModel } from "../../../src/database/models/userModel";
import { UserBalanceModel } from "../../../src/database/models/userBalanceModel";
import { TransactionsModel } from "../../../src/database/models/transactionsModel";

import { KnexSingleton } from "../../../src/database/index";

beforeAll(async () => {
  const knexStub = Knex({
    client: "sqlite3",
    connection: ":memory:",
    useNullAsDefault: true,
    migrations: {
      directory: ["./src/database/migrations"],
    },
    seeds: {
      directory: ["./src/database/seeds"],
    },
  });

  Model.knex(knexStub);
  KnexSingleton.instance = knexStub;
  await knexStub.migrate.latest();
  await knexStub.seed.run();
});

afterAll(async () => {
  await KnexSingleton.instance.destroy();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("unit test: calculateUserBalanceByWorkedDays", () => {
  const userModel = new UserModel();
  const transactions = new TransactionsModel();
  const userBalance = new UserBalanceModel();
  test("success: to calculate user transaction and user balance", async () => {
    jest.spyOn(UserModel.prototype, "findOne");
    jest.spyOn(TransactionsModel.prototype, "upsertByTransactionDate");
    jest.spyOn(UserBalanceModel.prototype, "updateUserBalance");

    await createTransactions({
      userId: 1,
    });
    expect(UserModel.prototype.findOne).toHaveBeenCalledTimes(1);
    expect(
      TransactionsModel.prototype.upsertByTransactionDate
    ).toHaveBeenCalledTimes(1);
    expect(UserBalanceModel.prototype.updateUserBalance).toHaveBeenCalledTimes(
      1
    );
  });
});
