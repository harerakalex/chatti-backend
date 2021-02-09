import { Router } from 'express';
import { MessageController } from './message.controller';
import { UserValidator } from '../../middlewares/userValidator.middleware';
import { GeneralValidator } from '../../middlewares/generalValidator.middleware';
import * as schemas from '../../helpers/validationSchema.helper';

export const messageRouter = Router();

// Route for send message
messageRouter.post(
  '/',
  UserValidator.verifyToken,
  GeneralValidator.validationHandler(schemas.messageSchema),
  UserValidator.receiverExistsById,
  MessageController.sendMessage,
);
