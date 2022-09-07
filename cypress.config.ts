export default {
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  fixturesFolder: 'cypress/fixtures',
  viewportHeight: 800,
  viewportWidth: 1280,
  video: false,
  screenshotOnRunFailure: true,
  defaultCommandTimeout: 20000,
  pageLoadTimeout: 30000,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.ts')(on, config)
    },
    specPattern: 'cypress/integration//**/*.feature',
  },
}
