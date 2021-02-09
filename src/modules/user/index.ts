import { Router } from 'express';
import { UserController } from './user.controller';
import { UserValidator } from '../../middlewares/userValidator.middleware';
import { GeneralValidator } from '../../middlewares/generalValidator.middleware';
import * as schemas from '../../helpers/validationSchema.helper';

export const userRouter = Router();

// Route for user registration
userRouter.post(
  '/signup',
  GeneralValidator.validationHandler(schemas.registerUserSchema),
  UserValidator.validateUserExists,
  UserValidator.displayNameExists,
  UserController.addNewUser,
);

// Route for user sign in
userRouter.post(
  '/login',
  GeneralValidator.validationHandler(schemas.loginSchema),
  UserValidator.passportAuthenticate,
  UserController.userLogin,
);

// routes for updating user profile
userRouter.put(
  '/profile',
  UserValidator.verifyToken,
  GeneralValidator.validationHandler(schemas.updateUserSchema),
  UserController.updateUserProfile,
);

// Routes for searching a user by name
userRouter.get('/', UserController.searchForUser);

// Route to view user profile
userRouter.get('/profile/:displayName', UserController.viewUserProfile);
