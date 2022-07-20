import {FormFieldBase} from '../../search-form/form/form-field-base';
import {createAction, props} from '@ngrx/store';
import {CategoryDto, SubCategoryDto} from 'src/app/api/models';

// Categories related actions

export const loadCategories = createAction(
  '[Categories] Get list of Categories'
);

export const loadCategoriesSuccess = createAction(
  '[Categories] Get list of categories success',
  props<{
    categories: CategoryDto[];
    currentCategoryKey: string;
    currentCategoryId: number;
    currentSubCategoryKey: string;
    currentSubCategoryId: number;
    searchFields: FormFieldBase<string>[];
  }>()
);

export const loadCategoriesFailure = createAction(
  '[Categories] Get list of categories failure',
  props<{error: string}>()
);

export const setCategory = createAction(
  '[Categories] Set search fields of a category',
  props<{
    currentCategoryKey: string;
    currentCategoryId: number;
  }>()
);

export const setSubCategorySearchFields = createAction(
  '[Categories] Set search fields of a category',
  props<{
    currentSubCategoryKey: string;
    currentSubCategoryId: number;
    searchFields: FormFieldBase<string>[];
  }>()
);

export const resetCategorySelected = createAction(
  '[Categories] Category Selection reset'
);
