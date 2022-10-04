import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import SearchResultItem from './SearchResultItem.jsx';
import PropTypes from 'prop-types';

function SearchResultList(props) {
  const [results, setResults] = useState([]);
  const {t, i18n} = useTranslation();
  useState(props.language);

  useEffect(() => {
    i18n.changeLanguage(props.language);
  }, [props.language]);

  useEffect(() => {
    setResults(props.results);
  }, [props.results]);

  /**
   * Updates a result list according to selected type of sort.
   *
   * @param {ChangeEvent} event refers to th elements property with the type of sort
   */
  const onUpdateSortSelect = (event) => {
    let sortedList = [...results];

    switch (event.target.value) {
      case 'byPriceLowToHigh' :
        sortedList.sort((a, b) =>
          (a["topic_values"].find(x => x.key === 'price')["value"] -
            b["topic_values"].find(x => x.key === 'price')["value"]));
        break;
      case 'byPriceHighToLow' :
        sortedList.sort((a, b) =>
          (b["topic_values"].find(x => x.key === 'price')["value"] -
            a["topic_values"].find(x => x.key === 'price')["value"]));
        break;
      case 'byDateNewToOld' :
        sortedList.sort((a, b) =>
          (a["topic_values"].find(x => x.key === 'date')["value"] <
            b["topic_values"].find(x => x.key === 'date')["value"]) ? -1 :
            (a["topic_values"].find(x => x.key === 'date')["value"] >
              b["topic_values"].find(x => x.key === 'date')["value"]) ? 1 : 0);
        break;
      case 'byDateOldToNew' :
        sortedList.sort((a, b) =>
          (b["topic_values"].find(x => x.key === 'date')["value"] <
            a["topic_values"].find(x => x.key === 'date')["value"]) ? -1 :
            (b["topic_values"].find(x => x.key === 'date')["value"] >
              a["topic_values"].find(x => x.key === 'date')["value"]) ? 1 : 0);
        break;
      case 'location' :
        sortedList.sort((a, b) =>
          (a["topic_values"].find(x => x.key === 'region')["value"] <
            b["topic_values"].find(x => x.key === 'region')["value"]) ? -1 :
            (a["topic_values"].find(x => x.key === 'region')["value"] >
              b["topic_values"].find(x => x.key === 'region')["value"]) ? 1 : 0);
        break;
      default:
        sortedList = [...results];
    }
    setResults(sortedList);
  }

  const sortTypes = [
    {value: 'none', label: ''},
    {value: 'byPriceLowToHigh', label:t('byPriceLowToHigh')},
    {value: 'byPriceHighToLow', label:t('byPriceHighToLow')},
    {value: 'byDateNewToOld', label:t('byDateNewToOld')},
    {value: 'byDateOldToNew', label:t('byDateOldToNew')},
    {value: 'location', label: t('location')},

  ];

  return results.length === 0 ? (
    <h1 className="no-results">{t('noResults')}</h1>
  ) : (
    <div>
      <div >
        <label form="sortBy" >{t('sortBy')}</label>
        <select id="sortBy" className="filter-select" onChange={onUpdateSortSelect}>
          {sortTypes.map((option, index) =>
            <option data-testid="select-option" key={index} value={option.value}>
              {option.label}
            </option>
          )}
        </select>
      </div>
      <div>
        <SearchResultItem handleClick={props.handleEvent} results={results}/>
      </div>
    </div>
  )
}

SearchResultList.propTypes = {
  language: PropTypes.string.isRequired,
  results: PropTypes.array,
  handleEvent: PropTypes.func
};

export default SearchResultList;
