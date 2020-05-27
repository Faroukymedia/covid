import { TestBed } from '@angular/core/testing';
import { HammerConfiguration } from './hammer.configuration';

describe('HammerConfiguration', () => {
  let hammerConfiguration: HammerConfiguration;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HammerConfiguration],
    });
    hammerConfiguration = TestBed.inject(HammerConfiguration);
  });

  it('should be created', () => {
    expect(hammerConfiguration).toBeTruthy();
  });

  it('should disable pinch and rotate gesture to prevent deactivate vertical scrolling', () => {
    expect(hammerConfiguration.overrides.pinch.enable).toBe(false);
    expect(hammerConfiguration.overrides.rotate.enable).toBe(false);
  });
});
