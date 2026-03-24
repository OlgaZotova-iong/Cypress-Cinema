const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://qamid.tmweb.ru',
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    specPattern: "cypress/e2e/**/*.cy.js",
    retries: {
      runMode: 2,
      openMode: 0
    }
  }
});



