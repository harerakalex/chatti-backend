import { BaseService } from '../shared/base.service';
import { database } from '../../database';
import { Message } from '../../database/models/Message';
import { IMessage } from '../../database/models/interfaces/message.interface';

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
}

export const messageService = new MessageService();
