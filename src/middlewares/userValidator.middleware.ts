import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { userService } from '../modules/user/user.service';
import { GeneralValidator } from './generalValidator.middleware';
import { ResponseHandler } from '../helpers/responseHandler.helper';
import * as schemas from '../helpers/validationSchema.helper';
import { IUser } from '../database/models/interfaces/user.interface';

export class UserValidator {
  /**
   * @description This middleware checks for the required properties
   * @param  {object} req The HTTP request sent
   * @param  {object} res The HTTP responds object
   * @param  {function} next The next middleware
   * @return {any} The next middleware or the http responds
   */
  static validateUserBody(req: Request, res: Response, next: NextFunction) {
    return GeneralValidator.validator(
      res,
      next,
      req.body,
      schemas.registerUserSchema
    );
  }

  /**
   * @description This middleware checks for the required properties
   * @param  {object} req The HTTP request sent
   * @param  {object} res The HTTP responds object
   * @param  {function} next The next middleware
   */
  static validateLoginBody(req: Request, res: Response, next: NextFunction) {
    return GeneralValidator.validator(res, next, req.body, schemas.loginSchema);
  }

  /**
   * @description This middleware checks if user already exists by email
   * @param  {object} req The HTTP request sent
   * @param  {object} res The HTTP responds object
   * @param  {function} next The next middleware
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
      return ResponseHandler.sendResponse(res, 409, false, message);
    }

    return next();
  }

  /**
   * @description This middleware check if user is authenticated by passport
   * @param  {object} req The HTTP request sent
   * @param  {object} res The HTTP responds object
   * @param  {function} next The next middleware
   */
  static passportAuthenticate(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local', (err, user) => {
      if (err) {
        const { message } = err;
        return ResponseHandler.sendResponse(res, 401, false, message);
      }
      req.user = user;
      next();
    })(req, res);
  }

  /**
   * @param {object} user IUser
   * @returns {object} Verify token and Return user Info
   */
  static async verifyToken(
    req: Request | any,
    res: Response,
    next: NextFunction
  ) {
    const token: string = req.headers.authorization;
    if (!token) {
      return ResponseHandler.sendResponse(
        res,
        401,
        false,
        'Please log in or Register'
      );
    } else {
      jwt.verify(
        token,
        process.env.JWT_SECRET_KEY,
        async (error: any, decoded: IUser) => {
          if (error) {
            return ResponseHandler.sendResponse(res, 403, true, error.message);
          }
          req.user = decoded;
          next();
        }
      );
    }
  }
}
