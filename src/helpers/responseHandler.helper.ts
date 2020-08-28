import { Response } from 'express';

export class ResponseHandler {
  static sendResponse(
    res: Response,
    statusCode: number,
    success: boolean,
    message: string,
    data?: object
  ) {
    return res.status(statusCode).json({
      success,
      message,
      data,
    });
  }
}
