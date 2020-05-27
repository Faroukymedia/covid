import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  AppSideMenuToggleSideMenu,
  DisableSideMenu,
  NavigationHeaderToggleSideMenu,
  SideMenuGuardDisableSideMenu,
  SideMenuGuardToggleSideMenu,
  ToggleSideMenu,
} from './side-menu.actions';

export interface SideMenuStateModel {
  isDisabled: boolean;
  isVisible: boolean;
}

@State<SideMenuStateModel>({
  name: 'SideMenu',
  defaults: {
    isDisabled: false,
    isVisible: false,
  },
})
@Injectable()
export class SideMenuState {
  @Selector()
  public static isDisabled(state: SideMenuStateModel): boolean {
    return state.isDisabled;
  }

  @Selector()
  public static isVisible(state: SideMenuStateModel): boolean {
    return state.isVisible;
  }

  @Action(SideMenuGuardDisableSideMenu)
  public disableSideMenu(context: StateContext<SideMenuStateModel>, action: DisableSideMenu): void {
    context.patchState({ isDisabled: action.payload });
  }

  @Action(SideMenuGuardToggleSideMenu)
  @Action(NavigationHeaderToggleSideMenu)
  @Action(AppSideMenuToggleSideMenu)
  public toggleSideMenu(context: StateContext<SideMenuStateModel>, action: ToggleSideMenu): void {
    let newState = !context.getState().isVisible;

    if (action.payload !== undefined) {
      newState = action.payload;
    }

    context.patchState({ isVisible: newState });
  }
}
