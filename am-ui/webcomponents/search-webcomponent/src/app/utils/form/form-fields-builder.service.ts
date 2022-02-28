import {Field} from '../../data/models/Field';
import {Injectable} from '@angular/core';
import {FormFieldBase} from '../../search-form/form/form-field-base';

/* istanbul ignore next */
@Injectable()
export class FormFieldsBuilderService {
  public searchFieldsToFormFields(
    searchFields: Field[]
  ): FormFieldBase<string>[] {
    const formFields: FormFieldBase<string>[] = [];
    searchFields.forEach(searchField => {
      const field = new FormFieldBase<string>({
        key: searchField.key,
        required: false,
        type: searchField.field_type_definition_id,
        min: searchField.min_value,
        max: searchField.max_value,
        options: searchField.field_options,
        offer: searchField.offer,
        request: searchField.request,
        creation: searchField.creation,
        order: searchField.sort_number,
      });
      formFields.push(field);
    });

    return formFields;
  }
}
