export class DocumentRefServiceMock {
  public static instance() {
    return {
      document: {
        createElement: jest.fn().mockReturnValue({})
      }
    };
  }
}
