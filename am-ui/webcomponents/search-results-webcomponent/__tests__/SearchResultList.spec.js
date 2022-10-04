import SearchResultList from '../src/SearchResultList';
import { shallow } from 'enzyme';
import React from 'react';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key })
}));

describe('SearchResultList', () => {
it('should show message for no results when there are no results', () => {
    const container = shallow(<SearchResultList results={[]} language="en" />);
    expect(container.find('h1').length).toEqual(1);
  });

  it('should show message for no results when there are no results', () => {
    const container = shallow(<SearchResultList results={[{ test: 'test' }]} language="en" />);
    expect(container.find('h1').length).toEqual(0);
  });
});

// TODO Create unit test to cover onUpdateSortSelect method. Tests are not working
describe('onUpdateSortSelect()', () => {
  const topic1 = {
    subcategory_id: 1,
    subcategory_key: "room",
    topic_id: 1,
    topic_values: {
      0 : {topic_id: 1, field_id: 1, key: 'title', value: 'Zimmer 20m2'},
      1 : {topic_id: 1, field_id: 12, key: 'region', value: 'Bern'},
      2 : {topic_id: 1, field_id: 11, key: 'postalCode', value: '3015'},
      3 : {topic_id: 1, field_id: 13, key: 'address', value: 'Weltpoststrasse'},
      4 : {topic_id: 1, field_id: 8, key: 'size', value: '20'},
      5 : {topic_id: 1, field_id: 9, key: 'floor', value: '2'},
      6 : {topic_id: 1, field_id: 6, key: 'price', value: '200'},
      7 : {topic_id: 1, field_id: 7, key: 'priceUnit', value: 'month'},
      8 : {topic_id: 1, field_id: 29, key: 'availability', value: 'now'},
      9 : {topic_id: 1, field_id: 15, key: 'date', value: '2022-09-29'},
      10 : {topic_id: 1, field_id: 14, key: 'furnished', value: 'false'},
      11 : {topic_id: 1, field_id: 30, key: 'temporary', value: 'false'},
      12 : {topic_id: 1, field_id: 2, key: 'description', value: 'dfs'},
      13 : {topic_id: 1, field_id: 3, key: 'expectations', value: 'fsdf'},
      14 : {topic_id: 1, field_id: 33, key: 'about', value: 'erwe'},
      15 : {topic_id: 1, field_id: 17, key: 'phone', value: '123456789'},
      16 : {topic_id: 1, field_id: 16, key: 'email', value: 'df@df.ch'},
      17 : {topic_id: 1, field_id: 36, key: 'lat', value: '46.9374897'},
      18 : {topic_id: 1, field_id: 37, key: 'lon', value: '7.4782753'}
    }
  };

  const topic2 = {
    subcategory_id: 1,
    subcategory_key: "room",
    topic_id: 2,
    topic_values: {
      0 : {topic_id: 2, field_id: 1, key: 'title', value: 'Zimmer 30m2'},
      1 : {topic_id: 2, field_id: 12, key: 'region', value: 'Bern'},
      2 : {topic_id: 2, field_id: 11, key: 'postalCode', value: '3015'},
      3 : {topic_id: 2, field_id: 13, key: 'address', value: 'Weltpoststrasse'},
      4 : {topic_id: 2, field_id: 8, key: 'size', value: '30'},
      5 : {topic_id: 2, field_id: 9, key: 'floor', value: '3'},
      6 : {topic_id: 2, field_id: 6, key: 'price', value: '300'},
      7 : {topic_id: 2, field_id: 7, key: 'priceUnit', value: 'month'},
      8 : {topic_id: 2, field_id: 29, key: 'availability', value: 'now'},
      9 : {topic_id: 2, field_id: 15, key: 'date', value: '2022-09-29'},
      10 : {topic_id: 2, field_id: 14, key: 'furnished', value: 'false'},
      11 : {topic_id: 2, field_id: 30, key: 'temporary', value: 'false'},
      12 : {topic_id: 2, field_id: 2, key: 'description', value: 'dfs'},
      13 : {topic_id: 2, field_id: 3, key: 'expectations', value: 'fsdf'},
      14 : {topic_id: 2, field_id: 33, key: 'about', value: 'erwe'},
      15 : {topic_id: 2, field_id: 17, key: 'phone', value: '123456789'},
      16 : {topic_id: 2, field_id: 16, key: 'email', value: 'df@df.ch'},
      17 : {topic_id: 2, field_id: 36, key: 'lat', value: '46.9374897'},
      18 : {topic_id: 2, field_id: 37, key: 'lon', value: '7.4782753'}
    }
  };

  const topic3 = {
    subcategory_id: 1,
    subcategory_key: "room",
    topic_id: 3,
    topic_values: {
      0 : {topic_id: 3, field_id: 1, key: 'title', value: 'Zimmer 40m2'},
      1 : {topic_id: 3, field_id: 12, key: 'region', value: 'Bern'},
      2 : {topic_id: 3, field_id: 11, key: 'postalCode', value: '3015'},
      3 : {topic_id: 3, field_id: 13, key: 'address', value: 'Weltpoststrasse'},
      4 : {topic_id: 3, field_id: 8, key: 'size', value: '40'},
      5 : {topic_id: 3, field_id: 9, key: 'floor', value: '4'},
      6 : {topic_id: 3, field_id: 6, key: 'price', value: '400'},
      7 : {topic_id: 3, field_id: 7, key: 'priceUnit', value: 'month'},
      8 : {topic_id: 3, field_id: 29, key: 'availability', value: 'now'},
      9 : {topic_id: 3, field_id: 15, key: 'date', value: '2022-09-29'},
      10 : {topic_id: 3, field_id: 14, key: 'furnished', value: 'false'},
      11 : {topic_id: 3, field_id: 30, key: 'temporary', value: 'false'},
      12 : {topic_id: 3, field_id: 2, key: 'description', value: 'dfs'},
      13 : {topic_id: 3, field_id: 3, key: 'expectations', value: 'fsdf'},
      14 : {topic_id: 3, field_id: 33, key: 'about', value: 'erwe'},
      15 : {topic_id: 3, field_id: 17, key: 'phone', value: '123456789'},
      16 : {topic_id: 3, field_id: 16, key: 'email', value: 'df@df.ch'},
      17 : {topic_id: 3, field_id: 36, key: 'lat', value: '46.9374897'},
      18 : {topic_id: 3, field_id: 37, key: 'lon', value: '7.4782753'}
    }};

  it('should be defined', () => {
    expect(SearchResultList).toBeDefined();
  });

  it('should render correctly with enzyme', () => {
    const onSearchMock = jest.fn();
    const mockedResults = [topic1, topic2, topic3];
    const container = shallow(<SearchResultList results={mockedResults} language="en" handleEvent={onSearchMock}/>);

    //expect(container.find('SearchResultItem').length).toEqual(1);
  });
});
