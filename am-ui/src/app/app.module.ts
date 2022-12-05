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
import {
  TranslateLoader,
  TranslateModule,
  TranslatePipe,
} from '@ngx-translate/core';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {
  BrowserCacheLocation,
  InteractionType,
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {MarketPlaceEffects} from './data/store/marketplace.effects';
import {marketplaceStoreName} from './data/store/marketplace.selector';
import {marketplaceReducer} from './data/store/marketplace.reducer';

import {HomeComponent} from './components/home/home.component';
import {NavbarComponent} from './components/shared/navbar/navbar.component';
import {FooterComponent} from './components/shared/footer/footer.component';
import {AdsComponent} from './components/ads/ads.component';
import {ProfileComponent} from './components/profile/profile.component';
import {CreateComponent} from './components/create/create.component';
import {ErrorInterceptor} from './data/services/login/error.interceptor';
import {JwtInterceptor} from './data/services/login/jwt.interceptor';
import {AuthGuard} from './data/services/login/auth.guard';
import {AdComponent} from './components/ads/ad-detail/ad.component';

import {RestHelperService} from './utils/restHelperService';
import {UserService} from './data/services/login/user.service';

import {environment} from 'src/environments/environment';
import {SearchResultsComponent} from './components/search-results/search-results.component';
import {SearchResultDetailsComponent} from './components/search-result-details/search-result-details.component';
import {SearchResultDetailsMapComponent} from './components/search-result-details/search-result-details-map/search-result-details-map.component';
import {BackButtonDirective} from './utils/back-button.directive';
import {NavigationService} from './utils/navigation.service';
import {OAuthModule, OAuthService, OAuthStorage} from 'angular-oauth2-oidc';
import {SearchResultDetailsService} from './components/search-result-details/search-result-details.service';
import {SwiperComponent} from './components/swiper/swiper.component';
import {SwiperModule} from 'swiper/angular';
import {AdsService} from './components/ads/ads.service';
import {SpinnerComponent} from './components/shared/spinner/spinner.component';
import {HttpLoaderInterceptor} from './components/shared/spinner/httpLoaderInterceptor.service';
import {LoadingService} from './components/shared/spinner/loading.service';

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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CreateComponent,
    FooterComponent,
    ProfileComponent,
    AdsComponent,
    AdComponent,
    SearchResultsComponent,
    SearchResultDetailsComponent,
    SearchResultDetailsMapComponent,
    BackButtonDirective,
    SwiperComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    StoreModule.forRoot({}),
    StoreModule.forFeature(marketplaceStoreName, marketplaceReducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([MarketPlaceEffects]),
    LoggerModule.forRoot({
      level: !environment.production
        ? NgxLoggerLevel.DEBUG
        : NgxLoggerLevel.ERROR,
      serverLogLevel: NgxLoggerLevel.OFF,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    SwiperModule,
  ],
  providers: [
    RestHelperService,
    UserService,
    SearchResultDetailsService,
    AdsService,
    AuthGuard,
    {
      provide: LOCALE_ID,
      useValue: 'de-ch',
    },
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    NavigationService,
    OAuthService,
    {provide: OAuthStorage, useValue: localStorage},
    TranslatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoaderInterceptor,
      multi: true,
    },
    LoadingService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
