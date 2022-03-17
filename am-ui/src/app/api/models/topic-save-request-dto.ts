/* tslint:disable */
/* eslint-disable */
import { TopicValueSaveRequestDto } from './topic-value-save-request-dto';
export interface TopicSaveRequestDto {
  category_id: number;
  request_or_offer: boolean;
  topic_id: number;
  topic_values: Array<TopicValueSaveRequestDto>;
}
