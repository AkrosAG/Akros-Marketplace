<template>
  <div>
    <h1>Preview</h1>
    <br />
    <div>
      <img
        src="https://media.istockphoto.com/photos/bohemian-living-room-interior-3d-render-picture-id1182454657?k=20&m=1182454657&s=612x612&w=0&h=1xEsm7BqeicA8jYk9KlerUtGsAgzzo530l5Ak1HJdnc="
        className="sr-ad-thumb"
        alt="2 ½ rooms apartment"
      />
    </div>
    <p>{{ fieldsToPreview.length }}</p>
    <table>
      <tbody>
        <tr></tr>
        <tr v-for="field in props.fieldsToPreview">
          <div v-if="field.value !== '' && field.key !== 'lat' && field.key !== 'lon'">
            <th scope="col">{{ t(`categories.${selectedCategory}.${field.key}`) }}</th>
            <td>{{ field.value }}</td>
          </div>
        </tr>
      </tbody>
    </table>

    <p class="submit-row">
      <a class="btn" v-on:click="submit">{{ t('publish') }}</a>
      <a class="btn" v-on:click="back">{{ t('back') }}</a>
    </p>
  </div>
</template>

<script setup>
import { useI18n } from './useI18n';
import i18n from '../locales/i18n';

const props = defineProps({ fieldsToPreview: Array, selectedCategory: String });
const { t } = useI18n(i18n.global.messages.value);
const emit = defineEmits(['submit', 'back']);

console.log(props.fieldsToPreview);
/**
 * @description Method to emit the submit event to parent component.
 */
function submit() {
  emit('submit');
}

/**
 * @description Method to emit the back event to parent component.
 */
function back() {
  emit('back');
}
</script>
