import { Injectable } from '@angular/core';
import { Plugins, StatusBarBackgroundColorOptions, StatusBarStyle, StatusBarStyleOptions } from '@capacitor/core';
import { ANDROID_STATUS_BAR, IOS_STATUS_BAR, BLACK_STATUS_BAR } from 'app/constants';
import { DeviceService } from './device.service';

@Injectable({
  providedIn: 'root'
})
export class StatusBarService {
  constructor(private deviceService: DeviceService) {}

  public setDefaultStatusBar() {
    this.setBackgroundColor({ color: this.deviceService.isIos() ? IOS_STATUS_BAR : ANDROID_STATUS_BAR });
    this.setStyle({ style: StatusBarStyle.Dark });
  }

  public setBlackStatusBar() {
    this.setBackgroundColor({ color: BLACK_STATUS_BAR });
    this.setStyle({ style: StatusBarStyle.Dark });
  }

  public setBackgroundColor(options: StatusBarBackgroundColorOptions) {
    if (this.deviceService.isApp()) {
      return Plugins.StatusBar.setBackgroundColor(options);
    }
  }

  public setStyle(options: StatusBarStyleOptions) {
    if (this.deviceService.isApp()) {
      return Plugins.StatusBar.setStyle(options);
    }
  }
}
