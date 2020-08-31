import { Router } from 'express';
import { homeRouter } from './home';
import { userRouter } from './user';

export const indexRouter = Router();

// This is base route for home endpoints
indexRouter.use('/', homeRouter);

// This is base route for user endpoint
indexRouter.use('/users', userRouter);
