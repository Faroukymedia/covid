export class WindowRefServiceMock {
  public static instance() {
    return {
      window: {
        history: {
          back: jest.fn(),
        },
        open: jest.fn(),
        URL: {
          createObjectURL: jest.fn(),
        },
        navigator: {
          userAgent: 'dummyUserAgent',
        },
        requestAnimationFrame: (callback: FrameRequestCallback) => callback(0),
      },
    };
  }
}
