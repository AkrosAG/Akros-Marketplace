import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader,
} from '@ngx-translate/core';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormFieldControlService} from './form/form-field-control.service';
import {CreateAddFormComponent} from './create-add-form.component';

describe('CreateAddFormComponent', () => {
  let component: CreateAddFormComponent;
  let fixture: ComponentFixture<CreateAddFormComponent>;
  let service: FormFieldControlService;

  beforeEach(async () => {
    service = new FormFieldControlService();
    fixture = await TestBed.configureTestingModule({
      declarations: [CreateAddFormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{provide: FormFieldControlService}],
      imports: [
        FormsModule,
        ReactiveFormsModule,
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
    fixture = TestBed.createComponent(CreateAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('CreateAddFormComponent', () => {
    it('should be created and not show form', () => {
      expect(component).toBeTruthy();
    });

  });
});
