import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader,
} from '@ngx-translate/core';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormFieldControlService} from '../shared/form/form-field-control.service';
import {SearchFormComponent} from './search-form.component';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  let service: FormFieldControlService;

  beforeEach(async () => {
    service = new FormFieldControlService();
    await TestBed.configureTestingModule({
      declarations: [SearchFormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{provide: FormFieldControlService}],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
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
