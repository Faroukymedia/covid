export interface DisableSideMenu {
  payload?: boolean;
}

export class SideMenuGuardDisableSideMenu implements DisableSideMenu {
  public static readonly type = '[SideMenuGuard] Disable Side Menu';

  constructor(public payload?: boolean) {}
}

export interface ToggleSideMenu {
  payload?: boolean;
}

export class NavigationHeaderToggleSideMenu implements ToggleSideMenu {
  public static readonly type = '[NavigationHeader] Toggle Side Menu';

  constructor(public payload?: boolean) {}
}

export class AppSideMenuToggleSideMenu implements ToggleSideMenu {
  public static readonly type = '[AppSideMenu] Toggle Side Menu';

  constructor(public payload?: boolean) {}
}

export class SideMenuGuardToggleSideMenu implements ToggleSideMenu {
  public static readonly type = '[SideMenuGuard] Toggle Side Menu';

  constructor(public payload?: boolean) {}
}
