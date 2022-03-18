const {defineConfig} = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  filenameHashing: false,
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        ws: true,
        changeOrigin: true,
        target: 'https://am-marketplace-service.azurewebsites.net/',
      },
    },
  },
  pluginOptions: {
    i18n: {
      locale: 'de',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true,
    },
  },
});
