import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MarketplaceState} from './marketplace.state';

export const marketplaceStoreName = 'marketplaceStore';
export const getMarketplaceState =
  createFeatureSelector<MarketplaceState>(marketplaceStoreName);

export const getCategories = createSelector(
  getMarketplaceState,
  state => state.categories
);

/* istanbul ignore next */
export const getCategorySearchFields = createSelector(
  getMarketplaceState,
  state => state.selectedCategorySearchFields
);

export const getIfCategorySelected = createSelector(
  getMarketplaceState,
  state => state.categorySelected
);
