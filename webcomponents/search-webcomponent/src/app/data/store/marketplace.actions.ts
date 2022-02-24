import {FormFieldBase} from './../../shared/form/form-field-base';
import {Category} from '../models/Category';
import {createAction, props} from '@ngrx/store';

// Categories related actions

export const loadCategories = createAction(
  '[Categories] Get list of Categories'
);

export const loadCategoriesSuccess = createAction(
  '[Categories] Get list of categories success',
  props<{
    categories: Category[];
    searchFields: FormFieldBase<string>[];
    currentCategoryKey: string;
  }>()
);

export const loadCategoriesFailure = createAction(
  '[Categories] Get list of categories failure',
  props<{error: string}>()
);

export const setCategorySearchFields = createAction(
  '[Categories] Set search fields of a category',
  props<{
    selectedCategorySearchFields: FormFieldBase<string>[];
    currentCategoryKey: string;
  }>()
);

export const resetCategorySelected = createAction(
  '[Categories] Category Selection reset'
);
