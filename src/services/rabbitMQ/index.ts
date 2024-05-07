import client, { Connection, Channel, ConsumeMessage } from "amqplib";

import env from "../../config/env";

class RabbitMQConnection {
  connection!: Connection;
  channel!: Channel;
  private connected!: Boolean;

  async connect() {
    if (this.connected && this.channel) return;
    else this.connected = true;

    try {
      this.connection = await client.connect(
        `amqp://${env.rabbitMQ.user}:${env.rabbitMQ.password}@${env.rabbitMQ.host}:${env.rabbitMQ.port}`
      );

      console.log(`Rabbit MQ Connection is ready`);
      this.channel = await this.connection.createChannel();

      console.log("Created RabbitMQ Channel successfully");
    } catch (error) {
      console.error("Can`t connect to RabbitMQ server", error);
    }
  }
}

const rabbitMqConnection = new RabbitMQConnection();

export default rabbitMqConnection;
