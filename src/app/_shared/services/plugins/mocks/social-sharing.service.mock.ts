export class SocialSharingMock {
  public static instance(): any {
    return {
      share: jest.fn().mockResolvedValue(''),
    };
  }
}
