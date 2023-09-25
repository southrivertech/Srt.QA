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

module.exports = async (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  /**
   * Details on how to use downloadFile plugin
  */

  on('task', { downloadFile })

  const configSFTP = {
    host: 'beta.southrivertech.com',
    port: '2200',
    username: 'testsftp',
    password: '123456'
  }

  // sftp connection task to end the connection
  on('task', {
    endSFTPConnection () {
      return sftp.end()
    }
  })

  // sftp connection task which will return current remote working directory using cwd() command
  on('task', {
    sftpCurrentWorkingDirectory () {
      return sftp.connect(configSFTP)
        .then(() => {
          return sftp.cwd()
        })
    }
  })

  // sftp connection task which will create new directory using mkdir()
  on('task', {
    sftpCreateDirectory (remoteDir) {
      return sftp.connect(configSFTP)
        .then(() => {
          return sftp.mkdir(remoteDir, true)
        })
    }
  })

  // sftp connection task which will remove directory using rmdir()
  on('task', {
    sftpRemoveDirectory (remoteDir) {
      return sftp.connect(configSFTP)
        .then(() => {
          return sftp.rmdir(remoteDir, true)
        })
    }
  })

  // sftp connection task which will put data stream to remote location using fastPut() command
  on('task', {
    sftpUploadFile (opts) {
      return sftp.connect(configSFTP)
        .then(() => {
          return sftp.fastPut(opts.localPath, opts.remoteDirFile, true)
        })
    }
  })

  // sftp connection task which will download file from  remote location using fastGet() command
  on('task', {
    sftpDownLoadFile (opts) {
      return sftp.connect(configSFTP)
        .then(() => {
          return sftp.fastGet(opts.newRemoteDir, opts.localPath2, true)
        })
    }
  })

  // sftp connection task which will rename the remote server file or directory using rename command
  on('task', {
    sftpRenameFile (opts) {
      return sftp.connect(configSFTP)
        .then(() => {
          return sftp.rename(opts.remoteDirFile, opts.newRemoteDir)
        })
    }
  })

  // sftp connection task which read write text to file on server using put() command
  on('task', {
    sftpEditFile (remoteDirFile) {
      return sftp.connect(configSFTP)
        .then(() => {
          return sftp.put(Buffer.from(' Text to add in the file'), remoteDirFile, {
            writeStreamOptions: {
              flags: 'a', // w - write and a - append
              encoding: 'utf-8', // use null for binary files
              mode: 0o666 // mode to use for created file (rwx)
            }
          })
        })
    }
  })
  // sftp connection task which copy file on remote server using rcopy()
  on('task', {
    sftpCopyFile (opts) {
      return sftp.connect(configSFTP)
        .then(() => {
          return sftp.rcopy(opts.newRemoteDir, opts.remoteDirCopy)
        })
    }
  })

  // sftp connection task which deletes file on server using delete command
  on('task', {
    sftpDeleteFile (remoteFile) {
      return sftp.connect(configSFTP)
        .then(() => {
          return sftp.delete(remoteFile)
        })
    }
  })

  // sftp command is used to change permission(read, write, execute) for a file or directory
  on('task', {
    sftpChmod (remoteFile) {
      return sftp.connect(configSFTP)
        .then(() => {
          return sftp.chmod(remoteFile, '0o644')
        })
    }
  })
}
