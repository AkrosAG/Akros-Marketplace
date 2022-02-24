import {Store} from '@ngrx/store';
import {FormFieldsBuilderService} from './../../utils/formFieldsBuilderService';
import {CategoriesService} from '../services/categories.service';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';

import * as marketplaceActions from './../store/marketplace.actions';
import {MarketplaceState} from './../store/marketplace.state';

@Injectable()
export class MarketPlaceEffects {
  constructor(
    private categoriesService: CategoriesService,
    private actions$: Actions,
    private store$: Store<MarketplaceState>,
    private formFieldsBuilderService: FormFieldsBuilderService
  ) {}

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(marketplaceActions.loadCategories),
      switchMap(() =>
        this.categoriesService.getCategories().pipe(
          map(categories => {
            return marketplaceActions.loadCategoriesSuccess({
              categories: categories,
              currentCategoryKey: categories[0].key,
              searchFields:
                this.formFieldsBuilderService.searchFieldsToFormFields(
                  categories[0].fields
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
