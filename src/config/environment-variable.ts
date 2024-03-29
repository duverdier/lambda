import * as dotenv from 'dotenv';
dotenv.config();

export const environmentVariable = {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION: +process.env.JWT_EXPIRATION,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: +process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  UI_URL: process.env.UI_URL,
};
