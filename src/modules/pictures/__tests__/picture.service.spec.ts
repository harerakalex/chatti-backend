import PictureService from '../picture.service';
import { mockPictureRepo } from '../__mocks__/picture.service';
import { pictureInfo, updatePicture } from '../__mocks__/picture.mocks';

describe(PictureService, () => {
  let pictureService: PictureService;

  beforeAll(() => {
    pictureService = new PictureService(mockPictureRepo);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should create new picture', async () => {
    const result = await pictureService.savePicture(pictureInfo);
    expect(result.userId).toEqual(pictureInfo.userId);
  });

  it('should update picture if user already has a picture', async () => {
    const result = await pictureService.savePicture(updatePicture);
    expect(result.url).toEqual(updatePicture.url);
  });
});
