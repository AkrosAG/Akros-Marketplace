import { Field } from './Field';
export interface Category {
  categoryId: number;
  key: string;
  fields: Field[];
}
