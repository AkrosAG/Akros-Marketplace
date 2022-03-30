import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/App.jsx'),
      name: 'SearchResultsWebComponent',
      fileName: format => `SearchResultsWebComponent.${format}.js`,
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
});
