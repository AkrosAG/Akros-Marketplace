import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  server: {
    proxy: {
      '/categories': {
        target: 'https://localhost:8443',
        changeOrigin: true,
        secure: false,
      },
      '/api/auth': {
        target: 'https://localhost:8080',
        secure: false,
      },
    },
  },
  devServer: {
    proxy: {
      '/categories': {
        target: 'https://localhost:8443',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.js'),
      name: 'VueBrownbagWebComponent',
      fileName: format => `VueBrownbagWebComponent.${format}.js`,
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
});
