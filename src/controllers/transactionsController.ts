import { UserBalanceModel } from "../database/models/userBalanceModel";
import { TransactionsModel } from "../database/models/transactionsModel";
import { UserModel } from "../database/models/userModel";

import { getNumberOfDaysInCurrentMonth } from "../utils/calculateDate";

function calculateMoneyRate(salaryRate: string, salaryType: number): number {
  if (salaryType === 2) return parseFloat(salaryRate);

  const amount = (
    parseFloat(salaryRate) / getNumberOfDaysInCurrentMonth()
  ).toFixed(2);
  return parseFloat(amount);
}

type MessageContent = {
  userId: number;
};

const createTransactions = async (content: MessageContent) => {
  try {
    if (!content.userId) return;
    const userModel = new UserModel();
    const transactions = new TransactionsModel();
    const userBalance = new UserBalanceModel();

    const user = await userModel.findOne(content.userId);
    if (!user) return;

    const transactionData = {
      amount: calculateMoneyRate(user.salary_rate, user.salary_type_id),
      type: "credit",
      user_id: user.id,
      status: "success",
    };

    await transactions.upsertByTransactionDate(transactionData);
    await userBalance.updateUserBalance(user.id);
  } catch (err) {
    console.log(err);
  }
};

export { createTransactions };
