import { BaseService } from '../shared/base.service';
import { database } from '../../database';
import { Picture } from '../../database/models/Picture';
import { IPicture } from '../../database/models/interfaces/profilePicture.interfaces';

export default class PictureService extends BaseService<Picture, number> {
  constructor(picture = database.getRepository(Picture)) {
    super(picture);
  }

  /**
   * @description Add user image in the table or update it if it is already there
   * @param  {object} picture The object contains the picture url and userId
   * @returns {promise} The http response object
   */
  async savePicture(picture: IPicture) {
    const { userId } = picture;
    const alreadyHasPicture = await this.findOneByProp({
      prop: 'userId',
      value: userId,
    });
    if (alreadyHasPicture) {
      const { id } = alreadyHasPicture;
      const result = await this.update(id, picture);
      return result;
    }
    const result: IPicture = await this.add(picture);
    return result;
  }

  /**
   * @description Get a user photo by userId
   * @param  {number} userId The user email to check from db
   * @returns {object} The data from the DB
   */
  // async findPictureByUserId(userId: number) {
  //   return await this.findOneByProp({ prop: 'userId', value: userId });
  // }
}

export const pictureService = new PictureService();
