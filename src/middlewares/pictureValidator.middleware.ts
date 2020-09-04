import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { ResponseHandler } from '../helpers/responseHandler.helper';
// import { multerUploads } from '../middlewares/multer.middleware';

export class PictureMiddleware {
  /**
   * @description This middleware that validate picture
   * @param  {object} req The HTTP request sent
   * @param  {object} res The HTTP responds object
   * @param  {function} next The next middleware
   */
  static imageValidator(req: Request, res: Response, next: NextFunction) {
    const imageFile = req.file;
    if (!imageFile) {
      const message = 'coverPictureFile is required';
      return ResponseHandler.sendResponse(res, 400, false, message);
    }

    if (
      imageFile.mimetype !== 'image/jpeg' &&
      imageFile.mimetype !== 'image/png' &&
      imageFile.mimetype !== 'image/gif'
    ) {
      const message = 'Invalid Image File Type ' + imageFile.mimetype;
      return ResponseHandler.sendResponse(res, 400, false, message);
    }
    next();
  }

  /**
   * @description This middleware that validate multer
   * @param  {object} req The HTTP request sent
   * @param  {object} res The HTTP responds object
   * @param  {function} next The next middleware
   */
  static multerValidation(req: Request, res: Response, next: NextFunction) {
    const storage = multer.memoryStorage();
    const multerUploads = multer({ storage }).single('picture');

    multerUploads(req, res, (err: any) => {
      if (err) {
        return ResponseHandler.sendErrorResponse(res, err);
      }
      next();
    });
  }
}
