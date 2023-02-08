import {Directive} from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[dateValidator]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: DateValidatorDirective, multi: true},
  ],
})
export class DateValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const minDate = new Date(1800);
    const maxDate = new Date(3500);
    console.log('Directive Date', control.value);

    if (control.value) {
      return {error: true};
      //   const dateValue = new Date(control.value);
      //   console.log('Directive Date val', dateValue);

      //   if (
      //     dateValue.getFullYear() < minDate.getFullYear() ||
      //     dateValue.getFullYear() > maxDate.getFullYear()
      //   ) {
      //     console.log('Directive Date in if ', dateValue);

      //     return {invalidDate: true};
      //   }
    }
    return null;
  }
}
