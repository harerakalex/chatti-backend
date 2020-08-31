import UserService from '../user.service';
import { mockUserRepo } from '../__mocks__/user.service';
import { userInfo } from '../__mocks__/user.mocks';

describe(UserService, () => {
  let userService: UserService;

  beforeAll(() => {
    userService = new UserService(mockUserRepo);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('Should create a user', async () => {
    const result = await userService.createUser(userInfo);
    expect(result.firstName).toEqual(userInfo.firstName);
  });

  it('Should find a user when given email', async () => {
    const { email } = userInfo;
    const result = await userService.findUserByEmail(email);
    expect(result.email).toEqual(email);
  });

  it('Should return null if a given email is not in the database', async () => {
    const email = 'fake email';
    const result = await userService.findUserByEmail(email);
    expect(result).toEqual(null);
  });
});
