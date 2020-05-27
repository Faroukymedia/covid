import { TestBed } from '@angular/core/testing';
import { DocumentRefService } from './document-ref.service';

describe('DocumentRefService', () => {
  let documentRefService: DocumentRefService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentRefService],
    });

    documentRefService = TestBed.inject(DocumentRefService);
  });

  it('should be created', () => {
    expect(documentRefService).toBeTruthy();
  });
});
