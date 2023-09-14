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
const FTP = require('ftp')
const configFtp = {
  host: 'beta.southrivertech.com',
  port: '9900',
  username: 'testsftp',
  password: '123456'
}
// const rootPath = process.cwd()
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
  const configSFTP = {
    host: 'beta.southrivertech.com',
    port: '2200',
    username: 'testsftp',
    password: '123456'
  }
  // ftp implicit connection task which will return current remote working directory
  on('task', {
    ftpImplicitConnectionUsingPwd () {
      // const c = new FTP()
      return new FTP({
        host: 'beta.southrivertech.com',
        port: '9900',
        username: 'testsftp',
        password: '123456'
      }).then((c) => {
        return c.pwd()
      })
    }
  })

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

  // sftp connection task to end the connection
  on('task', {
    endSFTPConnection () {
      return sftp.end()
    }
  })

  // sftp connection task which will return current remote working directory using cwd() command
  on('task', {
    sftpConnectionUsingCWD (command) {
      return sftp.connect(configSFTP)
        .then(() => {
          console.log(command)
          return sftp.cwd()
        })
    }
  })

  // sftp connection task which will create new directory using mkdir()
  on('task', {
    sftpConnectionUsingMkdir (remoteDir) {
      return sftp.connect(configSFTP)
        .then(() => {
          return sftp.mkdir(remoteDir, true)
        })
    }
  })

  // sftp connection task which will remove directory using rmdir()
  on('task', {
    sftpConnectionUsingRmdir (remoteDir) {
      return sftp.connect(configSFTP)
        .then(() => {
          return sftp.rmdir(remoteDir, true)
        })
    }
  })

  // sftp connection task which will put data stream to remote location using put() command
  on('task', {
    sftpConnectionUsingPut (localPath) {
      return sftp.connect(configSFTP)
        .then(() => {
          return sftp.fastPut(localPath, '/path/to/new/dir/file.txt', true)
        })
    }
  })

  // sftp connection task which will put data stream to remote location using put() command
  on('task', {
    sftpConnectionUsingFastGet (localPath2) {
      return sftp.connect(configSFTP)
        .then(() => {
          return sftp.fastGet('/path/to/new/dir/file2.txt', localPath2, true)
        })
    }
  })

  // sftp connection task which will rename the remote server file using rename command
  on('task', {
    sftpConnectionUsingRename () {
      return sftp.connect(configSFTP)
        .then(() => {
          return sftp.rename('/path/to/new/dir/file.txt', '/path/to/new/dir/file2.txt')
        })
    }
  })

  // sftp connection task which appends text to file on server using appends command
  on('task', {
    sftpConnectionUsingAppend (remoteFile) {
      sftp.connect(configSFTP)
        .then(() => {
          return sftp.append(Buffer.from('Hello World'), '/path/to/new/dir/file.txt')
        })
    }
  })
  // sftp connection task which appends text to file on server using appends command
  on('task', {
    sftpConnectionUsingRCopy () {
      return sftp.connect(configSFTP)
        .then(() => {
          return sftp.rcopy('/path/to/new/dir/file2.txt', '/path/to/new/S.txt')
        })
    }
  })

  // sftp connection task which deletes file on server using delete command
  on('task', {
    sftpConnectionUsingDelete (remoteFile) {
      return sftp.connect(configSFTP)
        .then(() => {
          return sftp.delete(remoteFile)
        })
    }
  })

  // ftp implicit connection task which will return current remote working directory
  on('task', {
    ftpImplicitConnectionUsingPwd () {
      const F = new FTP(configFtp)
      return F.pwd()
    }
  })
}
