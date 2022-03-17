/* tslint:disable */
/* eslint-disable */
import { FieldOptionResponseDto } from './field-option-response-dto';
export interface TopicValueLoadResponseDto {
  field_description?: string;
  field_id: number;
  field_short_description?: string;
  field_type_definition_description?: string;
  field_type_definition_id?: number;
  field_type_options?: Array<FieldOptionResponseDto>;
  max_value?: number;
  min_value?: number;
  topic_value_id: number;
  value?: string;
}
