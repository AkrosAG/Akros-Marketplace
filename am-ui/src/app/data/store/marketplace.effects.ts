import {FormFieldsBuilderService} from './../../utils/formFieldsBuilderService';
import {CategoriesService} from '../services/categories.service';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as marketplaceActions from './../store/marketplace.actions';

@Injectable()
export class MarketPlaceEffects {
  constructor(
    private categoriesService: CategoriesService,
    private actions$: Actions,
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

  getCategorySearchFields$ = createEffect(() =>
    this.actions$.pipe(
      ofType(marketplaceActions.getCategorySearchFields),
      switchMap(action =>
        this.categoriesService.getSearchFieldTypes(action.categoryId).pipe(
          map(selectedCategorySearchFields => {
            const formFields =
              this.formFieldsBuilderService.searchFieldsToFormFields(
                selectedCategorySearchFields
              );
            return marketplaceActions.getCategorySearchFieldsSuccess({
              selectedCategorySearchFields: formFields,
            });
          }),
          catchError(error =>
            of(
              marketplaceActions.getCategorySearchFieldsFailure({
                error: error.toString(),
              })
            )
          )
        )
      )
    )
  );
}
