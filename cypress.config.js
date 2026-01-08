const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    experimentalShadowDomSupport: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    includeShadowDom: true,
  },
});
