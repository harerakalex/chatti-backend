import { Response } from 'express';

export class HttpError extends Error {
  constructor(message: string, code = 500, error?: Error) {
    super();
    this.message = message;
    code;
    error;
  }

  static throwErrorIfNull(data: object, message: string, code = 404) {
    if (!data) {
      throw new HttpError(message, code);
    }
  }

  static sendErrorResponse(errorInstance: any, res: Response) {
    const { message, error, statusCode } = errorInstance;
    const code = statusCode || 500;
    return res.status(code).json({
      success: false,
      message,
      error,
    });
  }
}
