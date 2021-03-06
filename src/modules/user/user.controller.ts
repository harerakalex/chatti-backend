import { Request, Response } from 'express';
import { userService } from './user.service';
import { ResponseHandler } from '../../helpers/responseHandler.helper';
import { UserAuth } from '../../helpers/userAuth.helper';
import { messageService } from '../messages/message.service';

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

  /**
   * @description user should be able to search for another user
   * @param  {object} req The http request object
   * @param  {object} res The http response object
   */
  static async searchForUser(req: Request, res: Response) {
    try {
      const name = req.query.name as string;
      const users = await userService.findUserByNames(name);
      const message = 'Successfull retrieved users';
      return ResponseHandler.sendResponse(res, 200, true, message, users);
    } catch (error) {
      return ResponseHandler.sendErrorResponse(res, error);
    }
  }

  /**
   * @description user should be able to view the user profile
   * @param  {object} req The http request object
   * @param  {object} res The http response object
   */
  static async viewUserProfile(req: Request, res: Response) {
    try {
      const { displayName }: { displayName: string } = req.params as any;
      const user = await userService.findUserByDisplayName(displayName);
      const message = 'Successfull retrieved user profile';
      return ResponseHandler.sendResponse(res, 200, true, message, user);
    } catch (error) {
      return ResponseHandler.sendErrorResponse(res, error);
    }
  }

  /**
   * @description Get user chats
   * @param  {object} req The http request object
   * @param  {object} res The http response object
   * @returns The http response object
   */
  static async userChats(req: Request | any, res: Response) {
    try {
      const { userId } = req.params;
      const chats = await messageService.findUserChats(userId);
      const message = 'Chats retrieved successfully';

      return ResponseHandler.sendResponse(res, 200, true, message, chats);
    } catch (error) {
      return ResponseHandler.sendErrorResponse(res, error);
    }
  }
}
