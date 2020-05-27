import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { DeviceService } from '@shared/services/plugins/device.service';
import { DeviceServiceMock } from '@shared/services/plugins/mocks/device.service.mock';
import { AppFooterComponent } from './app-footer.component';

describe('AppFooterComponent', () => {
  let component: AppFooterComponent;
  let fixture: ComponentFixture<AppFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppFooterComponent ],
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forRoot()
      ],
      providers: [{ provide: DeviceService, useValue: DeviceServiceMock.instance() }]
    }).compileComponents();

    fixture = TestBed.createComponent(AppFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
