import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../models/environment.model';
import { StorageService } from './plugins/storage.service';
import { CURRENT_ENVIRONMENT_STORAGE_KEY } from 'app/constants';
import { Plugins } from '@capacitor/core';
import { DeviceService } from './plugins/device.service';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  public environment!: Environment;

  private environmentFilePath: string;
  private httpClient: HttpClient;

  constructor(
    private handler: HttpBackend,
    private storageService: StorageService,
    private deviceService: DeviceService
  ) {
    this.httpClient = new HttpClient(handler);

    // TODO: When the project is production ready uncomment this line
    // this.environmentFilePath = environment.production
    //   ? './assets/environments/environment.prod.json'
    //   : './assets/environments/environment.json';
    this.environmentFilePath = './assets/environments/environment.json';
  }

  public async loadEnvironmentFromAssets(env?: string): Promise<void> {
    if (env) {
      this.environmentFilePath = `./assets/environments/environment.${env}.json`;
    } else {
      const result = await this.storageService.getItem(CURRENT_ENVIRONMENT_STORAGE_KEY);

      if (result) {
        this.environmentFilePath = `./assets/environments/environment.${result}.json`;
      }
    }

    return this.httpClient
      .get<Environment>(this.environmentFilePath)
      .toPromise()
      .then(async data => {
        this.environment = data;
        this.environment.envInfoLabel = await this.getAppEnvironmentName();
        await this.storageService.setItem(CURRENT_ENVIRONMENT_STORAGE_KEY, this.environment.env);
      });
  }

  private async getAppEnvironmentName() {
    const deviceInfo = await this.deviceService.getInfo();

    return `${deviceInfo.appVersion} build: ${deviceInfo.appBuild} (ENV: ${this.environment.env})`;
  }
}
