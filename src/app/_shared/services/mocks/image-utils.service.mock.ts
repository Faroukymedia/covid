export class ImageUtilsServiceMock {
  public static instance(): any {
    return {
      resizeImage: jest.fn().mockResolvedValue('')
    };
  }
}
