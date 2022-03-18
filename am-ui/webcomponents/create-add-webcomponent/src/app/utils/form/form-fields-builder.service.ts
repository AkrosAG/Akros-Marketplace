import {Injectable} from '@angular/core';
import {FieldResponseDto} from 'src/app/api/models';
import {FormFieldBase} from 'src/app/data/models/form-field-base';

/* istanbul ignore next */
@Injectable()
export class FormFieldsBuilderService {
  public createFieldsToFormFields(
    createFields: FieldResponseDto[]
  ): FormFieldBase<string>[] {
    console.log(createFields);
    const formFields: FormFieldBase<string>[] = [];
    createFields.forEach(createField => {
      const field = new FormFieldBase<string>({
        key: createField.key,
        required: false,
        type: createField.field_type_definition_id,
        min: createField.min_value,
        max: createField.max_value,
        options: createField.field_options,
        offer: createField.offer,
        request: createField.request,
        creation: createField.creation,
        order: createField.sort_number,
      });
      formFields.push(field);
    });

    return formFields;
  }
}
