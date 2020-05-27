import { TestBed } from '@angular/core/testing';
import { SessionStorageService } from './session-storage.service';

describe('SessionService', () => {
  let sessionStorageService: SessionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionStorageService],
    });

    sessionStorageService = TestBed.inject(SessionStorageService);
  });

  it('should be created', () => {
    expect(sessionStorageService).toBeTruthy();
  });
});
