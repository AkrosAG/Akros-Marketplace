<template>
  <i18n-host>
    <create-ad-webcomponent />
  </i18n-host>
</template>

<script setup lang="ts">
import {ref} from 'vue';
const locale = ref<string>('en');
</script>
