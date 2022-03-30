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
