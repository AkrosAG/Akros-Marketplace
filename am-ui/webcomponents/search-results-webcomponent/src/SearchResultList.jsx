import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SearchResultItem from './SearchResultItem.jsx';
import PropTypes from 'prop-types';

function SearchResultList(props) {
  const [results, setResults] = useState([]);
  const { t, i18n } = useTranslation();

  useState(props.language);
  useEffect(() => {
    i18n.changeLanguage(props.language);
  }, [props.language]);

  /**
   * This Hook is used to set property result after render.
   * Also, it executes sort method when the component is initially rendered or updated,
   * without losing the sort type, here it is named 'order'.
   */
  useEffect(() => {
    setResults(props.results);
    sortResult(history.state.order, props.results);
  }, [props.results]);

  /**
   * Updates the result list according to selected type of sort.
   * replaceState used to rewrite browser history, and
   *  it changes the current history entry without adding new entries to the users' history.
   *
   * @param {ChangeEvent} event refers to the elements property with the type of sort
   */
  const onUpdateSortSelect = (event) => {
    sortResult(event.target.value, results);
    window.history.replaceState(
      Object.assign({}, window.history.state, { order: event.target.value }),
      'push sort order'
    );
  };

  const sortTypes = [
    { value: ' location', label: t('location') },
    { value: ' byPriceLowToHigh', label: t('byPriceLowToHigh') },
    { value: ' byPriceHighToLow', label: t('byPriceHighToLow') },
    { value: ' byDateNewToOld', label: t('byDateNewToOld') },
    { value: ' byDateOldToNew', label: t('byDateOldToNew') }
  ];

  /**
   * Sorts a result list according to selected type of sort.
   *
   * @param {String} sortType refers to the selected type of sort
   * @param {Array} resultsArray refers to the result list
   */
  const sortResult = (sortType, resultsArray) => {
    const sortedList = [...resultsArray];

    switch (sortType) {
      case 'byPriceLowToHigh':
        sortedList.sort(
          (a, b) =>
            a['topic_values'].find((x) => x.key === 'price')['value'] -
            b['topic_values'].find((x) => x.key === 'price')['value']
        );
        break;
      case 'byPriceHighToLow':
        sortedList.sort(
          (a, b) =>
            b['topic_values'].find((x) => x.key === 'price')['value'] -
            a['topic_values'].find((x) => x.key === 'price')['value']
        );
        break;
      case 'byDateNewToOld':
        sortedList.sort((a, b) =>
          a['topic_values'].find((x) => x.key === 'date')['value'] <
          b['topic_values'].find((x) => x.key === 'date')['value']
            ? -1
            : a['topic_values'].find((x) => x.key === 'date')['value'] >
              b['topic_values'].find((x) => x.key === 'date')['value']
            ? 1
            : 0
        );
        break;
      case 'byDateOldToNew':
        sortedList.sort((a, b) =>
          b['topic_values'].find((x) => x.key === 'date')['value'] <
          a['topic_values'].find((x) => x.key === 'date')['value']
            ? -1
            : b['topic_values'].find((x) => x.key === 'date')['value'] >
              a['topic_values'].find((x) => x.key === 'date')['value']
            ? 1
            : 0
        );
        break;
      case 'location':
      default:
        sortedList.sort((a, b) =>
          a['topic_values'].find((x) => x.key === 'region')['value'] <
          b['topic_values'].find((x) => x.key === 'region')['value']
            ? -1
            : a['topic_values'].find((x) => x.key === 'region')['value'] >
              b['topic_values'].find((x) => x.key === 'region')['value']
            ? 1
            : 0
        );
        break;
    }
    setResults(sortedList);
  };

  return results.length === 0 ? (
    <h1 className="no-results">{t('noResults')}</h1>
  ) : (
    <div>
      <div>
        <label form="sortBy">{t('sortBy')}</label>
        <select
          id="sortBy"
          className="filter-select"
          onChange={onUpdateSortSelect}
          defaultValue={history.state.order}
        >
          {sortTypes.map((option, index) => (
            <option data-testid="select-option" key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <SearchResultItem handleClick={props.handleEvent} results={results} />
      </div>
    </div>
  );
}

SearchResultList.propTypes = {
  language: PropTypes.string.isRequired,
  results: PropTypes.array,
  handleEvent: PropTypes.func
};

export default SearchResultList;
