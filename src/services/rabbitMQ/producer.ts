import rabbitMqConnection from "./index";
import { UserModel } from "../../database/models/userModel";
import env from "../../config/env";

/**
 * The listOfUser should exclusively consist of individuals actively present for work.
 * This means that individuals who are on leave should not be included in this list.
 *
 * Example:
 * - If a daily worker takes a leave, they should not be considered part of the listOfUser
 *
 * Considerations for Logic Adjustment:
 * - Currently, the logic for generating the user list operates under the assumption
 *   that each user is scheduled to work daily.
 *   However, to accurately reflect attendance and exclude individuals on leave,
 *   adjustments to this logic are necessary.
 */
const producer = async () => {
  await rabbitMqConnection.connect();
  const users = new UserModel();
  const listOfUser = await users.findAll();
  for (let i = 0; i < listOfUser.length; i++) {
    const message = {
      userId: listOfUser[i].id,
    };
    rabbitMqConnection.channel.sendToQueue(
      env.rabbitMQ.queueName,
      Buffer.from(JSON.stringify(message))
    );
  }
  console.log("success send all data to rabbitMQ");
};

export { producer };
