export class StatusBarServiceMock {
  public static instance(): any {
    return {
      setBackgroundColor: jest.fn().mockReturnValue(Promise.resolve()),
      setStyle: jest.fn().mockReturnValue(Promise.resolve()),
      setBlackStatusBar: jest.fn(),
      setDefaultStatusBar: jest.fn()
    };
  }
}
