import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowRefService {
  public window: any;

  constructor() {
    this.window = window;
  }
}
