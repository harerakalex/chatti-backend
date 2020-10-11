import { Message } from '../../../database/models/Message';
import { Repository } from 'sequelize-typescript';
import { MockRepository } from '../../../database/__mocks__';

class MockMessageSevice extends MockRepository<Message> {
  constructor(messages: Message[] = []) {
    super(Message, messages);
  }
}

export const mockMessageRepo = (new MockMessageSevice() as unknown) as Repository<
  Message
>;
