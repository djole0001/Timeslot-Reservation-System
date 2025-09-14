import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { salonReducer } from './store/salon.reducer';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { SalonEffects } from './store/salon.effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ salonState: salonReducer }),
    provideEffects([SalonEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideToastr(),
    importProvidersFrom(MatDatepickerModule, MatNativeDateModule),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
};
