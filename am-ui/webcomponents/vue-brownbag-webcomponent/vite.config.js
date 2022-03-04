import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
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
