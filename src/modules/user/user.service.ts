import { Op } from 'sequelize';
import { BaseService } from '../shared/base.service';
import { database } from '../../database';
import { User } from '../../database/models/User';
import { IUser } from '../../database/models/interfaces/user.interface';
import { Picture } from '../../database/models/Picture';

export default class UserService extends BaseService<User, number> {
  constructor(user = database.getRepository(User)) {
    super(user);
  }

  /**
   * @description Create a new user
   * @param  {object} newUser The user object contains the info of a new user to be created
   * @returns {object} The http response object
   */
  async createUser(newUser: IUser) {
    const result: IUser = await this.add(newUser);
    return result;
  }

  /**
   * @description Get a user by email
   * @param  {object} email The user email to check from db
   * @returns {object} The http response object
   */
  async findUserByEmail(email: string) {
    const result = await this.findOneByProp({ prop: 'email', value: email });
    return result;
  }

  /**
   * @description Update user profile
   * @param  {object} user user info to update
   * @returns {Promise} The http response object
   */
  async updateUser(user: IUser) {
    const { id } = user;
    const result: IUser = await this.update(id, user);
    return result;
  }

  /**
   * @description Search for user
   * @param  {string} name query to search for
   * @returns {Promise} The http response object
   */
  async findUserByNames(name: string) {
    const result = await this.findAll({
      where: {
        [Op.or]: {
          displayName: { [Op.iLike]: `%${name}%` },
          firstName: { [Op.iLike]: `%${name}%` },
          lastName: { [Op.iLike]: `%${name}%` },
        },
      },
    });
    return result;
  }

  /**
   * @description Search for user
   * @param  {string} displayName query to search for
   * @returns {Promise} The object containing user information
   */
  async findUserByDisplayName(displayName: string) {
    const result = await this.findOneByProp(
      {
        prop: 'displayName',
        value: displayName,
      },
      [Picture]
    );
    return result;
  }
}

export const userService = new UserService();
