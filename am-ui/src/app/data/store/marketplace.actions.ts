import {CategoryDto} from 'src/app/api/models';
import {createAction, props} from '@ngrx/store';
import {FormFieldBase} from '../models/form-field-base';

export const setCurrentLanguage = createAction(
  '[AppLanguage] Set current language of the application',
  props<{
    currentLanguage: string;
  }>()
);

// Categories related actions

export const loadCategories = createAction(
  '[Categories] Get list of Categories'
);

export const loadCategoriesSuccess = createAction(
  '[Categories] Get list of categories success',
  props<{
    categories: CategoryDto[];
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
