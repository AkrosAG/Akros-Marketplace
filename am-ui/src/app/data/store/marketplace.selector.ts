import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MarketplaceState} from './marketplace.state';

export const marketplaceStoreName = 'marketplaceStore';
export const getMarketplaceState =
  createFeatureSelector<MarketplaceState>(marketplaceStoreName);

/* istanbul ignore next */
export const getCurrentLanguage = createSelector(
  getMarketplaceState,
  state => state.currentLanguage
);

/* istanbul ignore next */
export const getCategories = createSelector(
  getMarketplaceState,
  state => state.categories
);

/* istanbul ignore next */
export const getCategorySearchFields = createSelector(
  getMarketplaceState,
  state => state.selectedCategorySearchFields
);

/* istanbul ignore next */
export const getIfCategorySelected = createSelector(
  getMarketplaceState,
  state => state.categorySelected
);

/* istanbul ignore next */
export const getCurrentCategoryKey = createSelector(
  getMarketplaceState,
  state => state.currentCategoryKey
);
