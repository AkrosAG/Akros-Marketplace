import {FormFieldBase} from './../../components/shared/form/form-field-base';
import {Category} from '../models/Category';
import {createAction, props} from '@ngrx/store';

// Get list of categories

export const loadCategories = createAction(
  '[Categories] Get list of Categories'
);

export const loadCategoriesSuccess = createAction(
  '[Categories] Get list of categories success',
  props<{categories: Category[]}>()
);

export const loadCategoriesFailure = createAction(
  '[Categories] Get list of categories failure',
  props<{error: string}>()
);

// Get search fields of a category

export const getCategorySearchFields = createAction(
  '[Categories] Get search fields of a category',
  props<{categoryId: number}>()
);

export const getCategorySearchFieldsSuccess = createAction(
  '[Categories] Get search fields of a category success',
  props<{selectedCategorySearchFields: FormFieldBase<string>[]}>()
);

export const getCategorySearchFieldsFailure = createAction(
  '[Categories] Get search fields of a category failure',
  props<{error: string}>()
);

export const resetCategorySelected = createAction(
  '[Categories] Category Selection reset'
);
