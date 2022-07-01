import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueI18n from '@intlify/vite-plugin-vue-i18n'
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueI18n()],
  server: {
    proxy: {
      '/categories': {
        target: 'https://localhost:8443',
        secure: false,
      },
      '/api/auth': {
        target: 'https://localhost:9443',
        secure: false,
      },
      '/topics': {
        target: 'https://localhost:8443',
        secure: false,
      },
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.js'),
      name: 'CreateAdWebComponent',
      fileName: format => `CreateAdWebComponent.${format}.js`,
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
});
