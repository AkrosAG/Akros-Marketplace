import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {FormFieldBase} from './form-field-base';

@Injectable()
export class FormFieldControlService {
  constructor() {}

  toFormGroup(formFields: FormFieldBase<string>[]): FormGroup {
    const group: any = {};

    formFields.forEach(formFields => {
      group[formFields.key] = formFields.required
        ? new FormControl(formFields.value || '', Validators.required)
        : new FormControl(formFields.value || '');
    });
    return new FormGroup(group);
  }
}
