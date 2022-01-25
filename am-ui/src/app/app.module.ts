import {CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
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

import {CategoriesListComponent} from './components/home/categories-list/categories-list.component';
import {SearchFormComponent} from './components/home/search-form/search-form.component';
import {HomeComponent} from './components/home/home.component';
import {NavbarComponent} from './components/shared/navbar/navbar.component';
import {DynamicFormFieldComponent} from './components/shared/form/dynamic-form-field.component';

import {ErrorInterceptor} from './data/services/login/error.interceptor';
import {JwtInterceptor} from './data/services/login/jwt.interceptor';
import {AuthGuard} from './data/services/login/auth.guard';

import {CategoriesService} from './data/services/categories.service';
import {RestHelperService} from './utils/restHelperService';
import {FormFieldControlService} from './components/shared/form/form-field-control.service';
import {FormFieldsBuilderService} from './utils/formFieldsBuilderService';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {MarketPlaceEffects} from './data/store/marketplace.effects';
import {marketplaceStoreName} from './data/store/marketplace.selector';
import {marketplaceReducer} from './data/store/marketplace.reducer';
import {environment} from 'src/environments/environment';

import {SwitchCasesDirective} from './components/shared/form/switch-cases.directive';

export function httpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

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
    NavbarComponent,
    SearchFormComponent,
    CategoriesListComponent,
    DynamicFormFieldComponent,
    SwitchCasesDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    LoggerModule.forRoot({
      level: !environment.production
        ? NgxLoggerLevel.DEBUG
        : NgxLoggerLevel.ERROR,
      serverLogLevel: NgxLoggerLevel.OFF,
    }),
    StoreModule.forRoot({}),
    StoreModule.forFeature(marketplaceStoreName, marketplaceReducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([MarketPlaceEffects]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    CategoriesService,
    RestHelperService,
    FormFieldControlService,
    FormFieldsBuilderService,

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
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
