export class LocalNotificationsServiceMock {
  public static instance(): any {
    return {
      areEnabled: jest.fn().mockResolvedValue(true)
    };
  }
}
