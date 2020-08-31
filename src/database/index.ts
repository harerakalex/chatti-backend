import { Sequelize } from 'sequelize-typescript';
import { config } from 'dotenv';
import winston from 'winston';

config();

const modelsPath = `${__dirname}/models`;
const { DATABASE_URL, NODE_ENV } = process.env;

export const database = new Sequelize(DATABASE_URL, {
  logging: false,
  models: [modelsPath],
});

const verify = async () => {
  try {
    await database.authenticate();
    winston.info('Connection has been established successfully.');
  } catch (error) {
    winston.error('Unable to connect to the database:', error);
  }
};

const callVerifyFunction = () => (NODE_ENV === 'test' ? true : verify());
callVerifyFunction();

export default database;
