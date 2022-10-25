import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { FormFieldsBuilderService } from '../../utils/form/form-fields-builder.service';

import { CategoriesService } from 'src/app/api/services/categories.service';
import * as searchWebcomponentActions from './search-webcomponent.actions';
import { SearchWebcomponentState } from './search-webcomponent.state';

@Injectable()
export class SearchWebcomponentEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<SearchWebcomponentState>,
    private formFieldsBuilderService: FormFieldsBuilderService,
    private categoriesService: CategoriesService
  ) {}

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchWebcomponentActions.loadCategories),
      switchMap(() =>
        this.categoriesService.categoriesCreateGet({create: false}).pipe(
          map(categories => {
            return searchWebcomponentActions.loadCategoriesSuccess({
              categories: categories.categories,
              currentCategoryKey: categories.categories[0].key,
              currentCategoryId: categories.categories[0].category_id,
              currentSubCategoryKey: categories.categories[0].sub_categories[0].key,
              currentSubCategoryId: categories.categories[0].sub_categories[0].subcategory_id,
              searchFields:
                this.formFieldsBuilderService.searchFieldsToFormFields(
                  categories.categories[0].sub_categories[0].fields
                ),
            });
          }),
          catchError(error =>
            of(
              searchWebcomponentActions.loadCategoriesFailure({
                error: error.toString(),
              })
            )
          )
        )
      )
    )
  );
}
