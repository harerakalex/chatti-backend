import { Router } from 'express';
import { homeRouter } from './home';
import { userRouter } from './user';
import { pictureRouter } from './pictures';
import { messageRouter } from './messages';

export const indexRouter = Router();

// This is base route for home endpoints
indexRouter.use('/', homeRouter);

// This is base route for user endpoint
indexRouter.use('/users', userRouter);

// This is the route for picture endpoints
indexRouter.use('/pictures', pictureRouter);

// Base route for message
indexRouter.use('/messages', messageRouter);
