import { TestBed } from '@angular/core/testing';
import { WindowRefService } from './window-ref.service';

describe('WindowService', () => {
  let windowRefService: WindowRefService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WindowRefService
      ]
    });

    windowRefService = TestBed.inject(WindowRefService);
  });

  it('should be created', () => {
    expect(windowRefService).toBeTruthy();
  });
});
