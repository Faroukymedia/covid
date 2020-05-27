import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HammerModule, HAMMER_LOADER } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { Actions, NgxsModule, ofActionDispatched, Store } from '@ngxs/store';
import { DeviceService } from '@shared/services/plugins/device.service';
import { DeviceServiceMock } from '@shared/services/plugins/mocks/device.service.mock';
import { MenuState } from '@shared/store/menu.state';
import { AppSideMenuToggleSideMenu } from '@shared/store/side-menu.actions';
import { SideMenuState } from '@shared/store/side-menu.state';
import { PageLayoutComponent } from './page-layout.component';

describe('PageLayoutComponent', () => {
  let component: PageLayoutComponent;
  let fixture: ComponentFixture<PageLayoutComponent>;
  let deviceService: DeviceService;
  let actions$: Actions;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageLayoutComponent],
      imports: [IonicModule.forRoot(), NgxsModule.forRoot([SideMenuState, MenuState]), HammerModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: DeviceService, useValue: DeviceServiceMock.instance() },
        {
          provide: HAMMER_LOADER,
          useValue: () =>
            new Promise(() => {
              return {};
            }),
        },
      ],
    }).compileComponents();

    deviceService = TestBed.inject(DeviceService);
    actions$ = TestBed.inject(Actions);
    store = TestBed.inject(Store);

    store.reset({
      SideMenu: {
        isDisabled: false,
        isVisible: false,
      },
    });

    fixture = TestBed.createComponent(PageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the side menu on swipe', (done) => {
    actions$.pipe(ofActionDispatched(AppSideMenuToggleSideMenu)).subscribe((action) => {
      expect(action.payload).toBe(true);
      done();
    });

    component.toggleSideMenu(true);
  });

  it('should not toggle the side menu on swipe if it is disabled', () => {
    store.reset({
      SideMenu: {
        isDisabled: true,
        isVisible: false,
      },
    });
    component.toggleSideMenu(true);
    expect(store.selectSnapshot(SideMenuState.isVisible)).toBe(false);
  });
});
