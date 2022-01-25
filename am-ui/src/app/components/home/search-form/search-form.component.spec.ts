import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormFieldControlService} from '../../shared/form/form-field-control.service';
import {SearchFormComponent} from './search-form.component';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  let formFieldControlService: FormFieldControlService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchFormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{provide: FormFieldControlService}],
      imports: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    formFieldControlService = TestBed.inject(FormFieldControlService);
  });

  describe('SearchFormComponent', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });
  });
});
