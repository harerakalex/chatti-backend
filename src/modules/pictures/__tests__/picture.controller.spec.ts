import { PictureController } from '../picture.controller';
import { pictureService } from '../picture.service';
import { ResponseHandler } from '../../../helpers/responseHandler.helper';
import { PictureHelper } from '../../../helpers/picture.helper';
import { pictureInfo } from '../__mocks__/picture.mocks';

describe(PictureController, () => {
  let req: any;
  let res: any;
  let spyOnSavePicture: any;

  req = { file: {}, user: { id: 1 } };

  res = {
    status: jest
      .fn(() => ({
        json: jest.fn(),
      }))
      .mockReturnValue({ json: jest.fn() }),
  };

  PictureHelper.convertBufferToDataUrl = jest.fn();
  PictureHelper.uploadPhoto = jest.fn();
  //   ResponseHandler.sendErrorResponse = jest.fn();
  //   ResponseHandler.sendResponse = jest.fn();

  describe(PictureController.uploadPicture, () => {
    beforeEach(() => {
      spyOnSavePicture = jest.spyOn(pictureService, 'savePicture');
      jest.spyOn(ResponseHandler, 'sendErrorResponse');
    });

    it('Should save the uploaded picture', async () => {
      spyOnSavePicture.mockResolvedValue(pictureInfo);
      await PictureController.uploadPicture(req, res);
      const response = {
        success: true,
        message: 'Profile picture uploaded successfully',
        data: {
          url: pictureInfo.url,
          userId: pictureInfo.userId,
        },
      };
      expect(res.status).toBeCalledWith(201);
      expect(res.status().json).toBeCalledWith(response);
    });

    it('should send HTTP errors', async () => {
      spyOnSavePicture.mockRejectedValueOnce('an error');
      await PictureController.uploadPicture(req, res);
      expect(ResponseHandler.sendErrorResponse).toHaveBeenCalled();
      expect(res.status).toBeCalledWith(500);
    });
  });
});
