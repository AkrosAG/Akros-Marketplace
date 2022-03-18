import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as marketplaceActions from './marketplace.actions';
import {MarketplaceState} from './marketplace.state';
import {CategoriesService} from 'src/app/api/services/categories.service';
import {FormFieldsBuilderService} from '../services/form-fields-builder.service';

@Injectable()
export class MarketplaceEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<MarketplaceState>,
    private formFieldsBuilderService: FormFieldsBuilderService,
    private categoriesService: CategoriesService
  ) {}

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(marketplaceActions.loadCategories),
      switchMap(() =>
        this.categoriesService.categoriesCreateGet({create: false}).pipe(
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
