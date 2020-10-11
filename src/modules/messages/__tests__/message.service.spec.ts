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

  it('should create new picture', async () => {
    const result = await messageService.saveMessage(messageInfo);
    expect(result.receiverId).toEqual(messageInfo.receiverId);
  });
});
