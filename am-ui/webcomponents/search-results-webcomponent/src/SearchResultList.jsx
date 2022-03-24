import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';

class SearchResultListClass extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {t, i18n} = this.props;
    if (this.props.results.length === 0) {
      return <h1>{t('no-results')}</h1>;
    } else {
      return <div>{this.props.results}</div>;
    }
  }
}
const SearchResultList = withTranslation()(SearchResultListClass);

export default SearchResultList;
