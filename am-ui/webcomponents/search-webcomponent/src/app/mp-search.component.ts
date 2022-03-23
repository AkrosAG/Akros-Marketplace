import {FormFieldsBuilderService} from './utils/form/form-fields-builder.service';
import {LocalizationService} from './data/services/localization.service';
import {Store} from '@ngrx/store';
import {SearchWebcomponentState} from './data/store/search-webcomponent.state';
import {FormFieldBase} from 'src/app/search-form/form/form-field-base';
import {Observable} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  SimpleChanges,
  OnChanges,
  EventEmitter,
} from '@angular/core';

import * as storeSelector from './data/store/search-webcomponent.selector';
import * as storeActions from './data/store/search-webcomponent.actions';
import {CategoryDto} from './api/models';
import {Output} from '@angular/core';

@Component({
  selector: 'mp-search',
  templateUrl: './mp-search.component.html',
  styleUrls: ['./mp-search.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class MpSearchComponent implements OnInit, OnChanges {
  public categories$: Observable<CategoryDto[]>;
  public selectedCategorySearchFields$: Observable<FormFieldBase<string>[]>;
  public categorySelected$ = new Observable<boolean>();
  public currentCategoryKey$: Observable<string>;
  public currentCategoryId$: Observable<number>;
  public form: FormGroup;
  public categorySelected: boolean[] = [];
  public currentSelected: number = 0;
  private currentCategoryId = 1;

  title = 'search-webcomponent';
  public appLoaded: boolean = true;
  public appLanguage: string;
  @Input() language = 'de';
  @Output() submitToContainerEvent = new EventEmitter<any>();

  constructor(
    private store: Store<SearchWebcomponentState>,
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
  async ngOnInit() {
    this.appLanguage = this.language;
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
    this.currentCategoryId$ = this.store.select(
      storeSelector.getCurrentCategoryId
    );
    this.store.dispatch(storeActions.loadCategories());
  }

  public categorySelect(index: number, category: CategoryDto) {
    this.categorySelected[this.currentSelected] = false;
    this.currentSelected = index;
    this.categorySelected[index] = true;
    if (this.currentCategoryId !== category.category_id) {
      this.currentCategoryId = category.category_id;
      this.store.dispatch(storeActions.resetCategorySelected());
      const formFields = this.formFieldsBuilderService.searchFieldsToFormFields(
        category.fields
      );
      this.store.dispatch(
        storeActions.setCategorySearchFields({
          selectedCategorySearchFields: formFields,
          currentCategoryKey: category.key,
          currentCategoryId: category.category_id,
        })
      );
    }
  }

  relayToContainer(event: Event) {
    this.submitToContainerEvent.emit(event);
  }
}
