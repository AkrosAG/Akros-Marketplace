import {FieldOption} from './FieldOption';

export interface Field {
  field_id: number;
  field_type_definition_id: number;
  key: string;
  sort_number: number;
  min_value: number;
  max_value: number;
  searchable: boolean;
  request: boolean;
  offer: boolean;
  creation: boolean;
  field_options: FieldOption[];
}
