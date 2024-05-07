import cron from "node-cron";

import env from "../config/env";
import { producer } from "../services/rabbitMQ/producer";

/**
 * schedule format
 * midnight: '0 0 0 * * *'
 * second, minute, hour, day of month, month, day of week
 */
const producerMessageToQueue = cron.schedule(
  env.cronJob.schedule,
  async () => {
    console.log("start sending message");
    await producer();
  },
  {
    scheduled: false,
    timezone: "Asia/Bangkok",
  }
);

export { producerMessageToQueue };
