import {Store} from '@ngrx/store';
import {FormFieldsBuilderService} from '../../utils/form/form-fields-builder.service';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as createAddWebcomponentActions from './create-add-webcomponent.actions';
import {CreateAddWebcomponentState} from './create-add-webcomponent.state';
import {CategoriesService} from 'src/app/api/services/categories.service';

@Injectable()
export class CreateAddWebcomponentEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<CreateAddWebcomponentState>,
    private formFieldsBuilderService: FormFieldsBuilderService,
    private categoriesService: CategoriesService
  ) {}

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createAddWebcomponentActions.loadCategories),
      switchMap(() =>
        this.categoriesService.categoriesCreateGet({create: true}).pipe(
          map(categories => {
            return createAddWebcomponentActions.loadCategoriesSuccess({
              categories: categories.categories,
            });
          }),
          catchError(error =>
            of(
              createAddWebcomponentActions.loadCategoriesFailure({
                error: error.toString(),
              })
            )
          )
        )
      )
    )
  );
}
