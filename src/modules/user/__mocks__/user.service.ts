import { User } from '../../../database/models/User';
import { Repository } from 'sequelize-typescript';
import { MockRepository } from '../../../database/__mocks__';

class MockUserSevice extends MockRepository<User> {
  constructor(users: User[] = []) {
    super(User, users);
  }
}

export const mockUserRepo = (new MockUserSevice() as unknown) as Repository<
  User
>;
