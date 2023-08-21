const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents (on, config) {
      return require('../plugins/index.js')(on, config)
    }
  },
  chromeWebSecurity: false,
  video: true,
  viewportWidth: 1440,
  viewportHeight: 768,
  watchForFileChanges: false,
  defaultCommandTimeout: 5000,
  pageLoadTimeout: 5000,
  responseTimeout: 5000,
  requestTimeout: 5000,
  env: {
    admin: {
      adminBaseUrl: 'https://beta.southrivertech.com:41443/',
      adminUsername: 'srtadmin',
      adminPassword: 'SrtSoft21401!'
    },
    user: {
      userBaseUrl: 'https://beta.southrivertech.com/'
    }
  }
})
