import { config } from 'dotenv';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import winston from 'winston';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';

import { logger } from './config/logger';
import { indexRouter } from './modules';
import { passportConfig } from './config/passport.config';
import SocketIO from './helpers/socketIO.helper';

config();
logger();

const app = express();
const port = process.env.PORT || 3000;
SocketIO(app);

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
passportConfig();

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: true,
    saveUninitialized: true,
  }),
);

app.use('/api/v1', indexRouter);
app.use((req: Request, res: Response) => {
  res.status(404).json({ status: 404, error: 'Endpoint route not found' });
});

app.listen(port, () => {
  winston.info(`Server Listening on Port: ${port}`);
});

export default app;
