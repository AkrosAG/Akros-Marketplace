import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SearchResultItem from './SearchResultItem.jsx';

function SearchResultList(props) {
  const { t, i18n } = useTranslation();
  useState(props.language);

  useEffect(() => {
    i18n.changeLanguage(props.language);
  }, [props.language]);

  if (props.results.length === 0) {
    return <h1 className="no-results">{t('no-results')}</h1>;
  } else {
    return <SearchResultItem handleClick={props.handleEvent} results={props.results} />;
  }
}
SearchResultList.propTypes = {
  language: String,
  results: Array
};

export default SearchResultList;
