import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { WindowRefService } from '@shared/services/dom/window-ref.service';
import { Observable, Subject } from 'rxjs';
import { DeviceService } from './device.service';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {
  public onKeyboardWillShow$: Observable<void>;
  public onKeyboardWillHide$: Observable<void>;
  public onKeyboardDidShow$: Observable<void>;
  public onKeyboardDidHide$: Observable<void>;

  private keyboardWillShowSubject: Subject<void>;
  private keyboardWillHideSubject: Subject<void>;
  private keyboardDidShowSubject: Subject<void>;
  private keyboardDidHideSubject: Subject<void>;

  constructor(
    private windowService: WindowRefService,
    private deviceService: DeviceService) {
    this.keyboardWillShowSubject = new Subject<void>();
    this.onKeyboardWillShow$ = this.keyboardWillShowSubject.asObservable();

    this.keyboardWillHideSubject = new Subject<void>();
    this.onKeyboardWillHide$ = this.keyboardWillHideSubject.asObservable();

    this.keyboardDidShowSubject = new Subject<void>();
    this.onKeyboardDidShow$ = this.keyboardDidShowSubject.asObservable();

    this.keyboardDidHideSubject = new Subject<void>();
    this.onKeyboardDidHide$ = this.keyboardDidHideSubject.asObservable();

    if (this.deviceService.isApp()) {
      this.initPluginEvents();
    } else {
      this.initWindowEvents();
    }
  }

  private initPluginEvents() {
    Plugins.Keyboard.addListener('keyboardWillShow', () => this.keyboardWillShowSubject.next());
    Plugins.Keyboard.addListener('keyboardWillHide', () => this.keyboardWillHideSubject.next());
    Plugins.Keyboard.addListener('keyboardDidShow', () => this.keyboardDidShowSubject.next());
    Plugins.Keyboard.addListener('keyboardDidHide', () => this.keyboardDidHideSubject.next());
  }

  private initWindowEvents() {
    this.windowService.window.addEventListener('keyboardWillShow', () => this.keyboardWillShowSubject.next());
    this.windowService.window.addEventListener('keyboardWillHide', () => this.keyboardWillHideSubject.next());
    this.windowService.window.addEventListener('keyboardDidShow', () => this.keyboardDidShowSubject.next());
    this.windowService.window.addEventListener('keyboardDidHide', () => this.keyboardDidHideSubject.next());
  }
}
