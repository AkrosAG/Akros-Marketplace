import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SearchWebcomponentState} from './search-webcomponent.state';

export const SearchWebcomponentStoreName = 'searchWebcomponentStore';
export const getSearchWebcomponentState =
  createFeatureSelector<SearchWebcomponentState>(SearchWebcomponentStoreName);
/* istanbul ignore next */
export const getCategories = createSelector(
  getSearchWebcomponentState,
  state => state.categories
);

/* istanbul ignore next */
export const getCategorySearchFields = createSelector(
  getSearchWebcomponentState,
  state => state.selectedCategorySearchFields
);

/* istanbul ignore next */
export const getIfCategorySelected = createSelector(
  getSearchWebcomponentState,
  state => state.categorySelected
);

/* istanbul ignore next */
export const getCurrentCategoryKey = createSelector(
  getSearchWebcomponentState,
  state => state.currentCategoryKey
);

/* istanbul ignore next */
export const getCurrentCategoryId = createSelector(
  getSearchWebcomponentState,
  state => state.currentCategoryId
);
