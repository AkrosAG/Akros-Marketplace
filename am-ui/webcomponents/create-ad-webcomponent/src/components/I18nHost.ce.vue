<script>
import { defineComponent, provide, watchEffect } from 'vue';
import { I18nInjectionKey } from 'vue-i18n';
import i18n from '../locales/i18n';
/**
 * Define the web components that host the i18n instance.
 *
 * Because the web components environment isn't hosted in a Vue apps by `createApp`, but is provided by itself.
 * The i18n instance created by `createI18n` will be installed with `app.use` in Vue apps,
 * so that you can use i18n features with `useI18n` in Vue components.
 * In order to use `useI18n` in web components, you need to have web components hosted as root to use it.
 */
/**
 * create an i18n instance to host for other web components
 *
 * NOTE:
 *  In web components only supports the composition API.
 *  It will not work in legacy API mode.
 */

export default defineComponent({
  props: {
    locale: {
      type: String,
      default: 'de'
    }
  },
  setup(props) {
    /**
     * provide i18n instance with `I18nInjectionKey` for other web components
     */
    provide(I18nInjectionKey, i18n);
    watchEffect(() => {
      i18n.global.locale.value = props.locale;
    });
    return {};
  }
});
</script>

<template>
  <!-- eslint-disable -->
  <slot />
</template>
