import SearchResultList from './SearchResultList';
import ReactDOM from 'react-dom';
import './i18n';
import IndexStyles from './styles/index.css';
import AppStyles from './styles/App.css';
import ComponentStyles from './styles/styles.css';
import React from 'react';
import ResetStyles from './styles/reset.css';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import icon from 'leaflet/dist/images/marker-icon.png';
import L from 'leaflet';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

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
    this.boundaries = [];
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

  createMarkerFromTopic(topic) {
    let latValue = topic.topic_values.find(v => v.key === 'lat')?.value;
    let lonValue = topic.topic_values.find(v => v.key === 'lon')?.value;
    let addressValue = topic.topic_values.find(v => v.key === 'address')?.value;
    let postalCodeValue = topic.topic_values.find(v => v.key === 'postalCode')?.value;
    let regionValue = topic.topic_values.find(v => v.key === 'region')?.value;

    // In case of garbage address input we do not create a marker
    if (latValue === "" || lonValue === "" || (latValue == 0 && lonValue == 0)) {
      return;
    }
    return (
      <Marker key={topic.topic_id} position={[latValue, lonValue]}>
        <Popup closeButton={false}>
          <div>{addressValue}</div>
          <div>{postalCodeValue} {regionValue}</div>
        </Popup>
      </Marker>
    )
  }

  getAllMarkers() {
    return (this.results && this.results.length > 0) ? this.results.map(this.createMarkerFromTopic) : null;
  }

  getCenter() {
    const markers = this.getAllMarkers();
    if (markers && markers.length > 0) {
      markers.forEach(marker => {
        const position = marker?.props?.position;
        if (position && position.length == 2) {
          this.boundaries.push([Number(position[0]), Number(position[1])]);
        }
      });
      return L.latLngBounds(this.boundaries).getCenter();
    }
  }

  configureZoom(mapInstance) {
    mapInstance.fitBounds(L.latLngBounds(this.boundaries));
  }

  setIcon() {
    let defaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
    });
    L.Marker.prototype.options.icon = defaultIcon;
  }

  renderComponent() {

    this.setIcon();

    if (this.results !== '' && this.language !== '') {
      const searchResultList = (
        <SearchResultList
          handleEvent={parentHandleClick}
          results={this.results}
          language={this.language}
        ></SearchResultList>
      );

      const center = this.getCenter();
      const markers = this.getAllMarkers();
      const map = (
        center && markers &&
          <MapContainer
            whenCreated={mapInstance => {this.configureZoom(mapInstance)}}
            attributionControl={false}
            style={{height: 500}}
            center={[center.lat, center.lng]}
            zoom={8}
            scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers}
          </MapContainer>
      );

      ReactDOM.render(<>{map} {searchResultList}</>, this.mountPoint);
    }
  }
}
customElements.define('search-results-component', SearchResultsWebComponent);

function App() {
  return <SearchResultList results="" language="de"></SearchResultList>;
}

export default App;
