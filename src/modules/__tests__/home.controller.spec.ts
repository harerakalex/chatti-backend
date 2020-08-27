import { HomeController } from '../home/home.controller';

describe('HomeController', () => {
  let req: any;
  let res: any;

  req = {};

  res = {
    status: jest
      .fn(() => ({
        json: jest.fn(),
      }))
      .mockReturnValue({ json: jest.fn() }),
  };

  it('should return a welcome massage', async () => {
    await HomeController.LoadHomepage(req, res);
    const response = {
      status: 200,
      message: 'Welcome to Chatti App.',
    };
    expect(res.status).toBeCalledWith(200);
    expect(res.status().json).toBeCalledWith(response);
  });
});
