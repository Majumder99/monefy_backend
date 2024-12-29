// src/config/db.ts
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const dbConfig = {
  development: {
    url:
      process.env.DATABASE_URL ||
      "postgresql://postgres:yourpassword@localhost:5432/monefy",
    options: {
      dialect: "postgres" as const,
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
  },
  production: {
    url: process.env.DATABASE_URL,
    options: {
      dialect: "postgres" as const,
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
  },
};

const environment = process.env.NODE_ENV || "development";
const config = dbConfig[environment as keyof typeof dbConfig];

const sequelize = new Sequelize(config.url!, config.options);

export default sequelize;
