import {Field} from './Field';
export interface Category {
  category_id: number;
  key: string;
  fields: Field[];
}
