import {FormFieldBase} from './../../components/shared/form/form-field-base';
import {Category} from '../models/Category';

export interface MarketplaceState {
  categories: Category[];
  selectedCategorySearchFields: FormFieldBase<string>[];
  categorySelected: Boolean;
}
