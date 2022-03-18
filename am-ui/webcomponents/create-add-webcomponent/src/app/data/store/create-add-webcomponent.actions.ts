import {createAction, props} from '@ngrx/store';
import {CategoryDto} from 'src/app/api/models';
import { FormFieldBase } from '../models/form-field-base';

// Categories related actions

export const loadCategories = createAction(
  '[Categories] Get list of Categories'
);

export const loadCategoriesSuccess = createAction(
  '[Categories] Get list of categories success',
  props<{
    categories: CategoryDto[];
  }>()
);

export const loadCategoriesFailure = createAction(
  '[Categories] Get list of categories failure',
  props<{error: string}>()
);

export const setCategoryCreateFields = createAction(
  '[Categories] Set create fields of a category',
  props<{
    selectedCategoryCreateFields: FormFieldBase<string>[];
    currentCategoryKey: string;
  }>()
);

export const resetCategorySelected = createAction(
  '[Categories] Category Selection reset'
);

export const setCategorySelected = createAction(
  '[Categories] Category Selected'
);
