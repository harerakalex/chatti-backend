import { config } from 'dotenv';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import winston from 'winston';

import { logger } from './config/logger';
import { indexRouter } from './modules';

config();
logger();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', indexRouter);
app.use((req: Request, res: Response) => {
  res.status(404).json({ status: 404, error: 'Endpoint route not found' });
});

app.listen(port, () => {
  winston.info(`Server Listening on Port: ${port}`);
});
