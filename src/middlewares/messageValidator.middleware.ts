import { Request, Response, NextFunction } from 'express';
import { GeneralValidator } from './generalValidator.middleware';
import { messageSchema } from '../helpers/validationSchema.helper';

export class MessageMiddleware {
  /**
   * @description This middleware that validate message
   * @param  {object} req The HTTP request sent
   * @param  {object} res The HTTP responds object
   * @param  {function} next The next middleware
   */
  static ValidateMessageBody(req: Request, res: Response, next: NextFunction) {
    return GeneralValidator.validator(res, next, req.body, messageSchema);
  }
}
