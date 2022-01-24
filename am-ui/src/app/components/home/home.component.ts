import {FormFieldBase} from './../shared/form/form-field-base';
import {FormGroup} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {MarketplaceState} from 'src/app/data/store/marketplace.state';

import * as storeSelector from '../../data/store/marketplace.selector';
import * as storeActions from '../../data/store/marketplace.actions';
import {Category} from 'src/app/data/models/Category';

@Component({
  selector: 'mp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public categories$: Observable<Category[]>;
  public selectedCategorySearchFields$: Observable<FormFieldBase<string>[]>;
  public categorySelected$ = new Observable<Boolean>();
  public form: FormGroup;

  private currentCategoryId = 0;

  constructor(private store: Store<MarketplaceState>) {}

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
