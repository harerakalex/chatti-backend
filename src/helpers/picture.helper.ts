import cloudinary from 'cloudinary';
import path from 'path';
import DatauriParser from 'datauri/parser';
import { ResponseHandler } from './responseHandler.helper';

const parser = new DatauriParser();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export class PictureHelper {
  /** @description This function converts the buffer to data url
   *  @param {Object} req containing the field object
   * @returns {String} The data url from the string buffer
   */
  static convertBufferToDataUrl(req: any, res: any): string {
    try {
      const fileExtension = path.extname(req.file.originalname).toString();
      const { content } = parser.format(fileExtension, req.file.buffer);
      return content;
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }

  /** @description This function upload image to cloudinary and return URL
   *  @param {string} file containing the field object
   * @returns {string} The picture url from claudinary
   */
  static async uploadPhoto(res: any, file: string) {
    try {
      const songUrl = await cloudinary.v2.uploader.upload(file, {
        folder: 'chatti',
      });
      return songUrl.secure_url;
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
}
