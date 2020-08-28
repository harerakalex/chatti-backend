import { Router } from 'express';
import { UserController } from './user.controller';
import { UserValidator } from '../../middlewares/userValidator.middleware';

export const userRouter = Router();

// Route for user registration
userRouter.post(
  '/signup',
  UserValidator.validateUserBody,
  UserValidator.validateUserExists,
  UserController.addNewUser
);
