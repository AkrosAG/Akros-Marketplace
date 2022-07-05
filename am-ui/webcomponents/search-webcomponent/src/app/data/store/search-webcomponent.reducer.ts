import {SearchWebcomponentState} from './search-webcomponent.state';
import {createReducer, on} from '@ngrx/store';

import * as searchWebcomponentActions from './search-webcomponent.actions';

const searchWebcomponentInitialState: SearchWebcomponentState = {
  categories: [],
  categorySelected: false,
  currentCategoryKey: '',
  currentCategoryId: 0,
};

export const searchWebcomponentReducer = createReducer<SearchWebcomponentState>(
  searchWebcomponentInitialState,
  on(
    searchWebcomponentActions.loadCategoriesSuccess,
    (state, action): SearchWebcomponentState => {
      return {
        ...state,
        categories: action.categories,
        currentCategoryKey: action.currentCategoryKey,
        currentCategoryId: action.currentCategoryId,
      };
    }
  ),
  on(
    searchWebcomponentActions.setCategory,
    (state, action): SearchWebcomponentState => {
      return {
        ...state,
        categorySelected: true,
        currentCategoryKey: action.currentCategoryKey,
        currentCategoryId: action.currentCategoryId,
      };
    }
  ),
  on(
    searchWebcomponentActions.resetCategorySelected,
    (state): SearchWebcomponentState => {
      return {
        ...state,
        categorySelected: false,
      };
    }
  )
);
