import {FormFieldBase} from '../../search-form/form/form-field-base';
import {Category} from '../models/Category';

export interface MarketplaceState {
  categories: Category[];
  selectedCategorySearchFields: FormFieldBase<string>[];
  categorySelected: boolean;
  currentCategoryKey: string;
}
