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
  viewportHeight: 1000,
  watchForFileChanges: false,
  defaultCommandTimeout: 45000,
  pageLoadTimeout: 45000,
  responseTimeout: 45000,
  requestTimeout: 45000,
  env: {
    baseUrl: 'https://beta.southrivertech.com',
    apiBaseUrl: 'https://beta.southrivertech.com:41443',
    admin: {
      adminBaseUrl: ':41443/',
      adminUsername: 'srtadmin',
      adminPassword: 'SrtSoft21401!'
    },
    user: {
      fileOperations: {
        single: 'singlefile',
        bulk: 'bulkfile'
      },
      directoryOperations: {
        single: 'singledir',
        bulk: 'bulkdir'
      },
      userBaseUrl: '/',
      Username: 'testsftp',
      Password: '123456'
    }
  }
})
