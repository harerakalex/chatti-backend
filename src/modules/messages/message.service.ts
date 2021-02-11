import { Op } from 'sequelize';
import { BaseService } from '../shared/base.service';
import { database } from '../../database';
import { Message } from '../../database/models/Message';
import { IMessage } from '../../database/models/interfaces/message.interface';
import { User } from '../../database/models/User';

export default class MessageService extends BaseService<Message, number> {
  constructor(message = database.getRepository(Message)) {
    super(message);
  }

  /**
   * @description Send message
   * @param  {object} message The object contains the Message
   * @returns {promise} The http response object
   */
  async saveMessage(message: IMessage) {
    const result = await this.add(message);
    return result;
  }

  /**
   * @description get chat and its messages
   * @param  {variable}  senderId  sender
   * @param  {variable}  receiverId  sender
   * @returns {promise} The http response object
   */
  async findUserChats(senderId: number) {
    const result = await this.findAll({
      where: { senderId },
      include: [
        { model: User, as: 'sender', attributes: ['id', 'displayName'] },
        { model: User, as: 'receiver', attributes: ['id', 'displayName'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    return result;
  }
}

export const messageService = new MessageService();
