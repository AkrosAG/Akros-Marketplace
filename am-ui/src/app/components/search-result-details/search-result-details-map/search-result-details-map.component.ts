import {AfterViewInit, Component, Input} from '@angular/core';
import * as L from 'leaflet';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = './assets/images/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';

const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [30, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'mp-search-result-details-map',
  templateUrl: './search-result-details-map.component.html',
  styleUrls: ['./search-result-details-map.component.scss'],
})
export class SearchResultDetailsMapComponent implements AfterViewInit {
  private map: any;
  @Input() lat: string;
  @Input() lon: string;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [+this.lat, +this.lon],
      attributionControl: false,
      scrollWheelZoom: false,
      zoom: 18,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
    const marker = L.marker([+this.lat, +this.lon]);
    marker.addTo(this.map);
  }
}
