import SearchResultList from './SearchResultList';
import ReactDOM from 'react-dom';
import './i18n';
import IndexStyles from './styles/index.css';
import AppStyles from './styles/App.css';
import ComponentStyles from './styles/styles.css';
import React from 'react';
import ResetStyles from './styles/reset.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import icon from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

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
    // Adding custom style sheets for webcomponents to habe them
    const style = document.createElement('style');
    style.textContent = ResetStyles + AppStyles + IndexStyles + ComponentStyles;
    root.appendChild(style);
    root.appendChild(this.mountPoint);
  }

  renderComponent() {
    let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    if (this.results !== '' && this.language !== '') {
      const searchResultList = (
        <SearchResultList
          handleEvent={parentHandleClick}
          results={this.results}
          language={this.language}
        ></SearchResultList>
      );

      const map = (
          <MapContainer style={{height: 500}} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
      );

      ReactDOM.render(map, this.mountPoint);
    }
  }
}
customElements.define('search-results-component', SearchResultsWebComponent);

function App() {
  return <SearchResultList results="" language="de"></SearchResultList>;
}

export default App;
