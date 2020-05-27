import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public async setObject(key: string, value: any) {
    console.log(`[StorageService] Setting ${key} to`, value);
    return Plugins.Storage.set({ key, value: JSON.stringify(value) });
  }

  public async getObject(key: string) {
    const result = await Plugins.Storage.get({ key });

    console.log(`[StorageService] Getting ${key} with`, result.value);
    return result.value ? JSON.parse(result.value) : null;
  }

  public async setItem(key: string, value: string) {
    return Plugins.Storage.set({ key, value });
  }

  public async getItem(key: string) {
    const { value } = await Plugins.Storage.get({ key });
    return value;
  }

  public async removeItem(key: string) {
    console.log(`[StorageService] Removing ${key}`);
    return Plugins.Storage.remove({ key });
  }

  public async keys() {
    const { keys } = await Plugins.Storage.keys();
    return keys;
  }

  public async clear() {
    return Plugins.Storage.clear();
  }
}
