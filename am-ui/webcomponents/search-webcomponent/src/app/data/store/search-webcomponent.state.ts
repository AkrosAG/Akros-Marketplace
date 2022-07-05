import {CategoryDto} from 'src/app/api/models';
import {FormFieldBase} from '../../search-form/form/form-field-base';

export interface SearchWebcomponentState {
  categories: CategoryDto[];
  categorySelected: boolean;
  currentCategoryKey: string;
  currentCategoryId: number;
}
