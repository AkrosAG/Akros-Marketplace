import {ValidationMessages} from './../../utils/form/ValidationMessages';
import {FormGroup} from '@angular/forms';
import {FormFieldBase} from './form-field-base';
import {FormFieldControlService} from './form-field-control.service';

describe('FormFieldControlService', () => {
  let service: FormFieldControlService;

  beforeEach(() => {
    service = new FormFieldControlService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create the form group from a set of form fields', () => {
    const formField1 = {
      key: 'test',
      value: 'value',
      required: true,
      type: 1
    } as FormFieldBase<string>;

    const formField2 = {
      key: 'test2',
      value: 'value2',
      required: false,
      type: 10
    } as FormFieldBase<string>;
    const formField3 = {
      key: 'test',
      required: true,
      type: 5
    } as FormFieldBase<string>;

    const formField4 = {
      key: 'test2',
      required: false,
    } as FormFieldBase<string>;
    const formFields = [formField1, formField2, formField3, formField4];
    const formGroup = service.toFormGroup(formFields);
    expect(Object.keys(formGroup.value).length).toEqual(2);
    expect(formGroup).toBeInstanceOf(FormGroup);
  });

  it('should create validation messages from a set of form fields', () => {
    const k1 = 'Zimmer';
    const k2 = 'Preis';
    const expectedM1 = {"Preis": {"error": {"de": "Falscher Wert", "en": "Incorrect value"}}};
    const formField1 = {
      key: k1,
      value: 'value',
      required: true,
    } as FormFieldBase<string>;

    const formField2 = {
      key: k2,
      required: true,
    } as FormFieldBase<string>;

    const formFields = [formField1, formField2];
    const validationMessages = service.getValidationMessages(formFields);
    expect(Object.keys(validationMessages).length).toEqual(2);
    expect(validationMessages).toMatchObject(expectedM1);
  });
});
