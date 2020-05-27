export class MenuControllerMock {
  public static instance(): any {
    return {
      open: jest.fn(),
      close: jest.fn(),
      toggle: jest.fn(),
      enable: jest.fn(),
      swipeEnable: jest.fn(),
      swipeGesture: jest.fn(),
      isOpen: jest.fn(),
      isEnabled: jest.fn(),
      get: jest.fn(),
      getOpen: jest.fn(),
      getMenus: jest.fn()
    };
  }
}
