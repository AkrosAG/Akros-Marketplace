import {LocalizationService} from './data/services/localization.service';
import {FormFieldsBuilderService} from './utils/form/form-fields-builder.service';
import {FormFieldControlService} from './create-add-form/form/form-field-control.service';
import {TestBed} from '@angular/core/testing';
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader,
  TranslateService,
} from '@ngx-translate/core';
import {MpCreateAddComponent} from './mp-create-add.component';

jest.mock('./create-add-form/form/form-field-control.service');
jest.mock('./utils/form/form-fields-builder.service');
jest.mock('./data/services/localization.service');

describe('MpCreateAddComponent', () => {

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
      declarations: [MpCreateAddComponent],
      providers: [
        FormFieldControlService,
        FormFieldsBuilderService,
        LocalizationService,
        TranslateService,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MpCreateAddComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'create-add-webcomponent'`, () => {
    const fixture = TestBed.createComponent(MpCreateAddComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('create-add-webcomponent');
  });

});
