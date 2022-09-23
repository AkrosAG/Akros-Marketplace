import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateFakeLoader, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormFieldControlService} from './form/form-field-control.service';
import {SearchFormComponent} from './search-form.component';
import {StoreModule} from '@ngrx/store';
import {FormFieldsBuilderService} from '../utils/form/form-fields-builder.service';
import {TopicsService} from '../api/services/topics.service';
import {FormFieldBase} from "./form/form-field-base";

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
      requestOrOffer: "",
      subCategoryDropdown: 1
    })
    fixture.detectChanges();
  });

  describe('SearchFormComponent', () => {
    const formFieldBase1 = {
      controlType: "",
      creation: true,
      id: 34,
      key: "radius",
      max: 1000,
      min: 1,
      offer: false,
      options: Array(0),
      order: 5,
      request: true,
      required: false,
      searchable: false,
      type: 3,
    } as FormFieldBase<string>;

    const formFieldBase2 = {
      controlType: "",
      creation: true,
      id: 25,
      key: "fromSize",
      max: 1000,
      min: 1,
      offer: false,
      options: Array(0),
      order: 9,
      request: true,
      required: false,
      searchable: false,
      type: 3,
    } as FormFieldBase<string>;

    const formFieldBase3 = {
      controlType: "",
      creation: true,
      id: 24,
      key: "toPrice",
      max: 1000,
      min: 1,
      offer: false,
      options: Array(0),
      order: 13,
      request: true,
      required: false,
      searchable: false,
      type: 2,
    } as FormFieldBase<string>;


    it('should save data into payload if component received data from field fromSize', () => {
      component.form = formBuilder.group({
        fromSize: "1111",
        requestOrOffer: "OFFER",
        subCategoryDropdown: 1
      })

      component.selectedCategorySearchFields = [formFieldBase1, formFieldBase2, formFieldBase3];
      component.currentCategoryId = 1;
      component.currentSubCategoryId = 2;

      component.ngOnInit();
      component.onSubmit();
      expect(component.payLoad.category_id).toEqual(1);
      expect(component.payLoad.subcategory_id).toEqual(2);
      expect(component.payLoad.search_values?.length).toEqual(1);
      if (component.payLoad.search_values !== undefined) {
        expect(component.payLoad.search_values[0].field_id).toEqual(25);
        expect(component.payLoad.search_values[0].value).toEqual("1111");
      }
    });


    it('should save data into payload if component received data from field radius', () => {
      component.form = formBuilder.group({
        radius: "2222",
        requestOrOffer: "OFFER",
        subCategoryDropdown: 1
      })

      component.selectedCategorySearchFields = [formFieldBase1, formFieldBase2, formFieldBase3];
      component.currentCategoryId = 1;
      component.currentSubCategoryId = 2;

      component.ngOnInit();
      component.onSubmit();
      expect(component.payLoad.category_id).toEqual(1);
      expect(component.payLoad.subcategory_id).toEqual(2);
      expect(component.payLoad.search_values?.length).toEqual(1);
      if (component.payLoad.search_values !== undefined) {
        expect(component.payLoad.search_values[0].field_id).toEqual(34);
        expect(component.payLoad.search_values[0].value).toEqual("2222");
      }

      expect(component.payLoad.search_values?.length).toEqual(1);
    });

    it('should save data into payload if component received data from field toPrice', () => {
      component.form = formBuilder.group({
        toPrice: "3333",
        requestOrOffer: "OFFER",
        subCategoryDropdown: 1
      })

      component.selectedCategorySearchFields = [formFieldBase1, formFieldBase2, formFieldBase3];
      component.currentCategoryId = 1;
      component.currentSubCategoryId = 2;

      component.ngOnInit();
      component.onSubmit();
      expect(component.payLoad.category_id).toEqual(1);
      expect(component.payLoad.subcategory_id).toEqual(2);
      expect(component.payLoad.search_values?.length).toEqual(1);
      if (component.payLoad.search_values !== undefined) {
        expect(component.payLoad.search_values[0].field_id).toEqual(24);
        expect(component.payLoad.search_values[0].value).toEqual("3333");
      }
    });

    // it('should be created and not show form', () => {
    //  expect(component).toBeTruthy();
    // });

    // it('should show form if component received category fields', () => {
    //  const formField1 = {
    //    key: 'Zimmer',
    //    value: 'value',
    //    required: true,
    //  } as FormFieldBase<string>;

    // const formField2 = {
    //   key: 'Preis',
    //    required: true,
    //  } as FormFieldBase<string>;

    // const formFields = [formField1, formField2];
    // component.selectedCategorySearchFields = formFields;
    // component.ngOnInit();
    // expect(component.showForm).toEqual(true);
    //  });
  });
});
