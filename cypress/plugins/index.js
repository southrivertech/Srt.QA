/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
/**
 * @type {Cypress.PluginConfig}
 */

const { downloadFile } = require('cypress-downloadfile/lib/addPlugin')

module.exports = async (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  /**
   * Details on how to use downloadFile plugin
  */

  on('task', { downloadFile })

  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.name === 'chrome') {
      launchOptions.args.push('--disable-features=CrossSiteDocumentBlockingIfIsolating' +
        'CrossSiteDocumentBlockingAlways,IsolateOrigins,site-per-process')
    }
    return launchOptions
  })
}
