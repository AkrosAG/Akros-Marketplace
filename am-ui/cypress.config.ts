import {defineConfig} from 'cypress';

export default defineConfig({
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  fixturesFolder: 'cypress/fixtures',
  e2e: {
    baseUrl: 'https://localhost:4200',
    defaultCommandTimeout: 5000,
  },
});
