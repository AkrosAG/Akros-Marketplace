/* tslint:disable */
/* eslint-disable */
import { TopicValueLoadResponseDto } from './topic-value-load-response-dto';
export interface TopicLoadResponseDto {
  category_id: number;
  request_or_offer: boolean;
  topic_id: number;
  topic_values: Array<TopicValueLoadResponseDto>;
}
