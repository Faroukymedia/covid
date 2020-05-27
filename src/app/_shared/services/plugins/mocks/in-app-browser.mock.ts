import { of } from 'rxjs';

export class InAppBrowserMock {
  public static instance(): any {
    const inAppResult = {
      on: jest.fn(),
      close: jest.fn()
    };

    return {
      create: jest.fn().mockReturnValue(inAppResult)
    };
  }
}
