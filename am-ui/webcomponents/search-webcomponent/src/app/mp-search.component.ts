import {FormFieldsBuilderService} from './utils/form/form-fields-builder.service';
import {LocalizationService} from './data/services/localization.service';
import {Store} from '@ngrx/store';
import {MarketplaceState} from './data/store/marketplace.state';
import {FormFieldBase} from 'src/app/search-form/form/form-field-base';
import {Observable} from 'rxjs';
import {Category} from 'src/app/data/models/Category';
import {FormGroup} from '@angular/forms';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';

import * as storeSelector from './data/store/marketplace.selector';
import * as storeActions from './data/store/marketplace.actions';

@Component({
  selector: 'mp-search',
  templateUrl: './mp-search.component.html',
  styleUrls: ['./mp-search.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class MpSearchComponent implements OnInit, OnChanges {
  public categories$: Observable<Category[]>;
  public selectedCategorySearchFields$: Observable<FormFieldBase<string>[]>;
  public categorySelected$ = new Observable<boolean>();
  public currentCategoryKey$: Observable<string>;
  public form: FormGroup;
  public categorySelected: boolean[] = [];
  public currentSelected: number = 0;

  title = 'search-webcomponent';
  public appLoaded: boolean = true;
  public appLanguage: string;
  private currentCategoryId = 1;
  @Input() language: string;

  constructor(
    private store: Store<MarketplaceState>,
    private localization: LocalizationService,
    private formFieldsBuilderService: FormFieldsBuilderService
  ) {}
  /* istanbul ignore next */
  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.language) {
      this.appLanguage = changes.language.currentValue;
      this.localization.use(this.appLanguage);
    }
  }
  /* istanbul ignore next */
  ngOnInit(): void {
    this.appLanguage = this.language ? this.language : 'de';
    this.localization.use(this.appLanguage);
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

  public categorySelect(index: number, category: Category) {
    this.categorySelected[this.currentSelected] = false;
    this.currentSelected = index;
    this.categorySelected[index] = true;
    if (this.currentCategoryId !== category.categoryId) {
      this.currentCategoryId = category.categoryId;
      this.store.dispatch(storeActions.resetCategorySelected());
      const formFields = this.formFieldsBuilderService.searchFieldsToFormFields(
        category.fields
      );
      this.store.dispatch(
        storeActions.setCategorySearchFields({
          selectedCategorySearchFields: formFields,
          currentCategoryKey: category.key,
        })
      );
    }
  }
}
