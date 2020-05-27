import { DeviceInfo } from '@capacitor/core';

export class DeviceServiceMock {
  public static instance(): any {
    return {
      getInfo: jest.fn().mockResolvedValue({ appVersion: '', appBuild: '' } as DeviceInfo),
      isApp: jest.fn().mockReturnValue(false),
      isIos: jest.fn().mockReturnValue(false),
      isAndroid: jest.fn().mockReturnValue(false),
      isTablet: jest.fn().mockReturnValue(false),
      isDesktop: jest.fn().mockReturnValue(false),
      isMobile: jest.fn().mockReturnValue(false),
      ready: jest.fn().mockReturnValue(Promise.resolve()),
    };
  }
}
