import {CategoryDto} from 'src/app/api/models';
import {FormFieldBase} from '../models/form-field-base';

export interface CreateAddWebcomponentState {
  categories: CategoryDto[];
  selectedCategoryCreateFields: FormFieldBase<string>[];
  categorySelected: boolean;
  currentCategoryKey: string;
}
