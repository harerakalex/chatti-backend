import { Request, Response } from 'express';
import { messageService } from './message.service';
import { ResponseHandler } from '../../helpers/responseHandler.helper';

export class MessageController {
  /**
   * @description Send message
   * @param  {object} req The http request object
   * @param  {object} res The http response object
   * @returns The http response object
   */
  static async sendMessage(req: Request | any, res: Response) {
    try {
      const userId = req.user.id;
      req.body.senderId = userId;
      const sentMessage = await messageService.saveMessage(req.body);
      const message = 'Message sent successfully';
      return ResponseHandler.sendResponse(res, 201, true, message, sentMessage);
    } catch (error) {
      return ResponseHandler.sendErrorResponse(res, error);
    }
  }
}
