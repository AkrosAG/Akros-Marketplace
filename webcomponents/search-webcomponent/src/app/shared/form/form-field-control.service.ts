import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationMessages} from '../../utils/ValidationMessages';

import {FormFieldBase} from './form-field-base';

@Injectable()
export class FormFieldControlService {
  constructor() {}

  private emailPatternRegex: string =
    '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  private zipCodePatternRegex: string = '[0-9]{4}';
  private numberPatternRegex: string = '[0-9]';
  private urlPatternRegex: string = '^https?://(.*)|^www.(.*)';
  private alphabeticPatternRegex: string = '^((?![0-9]).)*$';

  toFormGroup(formFields: FormFieldBase<string>[]): FormGroup {
    const group: any = {};

    formFields.forEach(formFields => {
      switch (formFields.type) {
        case 1:
        case 12:
          group[formFields.key] = new FormControl(null, [
            Validators.pattern(this.numberPatternRegex),
          ]);
          break;
        case 11:
        case 10:
          group[formFields.key] = new FormControl(null);
          break;
        case 5:
          group[formFields.key] = new FormControl(null);
          break;
        default:
          group[formFields.key] = formFields.required
            ? new FormControl(null, [Validators.required])
            : new FormControl(null);
          break;
      }
    });
    return new FormGroup(group);
  }

  getValidationMessages(
    formFields: FormFieldBase<string>[]
  ): ValidationMessages<any> {
    const validationMessages: any = {};

    //TODO fix in back and change
    formFields.forEach(formFields => {
      switch (formFields.key) {
        case 'Preis':
          validationMessages[formFields.key] = {
            error: {
              en: 'Incorrect value',
              de: 'Falscher Wert',
            },
          };
          break;
        case 'Zimmer':
          validationMessages[formFields.key] = {
            error: {
              en: 'Incorrect value',
              de: 'Falscher Wert',
            },
          };
          break;
        default:
          break;
      }
    });
    return validationMessages;
  }
}
