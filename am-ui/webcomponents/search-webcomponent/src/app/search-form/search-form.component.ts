import {FormFieldControlService} from './form/form-field-control.service';
import {FormFieldBase} from './form/form-field-base';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ValidationMessages} from '../utils/validators/ValidationMessages';
import {TopicsService} from '../api/services';
import {lastValueFrom} from 'rxjs';
import {TopicSearchRequestDto} from '../api/models';

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

  public readonly OFFER = 'OFFER';
  public readonly REQUEST = 'REQUEST';

  @Input() selectedCategorySearchFields: FormFieldBase<string>[] | null = [];
  @Input() appLanguage: string;
  @Input() currentCategoryKey: string;
  @Input() currentCategoryId: number;
  @Output() submitEvent = new EventEmitter<any>();

  constructor(
    private formFieldControlService: FormFieldControlService,
    private topicsService: TopicsService
  ) {}

  ngOnInit() {
    this.form = this.formFieldControlService.toFormGroup(
      this.selectedCategorySearchFields as FormFieldBase<string>[]
    );
    this.errorMessages = this.formFieldControlService.getValidationMessages(
      this.selectedCategorySearchFields as FormFieldBase<string>[]
    );
  }

  /* istanbul ignore next */
  async onSubmit() {
    const formData = JSON.parse(JSON.stringify(this.form.getRawValue()));
    console.log(formData);
    this.payLoad.category_id = this.currentCategoryId;
    this.payLoad.request_or_offer = formData.requestOrOffer;
    // TODO: Map Fields in FormData to Fields in DTO
    const res = await lastValueFrom(
      this.topicsService.topicsSearchesPost({body: this.payLoad})
    );
    this.submitEvent.emit(res);
  }
}
