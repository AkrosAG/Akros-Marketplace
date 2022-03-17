/* tslint:disable */
/* eslint-disable */
import { TopicSearchFieldValuesRequestDto } from './topic-search-field-values-request-dto';
export interface TopicSearchRequestDto {
  category_id: number;
  request_or_offer: boolean;
  search_values?: Array<TopicSearchFieldValuesRequestDto>;
}
