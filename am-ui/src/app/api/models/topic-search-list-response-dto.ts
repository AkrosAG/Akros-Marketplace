/* tslint:disable */
/* eslint-disable */
import { TopicSearchColumnHeaderResponseDto } from './topic-search-column-header-response-dto';
import { TopicSearchResponseDto } from './topic-search-response-dto';
export interface TopicSearchListResponseDto {
  column_header: Array<TopicSearchColumnHeaderResponseDto>;
  topics: Array<TopicSearchResponseDto>;
}
