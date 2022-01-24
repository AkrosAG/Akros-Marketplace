import {BrowserModule} from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {HomeComponent} from './home/home.component';
import {MatTabsModule} from '@angular/material/tabs';
import {CourseComponent} from './course/course.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import {CourseDialogComponent} from './course-dialog/course-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {LoginComponent} from './login/login.component';
import {SafeUrlPipe} from './common/safe-url.pipe';
import { environment } from '../environments/environment';

import { FacebookLoginProvider, SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { AuthGuard } from './_helpers/auth.guard';

import {
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalInterceptor,
  MsalInterceptorConfiguration,
  MsalService,
} from '@azure/msal-angular';
import {
  BrowserCacheLocation,
  InteractionType,
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';
import { UserComponent } from './user/user.component';
import { UserService } from './_services/user.service';
import { ErrorInterceptor, fakeBackendProvider, JwtInterceptor } from './_helpers';
import { AuthAPIService } from './_services/auth.api.service';
import { UserLocalStorageService } from './_services/user.localStorage.service';


export const MsalInstanceFactory: () => IPublicClientApplication = () => {
  return new PublicClientApplication({
    auth: {
      clientId: environment.signOn.clientId,
      authority: environment.signOn.authority,
      redirectUri: environment.ownUrl,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    },
  });
};

export function MsalInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  // TODO Put protected resources here, once the application is registered
  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap,
  };
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CourseComponent,
    CourseDialogComponent,
    LoginComponent,
    SafeUrlPipe,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    AppRoutingModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    SocialLoginModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule

  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '4601353649919957' // ist private Facebook app von Hermann Kamdoum
            )
          }
        ]
      } as SocialAuthServiceConfig,
    } ,
    AuthGuard,
    {
      provide: LOCALE_ID,
      useValue: 'de-ch',
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MsalInstanceFactory,
    },
    MsalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MsalInterceptorConfigFactory,
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    fakeBackendProvider,
],
  bootstrap: [AppComponent],
  entryComponents: [CourseDialogComponent]
})
export class AppModule {
}
