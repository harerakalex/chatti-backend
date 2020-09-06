import { Request, Response } from 'express';
import { userService } from './user.service';
import { ResponseHandler } from '../../helpers/responseHandler.helper';
import { UserAuth } from '../../helpers/userAuth.helper';

export class UserController {
  /**
   * @description creates a new user record
   * @param  {object} req The http request object
   * @param  {object} res The http response object
   * @returns {object} The http response object
   */
  static async addNewUser(req: Request, res: Response) {
    try {
      const { password } = req.body;
      const hashedPassword = UserAuth.hashPassword(password);
      req.body.password = hashedPassword;
      const user = await userService.createUser(req.body);
      const message = 'User has been successfull registered';
      delete user.password;
      delete user.verified;
      return ResponseHandler.sendResponse(res, 201, true, message, user);
    } catch (error) {
      return ResponseHandler.sendErrorResponse(res, error);
    }
  }

  /**
   * @description user should login successfully
   * @param  {object} req The http request object
   * @param  {object} res The http response object
   */
  static async userLogin(req: Request | any, res: Response) {
    const { user } = req;
    const token = UserAuth.generateToken(user);
    user.token = token;
    delete user.password;
    delete user.verified;
    const message = 'Welcome, you are successfully logged in';
    return ResponseHandler.sendResponse(res, 200, true, message, user);
  }

  /**
   * @description user should login successfully
   * @param  {object} req The http request object
   * @param  {object} res The http response object
   */
  static async updateUserProfile(req: Request | any, res: Response) {
    try {
      const { id } = req.user;
      req.body.id = id;
      const updatedUser = await userService.updateUser(req.body);
      delete updatedUser.password;
      const message = 'Successfull updated the profile';
      return ResponseHandler.sendResponse(res, 200, true, message, updatedUser);
    } catch (error) {
      return ResponseHandler.sendErrorResponse(res, error);
    }
  }
}
