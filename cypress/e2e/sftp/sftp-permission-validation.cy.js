describe('example', () => {
  beforeEach(() => {
    cy.visit('https://beta.southrivertech.com')
  })
  const remoteDir = '/path/to/new/dir'
  const localPath = './../fixtures/local.txt'
  const remoteDirFile = '/path/to/new/dir/file.txt'
  const newRemoteDir = '/path/to/new/dir/file2.txt'

  // const newRemoteDir = '/NewReadOnlyDirectory'

  it('as a sftp user, I should be able to create a directory', () => {
    cy.task('sftpCreateDirectory', remoteDir).then(p => {
      //      expect(`${JSON.stringify(p)}`).to.equal(`"${remoteDir} directory created"`)
      cy.log(`${JSON.stringify(p)}`)
    })
  })

  it('as a sftp user, I should be able to upload a file', () => {
    cy.task('sftpUploadFile', { localPath, remoteDirFile }).then(p => {
    //  expect(`${JSON.stringify(p)}`).to.equal(`"${localPath} was successfully uploaded to ${remoteDirFile}!"`)
    })
  })

  it('as a sftp user, I should be able change file permission', () => {
    cy.task('sftpChmod', remoteDirFile).then(p => {
      //    expect(`${JSON.stringify(p)}`).to.equal(`"${remoteDir} directory created"`)
      cy.log(`${JSON.stringify(p)}`)
    })
  })
  it('as a sftp user, I should be able to rename remote file', () => {
    cy.task('sftpRenameFile', { remoteDirFile, newRemoteDir }).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal(`"Successfully renamed ${remoteDirFile} to ${newRemoteDir}"`)
    })
  })

  it('as a sftp user, I should be able to delete remote directory', () => {
    cy.task('sftpRemoveDirectory', remoteDir).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal('"Successfully removed directory"')
    })
  })

  afterEach(() => {
    cy.task('endSFTPConnection')
  })
})
