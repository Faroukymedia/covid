export class DeepLinkServiceMock {
  public static instance(): any {
    return {
      initDeepLink: jest.fn(),
      handleDeepLink: jest.fn(),
      handleEnvironmentSwitch: jest.fn(),
    };
  }
}
