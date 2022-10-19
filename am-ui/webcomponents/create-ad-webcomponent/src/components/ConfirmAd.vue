<template>
  <div class="detail-container">
    <div class="title-container">
      <h1>{{t('adIsPublished')}}</h1>
    </div>
    <div class="image-container">
      <img style="width: 60%" src="../../assets/check.png" alt="Ad is published" />
    </div>
  </div>
</template>
<script setup>
import { useI18n } from './useI18n';
import i18n from '../locales/i18n';
const { t } = useI18n(i18n.global.messages.value);
</script>
