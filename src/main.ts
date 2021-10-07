/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';

if (environment.production) {
  enableProdMode();
}
let sentryEnabled = false;

if (window['__env']['sentryEnabled'] === '1' || window['__env']['sentryEnabled'] === 1 ||
  window['__env']['sentryEnabled'] === true || window['__env']['sentryEnabled'] === 'true') {
  sentryEnabled = true;
}

if (sentryEnabled === true) {
    Sentry.init({
      dsn: window['__env']['sentryDsn'],
      // serverName: window['__env']['sentryServerName'],
      integrations: [
        new Integrations.BrowserTracing({
          tracingOrigins: [window['__env']['sentryServerName']],
          routingInstrumentation: Sentry.routingInstrumentation,
        }),
      ],

      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
    });
}
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
