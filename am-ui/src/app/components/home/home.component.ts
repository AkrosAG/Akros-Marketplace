import {MarketplaceState} from './../../data/store/marketplace.state';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, Observable} from 'rxjs';
import {FormFieldBase} from 'src/app/data/models/form-field-base';
import {CategoryDto} from 'src/app/api/models';

import * as storeSelector from './../../data/store/marketplace.selector';
import * as storeActions from './../../data/store/marketplace.actions';
import {FormFieldsBuilderService} from './../../data/services/form-fields-builder.service';
@Component({
  selector: 'mp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public appLanguage: string;
  public subscription: Subscription;
  public categories$: Observable<CategoryDto[]>;
  public selectedCategorySearchFields$: Observable<FormFieldBase<string>[]>;
  public categorySelected$ = new Observable<boolean>();
  public currentCategoryKey$: Observable<string>;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private store: Store<MarketplaceState>,
    private formFieldsBuilderService: FormFieldsBuilderService
  ) {}

  public navigateCreateAdd() {
    this.router.navigate(['create']);
  }

  ngOnInit(): void {
    this.subscription = this.translate.onLangChange.subscribe(appLanguage => {
      this.appLanguage = appLanguage.lang;
    });
    this.categories$ = this.store.select(storeSelector.getCategories);
    this.selectedCategorySearchFields$ = this.store.select(
      storeSelector.getCategorySearchFields
    );
    this.categorySelected$ = this.store.select(
      storeSelector.getIfCategorySelected
    );
    this.currentCategoryKey$ = this.store.select(
      storeSelector.getCurrentCategoryKey
    );
    this.store.dispatch(storeActions.loadCategories());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  categoryChange(categorySelectionEvent: any) {
    const fields = categorySelectionEvent.detail['category']['fields'];
    const key = categorySelectionEvent.detail['category']['key'];
    this.store.dispatch(storeActions.resetCategorySelected());
    const formFields =
      this.formFieldsBuilderService.searchFieldsToFormFields(fields);
    this.store.dispatch(
      storeActions.setCategorySearchFields({
        selectedCategorySearchFields: formFields,
        currentCategoryKey: key,
      })
    );
  }
}
