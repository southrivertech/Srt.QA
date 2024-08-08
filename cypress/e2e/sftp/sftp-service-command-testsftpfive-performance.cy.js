import navigationSelectors from '../../../selectors/navigation/left-navigation-selectors.json'
import label from '../../fixtures/label.json'

describe('example', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }

  before(() => {
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
    // navigate to events
    cy.get(navigationSelectors.textLabelSelector).contains(label.autoDomainName).click()
    cy.get(navigationSelectors.textLabelSelector).contains(label.autoServerName).should('be.visible').click()
    cy.get(navigationSelectors.textLabelSelector).contains(label.serverActivity).should('be.visible').click()
  })
  const configSFTP = {
    host: 'beta.southrivertech.com',
    port: '2200',
    username: 'testsftpfive',
    password: '123456'
  }
  const remoteDir = '/path/to/new/dir'
  const remoteDirFile = '/path/to/new/dir/file.txt'
  const newRemoteDir = '/path/to/new/dir/file2.txt'
  const localPath = './../fixtures/local.txt'
  const localPathForDownload = './../fixtures'
  const localPath2 = './../fixtures/local2.txt'
  const remoteDirCopy = `/path/to/new/${Cypress.dayjs().format('ssmYY')}.txt`
  const remoteDirPath = '/path'

  it.only('all sftp operations', () => {
    cy.task('sftpCurrentWorkingDirectory', configSFTP).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal('"/"')
      cy.task('endSFTPConnection')
    })

    cy.task('sftpCreateDirectory', { remoteDir, configSFTP }).then(p => {
      if (p === 'directory exists') {
        cy.log('Directory already exists, proceeding to delete')
        cy.task('sftpDeleteDirectory', { remoteDir, configSFTP }).then(p => {
          expect(`${JSON.stringify(p)}`).to.equal(`"Successfully deleted ${remoteDir}"`)
          cy.task('endSFTPConnection')
          cy.log('Directory deleted, creating again')
          cy.task('sftpCreateDirectory', { remoteDir, configSFTP }).then(p => {
            expect(`${JSON.stringify(p)}`).to.equal(`"${remoteDir} directory created"`)
            cy.task('endSFTPConnection')
          })
        })
      } else {
        expect(`${JSON.stringify(p)}`).to.equal(`"${remoteDir} directory created"`)
        cy.task('endSFTPConnection')
      }
    })

    cy.task('sftpUploadFile', { localPath, remoteDirFile, configSFTP }).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal(`"${localPath} was successfully uploaded to ${remoteDirFile}!"`)
      cy.task('endSFTPConnection')
    })

    cy.task('sftpEditFile', { remoteDirFile, configSFTP }).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal(`"Uploaded data stream to ${remoteDirFile}"`)
      cy.task('endSFTPConnection')
    })

    cy.task('sftpRenameFile', { remoteDirFile, newRemoteDir, configSFTP }).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal(`"Successfully renamed ${remoteDirFile} to ${newRemoteDir}"`)
      cy.task('endSFTPConnection')
    })

    cy.task('sftpCopyFile', { newRemoteDir, remoteDirCopy, configSFTP }).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal(`"${newRemoteDir} copied to ${remoteDirCopy}"`)
      cy.task('endSFTPConnection')
    })

    cy.task('sftpDownloadDirectory', { remoteDir, localPathForDownload, configSFTP }).then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
      expect(`${JSON.stringify(p)}`).to.equal(`"${remoteDir} downloaded to ${localPathForDownload}"`)
      cy.task('endSFTPConnection')
    })

    cy.task('sftpDeleteFile', { configSFTP, newRemoteDir }).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal(`"Successfully deleted ${newRemoteDir}"`)
      cy.task('endSFTPConnection')
    })

    cy.task('sftpRemoveDirectory', { configSFTP, remoteDirPath }).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal('"Successfully removed directory"')
      cy.task('endSFTPConnection')
    })
  })

  it('as a sftp user, I should be able to see the current working directory', () => {
    cy.task('sftpCurrentWorkingDirectory', configSFTP).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal('"/"')
    })
  })

  it('as a sftp user, I should be able to create a directory', () => {
    cy.task('sftpCreateDirectory', { remoteDir, configSFTP }).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal(`"${remoteDir} directory created"`)
    })
  })

  it('as a sftp user, I should be able to upload a file', () => {
    cy.task('sftpUploadFile', { localPath, remoteDirFile, configSFTP }).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal(`"${localPath} was successfully uploaded to ${remoteDirFile}!"`)
    })
  })

  it('as a sftp user, I should be able to edit an existing file', () => {
    cy.task('sftpEditFile', { remoteDirFile, configSFTP }).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal(`"Uploaded data stream to ${remoteDirFile}"`)
    })
  })

  it('as a sftp user, I should be able to rename a file', () => {
    cy.task('sftpRenameFile', { remoteDirFile, newRemoteDir, configSFTP }).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal(`"Successfully renamed ${remoteDirFile} to ${newRemoteDir}"`)
    })
  })

  it('as a sftp user, I should be able to copy a file', () => {
    cy.task('sftpCopyFile', { newRemoteDir, remoteDirCopy, configSFTP }).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal(`"${newRemoteDir} copied to ${remoteDirCopy}"`)
    })
  })

  it('as a sftp user, I should be able to download a file', () => {
    cy.task('sftpDownLoadFile', { newRemoteDir, localPath2, configSFTP }).then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
      expect(`${JSON.stringify(p)}`).to.equal(`"${newRemoteDir} was successfully download to ${localPath2}!"`)
    })
  })

  it('as a sftp user, I should be able to delete a file', () => {
    cy.task('sftpDeleteFile', { configSFTP, newRemoteDir }).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal(`"Successfully deleted ${newRemoteDir}"`)
    })
  })

  it('as a sftp user, I should be able to delete a directory', () => {
    cy.task('sftpRemoveDirectory', { configSFTP, remoteDirPath }).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal('"Successfully removed directory"')
    })
  })

  after(() => {
    cy.task('endSFTPConnection')
  })
})
