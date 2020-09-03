import { Repository } from 'sequelize-typescript';
import { Picture } from '../../../database/models/Picture';
import { MockRepository } from '../../../database/__mocks__';
import { User } from '../../../database/models/User';

class MockPictureSevice extends MockRepository<Picture> {
  constructor(pictures: Picture[] = []) {
    super(Picture, pictures);
  }
}

export const mockPictureRepo = (new MockPictureSevice() as unknown) as Repository<
  Picture
>;
