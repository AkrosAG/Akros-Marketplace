<template>
  <div class="detail-container">
    <div class="title-container">
      <h1 v-if="props.createAddSuccess">{{ t('adIsPublished') }}</h1>
      <h1 v-if="!props.createAddSuccess">{{ t('adError') }}</h1>
    </div>
    <div class="image-container">
      <img
        v-if="props.createAddSuccess"
        style="width: 60%"
        src="../../assets/check.png"
        alt="Ad is published"
      />
      <img
        v-if="!props.createAddSuccess"
        style="width: 60%"
        src="../../assets/error.png"
        alt="Error in Ad creation"
      />
    </div>
  </div>
</template>
<script setup>
import { useI18n } from './useI18n';
import i18n from '../locales/i18n';

const props = defineProps({
  createAddSuccess: Boolean
});

const { t } = useI18n(i18n.global.messages.value);
</script>
