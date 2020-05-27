import { HttpBackend, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpBackendMock } from 'mocks/http-backend.mock';
import { EnvironmentService } from './environment.service';
import { StorageServiceMock } from './plugins/mocks/storage.service.mock';
import { StorageService } from './plugins/storage.service';
import { CURRENT_ENVIRONMENT_STORAGE_KEY } from 'app/constants';
import { Environment } from '@shared/models/environment.model';
import { of } from 'rxjs';
import { DeviceService } from './plugins/device.service';
import { DeviceServiceMock } from './plugins/mocks/device.service.mock';

describe('EnvironmentService', () => {
  let environmentService: EnvironmentService;
  let storageService: StorageService;
  let httpBackend: HttpBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EnvironmentService,
        { provide: HttpBackend, useFactory: () => HttpBackendMock.instance() },
        { provide: StorageService, useFactory: () => StorageServiceMock.instance() },
        { provide: DeviceService, useFactory: () => DeviceServiceMock.instance() }
      ]
    });

    environmentService = TestBed.get(EnvironmentService);
    storageService = TestBed.get(StorageService);
    httpBackend = TestBed.get(HttpBackend);
  });

  it('should be created', () => {
    expect(environmentService).toBeTruthy();
  });

  it('should get the remote environment variables and set default one if no environment is stored', async () => {
    httpBackend.handle = jest.fn().mockReturnValue(
      of(
        new HttpResponse<Environment>({ body: { env: 'int', gapiUrl: 'fakeUrl' } as Environment })
      )
    );
    storageService.getItem = jest.fn().mockResolvedValue(null);

    await environmentService.loadEnvironmentFromAssets();

    expect(storageService.getItem).toBeCalledWith(CURRENT_ENVIRONMENT_STORAGE_KEY);
    // tslint:disable-next-line: no-string-literal
    expect(environmentService['environmentFilePath']).toEqual('./assets/environments/environment.json');
    expect(environmentService.environment).toEqual({
      env: 'int',
      envInfoLabel: ' build:  (ENV: int)',
      gapiUrl: 'fakeUrl'
    });
    expect(storageService.setItem).toBeCalledWith(CURRENT_ENVIRONMENT_STORAGE_KEY, 'int');
  });

  it('should get the remote environment variables and for the stored environment', async () => {
    httpBackend.handle = jest.fn().mockReturnValue(
      of(
        new HttpResponse<Environment>({ body: { env: 'rec', gapiUrl: 'fakeUrl' } as Environment })
      )
    );
    storageService.getItem = jest.fn().mockResolvedValue('rec');

    await environmentService.loadEnvironmentFromAssets();

    expect(storageService.getItem).toBeCalledWith(CURRENT_ENVIRONMENT_STORAGE_KEY);
    // tslint:disable-next-line: no-string-literal
    expect(environmentService['environmentFilePath']).toEqual('./assets/environments/environment.rec.json');
    expect(environmentService.environment).toEqual({
      env: 'rec',
      envInfoLabel: ' build:  (ENV: rec)',
      gapiUrl: 'fakeUrl'
    });
    expect(storageService.setItem).toBeCalledWith(CURRENT_ENVIRONMENT_STORAGE_KEY, 'rec');
  });

  it('should get the remote environment variables asked in params', async () => {
    httpBackend.handle = jest.fn().mockReturnValue(
      of(
        new HttpResponse<Environment>({ body: { env: 'pprod', gapiUrl: 'fakeUrl' } as Environment })
      )
    );
    await environmentService.loadEnvironmentFromAssets('pprod');

    // tslint:disable-next-line: no-string-literal
    expect(environmentService['environmentFilePath']).toEqual('./assets/environments/environment.pprod.json');
    expect(environmentService.environment).toEqual({
      env: 'pprod',
      envInfoLabel: ' build:  (ENV: pprod)',
      gapiUrl: 'fakeUrl'
    });
  });
});
