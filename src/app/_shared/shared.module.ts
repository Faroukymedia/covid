import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NgxsModule } from '@ngxs/store';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NavigationHeaderComponent } from './components/navigation-header/navigation-header.component';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { ModalComponent } from './components/modal/modal.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { StickyBoxComponent } from './components/sticky-box/sticky-box.component';
import { IsMoreRecentThanPipe } from './pipe/is-more-recent-than.pipe';
import { ParseDatePipe } from './pipe/parse-date.pipe';
import { SideMenuState } from './store/side-menu.state';
import { SummaryComponent } from './components/summary/summary.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([SideMenuState])],
  declarations: [
    NavigationHeaderComponent,
    PageLayoutComponent,
    SideMenuComponent,
    AppFooterComponent,
    LoaderComponent,
    StickyBoxComponent,
    ParseDatePipe,
    IsMoreRecentThanPipe,
    ModalComponent,
    SummaryComponent
  ],
  exports: [
    NavigationHeaderComponent,
    PageLayoutComponent,
    SideMenuComponent,
    AppFooterComponent,
    LoaderComponent,
    StickyBoxComponent,
    ParseDatePipe,
    IsMoreRecentThanPipe,
    ModalComponent,
    SummaryComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [InAppBrowser, Geolocation, LocationAccuracy],
    };
  }
}
