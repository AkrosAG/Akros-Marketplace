import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';

function SearchResultList(props) {
  const {t, i18n} = useTranslation();
  useState(props.language);

  useEffect(() => {
    i18n.changeLanguage(props.language);
  });

  if (props.results.length === 0) {
    return <h1 className='no-results'>{t('no-results')}</h1>;
  } else {
    // TODO: Render result items properly
    return <div>{props.results}</div>;
  }
}
SearchResultList.propTypes = {
  language: String,
  results: Array,
};

export default SearchResultList;
