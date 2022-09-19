<script setup>
import {useI18n} from "./useI18n";
import i18n from "../locales/i18n";

const {t} = useI18n(i18n.global.messages.value);
const emit = defineEmits(['change']);
</script>

<script>


export default {

  data() {
    return {
      selectedFiles: [],
    }
  },
  methods: {
    onFileChanged(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        this.selectedFiles.push(files[i]);
      }
      this.$emit("update-parent", this.selectedFiles);
    },
    getImage(index) {
      const file = this.selectedFiles[index];
      return URL.createObjectURL(file);
    },
    deleteImage(index) {
      this.selectedFiles.splice(index, 1);
      this.$emit("update-parent", this.selectedFiles);
    }
  }
}
</script>

<template>
  <div class="upload-container">
    <label class="file-upload">
      <input class="file-upload-input" type="file" multiple @change="onFileChanged">
      {{ t('upload') }}
    </label>

  </div>
  <div class="image-preview-list-container">
    <ul>
      <li v-if="selectedFiles.length !== 0" v-for="(image, index) in selectedFiles">
        <div class="list-container">
          <img :src="getImage(index)" :alt="image.name">
          <button class="list-button" @click.stop.prevent="deleteImage(index)">
            {{ t('delete') }}
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
