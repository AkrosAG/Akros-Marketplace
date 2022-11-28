import {
  Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LocalizationService } from './data/services/localization.service';
import { SearchWebcomponentState } from './data/store/search-webcomponent.state';

import { Output } from '@angular/core';
import { CategoryDto } from './api/models';
import * as storeActions from './data/store/search-webcomponent.actions';
import * as storeSelector from './data/store/search-webcomponent.selector';
import { MpSearchService } from './mp-search.service';

@Component({
  selector: 'mp-search',
  templateUrl: './mp-search.component.html',
  styleUrls: ['./mp-search.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class MpSearchComponent implements OnInit, OnChanges, OnDestroy {
  public categories$: Observable<CategoryDto[]>;
  public categorySelected$ = new Observable<boolean>();
  public form: FormGroup;
  public categorySelected: boolean[] = [];
  public currentSelected: number = 0;
  private currentCategoryId = 1;

  title = 'search-webcomponent';
  public appLoaded: boolean = true;
  public appLanguage: string;
  @Input() language = 'de';
  @Output() submitToContainerEvent = new EventEmitter<any>();
  @Output() startSearchEvent = new EventEmitter<boolean>();
  @Output() endSearchEvent = new EventEmitter<boolean>();
  public searchResultSubscription: Subscription;

  /**
   * @description Top level component of the search form module. Retrieves list of categories using the Store,
   *  which makes use of the caterogies service, to get the list of categories and all their fields
   * which belong to the search.
   * @constructor
   * @param {Store} store - Redux store.
   * @param {LocalizationService} localization - Service for translation change detection
   * fields obtained into FormFieldBase objects to build the dynamic form
   */
  constructor(
    private store: Store<SearchWebcomponentState>,
    private localization: LocalizationService,
    private mpSearchService: MpSearchService
  ) {
  }

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
    this.categorySelected$ = this.store.select(
      storeSelector.getIfCategorySelected
    );
    this.store.dispatch(storeActions.loadCategories());
  }

  /**
   * @description Funtion to change current category upon selection and rebuild the form fields
   * @param {number} index - Index of the selected category from the array of categories
   * @param {CategoryDto} category - Category selected data
   */
  public categorySelect(index: number, category: CategoryDto) {
    this.categorySelected[this.currentSelected] = false;
    this.currentSelected = index;
    this.categorySelected[index] = true;
    if (this.currentCategoryId !== category.category_id) {
      this.currentCategoryId = category.category_id;
      this.store.dispatch(storeActions.resetCategorySelected());
      this.store.dispatch(
        storeActions.setCategory({
          currentCategoryKey: category.key,
          currentCategoryId: category.category_id,
        })
      );
    }
  }

  /**
   * @description Opens detail view with search results data
   * @param {Event} event - Search results data
   *
   */
  relayToContainer(event: Event) {
    this.submitToContainerEvent.emit(event);
    this.startSearchEvent.emit(true);
  }

  onSubmitSearchAllAds() {
    this.onStartSearchEvent();
    this.searchResultSubscription = this.mpSearchService.getAllTopics().subscribe(res => {
      this.submitToContainerEvent.emit(res);
      this.onEndSearchEvent();
    }, () => {
      this.onEndSearchEvent();
    });
  }

  onStartSearchEvent() {
    this.startSearchEvent.emit();
  }

  onEndSearchEvent() {
    this.endSearchEvent.emit();
  }

  ngOnDestroy(): void {
    if (this.searchResultSubscription) {
      this.searchResultSubscription.unsubscribe();
    }
  }
}
