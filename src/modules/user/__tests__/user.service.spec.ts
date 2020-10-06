import UserService from '../user.service';
import { mockUserRepo } from '../__mocks__/user.service';
import { userInfo, updateUserInfo } from '../__mocks__/user.mocks';
// import { User } from '../../../database/models/User';

describe(UserService, () => {
  let userService: UserService;
  let userServiceUsingDb: any;
  // let myspy: any;

  beforeAll(() => {
    userService = new UserService(mockUserRepo);
    // userServiceUsingDb = new UserService();
    // myspy = jest.spyOn(User, 'findAll');
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

  it('Should update user', async () => {
    const result = await userService.updateUser(updateUserInfo);
    expect(result.bio).toEqual(updateUserInfo.bio);
    expect(result.displayName).toEqual(updateUserInfo.displayName);
  });

  it('Should find the users', async () => {
    const result = await userService.findUserByNames('carlos');
    expect(result[0].firstName).toEqual(userInfo.firstName);
  });

  it('Should find a user profile', async () => {
    const result = await userService.findUserByDisplayName(
      userInfo.displayName
    );
    expect(result.firstName).toEqual(userInfo.firstName);
  });

  // it('Should find a user', async () => {
  //   myspy.mockResolvedValue(mockCreatedProvider);
  //   const result = await userServiceUsingDb.findUserByNames('carlos1');
  //   console.log('result=', result);
  //   expect(result[0].firstName).toEqual(userInfo.firstName);
  // });
});
