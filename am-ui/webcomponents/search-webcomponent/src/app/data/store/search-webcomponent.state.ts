import {CategoryDto} from 'src/app/api/models';
import {FormFieldBase} from '../../search-form/form/form-field-base';

export interface SearchWebcomponentState {
  categories: CategoryDto[];
  selectedCategorySearchFields: FormFieldBase<string>[];
  categorySelected: boolean;
  currentCategoryKey: string;
}
