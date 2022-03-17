/* tslint:disable */
/* eslint-disable */
import { FieldOptionResponseDto } from './field-option-response-dto';
export interface FieldResponseDto {
  creation: boolean;
  field_id: number;
  field_options?: Array<FieldOptionResponseDto>;
  field_type_definition_id: number;
  key: string;
  max_value?: number;
  min_value?: number;
  offer?: boolean;
  request?: boolean;
  searchable?: boolean;
  sort_number?: number;
}
