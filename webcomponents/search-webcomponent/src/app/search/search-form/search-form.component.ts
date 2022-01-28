import { FormFieldControlService } from './../../shared/form/form-field-control.service';
import { FormFieldBase } from './../../shared/form/form-field-base';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'mp-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  public form!: FormGroup;
  public payLoad = '';
  public showForm = false;
  @Input() selectedCategorySearchFields: FormFieldBase<string>[] | null = [];

  constructor(private formFieldControlService: FormFieldControlService) {}

  ngOnInit() {
    this.form = this.formFieldControlService.toFormGroup(
      this.selectedCategorySearchFields as FormFieldBase<string>[]
    );
    this.showForm = Object.keys(this.form.value).length === 0 ? false : true;
  }

  /* istanbul ignore next */
  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    console.log(this.payLoad);
  }
}
