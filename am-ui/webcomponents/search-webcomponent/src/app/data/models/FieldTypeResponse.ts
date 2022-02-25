import {FieldTypeChooseResponse} from './FieldTypeChooseResponse';

export interface FieldTypeResponse {
  categoryId: number;
  fieldTypeId: number;
  fieldTypeDefinitionId: number;
  fieldTypeDefinitionDescription: string;
  description: string;
  shortDescription: string;
  minvalue: number;
  maxValue: number;
  search: boolean;
  offer: boolean;
  fieldTypeChooses: FieldTypeChooseResponse[];
}
