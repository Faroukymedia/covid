import { TestBed } from '@angular/core/testing';
import { DocumentRefService } from './dom/document-ref.service';
import { ImageUtilsService } from './image-utils.service';
import { DocumentRefServiceMock } from './dom/mocks/document-ref.service.mock';
import { DomFactoryService } from './dom/dom-factory.service';
import {
  DomFactoryServiceMock,
  MockFailedFileReader,
  MockFailedImage,
  MockSuccessImage
} from './dom/mocks/dom-factory.service.mock';
import { anyTypeAnnotation } from '@babel/types';

describe('ImageUtilsService', () => {
  let documentRefService: DocumentRefService;
  let domFactoryService: DomFactoryService;
  let service: ImageUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DocumentRefService, useFactory: () => DocumentRefServiceMock.instance() },
        { provide: DomFactoryService, useFactory: () => DomFactoryServiceMock.instance() }
      ]
    });

    documentRefService = TestBed.get(DocumentRefService);
    domFactoryService = TestBed.get(DomFactoryService);
    service = TestBed.get(ImageUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should resize the image ', async () => {
    const expectedResult = new File(['fakeFileResized'], 'fake-file2.jpeg', {
      type: 'image/jpg',
      lastModified: Date.now()
    });

    domFactoryService.createImage = jest.fn().mockReturnValue(new MockSuccessImage());
    documentRefService.document = {
      createElement: jest.fn().mockReturnValue({
        width: 1200,
        height: 800,
        getContext: jest.fn().mockReturnValue({
          drawImage: jest.fn(),
          canvas: {
            toBlob: jest
              .fn()
              .mockImplementation((blobCallback: BlobCallback, type?: string | undefined, quality?: any) => {
                blobCallback(('fakeFileResized' as any) as Blob);
              })
          }
        })
      })
    } as any;

    const result = await service.resizeImage(
      new File(['fakeFile'], 'fake-file2.jpeg', { type: 'image/jpg', lastModified: Date.now() })
    );

    expect(result).toEqual(expectedResult);
  });

  it('should resize the image ', async done => {
    domFactoryService.createImage = jest.fn().mockReturnValue(new MockSuccessImage());
    documentRefService.document = {
      createElement: jest.fn().mockReturnValue({
        width: 1200,
        height: 800,
        getContext: jest.fn().mockReturnValue({
          drawImage: jest.fn(),
          canvas: {
            toBlob: jest
              .fn()
              .mockImplementation((blobCallback: BlobCallback, type?: string | undefined, quality?: any) => {
                blobCallback(null);
              })
          }
        })
      })
    } as any;

    try {
      await service.resizeImage(
        new File(['fakeFile'], 'fake-file2.jpeg', { type: 'image/jpg', lastModified: Date.now() })
      );
    } catch (e) {
      done();
    }
  });

  it('should trow an error if there is a problem during image load ', async done => {
    domFactoryService.createImage = jest.fn().mockReturnValue(new MockFailedImage());

    try {
      await service.resizeImage(
        new File(['fakeFile'], 'fake-file2.jpeg', { type: 'image/jpg', lastModified: Date.now() })
      );
    } catch (e) {
      done();
    }
  });

  it('should read the image data', async () => {
    const expectedResult = 'data:image/jpg;base64,ZmFrZUZpbGU=';

    const result = await service.readImageAsDataURL(
      new File(['fakeFile'], 'fake-file2.jpeg', { type: 'image/jpg', lastModified: Date.now() })
    );

    expect(result).toEqual(expectedResult);
  });

  it('should throw an error if there is problem on fileToBase64', async done => {
    domFactoryService.createFileReader = jest.fn().mockReturnValue(new MockFailedFileReader());

    try {
      await service.readImageAsDataURL(
        new File(['fakeFile'], 'fake-file2.jpeg', { type: 'image/jpg', lastModified: Date.now() })
      );
    } catch (e) {
      done();
    }
  });
});
