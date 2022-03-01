import {FieldOptionResponseDto} from 'src/app/api/models';

export class FormFieldBase<T> {
  value: T | undefined;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  type: number;
  min: number;
  max: number;
  options: FieldOptionResponseDto[];
  searchable: boolean;
  offer: boolean;
  request: boolean;
  creation: boolean;
  /* istanbul ignore next */
  constructor(
    options: {
      value?: T;
      key?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      type?: number;
      min?: number;
      max?: number;
      options?: FieldOptionResponseDto[];
      searchable?: boolean;
      request?: boolean;
      offer?: boolean;
      creation?: boolean;
    } = {}
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type === undefined ? 1 : options.type;
    this.min = options.min === undefined ? 0 : options.min;
    this.max = options.max === undefined ? 0 : options.max;
    this.options = options.options || [];
    this.searchable = !!options.searchable;
    this.offer = !!options.offer;
    this.request = !!options.request;
    this.creation = !!options.creation;
  }
}
