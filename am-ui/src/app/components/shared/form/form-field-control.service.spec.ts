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

  it('should do something', () => {
    const formField1 = {
      key: 'test',
      value: 'value',
      required: true,
    } as FormFieldBase<string>;

    const formField2 = {
      key: 'test2',
      value: 'value2',
      required: false,
    } as FormFieldBase<string>;
    const formField3 = {
      key: 'test',
      required: true,
    } as FormFieldBase<string>;

    const formField4 = {
      key: 'test2',
      required: false,
    } as FormFieldBase<string>;
    const formFields = [formField1, formField2, formField3, formField4];
    const formGroup = service.toFormGroup(formFields);
    expect(Object.keys(formGroup.value).length).toEqual(2);
  });
});
