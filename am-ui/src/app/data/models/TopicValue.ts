import {FieldOption} from './FieldOption';

export class TopicValue {
  topic_value_id: number;
  field_id: number;
  field_description: string;
  field_short_description: string;
  field_type_definition_id: number;
  field_type_definition_description: string;
  min_value: number;
  max_value: number;
  value: string;
  field_type_options: FieldOption[];
}
