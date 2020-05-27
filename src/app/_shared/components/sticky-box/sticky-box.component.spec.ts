import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule, Store, Actions, ofActionDispatched } from '@ngxs/store';
import { ShowStickyBox, ChangeHiddenPropertyStickyBox } from '@shared/store/sticky-box.action';
import { StickyBoxState } from '@shared/store/sticky-box.state';
import { StickyBoxComponent } from './sticky-box.component';

describe('StickyBoxComponent', () => {
  let component: StickyBoxComponent;
  let fixture: ComponentFixture<StickyBoxComponent>;
  let store: Store;
  let actions$: Actions;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StickyBoxComponent],
      imports: [IonicModule.forRoot(), NgxsModule.forRoot([StickyBoxState]), TranslateModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(StickyBoxComponent);
    component = fixture.componentInstance;
    component.stickyBox = { nativeElement: { present: jest.fn() } };
    store = TestBed.inject(Store);
    actions$ = TestBed.inject(Actions);
    component.ngAfterViewInit();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the sticky box with the correct message', (done) => {
    store.dispatch(new ShowStickyBox({ text: 'fake message' }));
    component.isHidden$.subscribe((isHidden) => {
      expect(isHidden).toBe(false);
      done();
    });
    expect(component.stickyBox.nativeElement.present).toHaveBeenCalledWith('fake message');
  });

  it('should call ChangeHiddenPropertyStickyBox when the hidden state of sticky box change', (done) => {
    actions$.pipe(ofActionDispatched(ChangeHiddenPropertyStickyBox)).subscribe((action) => {
      expect(action.hidden).toBe(true);
      done();
    });
    component.onHideEvent();
  });
});
