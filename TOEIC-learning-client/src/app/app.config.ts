import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { httpInterceptorProviders } from './http-interceptors';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,
    withRouterConfig({ onSameUrlNavigation: 'reload' }),
    withInMemoryScrolling({ scrollPositionRestoration: 'top' })
  ),
  provideHttpClient(),
  importProvidersFrom(HttpClientModule),
    httpInterceptorProviders, provideAnimationsAsync()]
};
