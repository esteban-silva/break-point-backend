import { Sequelize, Dialect } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const devOption = {};

const productionOptions = {
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
};

console.log(
  "data?",
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD
);

export const sequelize = new Sequelize(
  process.env.DATABASE_NAME || "",
  process.env.DATABASE_USERNAME || "",
  process.env.DATABASE_PASSWORD || "",
  {
    host: process.env.DATABASE_HOST || "",
    dialect: "postgres",
    dialectOptions: productionOptions,
    define: {
      timestamps: false,
    },
  }
);
