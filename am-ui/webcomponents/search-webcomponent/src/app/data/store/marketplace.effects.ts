import {Store} from '@ngrx/store';
import {FormFieldsBuilderService} from '../../utils/form/form-fields-builder.service';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';

import * as marketplaceActions from './../store/marketplace.actions';
import {MarketplaceState} from './../store/marketplace.state';
import {ApiService} from 'src/app/api/services';

@Injectable()
export class MarketPlaceEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<MarketplaceState>,
    private formFieldsBuilderService: FormFieldsBuilderService,
    private apiService: ApiService
  ) {}

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(marketplaceActions.loadCategories),
      switchMap(() =>
        this.apiService.categoriesGet().pipe(
          map(categories => {
            return marketplaceActions.loadCategoriesSuccess({
              categories: categories.categories,
              currentCategoryKey: categories.categories[0].key,
              searchFields:
                this.formFieldsBuilderService.searchFieldsToFormFields(
                  categories.categories[0].fields
                ),
            });
          }),
          catchError(error =>
            of(
              marketplaceActions.loadCategoriesFailure({
                error: error.toString(),
              })
            )
          )
        )
      )
    )
  );
}
