<!--<template>
  <l-map style="height: 300px" :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-marker :lat-lng="markerLatLng"></l-marker>
  </l-map>
</template>-->

<template>
  <div>
    <LMap ref="map" :zoom="12">
      <LTileLayer />
      <LMarker
        ref="marker"
        :latlng="[48.864716, 2.349014]"
        popup="Test"
      />
    </LMap>
  </div>
</template>

<script setup>
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
const props = defineProps({ lat: String, lon: String });
</script>
