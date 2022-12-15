import SearchResultList from '../src/SearchResultList';
import { shallow } from 'enzyme';
import React from 'react';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" };
    return Component;
  },
}));

describe('SearchResultList', () => {
  const topic1 = {
    subcategory_id: 1,
    subcategory_key: "room",
    topic_id: 1,
    topic_values: [
      {topic_id: 1, field_id: 1, key: 'title', value: 'Zimmer 20m2'},
      {topic_id: 1, field_id: 12, key: 'region', value: 'Ittigen'},
      {topic_id: 1, field_id: 11, key: 'postalCode', value: '3048'},
      {topic_id: 1, field_id: 13, key: 'address', value: 'Lindenhofstrasse 1'},
      {topic_id: 1, field_id: 8, key: 'size', value: '20'},
      {topic_id: 1, field_id: 9, key: 'floor', value: '2'},
      {topic_id: 1, field_id: 6, key: 'price', value: '200'},
      {topic_id: 1, field_id: 7, key: 'priceUnit', value: 'month'},
      {topic_id: 1, field_id: 29, key: 'availability', value: 'now'},
      {topic_id: 1, field_id: 15, key: 'date', value: '2022-12-01'},
      {topic_id: 1, field_id: 14, key: 'furnished', value: 'false'},
      {topic_id: 1, field_id: 30, key: 'temporary', value: 'false'},
      {topic_id: 1, field_id: 2, key: 'description', value: 'description1'},
      {topic_id: 1, field_id: 3, key: 'expectations', value: 'expectations1'},
      {topic_id: 1, field_id: 33, key: 'about', value: 'about1'},
      {topic_id: 1, field_id: 17, key: 'phone', value: '123456789'},
      {topic_id: 1, field_id: 16, key: 'email', value: 'df@df.ch'},
      {topic_id: 1, field_id: 36, key: 'lat', value: '46.9374897'},
      {topic_id: 1, field_id: 37, key: 'lon', value: '7.4782753'}
    ]
  };

  const topic2 = {
    subcategory_id: 1,
    subcategory_key: "room",
    topic_id: 2,
    topic_values: [
      {topic_id: 2, field_id: 1, key: 'title', value: 'Zimmer 30m2'},
      {topic_id: 2, field_id: 12, key: 'region', value: 'Biel'},
      {topic_id: 2, field_id: 11, key: 'postalCode', value: '2502'},
      {topic_id: 2, field_id: 13, key: 'address', value: 'Bahnhofstrasse 15'},
      {topic_id: 2, field_id: 8, key: 'size', value: '30'},
      {topic_id: 2, field_id: 9, key: 'floor', value: '3'},
      {topic_id: 2, field_id: 6, key: 'price', value: '300'},
      {topic_id: 2, field_id: 7, key: 'priceUnit', value: 'month'},
      {topic_id: 2, field_id: 29, key: 'availability', value: 'now'},
      {topic_id: 2, field_id: 15, key: 'date', value: '2022-11-01'},
      {topic_id: 2, field_id: 14, key: 'furnished', value: 'false'},
      {topic_id: 2, field_id: 30, key: 'temporary', value: 'false'},
      {topic_id: 1, field_id: 2, key: 'description', value: 'description2'},
      {topic_id: 1, field_id: 3, key: 'expectations', value: 'expectations2'},
      {topic_id: 1, field_id: 33, key: 'about', value: 'about2'},
      {topic_id: 2, field_id: 17, key: 'phone', value: '123456789'},
      {topic_id: 2, field_id: 16, key: 'email', value: 'df@df.ch'},
      {topic_id: 2, field_id: 36, key: 'lat', value: '46.9374897'},
      {topic_id: 2, field_id: 37, key: 'lon', value: '7.4782753'}
    ]
  };

  const topic3 = {
    subcategory_id: 1,
    subcategory_key: "room",
    topic_id: 3,
    topic_values: [
      {topic_id: 3, field_id: 1, key: 'title', value: 'Zimmer 40m2'},
      {topic_id: 3, field_id: 12, key: 'region', value: 'Zürich'},
      {topic_id: 3, field_id: 11, key: 'postalCode', value: '8048'},
      {topic_id: 3, field_id: 13, key: 'address', value: 'Herostrasse 12'},
      {topic_id: 3, field_id: 8, key: 'size', value: '40'},
      {topic_id: 3, field_id: 9, key: 'floor', value: '4'},
      {topic_id: 3, field_id: 6, key: 'price', value: '400'},
      {topic_id: 3, field_id: 7, key: 'priceUnit', value: 'month'},
      {topic_id: 3, field_id: 29, key: 'availability', value: 'now'},
      {topic_id: 3, field_id: 15, key: 'date', value: '2022-10-01'},
      {topic_id: 3, field_id: 14, key: 'furnished', value: 'false'},
      {topic_id: 3, field_id: 30, key: 'temporary', value: 'false'},
      {topic_id: 1, field_id: 2, key: 'description', value: 'description3'},
      {topic_id: 1, field_id: 3, key: 'expectations', value: 'expectations3'},
      {topic_id: 1, field_id: 33, key: 'about', value: 'about3'},
      {topic_id: 3, field_id: 17, key: 'phone', value: '123456789'},
      {topic_id: 3, field_id: 16, key: 'email', value: 'df@df.ch'},
      {topic_id: 3, field_id: 36, key: 'lat', value: '46.9374897'},
      {topic_id: 3, field_id: 37, key: 'lon', value: '7.4782753'}
    ]
  };

  it('should be defined', () => {
    expect(SearchResultList).toBeDefined();
  });

  it('should render correctly with enzyme', () => {
    const onSearchMock = jest.fn();
    const mockedResults = [topic1, topic2, topic3];
    const container = shallow(<SearchResultList results={mockedResults} language="en" handleEvent={onSearchMock}/>);
    expect(container.length).toEqual(1);
  });

  it('should not show message for no results when there are results', () => {
    const props = {
      results: [{
        test: 'test',
      }],
      language: 'de'
    }
    const container = shallow(<SearchResultList {...props} />);
    expect(container.find('.no-results')).toEqual({});
    });

  it('should display no results message when there are no results', () => {
    const props = {
      language: 'de'
    }
    const container = shallow(<SearchResultList {...props} />);
    expect(container.find('.no-results')).toBeTruthy();
  });

  it('has order <byPriceLowToHigh> is stored in state, and topics are ordered first being topic_id 1', () => {
    const results = [topic1, topic2, topic3]
    const props = {
      results: results,
      language: 'en'
    }
    window.history.replaceState(
      Object.assign({}, window.history.state, {order: 'byPriceLowToHigh', topics: results}),
      "push sort order & results");
    const wrapper = shallow(<SearchResultList {...props}/>);
    expect(wrapper.instance().state.order).toBe('byPriceLowToHigh');
    expect(wrapper.instance().state.results[0]['topic_id']).toBe(1);
  });

  it('has order <byPriceHighToLow> is stored in state, and topics are ordered first being topic_id 3', () => {
    const results = [topic1, topic2, topic3]
    const props = {
      results: results,
      language: 'en'
    }
    window.history.replaceState(
      Object.assign({}, window.history.state, {order: 'byPriceHighToLow', topics: results}),
      "push sort order & results");
    const wrapper = shallow(<SearchResultList {...props}/>);
    expect(wrapper.instance().state.order).toBe('byPriceHighToLow');
    expect(wrapper.instance().state.results[0]['topic_id']).toBe(3);
  });

  it('has order <byDateNewToOld> is stored in state, and topics are ordered first being topic_id 3', () => {
    const results = [topic1, topic2, topic3]
    const props = {
      results: results,
      language: 'en'
    }
    window.history.replaceState(
      Object.assign({}, window.history.state, {order: 'byDateNewToOld', topics: results}),
      "push sort order & results");
    const wrapper = shallow(<SearchResultList {...props}/>);
    expect(wrapper.instance().state.order).toBe('byDateNewToOld');
    expect(wrapper.instance().state.results[0]['topic_id']).toBe(3);
  });

  it('has order <byDateOldToNew> is stored in state, and topics are ordered first being topic_id 1', () => {
    const results = [topic1, topic2, topic3]
    const props = {
      results: results,
      language: 'en'
    }
    window.history.replaceState(
      Object.assign({}, window.history.state, {order: 'byDateOldToNew', topics: results}),
      "push sort order & results");
    const wrapper = shallow(<SearchResultList {...props}/>);
    expect(wrapper.instance().state.order).toBe('byDateOldToNew');
    expect(wrapper.instance().state.results[0]['topic_id']).toBe(1);
  });

  it('has order <location> is stored in state, and topics are ordered first being topic_id 2', () => {
    const results = [topic1, topic2, topic3]
    const props = {
      results: results,
      language: 'en'
    }
    window.history.replaceState(
      Object.assign({}, window.history.state, {order: 'location', topics: results}),
      "push sort order & results");
    const wrapper = shallow(<SearchResultList {...props}/>);
    expect(wrapper.instance().state.order).toBe('location');
    expect(wrapper.instance().state.results[0]['topic_id']).toBe(2);
  });
});
