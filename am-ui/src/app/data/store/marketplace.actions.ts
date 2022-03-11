import {createAction, props} from '@ngrx/store';

export const setCurrentLanguage = createAction(
  '[AppLanguage] Set current language of the application',
  props<{
    currentLanguage: string;
  }>()
);
