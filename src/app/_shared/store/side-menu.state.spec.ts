import { TestBed } from '@angular/core/testing';
import { Actions, NgxsModule, Store } from '@ngxs/store';
import { AppSideMenuToggleSideMenu, SideMenuGuardDisableSideMenu } from './side-menu.actions';
import { SideMenuState } from './side-menu.state';
import { MenuState } from './menu.state';

describe('SideMenuState', () => {
  let store: Store;
  let actions$: Actions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([SideMenuState, MenuState])],
      providers: [SideMenuState],
    });

    actions$ = TestBed.inject(Actions);
    store = TestBed.inject(Store);
    store.reset({
      SideMenu: {
        isDisabled: true,
        isVisible: true,
      },
    });
  });

  it('should be created', () => {
    const sideMenuState: SideMenuState = TestBed.inject(SideMenuState);
    expect(sideMenuState).toBeTruthy();
  });

  it('should return the current disable state', () => {
    const isDisabled = store.selectSnapshot(SideMenuState.isDisabled);
    expect(isDisabled).toBe(true);
  });

  it('should return the current visibility state', () => {
    const isVisible = store.selectSnapshot(SideMenuState.isVisible);
    expect(isVisible).toBe(true);
  });

  it('should set the isDisabled state', () => {
    store.dispatch(new SideMenuGuardDisableSideMenu(true));

    let isDisabled = store.selectSnapshot(SideMenuState.isDisabled);
    expect(isDisabled).toBe(true);

    store.dispatch(new SideMenuGuardDisableSideMenu(false));

    isDisabled = store.selectSnapshot(SideMenuState.isDisabled);
    expect(isDisabled).toBe(false);
  });

  it('should put the toggle state according to the payload when false', () => {
    const isVisible = store.selectSnapshot(SideMenuState.isVisible);
    expect(isVisible).toBe(true);

    store.dispatch(new AppSideMenuToggleSideMenu(false));

    const newIsVisible = store.selectSnapshot(SideMenuState.isVisible);
    expect(newIsVisible).toBe(false);
  });

  it('should put the toggle state according to the payload when true', () => {
    const isVisible = store.selectSnapshot(SideMenuState.isVisible);
    expect(isVisible).toBe(true);

    store.dispatch(new AppSideMenuToggleSideMenu(true));

    const newIsVisible = store.selectSnapshot(SideMenuState.isVisible);
    expect(newIsVisible).toBe(true);
  });
});
