import { HammerGestureConfig } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

@Injectable()
export class HammerConfiguration extends HammerGestureConfig {
  public overrides = {
    pinch: { enable: false },
    rotate: { enable: false },
  };
}
