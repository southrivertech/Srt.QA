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
  viewportHeight: 1200,
  watchForFileChanges: false,
  defaultCommandTimeout: 15000,
  pageLoadTimeout: 15000,
  responseTimeout: 15000,
  requestTimeout: 15000,
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
