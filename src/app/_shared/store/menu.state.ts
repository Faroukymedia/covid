import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { HeaderTab } from '@shared/models/header-tab.model';
import { MenuConfiguration } from '@shared/models/side-menu-configuration.model';
import {  HOME_PAGE, COUNTRY_PAGE } from 'app/constants';
import {
  ActivateHeaderTab,
  NavigationHeaderActivateHeaderTab,
  SideMenuActivateHeaderTab,
  SideMenuGuardSetMenuConfiguration,
} from './menu.actions';

export interface MenuStateModel {
  configuration: MenuConfiguration;
}

const defaultPrimaryActionHeaderTabs = [
  {
    title: 'Monde',
    isActive: true,
    id: 'tab-homepage',
    hasDividerBottom: true,
    route: HOME_PAGE,
  },
  {
    title: 'Tous les pays',
    isActive: true,
    id: 'tab-allpage',
    hasDividerBottom: true,
    route: COUNTRY_PAGE + '/all'
  },
  {
    title: 'Mon pays',
    isActive: true,
    id: 'tab-localpage',
    hasDividerBottom: true,
    route: COUNTRY_PAGE
  }
] as HeaderTab[];

const defaultBottomActionHeaderTab = {
  title: 'app.side.menu.logout.button',
  isActive: true,
  id: 'tab-logout',
  action: undefined,
} as HeaderTab;

@State<MenuStateModel>({
  name: 'Menu',
  defaults: {
    configuration: {
      primaryActions: defaultPrimaryActionHeaderTabs,
      bottomAction: defaultBottomActionHeaderTab,
    },
  },
})
@Injectable()
export class MenuState {
  @Selector()
  public static configuration(state: MenuStateModel): MenuConfiguration {
    return state.configuration;
  }

  @Selector()
  public static primaryActions(state: MenuStateModel): HeaderTab[] {
    return state.configuration.primaryActions;
  }

  @Action(SideMenuActivateHeaderTab)
  @Action(NavigationHeaderActivateHeaderTab)
  public activateHeaderTab(context: StateContext<MenuStateModel>, action: ActivateHeaderTab) {
    if (action.tab.route) {
      const state = context.getState();
      state.configuration.primaryActions.forEach((tab) => (tab.isActive = tab.id === action.tab.id));
      context.patchState({
        configuration: { ...state.configuration },
      });

      context.dispatch(new Navigate([action.tab.route]));
    } else if (action.tab.action) {
      context.dispatch(action.tab.action);
    }
  }

  @Action(SideMenuGuardSetMenuConfiguration)
  public setSideMenuConfiguration(context: StateContext<MenuStateModel>, action: SideMenuGuardSetMenuConfiguration) {
    const state = context.getState();
    const configuration = { ...state.configuration, ...action.payload };
    configuration.primaryActions.forEach(
      (tab) => {
        (tab.isActive = action.url && tab.route ? action.url === '/' + tab.route.toString() : false);
      }
    );
    context.patchState({
      configuration: { ...configuration },
    });
  }
}
