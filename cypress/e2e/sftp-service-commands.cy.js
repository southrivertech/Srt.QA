describe('example', () => {
  beforeEach(() => {
    cy.visit('https://beta.southrivertech.com')
  })
  const remoteDir = '/path/to/new/dir'
  const remoteDirFile = '/path/to/new/dir/file.txt'
  const newRemoteDir = '/path/to/new/dir/file2.txt'
  const localPath = './../fixtures'
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

  it('as a sftp user, I should be able to upload a directory', () => {
    cy.task('sftpUploadDirectory', { localPath, remoteDirPath }).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal(`"${remoteDir} directory created"`)
    })
  })

  it('as a sftp user, I should be able to download a directory', () => {
    cy.task('sftpDownloadDirectory', { localPath, remoteDirPath }).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal(`"${remoteDir} directory created"`)
    })
  })

  it('as a sftp user, I should be able to rename remote file', () => {
    cy.task('sftpRenameFile', { remoteDirFile, newRemoteDir }).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal(`"Successfully renamed ${remoteDirFile} to ${newRemoteDir}"`)
    })
  })

  it('as a sftp user, I should be able to copy file', () => {
    cy.task('sftpCopyFile', { newRemoteDir, remoteDirCopy }).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal(`"${newRemoteDir} copied to ${remoteDirCopy}"`)
    })
  })

  it('as a sftp user, I should be able to download file from remote to local', () => {
    cy.task('sftpDownLoadFile', { newRemoteDir, localPath2 }).then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
      expect(`${JSON.stringify(p)}`).to.equal(`"${newRemoteDir} was successfully download to ${localPath2}!"`)
    })
  })

  it('as a sftp user, I should be able to delete a file from remote', () => {
    cy.task('sftpDeleteFile', newRemoteDir).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal(`"Successfully deleted ${newRemoteDir}"`)
    })
  })

  it('as a sftp user, I should be able to delete remote directory', () => {
    cy.task('sftpUpload Directory', remoteDirPath).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal('"Successfully removed directory"')
    })
  })

  afterEach(() => {
    cy.task('endSFTPConnection')
  })
})
