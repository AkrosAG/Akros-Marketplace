import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {FormFieldControlService} from './form/form-field-control.service';
import {FormFieldBase} from './form/form-field-base';
import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ValidationMessages} from '../utils/validators/ValidationMessages';
import {CategoryDto} from '../api/models';
import {FormFieldsBuilderService} from '../utils/form/form-fields-builder.service';

import * as storeSelector from './../data/store/create-add-webcomponent.selector';
import * as storeActions from './../data/store/create-add-webcomponent.actions';
import {CreateAddWebcomponentState} from '../data/store/create-add-webcomponent.state';
@Component({
  selector: 'mp-create-add-form',
  templateUrl: './create-add-form.component.html',
  styleUrls: ['./create-add-form.component.scss'],
})
export class CreateAddFormComponent implements OnInit {
  public form!: FormGroup;
  public errorMessages: ValidationMessages<any>;
  public payLoad = '';
  public currentSelected: number = 0;
  public currentCategory: any;
  @Input() categories: CategoryDto[];
  @Input() appLanguage: string;

  public selectedCategoryCreateFields$: Observable<FormFieldBase<string>[]>;
  // public categorySelected$ = new Observable<boolean>();
  public categorySelected = false;
  public currentCategoryKey$: Observable<string>;
  private currentCategoryId = -1;

  constructor(
    private formFieldControlService: FormFieldControlService,
    private formFieldsBuilderService: FormFieldsBuilderService,
    private store: Store<CreateAddWebcomponentState>
  ) {}

  ngOnInit() {
    this.selectedCategoryCreateFields$ = this.store.select(
      storeSelector.getCategoryCreateFields
    );
    // this.categorySelected$ = this.store.select(
    //   storeSelector.getIfCategorySelected
    // );
    this.currentCategoryKey$ = this.store.select(
      storeSelector.getCurrentCategoryKey
    );
  }

  public categorySelect(categoryIndex: number) {
    const category = this.categories[categoryIndex];
    this.categorySelected = true;
    if (this.currentCategoryId !== category.category_id) {
      this.currentCategoryId = category.category_id;
      this.store.dispatch(storeActions.resetCategorySelected());
      const formFields = this.formFieldsBuilderService.createFieldsToFormFields(
        category.fields
      );
      // this.store.dispatch(
      //   storeActions.setCategoryCreateFields({
      //     selectedCategoryCreateFields: formFields,
      //     currentCategoryKey: category.key,
      //   })
      // );
      this.form = this.formFieldControlService.toFormGroup(formFields);
      this.errorMessages = this.formFieldControlService.getValidationMessages(formFields);
      console.log(this.form)
    }
  }

  /* istanbul ignore next */
  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    console.log(this.payLoad);
  }
}
