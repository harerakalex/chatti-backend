import { Router } from 'express';
import { PictureController } from './picture.controller';
import { UserValidator } from '../../middlewares/userValidator.middleware';
import { PictureMiddleware } from '../../middlewares/pictureValidator.middleware';

export const pictureRouter = Router();

// Route for user registration
pictureRouter.post(
  '/upload',
  PictureMiddleware.multerValidation,
  UserValidator.verifyToken,
  PictureMiddleware.imageValidator,
  PictureController.uploadPicture
);
