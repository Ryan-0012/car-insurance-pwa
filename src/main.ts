import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { environment } from './environments/environment';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/ngsw-worker.js')
      .then(registration => console.log('Service Worker registered'))
      .catch(err => console.error('Service Worker registration failed:', err));
  });
}


if (environment.production) {
  enableProdMode();
}




platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
