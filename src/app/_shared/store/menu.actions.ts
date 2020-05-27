import { MenuConfiguration } from '@shared/models/side-menu-configuration.model';
import { HeaderTab } from '@shared/models/header-tab.model';

export interface ActivateHeaderTab {
  tab: HeaderTab;
}

export class SideMenuActivateHeaderTab implements ActivateHeaderTab {
  public static readonly type = '[SideMenu] Activate Header Tab';

  constructor(public tab: HeaderTab) {}
}

export class NavigationHeaderActivateHeaderTab implements ActivateHeaderTab {
  public static readonly type = '[NavigationHeader] Activate Header Tab';

  constructor(public tab: HeaderTab) {}
}

export interface SetMenuConfiguration {
  payload?: MenuConfiguration;
}

export class SideMenuGuardSetMenuConfiguration implements SetMenuConfiguration {
  public static readonly type = '[SideMenuGuard] Set Menu configuration';

  constructor(public payload?: MenuConfiguration, public url?: string) {}
}
