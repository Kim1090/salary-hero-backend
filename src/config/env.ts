import { channel } from "diagnostics_channel";

const env = {
  env: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 3000,
  postgres: {
    host: process.env.POSTGRES_HOST || "127.0.0.1",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    user: process.env.POSTGRES_USER || "user",
    password: process.env.POSTGRES_PASSWORD || "password",
    database: process.env.POSTGRES_DB || "database",
    pool: {
      min: Number(process.env.POSTGRES_POOL_MIN) || 0,
      max: Number(process.env.POSTGRES_POOL_MAX) || 10,
    },
  },
  cronJob: {
    schedule: process.env.WORKER_SCHEDULE || "0 0 0 * * *", //every midnight
  },
  rabbitMQ: {
    user: process.env.RABBITMQ_DEFAULT_USER || "user",
    password: process.env.RABBITMQ_DEFAULT_PASS || "password",
    host: process.env.RABBITMQ_HOST || "127.0.0.1",
    port: process.env.RABBITMQ_PORT || "5672",
    queueName: "calculateUserBalance",
  },
};
export default env;
