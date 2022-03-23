import {Injectable} from '@angular/core';
import {FormFieldBase} from '../../search-form/form/form-field-base';
import {FieldResponseDto} from 'src/app/api/models';

/* istanbul ignore next */
@Injectable()
export class FormFieldsBuilderService {
  public searchFieldsToFormFields(
    searchFields: FieldResponseDto[]
  ): FormFieldBase<string>[] {
    const formFields: FormFieldBase<string>[] = [];
    searchFields.forEach(searchField => {
      const field = new FormFieldBase<string>({
        id: searchField.field_id,
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
