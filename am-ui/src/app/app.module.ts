import {DynamicFormFieldComponent} from './components/shared/form/dynamic-form-field.component';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';

import {CategoriesListComponent} from './components/home/categories-list/categories-list.component';
import {SearchFormComponent} from './components/home/search-form/search-form.component';
import {HomeComponent} from './components/home/home.component';
import {NavbarComponent} from './components/shared/navbar/navbar.component';

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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function httpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
