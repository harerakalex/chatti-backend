import { Router } from 'express';
import { MessageController } from './message.controller';
import { UserValidator } from '../../middlewares/userValidator.middleware';
import { MessageMiddleware } from '../../middlewares/messageValidator.middleware';

export const messageRouter = Router();

// Route for send message
messageRouter.post(
  '/',
  UserValidator.verifyToken,
  MessageMiddleware.ValidateMessageBody,
  UserValidator.receiverExistsById,
  MessageController.sendMessage
);
