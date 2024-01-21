import navigationSelectors from '../../../selectors/navigation/left-navigation-selectors.json'
import label from '../../fixtures/label.json'

describe.skip('example', () => {
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
  const remoteDir = '/path/to/new/dir'
  const remoteDirFile = '/path/to/new/dir/file.txt'
  const newRemoteDir = '/path/to/new/dir/file2.txt'
  const localPath = './../fixtures/local.txt'
  const localPath2 = './../fixtures/local2.txt'
  const remoteDirCopy = '/path/to/new/S.txt'
  const remoteDirPath = '/path'

  it('as a sftp user, I should be able to see the current working directory', () => {
    cy.task('sftpCurrentWorkingDirectory').then(p => {
      expect(`${JSON.stringify(p)}`).to.equal('"/"')
    })
  })

  it('as a sftp user, I should be able to create a directory', () => {
    cy.task('sftpCreateDirectory', remoteDir).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal(`"${remoteDir} directory created"`)
    })
  })

  it('as a sftp user, I should be able to upload a file', () => {
    cy.task('sftpUploadFile', { localPath, remoteDirFile }).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal(`"${localPath} was successfully uploaded to ${remoteDirFile}!"`)
    })
  })

  it('as a sftp user, I should be able to edit an existing file', () => {
    cy.task('sftpEditFile', remoteDirFile).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal(`"Uploaded data stream to ${remoteDirFile}"`)
    })
  })

  it('as a sftp user, I should be able to rename a file', () => {
    cy.task('sftpRenameFile', { remoteDirFile, newRemoteDir }).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal(`"Successfully renamed ${remoteDirFile} to ${newRemoteDir}"`)
    })
  })

  it('as a sftp user, I should be able to copy a file', () => {
    cy.task('sftpCopyFile', { newRemoteDir, remoteDirCopy }).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal(`"${newRemoteDir} copied to ${remoteDirCopy}"`)
    })
  })

  it('as a sftp user, I should be able to download a file', () => {
    cy.task('sftpDownLoadFile', { newRemoteDir, localPath2 }).then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
      expect(`${JSON.stringify(p)}`).to.equal(`"${newRemoteDir} was successfully download to ${localPath2}!"`)
    })
  })

  it('as a sftp user, I should be able to delete a file', () => {
    cy.task('sftpDeleteFile', newRemoteDir).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal(`"Successfully deleted ${newRemoteDir}"`)
    })
  })

  it('as a sftp user, I should be able to delete a directory', () => {
    cy.task('sftpRemoveDirectory', remoteDirPath).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal('"Successfully removed directory"')
    })
  })

  afterEach(() => {
    cy.task('endSFTPConnection')
  })
})
