import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';
import { SideMenuGuardSetMenuConfiguration } from '@shared/store/menu.actions';
import { MenuState } from '@shared/store/menu.state';
import { SideMenuGuardDisableSideMenu, SideMenuGuardToggleSideMenu } from '@shared/store/side-menu.actions';
import { Observable } from 'rxjs';
import { HomePageGetWorldSummary, HomePageGetPosition } from 'app/home/store/covid.actions';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { StorageService } from '@shared/services/plugins/storage.service';
import { PositionService } from 'app/home/services/position.service';

@Injectable({
  providedIn: 'root',
})
export class SideMenuGuard implements CanActivateChild {
  constructor(
    private store: Store,
    private geolocation: Geolocation,
    private storageService: StorageService,
    private positionService: PositionService) { }

  public canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!route.data?.isSideMenuPresent) {
      this.store.dispatch([
        new SideMenuGuardSetMenuConfiguration(undefined),
        new SideMenuGuardToggleSideMenu(false),
        new SideMenuGuardDisableSideMenu(true)
      ]);
    } else {
      const configuration = this.store.selectSnapshot(MenuState.configuration);
      this.store.dispatch([
        new SideMenuGuardSetMenuConfiguration(configuration, state.url),
        new SideMenuGuardToggleSideMenu(false),
        new SideMenuGuardDisableSideMenu(false),
        new HomePageGetWorldSummary()
      ]);

      // client Position
      this.storageService.getItem('countryCode').then((resolve) => {
        console.log((resolve));
        if (!resolve) {
          console.log(1);
          this.geolocation.getCurrentPosition().then((resp) => {
            this.positionService.setPosition(resp);
          }).catch((error) => {
            console.log('Error getting location', error);
            // this.store.dispatch(new HomePageGetPosition('33.9506959', '-6.8672677'));
          });

          const watch = this.geolocation.watchPosition();
          watch.subscribe((data) => {
            this.positionService.setPosition(data);
          });
        }
      });
    }
    return true;
  }
}
