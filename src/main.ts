import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { applyPolyfills, defineCustomElements } from '@generali/mobilehub-ui-core/loader';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'hammerjs';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

applyPolyfills().then(() => {
  defineCustomElements(window);
});
