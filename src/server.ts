import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

import app from "./app";
import env from "./config/env";
import { consumer } from "./services/rabbitMQ/consumer";
import { producerMessageToQueue } from "./cron/userBalance";

const PORT = env.port;

/**
 * set cronJob for produce message
 */
producerMessageToQueue.start();

/**
 * start RabbitMQ consumer message
 */
consumer();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
