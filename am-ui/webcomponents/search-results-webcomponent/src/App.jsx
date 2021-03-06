import SearchResultList from './SearchResultList';
import ReactDOM from 'react-dom';
import './i18n';
import IndexStyles from './styles/index.css';
import AppStyles from './styles/App.css';
import ComponentStyles from './styles/styles.css';
import React from 'react';
import ResetStyles from './styles/reset.css';

const parentHandleClick = (topic) => {
  const event = new CustomEvent('openDetailsEvent', {
    detail: topic
  });
  document.dispatchEvent(event);
};

/**
 * This class wraps the React App into a Webcomponent
 */
class SearchResultsWebComponent extends HTMLElement {
  mountPoint;

  constructor() {
    super();
    this._results = [];
    this._language = '';
  }

  set results(results) {
    this._results = results;
    this.renderComponent();
  }
  get results() {
    return this._results;
  }
  set language(language) {
    this._language = language;
    this.renderComponent();
  }
  get language() {
    return this._language;
  }

  connectedCallback() {
    // Create a ShadowDOM
    const root = this.attachShadow({ mode: 'closed' });
    // Create a mount element
    this.mountPoint = document.createElement('div');
    // Adding custum style sheets for webcomponents to habe them
    const style = document.createElement('style');
    style.textContent = ResetStyles + AppStyles + IndexStyles + ComponentStyles;
    root.appendChild(style);
    root.appendChild(this.mountPoint);
  }
  renderComponent() {
    if (this.results !== '' && this.language !== '') {
      const searchResultList = (
        <SearchResultList
          handleEvent={parentHandleClick}
          results={this.results}
          language={this.language}
        ></SearchResultList>
      );

      ReactDOM.render(searchResultList, this.mountPoint);
    }
  }
}
customElements.define('search-results-component', SearchResultsWebComponent);

function App() {
  return <SearchResultList results="" language="de"></SearchResultList>;
}

export default App;
