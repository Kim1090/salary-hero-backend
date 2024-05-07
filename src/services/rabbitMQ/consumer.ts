import { Message } from "amqplib";

import rabbitMqConnection from "./index";
import { createTransactions } from "../../controllers/transactionsController";
import env from "../../config/env";

const handleIncomingMessage = async (message: Message | null) => {
  const content = message?.content?.toString();
  if (!content) return;

  await createTransactions(JSON.parse(content));
};

const consumer = async () => {
  await rabbitMqConnection.connect();

  // in case can't connect the RabbitMQ
  if (!rabbitMqConnection.channel) return;

  await rabbitMqConnection.channel.assertQueue(env.rabbitMQ.queueName, {
    durable: true,
  });

  rabbitMqConnection.channel.consume(env.rabbitMQ.queueName, (message) => {
    if (!message) return;

    handleIncomingMessage(message);
    rabbitMqConnection.channel.ack(message);
  });
};

export { consumer };
