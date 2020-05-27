import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Actions, NgxsModule, ofActionDispatched, Store } from '@ngxs/store';
import { DeviceService } from '@shared/services/plugins/device.service';
import { DeviceServiceMock } from '@shared/services/plugins/mocks/device.service.mock';
import { NavigationHeaderActivateHeaderTab } from '@shared/store/menu.actions';
import { NavigationHeaderToggleSideMenu } from '@shared/store/side-menu.actions';
import { SideMenuState } from '@shared/store/side-menu.state';
import { NavigationHeaderComponent } from './navigation-header.component';

describe('NavigationHeaderComponent', () => {
  let component: NavigationHeaderComponent;
  let fixture: ComponentFixture<NavigationHeaderComponent>;
  let deviceService: DeviceService;
  let store: Store;
  let actions: Actions;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationHeaderComponent],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot(), NgxsModule.forRoot([SideMenuState])],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: DeviceService, useValue: DeviceServiceMock.instance() }],
    }).compileComponents();

    deviceService = TestBed.get(DeviceService);
    store = TestBed.get(Store);
    actions = TestBed.get(Actions);

    fixture = TestBed.createComponent(NavigationHeaderComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call NavigationHeaderActivateHeaderTab action', (done) => {
    const tab = { title: 'title1', id: 'id1', isActive: false, callback: jest.fn() };
    actions
      .pipe(ofActionDispatched(NavigationHeaderActivateHeaderTab))
      .subscribe((action: NavigationHeaderActivateHeaderTab) => {
        expect(action.tab).toBe(tab);
        done();
      });
    component.tabClick(tab);
  });

  it('should just emit an event if  the tab callback is undefined', (done) => {
    const tab = { title: 'title1', id: 'id1', isActive: false, callback: undefined };
    component.tabClicked.subscribe((id: string) => {
      expect(id).toBe('id1');
      done();
    });

    component.tabClick(tab);
  });

  it('should emit an event when the logo is clicked', (done) => {
    component.logoClicked.subscribe(() => done());

    component.logoClick();
  });

  it('should emit an event when the side menu is clicked', (done) => {
    actions.pipe(ofActionDispatched(NavigationHeaderToggleSideMenu)).subscribe((action) => {
      done();
    });
    component.sideMenuClick();
  });

  it('should emit an event when the side menu is clicked', (done) => {
    actions.pipe(ofActionDispatched(NavigationHeaderToggleSideMenu)).subscribe((action) => {
      done();
    });
    component.hamburgerMenuClick();
  });

  it('should emit an event when the left mobile is clicked', (done) => {
    component.leftMobileClicked.subscribe(() => done());

    component.leftMobileClick();
  });
});
