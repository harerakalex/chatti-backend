import MessageService from '../message.service';
import { mockMessageRepo } from '../__mocks__/message.service';
import { messageInfo } from '../__mocks__/message.mock';

describe(MessageService, () => {
  let messageService: MessageService;

  beforeAll(() => {
    messageService = new MessageService(mockMessageRepo);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should send a message', async () => {
    const result = await messageService.saveMessage(messageInfo);
    expect(result.receiverId).toEqual(messageInfo.receiverId);
  });

  it('should find user messages', async () => {
    const saveMessage = await messageService.saveMessage(messageInfo);
    const result = await messageService.findUserChats(saveMessage.senderId);
    expect(result[0]).toMatchObject({
      id: expect.any(Number),
      senderId: expect.any(Number),
      receiverId: expect.any(Number),
      message: expect.any(String),
    });
  });
});
