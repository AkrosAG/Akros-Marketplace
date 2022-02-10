import {FormFieldControlService} from './../shared/form/form-field-control.service';
import {FormFieldBase} from './../shared/form/form-field-base';
import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ValidationMessages} from '../utils/form/ValidationMessages';

@Component({
  selector: 'mp-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  public form!: FormGroup;
  public errorMessages: ValidationMessages<any>;
  public payLoad = '';
  public showForm = false;
  public appLng: string;

  @Input() selectedCategorySearchFields: FormFieldBase<string>[] | null = [];

  constructor(
    private formFieldControlService: FormFieldControlService
  ) {}

  ngOnInit() {
    this.form = this.formFieldControlService.toFormGroup(
      this.selectedCategorySearchFields as FormFieldBase<string>[]
    );
    // TODO fix in back and del, no empty category should be allowed
    this.showForm = Object.keys(this.form.value).length === 0 ? false : true;
    this.errorMessages = this.formFieldControlService.getValidationMessages(
      this.selectedCategorySearchFields as FormFieldBase<string>[]
    );
    // Should be 'de'
    // this.appLng = this.translate.currentLang;
    this.appLng = "de";
  }

  /* istanbul ignore next */
  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    console.log(this.payLoad);
  }
}
