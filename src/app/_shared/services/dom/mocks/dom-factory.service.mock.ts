export class DomFactoryServiceMock {
  public static instance() {
    return {
      createFileReader: jest.fn().mockReturnValue(new FileReader()),
      createImage: jest.fn().mockReturnValue(new Image())
    };
  }
}

export class MockFailedFileReader {
  public onerror: ((this: MockFailedFileReader, ev: ProgressEvent) => any) | null = null;
  public onload: ((this: MockFailedFileReader, ev: ProgressEvent) => any) | null = null;

  public readAsDataURL(e: any) {
    if (this.onerror) {
      this.onerror(new ProgressEvent('error'));
    }
  }
}

export class MockFailedImage {
  public onerror: OnErrorEventHandler | null = null;
  public onload: ((this: GlobalEventHandlers, ev: Event) => any) | null = null;

  public set src(str: string) {
    if (this.onerror) {
      this.onerror('error');
    }
  }
}

export class MockSuccessImage {
  public onerror: OnErrorEventHandler | null = null;
  public onload: ((this: MockSuccessImage, ev: Event) => any) | null = null;

  public set src(str: string) {
    if (this.onload) {
      this.onload(new Event('success'));
    }
  }
}
