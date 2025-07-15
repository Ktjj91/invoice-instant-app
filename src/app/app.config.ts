import {
  ApplicationConfig,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {jwtInterceptor} from './interceptors/jwt-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    {provide: LOCALE_ID, useValue: 'fr-FR' },
    provideRouter(routes)
  ]
};
