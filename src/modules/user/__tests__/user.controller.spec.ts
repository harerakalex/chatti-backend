import { UserController } from '../user.controller';
import { userService } from '../user.service';
import { ResponseHandler } from '../../../helpers/responseHandler.helper';
import { userInfo, updateUserInfo } from '../__mocks__/user.mocks';

describe(UserController, () => {
  let req: any;
  let res: any;
  let createUserSpy: any;
  let updateSpy: any;
  // let errorResponseSpy: any;

  req = { body: userInfo, user: userInfo };

  res = {
    status: jest
      .fn(() => ({
        json: jest.fn(),
      }))
      .mockReturnValue({ json: jest.fn() }),
  };

  // beforeAll(() => {
  //   errorResponseSpy = jest.spyOn(ResponseHandler, 'sendErrorResponse');
  // });
  ResponseHandler.sendErrorResponse = jest.fn();

  describe(UserController.addNewUser, () => {
    beforeEach(() => {
      createUserSpy = jest.spyOn(userService, 'createUser');
    });

    it('should create a new user', async () => {
      createUserSpy.mockReturnValue(userInfo);
      await UserController.addNewUser(req, res);
      const response = {
        success: true,
        message: 'User has been successfull registered',
        data: {
          firstName: 'carlos',
          lastName: 'harera',
          email: 'hareraloston@gmail.com',
        },
      };
      expect(res.status).toBeCalledWith(201);
      expect(res.status().json).toBeCalledWith(response);
    });

    it('should send HTTP errors', async () => {
      createUserSpy.mockRejectedValueOnce('an error');
      await UserController.addNewUser(req, res);
      // expect(errorResponseSpy).toHaveBeenCalled();
      expect(ResponseHandler.sendErrorResponse).toHaveBeenCalled();
    });
  });

  describe(UserController.userLogin, () => {
    it('should log the user in successfully', async () => {
      await UserController.userLogin(req, res);
      expect(res.status).toBeCalledWith(200);
    });
  });

  describe(UserController.updateUserProfile, () => {
    beforeEach(() => {
      updateSpy = jest.spyOn(userService, 'updateUser');
    });
    const req = { body: updateUserInfo, user: updateUserInfo };
    it('should update the user in successfully', async () => {
      updateSpy.mockReturnValue({ ...userInfo, updateUserInfo });
      await UserController.updateUserProfile(req, res);
      expect(res.status).toBeCalledWith(200);
    });

    it('should send HTTP errors', async () => {
      updateSpy.mockRejectedValueOnce('an error');
      await UserController.updateUserProfile(req, res);
      expect(ResponseHandler.sendErrorResponse).toHaveBeenCalled();
    });
  });
});
