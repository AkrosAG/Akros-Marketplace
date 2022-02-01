import {Injector, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {CategoriesListComponent} from './search/categories-list/categories-list.component';
import {SearchFormComponent} from './search/search-form/search-form.component';
import {SearchComponent} from './search/search.component';
import {DynamicFormFieldComponent} from './shared/form/dynamic-form-field.component';
import {SwitchCasesDirective} from './shared/form/switch-cases.directive';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {MarketPlaceEffects} from './data/store/marketplace.effects';
import {marketplaceStoreName} from './data/store/marketplace.selector';
import {marketplaceReducer} from './data/store/marketplace.reducer';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CategoriesService} from './data/services/categories.service';
import {FormFieldControlService} from './shared/form/form-field-control.service';
import {FormFieldsBuilderService} from './utils/formFieldsBuilderService';
import {RestHelperService} from './utils/restHelperService';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {environment} from 'src/environments/environment';
import {createCustomElement} from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchFormComponent,
    CategoriesListComponent,
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
  ],
  providers: [
    CategoriesService,
    RestHelperService,
    FormFieldControlService,
    FormFieldsBuilderService,
  ],
  entryComponents: [AppComponent, SearchComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    const customElement = createCustomElement(AppComponent, {
      injector: this.injector,
    });
    customElements.define('search-component', customElement);
  }
  ngDoBootstrap() {}
}

export function httpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
