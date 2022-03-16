import {LocalizationService} from './data/services/localization.service';
import {FormFieldsBuilderService} from './utils/form/form-fields-builder.service';
import {FormFieldControlService} from './search-form/form/form-field-control.service';
import {TestBed} from '@angular/core/testing';
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader,
  TranslateService,
} from '@ngx-translate/core';
import {MpSearchComponent} from './mp-search.component';

jest.mock('./search-form/form/form-field-control.service');
jest.mock('./utils/form/form-fields-builder.service');
jest.mock('./data/services/localization.service');

describe('MpSearchComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
      declarations: [MpSearchComponent],
      providers: [
        FormFieldControlService,
        FormFieldsBuilderService,
        LocalizationService,
        TranslateService,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MpSearchComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'search-webcomponent'`, () => {
    const fixture = TestBed.createComponent(MpSearchComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('search-webcomponent');
  });

});
