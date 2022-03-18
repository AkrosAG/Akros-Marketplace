import {Store} from '@ngrx/store';
import {FormFieldsBuilderService} from '../../utils/form/form-fields-builder.service';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as searchWebcomponentActions from './search-webcomponent.actions';
import {SearchWebcomponentState} from './search-webcomponent.state';
import {CategoriesService} from 'src/app/api/services/categories.service';

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
              searchFields:
                this.formFieldsBuilderService.searchFieldsToFormFields(
                  categories.categories[0].fields
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
