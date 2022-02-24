import {FieldTypeChooseResponse} from 'src/app/data/models/FieldTypeChooseResponse';

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
  options: FieldTypeChooseResponse[];
  offer: boolean;
  search: boolean;

  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      type?: number;
      min?: number;
      max?: number;
      options?: FieldTypeChooseResponse[];
      offer?: boolean;
      search?: boolean;
    } = {}
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type === undefined ? 1 : options.type;
    this.min = options.min === undefined ? 0 : options.min;
    this.max = options.max === undefined ? 0 : options.max;
    this.options = options.options || [];
    this.offer = !!options.offer;
    this.search = !!options.search;
  }
}
