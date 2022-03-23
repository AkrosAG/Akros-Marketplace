import './App.css';
import SearchResultList from './SearchResultList';
import ReactDOM from 'react-dom';

class SearchResultsWebComponent extends HTMLElement {
  constructor() {
    super();
    this._results = [];
  }
  set results(results) {
    this._results = results;
  }
  get results() {
    return this._results;
  }
  connectedCallback() {
    // Create a ShadowDOM
    const root = this.attachShadow({mode: 'closed'});

    // Create a mount element
    const mountPoint = document.createElement('div');

    root.appendChild(mountPoint);

    const style = document.createElement('style');

    const searchResultList = (
      <SearchResultList results={this._results}></SearchResultList>
    );

    ReactDOM.render(searchResultList, mountPoint);
  }
}
customElements.define('search-results-component', SearchResultsWebComponent);

function App() {
  return <search-results-component></search-results-component>;
}

export default App;
