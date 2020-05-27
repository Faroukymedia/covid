import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { HeaderTab } from '@shared/models/header-tab.model';
import { DeviceService } from '@shared/services/plugins/device.service';
import { NavigationHeaderToggleSideMenu } from '@shared/store/side-menu.actions';
import { SideMenuState } from '@shared/store/side-menu.state';
import { Observable } from 'rxjs';
import { MenuState } from '@shared/store/menu.state';
import { NavigationHeaderActivateHeaderTab } from '@shared/store/menu.actions';

export enum HEADER_BG_COLORS {
  RED = 'red',
  TRANSPARENT = 'transparent',
  WHITE = 'white',
}

@Component({
  selector: 'mwh-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['navigation-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavigationHeaderComponent implements OnInit {
  @Input() public backgroundColor:
    | (string & HEADER_BG_COLORS.RED)
    | HEADER_BG_COLORS.WHITE
    | HEADER_BG_COLORS.TRANSPARENT;
  @Input() public logo = '';
  @Input() public title = '';
  @Input() public desktopMenuIconRight = '';
  @Input() public backIconLeft = '';
  @Input() public isLogoCentered = false;
  @Input() public buttonRight = '';

  @Output() public tabClicked: EventEmitter<string>;
  @Output() public logoClicked: EventEmitter<void>;
  @Output() public leftMobileClicked: EventEmitter<void>;

  @Select(MenuState.primaryActions)
  public tabs$!: Observable<HeaderTab[]>;

  public headerCommonClasses: { [key: string]: boolean } = {};
  public translucentHeader = false;
  public isApp: boolean;

  @Select(SideMenuState.isVisible)
  public displayMenu$!: Observable<boolean>;

  @Select(SideMenuState.isDisabled)
  public disableSideMenu$!: Observable<boolean>;

  constructor(private deviceService: DeviceService, private store: Store) {
    this.isApp = this.deviceService.isApp();
    this.backgroundColor = HEADER_BG_COLORS.RED;
    this.tabClicked = new EventEmitter();
    this.logoClicked = new EventEmitter();
    this.leftMobileClicked = new EventEmitter();
  }

  public ngOnInit() {
    this.headerCommonClasses = {
      header: true,
      [`header--${this.backgroundColor}`]: true,
    };
    this.translucentHeader = this.backgroundColor === HEADER_BG_COLORS.TRANSPARENT;
  }

  public tabClick(tab: HeaderTab) {
    this.store.dispatch(new NavigationHeaderActivateHeaderTab(tab));
    this.tabClicked.emit(tab.id);
  }

  public logoClick() {
    this.logoClicked.emit();
  }

  public sideMenuClick() {
    this.store.dispatch(new NavigationHeaderToggleSideMenu());
  }

  public hamburgerMenuClick() {
    this.store.dispatch(new NavigationHeaderToggleSideMenu());
  }

  public leftMobileClick() {
    this.leftMobileClicked.emit();
  }
}
