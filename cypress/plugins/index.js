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
const Client = require('ssh2-sftp-client')
const sftp = new Client()
const rootPath = process.cwd()
const config = {
  host: 'beta.southrivertech.com',
  port: '2200',
  username: 'testsftp',
  password: '123456'
}

const uploadFileToRemote = () => {
  return sftp.connect(config).then(() => {
    return sftp.list('/')
  })
}

module.exports = async (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  /**
   * Details on how to use downloadFile plugin
  */
  on('task', {
    uploadPremiseFile: () => {
      // console.log('rootPath:', rootPath)
      // console.log('Start upload file: ', Obj.localPath)
      return uploadFileToRemote()
    }
  })

  on('task', { downloadFile })

  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.name === 'chrome') {
      launchOptions.args.push('--disable-features=CrossSiteDocumentBlockingIfIsolating' +
        'CrossSiteDocumentBlockingAlways,IsolateOrigins,site-per-process')
    }
    return launchOptions
  })

  on('task', {
    sftpConnection () {
      sftp.connect({
        host: 'beta.southrivertech.com',
        port: '2200',
        username: 'testsftp',
        password: '123456'
      })
      return Promise.resolve(sftp.list())
    }
  })
}
