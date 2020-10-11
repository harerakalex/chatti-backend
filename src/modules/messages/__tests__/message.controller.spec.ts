import { MessageController } from '../message.controller';
import { messageService } from '../message.service';
import { ResponseHandler } from '../../../helpers/responseHandler.helper';
import { messageInfo } from '../__mocks__/message.mock';

describe(MessageController, () => {
  let req: any;
  let res: any;
  let spyOnSaveMessage: any;

  req = { body: messageInfo, user: { id: 1 } };

  res = {
    status: jest
      .fn(() => ({
        json: jest.fn(),
      }))
      .mockReturnValue({ json: jest.fn() }),
  };

  describe(MessageController.sendMessage, () => {
    beforeEach(() => {
      spyOnSaveMessage = jest.spyOn(messageService, 'saveMessage');
      jest.spyOn(ResponseHandler, 'sendErrorResponse');
    });

    it('Should save the message', async () => {
      spyOnSaveMessage.mockResolvedValue(messageInfo);
      await MessageController.sendMessage(req, res);
      const response = {
        success: true,
        message: 'Message sent successfully',
        data: {
          senderId: req.user.id,
          receiverId: messageInfo.receiverId,
          message: messageInfo.message,
        },
      };
      expect(res.status).toBeCalledWith(201);
      expect(res.status().json).toBeCalledWith(response);
    });

    it('should send HTTP errors', async () => {
      spyOnSaveMessage.mockRejectedValueOnce('an error');
      await MessageController.sendMessage(req, res);
      expect(ResponseHandler.sendErrorResponse).toHaveBeenCalled();
      expect(res.status).toBeCalledWith(500);
    });
  });
});
