import {LocalizationService} from './data/services/localization.service';
import {ApplicationRef, DoBootstrap, Injector, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {MpCreateAddComponent} from './mp-create-add.component';
import {CreateAddFormComponent} from './create-add-form/create-add-form.component';
import {DynamicFormFieldComponent} from './create-add-form/form/dynamic-form-field.component';
import {SwitchCasesDirective} from './create-add-form/form/switch-cases.directive';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {CreateAddWebcomponentEffects} from './data/store/create-add-webcomponent.effects';
import {CreateAddWebcomponentStoreName} from './data/store/create-add-webcomponent.selector';
import {createAddWebcomponentReducer} from './data/store/create-add-webcomponent.reducer';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormFieldControlService} from './create-add-form/form/form-field-control.service';
import {FormFieldsBuilderService} from './utils/form/form-fields-builder.service';
import {RestHelperService} from './utils/restHelperService';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {environment} from 'src/environments/environment';
import {createCustomElement} from '@angular/elements';
import {ApiModule} from './api/api.module';

@NgModule({
  declarations: [
    MpCreateAddComponent,
    CreateAddFormComponent,
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
    StoreModule.forFeature(
      CreateAddWebcomponentStoreName,
      createAddWebcomponentReducer
    ),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([CreateAddWebcomponentEffects]),
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
  entryComponents: [MpCreateAddComponent],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {
    const customElement = createCustomElement(MpCreateAddComponent, {
      injector: this.injector,
    });
    customElements.define('create-add-component', customElement);
  }

  ngDoBootstrap(appRef: ApplicationRef): void {
    if (document.querySelector('mp-create-add')) {
      appRef.bootstrap(MpCreateAddComponent);
    }
  }
}

export function httpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
