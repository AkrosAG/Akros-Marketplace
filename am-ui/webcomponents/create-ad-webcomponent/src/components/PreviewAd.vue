<template>
  <div class="detail-container container-fluid simple">
    <h3>Preview</h3>
    <br />
    <div class="image-container">
      <!--<img
        src="https://media.istockphoto.com/photos/bohemian-living-room-interior-3d-render-picture-id1182454657?k=20&m=1182454657&s=612x612&w=0&h=1xEsm7BqeicA8jYk9KlerUtGsAgzzo530l5Ak1HJdnc="
        alt="2 ½ rooms apartment"
      />-->
      <SwiperPreview :images="props.images.value"></SwiperPreview>
    </div>
    <div class="rent-container">
      <table class="table">
        <tbody>
          <tr></tr>
          <tr v-for="field in props.fieldsToPreview">
            <div
              v-if="
                field.value !== '' && field.field_type_id !== 'lat' && field.field_type_id !== 'lon'
              "
            >
              <th scope="col">{{ t(`categories.${selectedCategory}.${field.key}`) }}</th>
              <td>{{ field.value }}</td>
            </div>
          </tr>
        </tbody>
      </table>
      <!--<MapPreview
        v-if="props.fieldsToPreview.lat != '' && props.fieldsToPreview.lon != ''"
        :lat="props.fieldsToPreview.lat"
        :lon="props.fieldsToPreview.lon"
      ></MapPreview>-->
    </div>
    <p class="submit-row">
      <a
        class="btn"
        v-on:click="emit('submit', props.fieldsToPreview, props.images, props.thumbnail)"
        >{{ t('publish') }}</a
      >
      <a class="btn" v-on:click="emit('back')">{{ t('back') }}</a>
    </p>
  </div>
</template>

<script setup>
import { useI18n } from './useI18n';
import i18n from '../locales/i18n';
import MapPreview from './MapPreview.vue';
import SwiperPreview from './SwiperPreview.vue';

const props = defineProps({
  fieldsToPreview: Array,
  selectedCategory: String,
  images: Array,
  thumbnail: Array
});
const { t } = useI18n(i18n.global.messages.value);
const emit = defineEmits(['submit', 'back']);
</script>
