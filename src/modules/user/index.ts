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

// Route for user sign in
userRouter.post(
  '/login',
  UserValidator.validateLoginBody,
  UserValidator.passportAuthenticate,
  UserController.userLogin
);

// routes for updating user profile
userRouter.put(
  '/profile',
  UserValidator.verifyToken,
  UserValidator.validateUpdateUser,
  UserController.updateUserProfile
);

// Routes for searching a user by name
userRouter.get('/', UserController.searchForUser);
