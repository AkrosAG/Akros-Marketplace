import {CategoryDto} from 'src/app/api/models';
import {FormFieldBase} from '../models/form-field-base';
export interface MarketplaceState {
  currentLanguage: string;
  categories: CategoryDto[];
  selectedCategorySearchFields: FormFieldBase<string>[];
  categorySelected: boolean;
  currentCategoryKey: string;
}
