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
  defaultCommandTimeout: 30000,
  pageLoadTimeout: 30000,
  responseTimeout: 30000,
  requestTimeout: 30000,
  env: {
    baseUrl: 'https://beta.southrivertech.com',
    admin: {
      adminBaseUrl: ':41443/',
      adminUsername: 'srtadmin',
      adminPassword: 'SrtSoft21401!'
    },
    user: {
      userBaseUrl: '/',
      Username: 'testsftp',
      Password: '123456'
    }
  }
})
