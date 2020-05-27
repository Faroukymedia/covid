import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class SplashScreenService {
  public hide()  {
    return Plugins.SplashScreen.hide();
  }
}
