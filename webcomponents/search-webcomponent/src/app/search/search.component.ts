import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from '../data/models/Category';
import { MarketplaceState } from '../data/store/marketplace.state';
import { FormFieldBase } from '../shared/form/form-field-base';
import { Store } from '@ngrx/store';
import * as storeSelector from '../data/store/marketplace.selector';
import * as storeActions from '../data/store/marketplace.actions';

@Component({
  selector: 'mp-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class SearchComponent implements OnInit {
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
      this.store.dispatch(storeActions.getCategorySearchFields({ categoryId }));
    }
  }
}
