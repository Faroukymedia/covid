import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule, Store, Actions, ofActionDispatched } from '@ngxs/store';
import { InAppBrowserMock } from '@shared/services/plugins/mocks/in-app-browser.mock';
import { UserState } from '@shared/store/user.state';
import { OAuthService } from 'angular-oauth2-oidc';
import { OAuthServiceMock } from 'mocks/oauth.service.mock';
import { SideMenuComponent } from './side-menu.component';
import { HeaderTab } from '@shared/models/header-tab.model';
import { Navigate } from '@ngxs/router-plugin';
import { SideMenuActivateHeaderTab } from '@shared/store/menu.actions';

describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;
  let store: Store;
  let actions$: Actions;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SideMenuComponent],
      imports: [HttpClientModule, IonicModule.forRoot(), TranslateModule.forRoot(), NgxsModule.forRoot([UserState])],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: OAuthService, useFactory: () => OAuthServiceMock.instance() },
        { provide: InAppBrowser, useFactory: () => InAppBrowserMock.instance() },
      ],
    }).compileComponents();

    store = TestBed.get(Store);
    actions$ = TestBed.get(Actions);
    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should dispatch an action SideMenuActivateHeaderTab on tab click', (done) => {
    const tab = {
      title: 'fakeTitle',
      isActive: true,
      id: 'tab-fake',
      hasDividerBottom: true,
      route: '/fakeroute',
    } as HeaderTab;

    actions$.pipe(ofActionDispatched(SideMenuActivateHeaderTab)).subscribe((action: SideMenuActivateHeaderTab) => {
      expect(action.tab).toBe(tab);
      done();
    });

    component.onActionClicked(tab);
  });

  it('should dispatch an action Navigate with toue param parametres on settings click', (done) => {
    actions$.pipe(ofActionDispatched(Navigate)).subscribe((action: Navigate) => {
      expect(action.path).toStrictEqual(['parametres']);
      done();
    });

    component.goToSettings();
  });
});
