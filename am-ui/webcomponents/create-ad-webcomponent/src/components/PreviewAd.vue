<template>
  <div class="detail-container container-fluid simple">
    <h3>Preview</h3>
    <br />
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
              <th scope="col">{{ t(`categories.${selectedCategory}.${field.key}`) + ': ' }}</th>
              <td>{{ field.value }}</td>
            </div>
          </tr>
        </tbody>
      </table>
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

const props = defineProps({
  fieldsToPreview: Array,
  selectedCategory: String,
  images: Array,
  thumbnail: Array
});
const { t } = useI18n(i18n.global.messages.value);
const emit = defineEmits(['submit', 'back']);
</script>
