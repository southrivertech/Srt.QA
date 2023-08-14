const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents (on, config) {
      return require('../plugins/index.js')(on, config)
    }
  },
  watchForFileChanges: false,
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
