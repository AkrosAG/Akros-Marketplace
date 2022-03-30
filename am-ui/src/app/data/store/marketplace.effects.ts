import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {MarketplaceState} from './../store/marketplace.state';

@Injectable()
export class MarketPlaceEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<MarketplaceState>
  ) {}
}
