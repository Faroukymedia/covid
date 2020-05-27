import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Actions, NgxsModule, Store } from '@ngxs/store';
import { HideLoader, ShowLoader } from '@shared/store/loader.action';
import { LoaderState } from '@shared/store/loader.state';
import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let actions$: Actions;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderComponent ],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot(), NgxsModule.forRoot([LoaderState])],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    actions$ = TestBed.get(Actions);
    store = TestBed.get(Store);

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    component.loaderElement = { nativeElement: { create: jest.fn(), dismiss: jest.fn() } };
    component.ngAfterViewInit();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide the loader on initialization', () => {
    expect(component.loaderElement.nativeElement.dismiss).toHaveBeenCalled();
  });

  it('should show the loader on action ShowLoader with no custom text', done => {
    jest.resetAllMocks();
    store.dispatch(new ShowLoader());
    expect(component.loaderElement.nativeElement.create).toHaveBeenCalled();
    component.loaderText$.subscribe(text => {
      expect(text).toBe('loader.default.text');
      done();
  });
  });

  it('should show the loader on action ShowLoader with custom text', done => {
    jest.resetAllMocks();
    store.dispatch(new ShowLoader('loading'));
    expect(component.loaderElement.nativeElement.create).toHaveBeenCalled();
    component.loaderText$.subscribe(text => {
      expect(text).toBe('loading');
      done();
    });
  });

  it('should not hide the loader if called ShowLoader twice and HideLoader once', () => {
    jest.resetAllMocks();
    store.dispatch(new ShowLoader());
    store.dispatch(new ShowLoader('loading'));
    store.dispatch(new HideLoader());
    expect(component.loaderElement.nativeElement.create).toHaveBeenCalled();
    expect(component.loaderElement.nativeElement.dismiss).not.toHaveBeenCalled();
  });
});
