export class SplashScreenServiceMock {
  public static instance(): any {
    return {
      hide: jest.fn().mockReturnValue(Promise.resolve())
    };
  }
}
