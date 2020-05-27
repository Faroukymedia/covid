import { Injectable } from '@angular/core';
import { Plugins, AppUrlOpen } from '@capacitor/core';
import { Observable, Subject } from 'rxjs';
import { DeviceService } from './device.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public onAppUrlOpen$: Observable<AppUrlOpen>;

  private appUrlOpenSubject: Subject<AppUrlOpen>;

  constructor(
    private deviceService: DeviceService) {
    this.appUrlOpenSubject = new Subject<AppUrlOpen>();
    this.onAppUrlOpen$ = this.appUrlOpenSubject.asObservable();

    if (this.deviceService.isApp()) {
      this.initPluginEvents();
    }
  }

  private initPluginEvents() {
    Plugins.App.addListener('appUrlOpen', (data) => this.appUrlOpenSubject.next(data));
  }
}
