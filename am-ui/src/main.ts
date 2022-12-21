import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {
  AppRuntimeConfig,
  APP_RUNTIME_CONFIG,
} from './app/config/appRuntimeConfig.service';

fetch('assets/runtime-configs/app-config.json')
  .then(response => response.json())
  .then(config => {
    if (environment.production) {
      enableProdMode();
    }

    const runtimeConfig: AppRuntimeConfig = new AppRuntimeConfig();
    runtimeConfig.setConfig(config);

    platformBrowserDynamic([
      {
        provide: APP_RUNTIME_CONFIG,
        useValue: runtimeConfig,
      },
    ])
      .bootstrapModule(AppModule)
      .catch(err => console.error(err));
  });
