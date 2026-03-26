const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '788h7m',

  e2e: {
    baseUrl: 'http://qamid.tmweb.ru',
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    specPattern: "cypress/e2e/**/*.cy.js",

    // Для версий Cypress 15.x иногда нужна явная настройка
    setupNodeEvents(on, config) {
      // Здесь можно добавлять плагины при необходимости
      return config;
    },

    retries: {
      runMode: 2,
      openMode: 0
    }
  }
});




