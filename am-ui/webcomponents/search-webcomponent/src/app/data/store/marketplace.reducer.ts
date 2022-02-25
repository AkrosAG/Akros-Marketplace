import {MarketplaceState} from './marketplace.state';
import {createReducer, on} from '@ngrx/store';

import * as marketplaceActions from './../store/marketplace.actions';

const marketplaceInitialState: MarketplaceState = {
  categories: [],
  selectedCategorySearchFields: [],
  categorySelected: false,
  currentCategoryKey: '',
};

export const marketplaceReducer = createReducer<MarketplaceState>(
  marketplaceInitialState,
  on(
    marketplaceActions.loadCategoriesSuccess,
    (state, action): MarketplaceState => {
      return {
        ...state,
        categories: action.categories,
        selectedCategorySearchFields: action.searchFields,
        currentCategoryKey: action.currentCategoryKey
      };
    }
  ),
  on(
    marketplaceActions.setCategorySearchFields,
    (state, action): MarketplaceState => {
      return {
        ...state,
        categorySelected: true,
        selectedCategorySearchFields: action.selectedCategorySearchFields,
        currentCategoryKey: action.currentCategoryKey,
      };
    }
  ),
  on(marketplaceActions.resetCategorySelected, (state): MarketplaceState => {
    return {
      ...state,
      categorySelected: false,
    };
  })
);
