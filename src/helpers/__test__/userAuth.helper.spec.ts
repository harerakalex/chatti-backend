import { UserAuth } from '../userAuth.helper';
import bcrypt from 'bcrypt';

describe(UserAuth, () => {
  bcrypt.compareSync = jest.fn();

  it('Should encrypt the password', () => {
    UserAuth.unhashPassword('user password', 'hash password');
    expect(bcrypt.compareSync).toHaveBeenCalledTimes(1);
  });
});
