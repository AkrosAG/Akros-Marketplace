import {searchWebComponentConfig} from './../../config';

import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {FormFieldBase} from './form-field-base';

  /**
   * @description Renders a formfield based on its type with a condition logic in the HTML file
   */
@Component({
  selector: 'mp-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.scss'],
})
export class DynamicFormFieldComponent {
  @Input() formField!: FormFieldBase<string>;
  @Input() form!: FormGroup;
  @Input() errorMessages: any;
  @Input() appLanguage: string;
  @Input() currentCategoryKey: string;

  public selectCounterValues = searchWebComponentConfig.selectCounterValues;

  get isValid() {
    return this.form.controls[this.formField.key].valid;
  }
}
