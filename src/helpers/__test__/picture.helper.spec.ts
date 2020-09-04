import cloudinary from 'cloudinary';
import { PictureHelper } from '../picture.helper';
import { ResponseHandler } from '../responseHandler.helper';

describe(PictureHelper, () => {
  let req: any;
  let res: any;

  cloudinary.v2.uploader.upload = jest.fn();

  req = { file: { originalname: 'image.jgg', buffer: '123456' } };
  res = { code: null, body: null };
  res.status = (status?: number) => {
    if (status) {
      res.code = status;
      return {
        send: (object: any) => (res.body = object),
        json: (object: any) => (res.body = object),
      };
    }
    return res.code;
  };

  describe(PictureHelper.convertBufferToDataUrl, () => {
    it('Should convert the buffer to data uri', () => {
      const content = PictureHelper.convertBufferToDataUrl(req, res);
      expect(typeof content).toBe('string');
    });

    it('Should through the error if no file provided', () => {
      req = {};
      PictureHelper.convertBufferToDataUrl(req, res);
      expect(res.status()).toBe(500);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe(PictureHelper.uploadPhoto, () => {
    it('Should upload the image to cloudinary', async () => {
      await PictureHelper.uploadPhoto(res, 'gringo');
      expect(cloudinary.v2.uploader.upload).toHaveBeenCalledTimes(1);
    });
  });
});
