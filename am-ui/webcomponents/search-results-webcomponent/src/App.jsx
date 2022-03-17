import './App.css';
import SearchResultList from './SearchResultList';
import ReactDOM from 'react-dom';

class SearchResultsWebComponent extends HTMLElement {
  connectedCallback() {
    // Create a ShadowDOM
    const root = this.attachShadow({mode: 'closed'});

    // Create a mount element
    const mountPoint = document.createElement('div');

    root.appendChild(mountPoint);

    const style = document.createElement('style');

    ReactDOM.render(<SearchResultList></SearchResultList>, mountPoint);
  }
}
customElements.define('search-results-component', SearchResultsWebComponent);

function App() {
  return <search-results-component></search-results-component>;
}

export default App;
