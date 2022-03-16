import {CategoryEvent} from './data/models/categoryEvent';
import {LocalizationService} from './data/services/localization.service';
import {FormFieldBase} from 'src/app/search-form/form/form-field-base';
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

import {CategoryDto} from './api/models';
import {Output} from '@angular/core';

@Component({
  selector: 'mp-search',
  templateUrl: './mp-search.component.html',
  styleUrls: ['./mp-search.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class MpSearchComponent implements OnInit, OnChanges {
  public form: FormGroup;
  public categorySelected: boolean[] = [];
  public currentSelected: number = 0;

  title = 'search-webcomponent';
  public appLoaded: boolean = true;
  public appLanguage: string;
  private currentCategoryId = 1;
  @Input() language: string;
  @Input() selectedCategorySearchFields: FormFieldBase<string>[];
  @Input() categories: CategoryDto[];
  @Input() currentCategoryKey: string;
  @Input() categoryIsSelected: boolean;
  @Output()
  public categorySelection = new EventEmitter<CategoryEvent>();

  constructor(private localization: LocalizationService) {}
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
  }

  public categorySelect(index: number, category: CategoryDto) {
    this.categorySelected[this.currentSelected] = false;
    this.currentSelected = index;
    this.categorySelected[index] = true;
    if (this.currentCategoryId !== category.category_id) {
      this.currentCategoryId = category.category_id;
      this.categorySelection.emit({index, category});
    }
  }
}
