const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents (on, config) {
      return require('../plugins/index.js')(on, config)
    },
    userBaseUrl: 'https://beta.southrivertech.com/',
    adminBaseUrl: 'https://beta.southrivertech.com:41443/'
  }
})
