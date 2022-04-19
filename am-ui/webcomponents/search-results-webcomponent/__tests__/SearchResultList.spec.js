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
