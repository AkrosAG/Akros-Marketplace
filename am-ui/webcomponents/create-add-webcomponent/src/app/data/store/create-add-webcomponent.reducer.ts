import {CreateAddWebcomponentState} from './create-add-webcomponent.state';
import {createReducer, on} from '@ngrx/store';

import * as createAddWebcomponentActions from './create-add-webcomponent.actions';

const createAddWebcomponentInitialState: CreateAddWebcomponentState = {
  categories: [],
  selectedCategoryCreateFields: [],
  categorySelected: false,
  currentCategoryKey: ''
};

export const createAddWebcomponentReducer = createReducer<CreateAddWebcomponentState>(
  createAddWebcomponentInitialState,
  on(
    createAddWebcomponentActions.loadCategoriesSuccess,
    (state, action): CreateAddWebcomponentState => {
      return {
        ...state,
        categories: action.categories
      };
    }
  ),
  on(
    createAddWebcomponentActions.setCategoryCreateFields,
    (state, action): CreateAddWebcomponentState => {
      return {
        ...state,
        categorySelected: true,
        selectedCategoryCreateFields: action.selectedCategoryCreateFields,
        currentCategoryKey: action.currentCategoryKey,
      };
    }
  ),
  on(createAddWebcomponentActions.resetCategorySelected, (state): CreateAddWebcomponentState => {
    return {
      ...state,
      categorySelected: false,
    };
  }),
  on(createAddWebcomponentActions.setCategorySelected, (state): CreateAddWebcomponentState => {
    return {
      ...state,
      categorySelected: true,
    };
  })
);
