import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationMessages } from '../../utils/validators/ValidationMessages';

import { FormFieldBase } from './form-field-base';

@Injectable()
export class FormFieldControlService {

  /**
   * @description Transforms the list of FormFieldBase fields into a form, as well as includes validations
   * and validation messages depending on the fiel (WIP)
   * @constructor
   */
  constructor() {}

  // private emailPatternRegex: string =
  //   '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  // private zipCodePatternRegex: string = '[0-9]{4}';
  private numberPatternRegex: string = '^[0-9]*$';
  // private urlPatternRegex: string = '^https?://(.*)|^www.(.*)';
  // private alphabeticPatternRegex: string = '^((?![0-9]).)*$';

  /**
   * @description Funtion to transform array of fields into a FormGroup
   * @param {formFields} FormFieldBase[] - Array of category fields already transformed into FormFieldBase objects
   * @param {isOffer} Boolean - Sets value of requestOrOffer for formcontrol
   * @return {FormGroup} form - The form with the data of the category fields
   */
  toFormGroup(formFields: FormFieldBase<string>[], isOffer: Boolean): FormGroup {
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
        case 19:
            group[formFields.key] = new FormControl();
            break;
        default:
          group[formFields.key] = formFields.required
            ? new FormControl(null, [Validators.required])
            : new FormControl(null);
          break;
      }
    });
    group['requestOrOffer'] = new FormControl(isOffer ? 'OFFER' : 'REQUEST', [Validators.required]);
    group['subCategoryDropdown'] = new FormControl(0);
    return new FormGroup(group);
  }

  /**
   * @description Funtion to obtain validation messages for category fields
   * @param {formFields} FormFieldBase[] - Array of category fields already transformed into FormFieldBase objects
   */
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
      }
    });
    return validationMessages;
  }
}
