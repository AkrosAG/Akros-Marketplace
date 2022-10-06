import {TopicValue} from './TopicValue';
import {TopicImage} from './TopicImage';

export class Topic {
  topic_id: number;
  category_id: number;
  subcategory_id: number;
  request_or_offer: string;
  topic_values: TopicValue[];
  topic_images: TopicImage[];
}
