import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
const path = require('path');

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://am-marketplace-service.azurewebsites.net",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.js'),
      name: 'CreateAddWebcomponent',
      fileName: format => `CreateAddWebcomponent.${format}.js`,
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
});
