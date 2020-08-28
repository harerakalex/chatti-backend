import { Request, Response, NextFunction } from 'express';
import userService from '../modules/user/user.service';
import { GeneralValidator } from './generalValidator.middleware';
import { ResponseHandler } from '../helpers/responseHandler.helper';
import { registerUserSchema } from '../helpers/validationSchema.helper';

export class UserValidator {
  /**
   * @description This middleware checks for the required properties
   * @param  {object} req The HTTP request sent
   * @param  {object} res The HTTP responds object
   * @param  {function} next The next middleware
   * @return {any} The next middleware or the http responds
   */
  static validateUserBody(req: Request, res: Response, next: NextFunction) {
    return GeneralValidator.validator(res, next, req.body, registerUserSchema);
  }

  /**
   * @description This middleware checks if user already exists by email
   * @param  {object} req The HTTP request sent
   * @param  {object} res The HTTP responds object
   * @param  {function} next The next middleware
   * @return {any} End the process if a user exists
   */
  static async validateUserExists(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { email } = req.body;
    const message = `The user with email: '${email}' already exists`;
    const userExists = await userService.findUserByEmail(email);
    if (userExists) {
      return ResponseHandler.sendResponse(res, 404, false, message);
    }

    return next();
  }
}
