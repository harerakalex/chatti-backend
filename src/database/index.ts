import { Sequelize } from 'sequelize-typescript';
import { config } from 'dotenv';
import winston from 'winston';

config();

const modelsPath = `${__dirname}/models`;

export const database = new Sequelize(process.env.DATABASE_URL, {
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

verify();

export default database;
