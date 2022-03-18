import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CreateAddWebcomponentState} from './create-add-webcomponent.state';

export const CreateAddWebcomponentStoreName = 'createAddWebcomponentStore';
export const getCreateAddWebcomponentState =
  createFeatureSelector<CreateAddWebcomponentState>(CreateAddWebcomponentStoreName);
/* istanbul ignore next */
export const getCategories = createSelector(
  getCreateAddWebcomponentState,
  state => state.categories
);

/* istanbul ignore next */
export const getCategoryCreateFields = createSelector(
  getCreateAddWebcomponentState,
  state => state.selectedCategoryCreateFields
);

/* istanbul ignore next */
export const getIfCategorySelected = createSelector(
  getCreateAddWebcomponentState,
  state => state.categorySelected
);

/* istanbul ignore next */
export const getCurrentCategoryKey = createSelector(
  getCreateAddWebcomponentState,
  state => state.currentCategoryKey
);
