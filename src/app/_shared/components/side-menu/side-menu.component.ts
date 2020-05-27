import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { HeaderTab } from '@shared/models/header-tab.model';
import { SideMenuActivateHeaderTab } from '@shared/store/menu.actions';

@Component({
  selector: 'mwh-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['side-menu.component.scss'],
})
export class SideMenuComponent {

  @Input() public primaryActions: HeaderTab[] = [];
  @Input() public bottomAction?: HeaderTab;

  @Output() public primaryItemClicked: EventEmitter<string>;
  @Output() public bottomItemClicked: EventEmitter<string>;

  constructor(private store: Store) {
    this.primaryItemClicked = new EventEmitter();
    this.bottomItemClicked = new EventEmitter();
  }

  public onActionClicked(tab: HeaderTab) {
    this.store.dispatch(new SideMenuActivateHeaderTab(tab));
  }

}
