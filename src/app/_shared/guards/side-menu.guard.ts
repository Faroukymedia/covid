import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';
import { SideMenuGuardSetMenuConfiguration } from '@shared/store/menu.actions';
import { MenuState } from '@shared/store/menu.state';
import { SideMenuGuardDisableSideMenu, SideMenuGuardToggleSideMenu } from '@shared/store/side-menu.actions';
import { Observable } from 'rxjs';
import { HomePageGetWorldSummary, HomePageGetPosition } from 'app/home/store/covid.actions';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

@Injectable({
  providedIn: 'root',
})
export class SideMenuGuard implements CanActivateChild {
  constructor(private store: Store, private geolocation: Geolocation, private locationAccuracy: LocationAccuracy) { }

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

      /* this.locationAccuracy.canRequest().then((canRequest: boolean) => {

       if (canRequest) {
         // the accuracy option will be ignored by iOS
         this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
           () => {
             console.log('Request successful');
           }, (error: any) => console.log('Error requesting location permissions', error)
         );
       }  }); */

      // client Position
      this.geolocation.getCurrentPosition().then((resp) => {
        this.store.dispatch(new HomePageGetPosition((resp.coords.latitude).toString(),
          (resp.coords.longitude).toString()));
      }).catch((error) => {
        console.log('Error getting location', error);
        this.store.dispatch(new HomePageGetPosition('33.9506959', '-6.8672677'));
      });

    }
    return true;
  }
}
