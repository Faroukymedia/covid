import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeFrExtra from '@angular/common/locales/extra/fr';
import localeFr from '@angular/common/locales/fr';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';
import { HammerConfiguration } from '@shared/configuration/hammer.configuration';
import { SharedModule } from '@shared/shared.module';
import { LoaderState } from '@shared/store/loader.state';
import { MenuState } from '@shared/store/menu.state';
import { SideMenuState } from '@shared/store/side-menu.state';
import { StickyBoxState } from '@shared/store/sticky-box.state';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageContainerComponent } from './page-container/page-container.component';

@NgModule({
  declarations: [AppComponent, PageContainerComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    NgxsModule.forRoot([SideMenuState, LoaderState, MenuState, StickyBoxState]),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    IonicModule.forRoot(),
    OAuthModule.forRoot(),
    SharedModule.forRoot(),
    HammerModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    StatusBar,
    SplashScreen,
    SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfiguration },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

registerLocaleData(localeFr, 'fr-FR', localeFrExtra);
