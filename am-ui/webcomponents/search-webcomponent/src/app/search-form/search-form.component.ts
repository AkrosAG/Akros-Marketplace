import {FormFieldControlService} from './form/form-field-control.service';
import {FormFieldBase} from './form/form-field-base';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ValidationMessages} from '../utils/validators/ValidationMessages';
import {TopicsService} from '../api/services';
import {lastValueFrom} from 'rxjs';
import {SubCategoryDto, TopicSearchRequestDto} from '../api/models';
import {Store} from '@ngrx/store';
import {SearchWebcomponentState} from '../data/store/search-webcomponent.state';
import * as storeSelector from '../data/store/search-webcomponent.selector';
import {FormFieldsBuilderService} from '../utils/form/form-fields-builder.service';

@Component({
  selector: 'mp-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  public form!: FormGroup;
  public errorMessages: ValidationMessages<any>;
  public payLoad: TopicSearchRequestDto = {
    category_id: 0,
    request_or_offer: '',
  };

  @Input() appLanguage: string;
  @Output() submitEvent = new EventEmitter<any>();
  selectedCategorySearchFields: FormFieldBase<string>[] | null = [];
  subCategories: SubCategoryDto[] = [];
  currentCategoryId: number;
  currentCategoryKey: string;
  currentSubCategoryId: number;
  currentSubCategoryKey: string;

  /**
   * @description Component in charge of rendering the list of fields obtained from the chosen category, as well
   * as performing the search API call with the values from the form as well as the value for "request"
   * or "offer" and the category id.
   * @constructor
   * @param {Store} store - Redux store.
   * @param {FormFieldsBuilderService} formFieldsBuilderService - Service which transforms the category
   * @param {TopicsService} topicsService - Service for making the Topics search
   * @param {FormFieldControlService} formFieldControlService - Transforms the list of FormFieldBase fields into
   * a form there then for each of its atributes created a dynamic-form-field instance.
   */
  constructor(
    private store: Store<SearchWebcomponentState>,
    private formFieldsBuilderService: FormFieldsBuilderService,
    private formFieldControlService: FormFieldControlService,
    private topicsService: TopicsService
  ) {}

  ngOnInit() {
    this.store.select(
      storeSelector.getCurrentCategoryId
    ).subscribe(categoryId => this.currentCategoryId = categoryId);

    this.store.select(
      storeSelector.getCurrentCategoryKey
    ).subscribe(categoryKey => this.currentCategoryKey = categoryKey);

    this.store.select(
      storeSelector.getCurrentSubCategories
    ).subscribe(currentSubcategories => this.renderForm(currentSubcategories));
  }

  renderForm(currentSubcategories: SubCategoryDto[] | undefined) {
    if (currentSubcategories && currentSubcategories.length > 0) {
      this.currentSubCategoryKey = currentSubcategories[0].key;
      this.subCategories = currentSubcategories;
      this.renderSearchFields(currentSubcategories[0].subcategory_id);
    }
  }

  renderSearchFields(currentSubCategoryId: number) {
    const subCategory = this.subCategories.find(subcategory => subcategory.subcategory_id == currentSubCategoryId);
    if (subCategory) {
      this.currentSubCategoryId = currentSubCategoryId;
      this.currentSubCategoryKey = subCategory.key;
      this.selectedCategorySearchFields = this.formFieldsBuilderService.searchFieldsToFormFields(subCategory.fields);
      this.form = this.formFieldControlService.toFormGroup(
        this.selectedCategorySearchFields as FormFieldBase<string>[]
      );
      this.errorMessages = this.formFieldControlService.getValidationMessages(
        this.selectedCategorySearchFields as FormFieldBase<string>[]
      );

      this.form.controls['subCategoryDropdown'].setValue(subCategory.subcategory_id);
    }
  }

  /* istanbul ignore next */
  /**
   * @description Performs the search and notifies parent with the result obtained
   */
  async onSubmit() {
    const formData = JSON.parse(JSON.stringify(this.form.getRawValue()));
    this.payLoad.category_id = this.currentCategoryId;
    this.payLoad.request_or_offer = formData.requestOrOffer;
    this.payLoad.subcategory_id = this.currentSubCategoryId;
    // TODO: Map Fields in FormData to Fields in DTO
    const res = await lastValueFrom(
      this.topicsService.topicsSearchesPost({body: this.payLoad})
    );
    this.submitEvent.emit(res);
  }
}
