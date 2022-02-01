import { Store } from '@ngrx/store';
import { MarketplaceState } from './data/store/marketplace.state';
import { FormFieldBase } from 'src/app/shared/form/form-field-base';
import { Observable } from 'rxjs';
import { Category } from 'src/app/data/models/Category';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import * as storeSelector from './data/store/marketplace.selector';
import * as storeActions from './data/store/marketplace.actions';

@Component({
  selector: 'mp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public categories$: Observable<Category[]>;
  public selectedCategorySearchFields$: Observable<FormFieldBase<string>[]>;
  public categorySelected$ = new Observable<Boolean>();
  public form: FormGroup;

  title = 'search-webcomponent';
  public appLoaded: boolean = true;
  private currentCategoryId = 0;

  constructor(
    private readonly translate: TranslateService,
    private store: Store<MarketplaceState>
  ) {
    translate.setDefaultLang('de');
  }

  ngOnInit(): void {
    this.categories$ = this.store.select(storeSelector.getCategories);
    this.selectedCategorySearchFields$ = this.store.select(
      storeSelector.getCategorySearchFields
    );
    this.categorySelected$ = this.store.select(
      storeSelector.getIfCategorySelected
    );
    this.store.dispatch(storeActions.loadCategories());
  }

  onCategorySelected(categoryId: number) {
    if (this.currentCategoryId !== categoryId) {
      this.currentCategoryId = categoryId;
      this.store.dispatch(storeActions.resetCategorySelected());
      this.store.dispatch(storeActions.getCategorySearchFields({categoryId}));
    }
  }

}
