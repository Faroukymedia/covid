import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class LocalNotificationsService {
  public async areEnabled(): Promise<boolean> {
    const result = await Plugins.LocalNotifications.areEnabled();
    return result.value;
  }
}
