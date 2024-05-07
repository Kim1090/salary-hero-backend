import { KnexSingleton } from "../index";
import {
  getTheFirstDayOfTheMonthInUTC,
  getCurrentDateTimeUTC,
} from "../../utils/calculateDate";

export class UserBalanceModel {
  private knex = KnexSingleton.instance;
  private tableName = "user_balance";

  async updateUserBalance(userId: number): Promise<void> {
    const startDate = getTheFirstDayOfTheMonthInUTC();
    const currentDate = getCurrentDateTimeUTC();
    return this.knex
      .transaction(async (trx) => {
        await trx
          .select("*")
          .from(this.tableName)
          .where({ user_id: userId })
          .forUpdate();

        await trx.raw(`
          UPDATE user_balance AS b
          SET 
            updated_at = '${currentDate}',
            balance = 
              COALESCE((
                SELECT 
                  SUM(t.amount)
                FROM transactions t
                WHERE 
                  t.user_id = b.user_id
                  AND t.status = 'success'
                  AND t.type = 'credit'
                  AND transaction_date BETWEEN '${startDate}' AND '${currentDate}'
              ),0) - COALESCE((
                SELECT 
                  SUM(t.amount)
                FROM transactions t
                WHERE 
                  t.user_id = b.user_id
                  AND t.status = 'success'
                  AND t.type = 'withdrawals'
                  AND transaction_date BETWEEN '${startDate}' AND '${currentDate}'
              ),0)
          WHERE b.user_id = ${userId}
        `);
        await trx.commit();
      })
      .catch((err) => {
        // @TODO: alert message like slack, email
        // ref: https://www.npmjs.com/package/@slack/web-api?activeTab=readme
        console.log("error update user balance fail!!!", err);
      });
  }
}
