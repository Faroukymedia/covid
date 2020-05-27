export class SessionStorageServiceMock {
  public static instance(): any {
    return {
      sessionStorage: {
        setItem: jest.fn()
      }
    };
  }
}
