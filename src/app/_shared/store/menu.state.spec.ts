import { TestBed } from '@angular/core/testing';
import { Navigate } from '@ngxs/router-plugin';
import { Actions, NgxsModule, ofActionDispatched, Store } from '@ngxs/store';
import { HeaderTab } from '@shared/models/header-tab.model';
import { MenuConfiguration } from '@shared/models/side-menu-configuration.model';
import { MenuState } from './menu.state';
import { AppSideMenuLogoutUser } from './user.actions';
import { SideMenuGuardSetMenuConfiguration, SideMenuActivateHeaderTab } from './menu.actions';

describe('MenuState', () => {
  let store: Store;
  let actions$: Actions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([MenuState])],
      providers: [MenuState],
    });

    actions$ = TestBed.inject(Actions);
    store = TestBed.inject(Store);
    store.reset({
      Menu: {
        configuration: {
          primaryActions: [
            {
              title: 'OtherAction1',
              isActive: false,
              id: 'tab-otheraction1',
              route: 'otheraction1',
            },
            {
              title: 'fakeTitle2',
              isActive: false,
              id: 'tab-fake2',
              action: new AppSideMenuLogoutUser(),
            },
            {
              title: 'fakeTitle3',
              isActive: false,
              id: 'tab-fake3',
            },
          ],
        },
      },
    });
  });

  it('should be created', () => {
    const sideMenuState: MenuState = TestBed.inject(MenuState);
    expect(sideMenuState).toBeTruthy();
  });

  describe('When SideMenuGuardSetSideMenuConfiguration is dispatched', () => {
    const configuration = {
      primaryActions: [
        {
          title: 'fakeTitle1',
          isActive: true,
          id: 'tab-fake1',
          route: 'fakeroute1',
        },
      ],
      bottomAction: {
        title: 'fakeBottomTitle',
        isActive: false,
        id: 'tab-fakeBottom',
        route: 'fakebottomroute',
      },
    } as MenuConfiguration;

    it('should set primary actions', (done) => {
      store.dispatch(new SideMenuGuardSetMenuConfiguration(configuration, 'fakeroute2')).subscribe(() => {
        const state = store.selectSnapshot(MenuState);
        expect(
          state.configuration.primaryActions.reduce((acc: boolean, a: HeaderTab) => acc && a.isActive, false)
        ).toBe(false);
        done();
      });
    });
  });

  describe('When a tab is activate through ActivateHeaderTab action', () => {
    it('should call route and enable isActive on tab containing route', (done) => {
      const tab = {
        title: 'OtherAction1',
        isActive: false,
        id: 'tab-otheraction1',
        route: 'otheraction1',
      } as HeaderTab;

      actions$.pipe(ofActionDispatched(Navigate)).subscribe((action: Navigate) => {
        expect(action.path).toStrictEqual(['otheraction1']);
        done();
      });

      store.dispatch(new SideMenuActivateHeaderTab(tab));
      const state = store.selectSnapshot(MenuState);

      expect(state.configuration.primaryActions.find((a: HeaderTab) => a.route === 'otheraction1').isActive).toBe(true);
    });

    it('should call action on tab containing action', (done) => {
      const tab = {
        title: 'fakeTitle2',
        isActive: false,
        id: 'tab-fake2',
        action: new AppSideMenuLogoutUser(),
      } as HeaderTab;

      actions$.pipe(ofActionDispatched(AppSideMenuLogoutUser)).subscribe(() => {
        done();
      });

      store.dispatch(new SideMenuActivateHeaderTab(tab));
    });

    it('should test if no route or action is specified', () => {
      const tab = {
        title: 'fakeTitle3',
        isActive: false,
        id: 'tab-fake3',
      };
      store.dispatch(new SideMenuActivateHeaderTab(tab));
    });
  });
});
