import {FieldOption} from './FieldOption';

export interface Field {
  fieldId: number;
  fieldTypeDefinitionId: number;
  key: string;
  sortNumber: number;
  minvalue: number;
  maxValue: number;
  searchable: boolean;
  request: boolean;
  offer: boolean;
  creation: boolean;
  fieldOptions: FieldOption[];
}
