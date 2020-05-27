import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class SecureStorageService {
  public async setObject(key: string, value: object) {
    return this.setItem(key, JSON.stringify(value));
  }

  public async getObject(key: string) {
    const result = await this.getItem(key);

    return result ? JSON.parse(result) : null;
  }

  public async setItem(key: string, value: string) {
    return Plugins.SecureStoragePlugin.set({ key, value });
  }

  public async getItem(key: string): Promise<string | null> {
    try {
      const { value } = await Plugins.SecureStoragePlugin.get({ key });
      return value;
    } catch {
      return null;
    }
  }

  public async removeItem(key: string) {
    return Plugins.SecureStoragePlugin.remove({ key });
  }

  public async clear() {
    return Plugins.SecureStoragePlugin.clear();
  }
}
