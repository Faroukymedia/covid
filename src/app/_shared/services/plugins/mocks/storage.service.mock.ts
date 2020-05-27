export class StorageServiceMock {
  public static instance(): any {
    return {
      setObject: jest.fn(),
      getObject: jest.fn(),
      setItem: jest.fn(),
      getItem: jest.fn(),
      keys: jest.fn(),
      clear: jest.fn(),
      removeItem: jest.fn(),
    };
  }
}
