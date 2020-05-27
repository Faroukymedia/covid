import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Actions, NgxsModule, ofActionDispatched } from '@ngxs/store';
import { SideMenuGuardSetMenuConfiguration } from '@shared/store/menu.actions';
import { MenuState } from '@shared/store/menu.state';
import { SideMenuGuardDisableSideMenu } from '@shared/store/side-menu.actions';
import { SideMenuState } from '@shared/store/side-menu.state';
import { Observable } from 'rxjs';
import { SideMenuGuard } from './side-menu.guard';

describe('SideMenuGuard', () => {
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([SideMenuState, MenuState])],
      providers: [SideMenuGuard],
    });

    actions$ = TestBed.get(Actions);
  });

  it('should be created', () => {
    const sideMenuGuard: SideMenuGuard = TestBed.get(SideMenuGuard);
    expect(sideMenuGuard).toBeTruthy();
  });

  it('should disable the Side Menu when navigating on route with no isSideMenuPresent data', (done) => {
    actions$.pipe(ofActionDispatched(SideMenuGuardDisableSideMenu)).subscribe((action) => {
      expect(action.payload).toStrictEqual(true);
      done();
    });

    const sideMenuGuard: SideMenuGuard = TestBed.get(SideMenuGuard);

    sideMenuGuard.canActivateChild(new ActivatedRouteSnapshot(), { url: 'testUrl' } as RouterStateSnapshot);
  });

  it('should delete the configuration if the route data specify it', (done) => {
    actions$.pipe(ofActionDispatched(SideMenuGuardSetMenuConfiguration)).subscribe((action) => {
      expect(action.payload).toBeTruthy();
      done();
    });

    const sideMenuGuard: SideMenuGuard = TestBed.get(SideMenuGuard);
    const routeSnapshot = new ActivatedRouteSnapshot();
    routeSnapshot.data = { isSideMenuPresent: true };

    sideMenuGuard.canActivateChild(routeSnapshot, { url: 'testUrl' } as RouterStateSnapshot);
  });
});
