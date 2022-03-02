import {LocalizationService} from './data/services/localization.service';
import {ApplicationRef, DoBootstrap, Injector, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {MpSearchComponent} from './mp-search.component';
import {SearchFormComponent} from './search-form/search-form.component';
import {DynamicFormFieldComponent} from './search-form/form/dynamic-form-field.component';
import {SwitchCasesDirective} from './search-form/form/switch-cases.directive';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {MarketPlaceEffects} from './data/store/marketplace.effects';
import {marketplaceStoreName} from './data/store/marketplace.selector';
import {marketplaceReducer} from './data/store/marketplace.reducer';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormFieldControlService} from './search-form/form/form-field-control.service';
import {FormFieldsBuilderService} from './utils/form/form-fields-builder.service';
import {RestHelperService} from './utils/restHelperService';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {environment} from 'src/environments/environment';
import {createCustomElement} from '@angular/elements';
import {ApiModule} from './api/api.module';

@NgModule({
  declarations: [
    MpSearchComponent,
    SearchFormComponent,
    DynamicFormFieldComponent,
    SwitchCasesDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
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
    ApiModule.forRoot({rootUrl: environment.ownUrl}),
  ],
  providers: [
    RestHelperService,
    FormFieldControlService,
    FormFieldsBuilderService,
    LocalizationService,
  ],
  entryComponents: [MpSearchComponent],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {
    const customElement = createCustomElement(MpSearchComponent, {
      injector: this.injector,
    });
    customElements.define('search-component', customElement);
  }

  ngDoBootstrap(appRef: ApplicationRef): void {
    if (document.querySelector('mp-search')) {
      appRef.bootstrap(MpSearchComponent);
    }
    console.log(environment.ownUrl);
  }
}

export function httpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
