import { TestBed } from '@angular/core/testing';
import { DomFactoryService } from './dom-factory.service';

describe('DomFactoryService', () => {
  let domFactoryService: DomFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomFactoryService],
    });

    domFactoryService = TestBed.inject(DomFactoryService);
  });

  it('should be created', () => {
    expect(domFactoryService).toBeTruthy();
  });

  it('should create FileReader', () => {
    expect(domFactoryService.createFileReader()).toBeInstanceOf(FileReader);
  });

  it('should create Image', () => {
    expect(domFactoryService.createImage()).toBeInstanceOf(Image);
  });
});
