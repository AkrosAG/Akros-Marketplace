import {MarketplaceState} from './marketplace.state';
import {createReducer, on} from '@ngrx/store';

import * as marketplaceActions from './../store/marketplace.actions';

const marketplaceInitialState: MarketplaceState = {
  currentLanguage: 'de',
};

export const marketplaceReducer = createReducer<MarketplaceState>(
  marketplaceInitialState,
  on(
    marketplaceActions.setCurrentLanguage,
    (state, action): MarketplaceState => {
      return {
        ...state,
        currentLanguage: action.currentLanguage,
      };
    }
  )
);
