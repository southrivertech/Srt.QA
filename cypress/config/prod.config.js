const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents (on, config) {
      return require('../plugins/index.js')(on, config)
    },
    baseUrl: 'https://beta.southrivertech.com'
  },
  projectId: 'vdwu1o',
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
    baseUrl: 'https://beta.southrivertech.com',
    admin: {
      adminBaseUrl: ':41443/',
      adminUsername: 'srtadmin',
      adminPassword: 'SrtSoft21401!'
    },
    user: {
    }
  }
})
