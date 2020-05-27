import { Action } from 'rxjs/internal/scheduler/Action';
import { Route } from '@angular/router';

export interface HeaderTab {
  title: string;
  id: string;
  isActive: boolean;
  hasDividerBottom?: boolean;
  action?: Action<any>;
  route?: Route;
  callback?: () => void;
}
