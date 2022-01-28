import {MarketplaceState} from './marketplace.state';
import {createReducer, on} from '@ngrx/store';

import * as marketplaceActions from './../store/marketplace.actions';

const marketplaceInitialState: MarketplaceState = {
  categories: [],
  selectedCategorySearchFields: [],
  categorySelected: false,
};

export const marketplaceReducer = createReducer<MarketplaceState>(
  marketplaceInitialState,
  on(
    marketplaceActions.loadCategoriesSuccess,
    (state, action): MarketplaceState => {
      return {
        ...state,
        categories: action.categories,
      };
    }
  ),
  on(
    marketplaceActions.getCategorySearchFieldsSuccess,
    (state, action): MarketplaceState => {
      return {
        ...state,
        categorySelected: true,
        selectedCategorySearchFields: action.selectedCategorySearchFields,
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
