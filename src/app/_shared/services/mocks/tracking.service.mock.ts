export class TrackingServiceMock {
  public static instance(): any {
    return {
      initializeTracking: jest.fn(),
      setDefaultTcVars: jest.fn(),
      sendTrackEvent: jest.fn(),
      setContractInfo: jest.fn(),
    };
  }
}
