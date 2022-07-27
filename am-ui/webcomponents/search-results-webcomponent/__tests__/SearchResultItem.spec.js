import SearchResultItem from '../src/SearchResultItem';
import { shallow } from 'enzyme';
import React from 'react';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key })
}));

describe('SearchResultItem', () => {
  it('should show ul-element when results are given', () => {
    const result = [
      {
        topic_id: 8,
        topic_values: [
          {
            topic_id: 8,
            field_id: 10,
            key: 'type',
            value: 'room'
          },
          {
            topic_id: 8,
            field_id: 1,
            key: 'title',
            value: 'Einzimmerwohnung'
          },
          {
            topic_id: 8,
            field_id: 12,
            key: 'region',
            value: 'Bern'
          },
          {
            topic_id: 8,
            field_id: 11,
            key: 'postalCode',
            value: '1234'
          },
          {
            topic_id: 8,
            field_id: 13,
            key: 'address',
            value: 'Teststr. 7'
          },
          {
            topic_id: 8,
            field_id: 5,
            key: 'rooms',
            value: '1'
          },
          {
            topic_id: 8,
            field_id: 8,
            key: 'size',
            value: '60'
          },
          {
            topic_id: 8,
            field_id: 9,
            key: 'floor',
            value: ''
          },
          {
            topic_id: 8,
            field_id: 6,
            key: 'price',
            value: '1000'
          },
          {
            topic_id: 8,
            field_id: 7,
            key: 'price_unit',
            value: ''
          },
          {
            topic_id: 8,
            field_id: 14,
            key: 'furnished',
            value: 'true'
          },
          {
            topic_id: 8,
            field_id: 15,
            key: 'date',
            value: '2022-04-04'
          },
          {
            topic_id: 8,
            field_id: 2,
            key: 'description',
            value: 'sdfa'
          },
          {
            topic_id: 8,
            field_id: 3,
            key: 'expectations',
            value: 'asdf'
          },
          {
            topic_id: 8,
            field_id: 4,
            key: 'about',
            value: 'sadf'
          },
          {
            topic_id: 8,
            field_id: 18,
            key: 'attachments',
            value: ''
          },
          {
            topic_id: 8,
            field_id: 17,
            key: 'phone',
            value: '324124'
          },
          {
            topic_id: 8,
            field_id: 16,
            key: 'email',
            value: 'asdf@asd.de'
          },
          {
            topic_id: 8,
            field_id: 7,
            key: 'priceUnit',
            value: 'month'
          }
        ]
      }
    ];
    const container = shallow(<SearchResultItem results={result} language="en" />);
    expect(container.find('ul').length).toEqual(1);
  });
});
