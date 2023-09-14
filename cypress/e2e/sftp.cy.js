describe('example', () => {
  beforeEach(() => {
    cy.visit('https://beta.southrivertech.com')
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
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
      expect(`${JSON.stringify(p)}`).to.equal('"/"')
    })
  })

  it('as a sftp user, I should be able to create directory', () => {
    cy.task('sftpCreateAndDisplayDirectory', remoteDir).then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
      expect(`${JSON.stringify(p)}`).to.equal(`"${remoteDir} directory created"`)
    })
  })

  it('as a sftp user, I should be able to upload file from local to remote', () => {
    cy.task('sftpUploadFileFromLocalToRemote', localPath).then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
      expect(`${JSON.stringify(p)}`).to.equal(`"${localPath} was successfully uploaded to ${remoteDirFile}!"`)
    })
  })

  it('as a sftp user, I should be able to read and write remote file', () => {
    cy.task('sftpReadWriteRemoteFile').then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
      // expect(`${JSON.stringify(p)}`).to.equal('"/path/to/new/dir directory created"')
    })
  })

  it('as a sftp user, I should be able to rename remote file', () => {
    cy.task('sftpRenameRemoteFile').then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
      expect(`${JSON.stringify(p)}`).to.equal(`"Successfully renamed ${remoteDirFile} to ${newRemoteDir}"`)
    })
  })

  it('as a sftp user, I should be able to copy file from local to remote', () => {
    cy.task('sftpCopyFileFromLocalToRemote').then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
      expect(`${JSON.stringify(p)}`).to.equal(`"${newRemoteDir} copied to ${remoteDirCopy}"`)
    })
  })

  it('as a sftp user, I should be able to download file from remote to local', () => {
    cy.task('sftpDownLoadFileFromRemoteToLocal', localPath2).then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
      expect(`${JSON.stringify(p)}`).to.equal(`"${newRemoteDir} was successfully download to ${localPath2}!"`)
    })
  })

  it('as a sftp user, I should be able to delete a file from remote', () => {
    cy.task('sftpDeleteRemoteFile', newRemoteDir).then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
      expect(`${JSON.stringify(p)}`).to.equal(`"Successfully deleted ${newRemoteDir}"`)
    })
  })

  it('as a sftp user, I should be able to delete remote directory', () => {
    cy.task('sftpDeleteRemoteDirectory', remoteDirPath).then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
      expect(`${JSON.stringify(p)}`).to.equal('"Successfully removed directory"')
    })
  })

  afterEach(() => {
    cy.task('endSFTPConnection')
  })
})
