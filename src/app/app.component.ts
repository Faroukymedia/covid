import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { EnvironmentService } from '@shared/services/environment.service';
import { DeviceService } from '@shared/services/plugins/device.service';
import { SplashScreenService } from '@shared/services/plugins/splash-screen.service';
import { MenuState } from '@shared/store/menu.state';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements AfterViewInit {
  public isApp = false;
  public removeSideMenu = true;

  constructor(
    public environmentService: EnvironmentService,
    public deviceService: DeviceService,
    private changeDetector: ChangeDetectorRef,
    private splashScreenService: SplashScreenService,
    private store: Store
  ) {
    this.initializeApp();
  }

  public ngAfterViewInit(): void {
    this.isApp = this.deviceService.isApp();
    if (this.isApp && !environment.useFakeApp) {
      this.splashScreenService.hide();
    }
  }

  private initializeApp() {
    this.deviceService.ready().then(() => {
      this.store.select(MenuState.configuration).subscribe((configuration) => {
        this.removeSideMenu = !configuration;
        this.changeDetector.detectChanges();
      });
    });
  }
}
