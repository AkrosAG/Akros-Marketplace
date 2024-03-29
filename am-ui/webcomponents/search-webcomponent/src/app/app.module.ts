import {LocalizationService} from './data/services/localization.service';
import {ApplicationRef, DoBootstrap, Injector, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {MpSearchComponent} from './mp-search.component';
import {SearchFormComponent} from './search-form/search-form.component';
import {DynamicFormFieldComponent} from './search-form/form/dynamic-form-field.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {SearchWebcomponentEffects} from './data/store/search-webcomponent.effects';
import {SearchWebcomponentStoreName} from './data/store/search-webcomponent.selector';
import {searchWebcomponentReducer} from './data/store/search-webcomponent.reducer';
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
import {DateClickDirective} from './utils/directives/date-click.directive';
import {SwitchCasesDirective} from './utils/directives/switch-cases.directive';
import {MpSearchService} from './mp-search.service';

@NgModule({
  declarations: [
    MpSearchComponent,
    SearchFormComponent,
    DynamicFormFieldComponent,
    SwitchCasesDirective,
    DateClickDirective,
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
    StoreModule.forFeature(
      SearchWebcomponentStoreName,
      searchWebcomponentReducer
    ),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([SearchWebcomponentEffects]),
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
    MpSearchService
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
  }
}

export function httpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
