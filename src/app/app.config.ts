import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'tasks-assignment-bf77c',
        appId: '1:162826709866:web:200bdef5fdf3d404f6d313',
        storageBucket: 'tasks-assignment-bf77c.appspot.com',
        apiKey: 'AIzaSyDWNWQgP1ItlPm3Hwxt2ISJd6OFF7J_8eY',
        authDomain: 'tasks-assignment-bf77c.firebaseapp.com',
        messagingSenderId: '162826709866',
        measurementId: 'G-R6WXBQ20P8',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideHttpClient(),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    provideAnimationsAsync(),
    provideToastr(),
    provideAnimations(),
  ],
};
