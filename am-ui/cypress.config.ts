import {defineConfig} from 'cypress';

export default defineConfig({
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  fixturesFolder: 'cypress/fixtures',
  e2e: {
    baseUrl: 'http://localhost:4200',
    defaultCommandTimeout: 6000,
  },
});
