import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Actions, NgxsModule, Store } from '@ngxs/store';
import { DeviceService } from '@shared/services/plugins/device.service';
import { DeviceServiceMock } from '@shared/services/plugins/mocks/device.service.mock';
import { StatusBarServiceMock } from '@shared/services/plugins/mocks/status-bar.service.mock';
import { StatusBarService } from '@shared/services/plugins/status-bar.service';
import { SideMenuState } from '@shared/store/side-menu.state';
import { Observable } from 'rxjs';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let deviceService: DeviceService;
  let actions$: Observable<any>;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      imports: [IonicModule.forRoot(), NgxsModule.forRoot([SideMenuState])],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: DeviceService, useValue: DeviceServiceMock.instance() },
        { provide: StatusBarService, useValue: StatusBarServiceMock.instance() },
      ],
    }).compileComponents();

    deviceService = TestBed.get(DeviceService);
    actions$ = TestBed.get(Actions);
    store = TestBed.get(Store);

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
