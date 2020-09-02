import { BaseService } from '../shared/base.service';
import { database } from '../../database';
import { Picture } from '../../database/models/Picture';
import { IPicture } from '../../database/models/interfaces/profilePicture.interfaces';

export default class PictureService extends BaseService<Picture, number> {
  constructor(user = database.getRepository(Picture)) {
    super(user);
  }

  /**
   * @description Add user image in the table
   * @param  {object} picture The object contains the picture url and userId
   * @returns {promise} The http response object
   */

  async savePicture(picture: IPicture) {
    const result: IPicture = await this.add(picture);
    return result;
  }
}

export const pictureService = new PictureService();
