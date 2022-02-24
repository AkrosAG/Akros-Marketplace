import {FormFieldBase} from './../../shared/form/form-field-base';
import {Category} from '../models/Category';

export interface MarketplaceState {
  categories: Category[];
  selectedCategorySearchFields: FormFieldBase<string>[];
  categorySelected: boolean;
  currentCategoryKey: string;
}
