import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader,
} from '@ngx-translate/core';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormFieldControlService} from './form/form-field-control.service';
import {SearchFormComponent} from './search-form.component';
import {StoreModule} from '@ngrx/store';
import {FormFieldsBuilderService} from '../utils/form/form-fields-builder.service';
import {TopicsService} from '../api/services/topics.service';

describe('SearchFormComponent', () => {
  const formBuilder: FormBuilder = new FormBuilder();
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  let formFieldControlService: FormFieldControlService;
  let formFieldsBuilderService: FormFieldsBuilderService;
  let topicsService: TopicsService;

  beforeEach(async () => {
    formFieldControlService = new FormFieldControlService();
    fixture = await TestBed.configureTestingModule({
      declarations: [SearchFormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: FormFieldControlService, useValue: formFieldControlService},
        {provide: FormFieldsBuilderService, useValue: formFieldsBuilderService},
        {provide: TopicsService, useValue: topicsService},
        {provide: FormBuilder, useValue: formBuilder}
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
        StoreModule.forRoot({}),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    component.form = formBuilder.group({
      requestOrOffer: [],
      subCategoryDropdown: []
    })
    fixture.detectChanges();
  });

  describe('SearchFormComponent', () => {
    it('should be created and not show form', () => {
      expect(component).toBeTruthy();
    });

    // it('should show form if component received category fields', () => {
    // const formField1 = {
    //   key: 'Zimmer',
    //   value: 'value',
    //   required: true,
    // } as FormFieldBase<string>;

    // const formField2 = {
    //   key: 'Preis',
    //   required: true,
    // } as FormFieldBase<string>;

    // const formFields = [formField1, formField2];
    // component.selectedCategorySearchFields = formFields;
    // component.ngOnInit();
    // expect(component.showForm).toEqual(true);
    // });
  });
});
