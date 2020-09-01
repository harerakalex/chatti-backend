import { ResponseHandler, IError } from '../responseHandler.helper';

describe(ResponseHandler, () => {
  let res: any;

  res = {
    status: jest
      .fn(() => ({
        json: jest.fn(),
      }))
      .mockReturnValue({ json: jest.fn() }),
  };

  it('Should send error response with provided status', () => {
    const error: IError = {
      message: 'An error',
      statusCode: 400,
      error: new Error(),
    };
    ResponseHandler.sendErrorResponse(res, error);
    expect(res.status).toBeCalledWith(400);
  });

  it('Should send error response with 500 if no provided status', () => {
    const error: IError = {
      message: 'An error',
      error: new Error(),
    };
    ResponseHandler.sendErrorResponse(res, error);
    expect(res.status).toBeCalledWith(500);
  });
});
