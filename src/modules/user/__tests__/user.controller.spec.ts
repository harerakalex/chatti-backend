import { UserController } from '../user.controller';
import { userService } from '../user.service';
import { ResponseHandler } from '../../../helpers/responseHandler.helper';
import { userInfo } from '../__mocks__/user.mocks';

describe(UserController, () => {
  let req: any;
  let res: any;
  let createUserSpy: any;
  let errorResponseSpy: any;

  req = { body: userInfo };

  res = {
    status: jest
      .fn(() => ({
        json: jest.fn(),
      }))
      .mockReturnValue({ json: jest.fn() }),
  };

  beforeEach(() => {
    createUserSpy = jest.spyOn(userService, 'createUser');
    errorResponseSpy = jest.spyOn(ResponseHandler, 'sendErrorResponse');
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
    expect(errorResponseSpy).toHaveBeenCalled();
  });
});