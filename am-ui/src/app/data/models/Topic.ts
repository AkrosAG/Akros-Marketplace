import {TopicValue} from './TopicValue'

export class Topic {
  topic_id: number;
  category_id: number;
  subcategory_id: number;
  request_or_offer: string;
  topic_values: TopicValue[];
}
