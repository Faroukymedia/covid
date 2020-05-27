import { Component, ViewEncapsulation } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { MenuConfiguration } from '@shared/models/side-menu-configuration.model';
import { DeviceService } from '@shared/services/plugins/device.service';
import { MenuState } from '@shared/store/menu.state';
import { SideMenuState } from '@shared/store/side-menu.state';
import { Observable } from 'rxjs';
import { AppSideMenuToggleSideMenu } from '@shared/store/side-menu.actions';

@Component({
  selector: 'mwh-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['page-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PageLayoutComponent {
  @Select(SideMenuState.isVisible)
  public toggleSideMenu$!: Observable<boolean>;

  @Select(MenuState.configuration)
  public configuration$!: Observable<MenuConfiguration>;

  public isApp: boolean;

  constructor(private deviceService: DeviceService, private store: Store) {
    this.isApp = this.deviceService.isApp();
  }

  public toggleSideMenu(toggle: boolean) {
    if (!this.store.selectSnapshot(SideMenuState.isDisabled)) {
      this.store.dispatch(new AppSideMenuToggleSideMenu(toggle));
    }
  }
}
