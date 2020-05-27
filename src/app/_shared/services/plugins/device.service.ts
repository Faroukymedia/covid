import { Injectable } from '@angular/core';
import { DeviceInfo, Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  constructor(private platform: Platform) {}

  public getInfo(): Promise<DeviceInfo> {
    return Plugins.Device.getInfo();
  }

  public isApp(): boolean {
    return environment.useFakeApp || this.platform.is('hybrid');
  }

  public isIos(): boolean {
    return this.platform.is('ios');
  }

  public isAndroid(): boolean {
    return this.platform.is('android');
  }

  public isTablet(): boolean {
    return this.platform.is('tablet');
  }

  public isDesktop(): boolean {
    return this.platform.is('desktop');
  }

  public isMobile(): boolean {
    return this.platform.is('mobile');
  }

  public ready(): Promise<string> {
    return this.platform.ready();
  }
}
