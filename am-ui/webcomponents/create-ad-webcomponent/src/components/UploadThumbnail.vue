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
      selectedFile: [],
    }
  },
  methods: {
    onFileChanged(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        this.selectedFile.push(files[i]);
      }
      this.$emit("update-parent-thumbnail", this.selectedFile);
    },
    getImage(index) {
      const file = this.selectedFile[index];
      return URL.createObjectURL(file);
    },
    deleteImage(index) {
      this.selectedFile.splice(index, 1);
      this.$emit("update-parent-thumbnail", this.selectedFile);
    }
  }
}
</script>

<template>
  <div class="container">
    <h3>{{ t('uploadThumbnail')}}</h3>
    <div class="upload-container">
      <label class="file-upload">
        <input class="file-upload-input" type="file" @change="onFileChanged">
        {{ t('upload') }}
      </label>
    </div>
    <div class="image-preview-list-container">
      <ul>
        <li v-if="selectedFile.length !== 0" v-for="(image, index) in selectedFile">
          <div class="list-container">
            <img :src="getImage(index)" :alt="image.name">
            <button class="list-button" @click.stop.prevent="deleteImage(index)">
              {{ t('delete') }}
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>

</template>
