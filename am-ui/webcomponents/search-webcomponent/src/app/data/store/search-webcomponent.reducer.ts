import {SearchWebcomponentState} from './search-webcomponent.state';
import {createReducer, on} from '@ngrx/store';

import * as searchWebcomponentActions from './search-webcomponent.actions';

const searchWebcomponentInitialState: SearchWebcomponentState = {
  categories: [],
  selectedCategorySearchFields: [],
  categorySelected: false,
  currentCategoryKey: ''
};

export const searchWebcomponentReducer = createReducer<SearchWebcomponentState>(
  searchWebcomponentInitialState,
  on(
    searchWebcomponentActions.loadCategoriesSuccess,
    (state, action): SearchWebcomponentState => {
      return {
        ...state,
        categories: action.categories,
        selectedCategorySearchFields: action.searchFields,
        currentCategoryKey: action.currentCategoryKey
      };
    }
  ),
  on(
    searchWebcomponentActions.setCategorySearchFields,
    (state, action): SearchWebcomponentState => {
      return {
        ...state,
        categorySelected: true,
        selectedCategorySearchFields: action.selectedCategorySearchFields,
        currentCategoryKey: action.currentCategoryKey,
      };
    }
  ),
  on(searchWebcomponentActions.resetCategorySelected, (state): SearchWebcomponentState => {
    return {
      ...state,
      categorySelected: false,
    };
  })
);
