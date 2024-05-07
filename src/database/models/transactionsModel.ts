import { KnexSingleton } from "../index";
import {
  getStartDateOfTheDayInUTC,
  getCurrentDateTimeUTC,
} from "../../utils/calculateDate";

interface Transactions {
  id?: number;
  amount: number;
  transaction_date?: string;
  type: string;
  user_id: number;
  status: string;
}

export class TransactionsModel {
  private knex = KnexSingleton.instance;
  private tableName = "transactions";

  async upsertByTransactionDate(data: Transactions): Promise<void> {
    const startDate = getStartDateOfTheDayInUTC();
    const currentDate = getCurrentDateTimeUTC();

    return this.knex
      .raw(
        `
      INSERT INTO ${this.tableName} 
        (amount, type, user_id, status, transaction_date)
      SELECT
        ${data.amount}, '${data.type}', ${data.user_id}, '${data.status}', '${currentDate}'
      WHERE NOT EXISTS  (
        SELECT 1
        FROM transactions
        WHERE 
          user_id = ${data.user_id}
          AND transaction_date BETWEEN '${startDate}' AND '${currentDate}'
      )
    `
      )
      .catch((err) => {
        console.log("error create user transaction fail!!!", err);
      });
  }
}
