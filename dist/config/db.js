// src/config/db.ts
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();
const dbConfig = {
    development: {
        url: process.env.POSTGRESQL_URL,
        options: {
            dialect: "postgres",
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
        url: process.env.POSTGRESQL_URL,
        options: {
            dialect: "postgres",
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
const config = dbConfig[environment];
const sequelize = new Sequelize(config.url, config.options);
export default sequelize;
