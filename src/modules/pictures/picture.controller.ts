import { Request, Response } from 'express';
import { pictureService } from './picture.service';
import { ResponseHandler } from '../../helpers/responseHandler.helper';
import { PictureHelper } from '../../helpers/picture.helper';

export class PictureController {
  /**
   * @description creates a new user record
   * @param  {object} req The http request object
   * @param  {object} res The http response object
   * @returns The http response object
   */
  static async uploadPicture(req: Request | any, res: Response) {
    try {
      const file = PictureHelper.convertBufferToDataUrl(req, res);
      const url = await PictureHelper.uploadPhoto(res, file);
      // const url = 'fake photo3';
      const userId = req.user.id;
      const picture = await pictureService.savePicture({ userId, url });
      console.log('=====', picture);
      const message = 'Profile picture uploaded successfully';
      return ResponseHandler.sendResponse(res, 201, true, message, picture);
    } catch (error) {
      return ResponseHandler.sendErrorResponse(res, error);
    }
  }
}
