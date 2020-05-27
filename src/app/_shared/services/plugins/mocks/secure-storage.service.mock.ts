export class SecureStorageServiceMock {
  public static instance(): any {
    return {
      setObject: jest.fn(),
      getObject: jest.fn(),
      setItem: jest.fn(),
      getItem: jest.fn(),
      clear: jest.fn(),
      removeItem: jest.fn(),
    };
  }
}
