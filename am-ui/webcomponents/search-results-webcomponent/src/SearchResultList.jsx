import React from 'react';
import { withTranslation } from 'react-i18next';
import SearchResultItem from './SearchResultItem.jsx';

class SearchResultList extends React.Component {
  constructor(props) {
    super(props);
    this.sortTypes = [];
    this.handleEvent = props?.handleEvent;
    this.onUpdateSortSelect = this.onUpdateSortSelect.bind(this);
    this.sortResult = this.sortResult.bind(this);
    this.setResults = this.setResults.bind(this);
    this.state = {
      results: history.state?.topics ?? [],
      order: history.state?.order ?? 'location'
    };
  }

  componentDidMount() {
    if (history.state?.order) {
      this.sortResult(history.state?.order, history.state?.topics);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.language !== this.props.language) {
      const { i18n } = this.props;
      i18n.changeLanguage(this.props.language);
    }
  }

  /**
   * Updates the result list according to selected type of sort.
   * replaceState used to rewrite browser history, and
   *  it changes the current history entry without adding new entries to the users' history.
   *
   * @param {ChangeEvent} event refers to the elements property with the type of sort
   */
  onUpdateSortSelect(event) {
    if (event) {
      this.sortResult(event.target.value, this.state.results);
      window.history.replaceState(
        Object.assign({}, window.history.state, { order: event.target.value }),
        'push sort order'
      );
    }
  }

  /**
   * Updates the state with given results
   *
   * @param {Array} resultsArray refers to the result list
   */
  setResults(resultsArray) {
    this.setState({
      results: resultsArray,
      order: window.history.state.order
    });
  }

  /**
   * Sorts a result list according to selected type of sort.
   *
   * @param {String} sortType refers to the selected type of sort
   * @param {Array} resultsArray refers to the result list
   */
  sortResult(sortType, resultsArray) {
    if (resultsArray) {
      let sortedList = [...resultsArray];

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
    }
  }

  render() {
    const { t } = this.props;
    this.sortTypes = [
      { value: 'location', label: t('location') },
      { value: 'byPriceLowToHigh', label: t('byPriceLowToHigh') },
      { value: 'byPriceHighToLow', label: t('byPriceHighToLow') },
      { value: 'byDateNewToOld', label: t('byDateNewToOld') },
      { value: 'byDateOldToNew', label: t('byDateOldToNew') }
    ];
    return this.state.results.length === 0 ? (
      <h1 className="no-results">{t('noResults')}</h1>
    ) : (
      <div>
        <div>
          <label form="sortBy">{t('sortBy')}</label>
          <select
            id="sortBy"
            className="filter-select"
            onChange={this.onUpdateSortSelect}
            defaultValue={history.state.order}
          >
            {this.sortTypes.map((option, index) => (
              <option data-testid="select-option" key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <SearchResultItem handleClick={this.handleEvent} results={this.state.results} />
        </div>
      </div>
    );
  }
}

SearchResultList.propTypes = {
  language: PropTypes.string.isRequired,
  results: PropTypes.array,
  handleEvent: PropTypes.func,
  i18n: PropTypes.func,
  t: PropTypes.func
};

export default withTranslation()(SearchResultList);
