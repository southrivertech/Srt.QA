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
    cy.task('sftpConnectionUsingCWD').then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
      expect(`${JSON.stringify(p)}`).to.equal('"/"')
    })
  })

  it('sftp connection :creates new directory and displays current remote working directory ', () => {
    cy.task('sftpConnectionUsingMkdir', remoteDir).then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
      expect(`${JSON.stringify(p)}`).to.equal(`"${remoteDir} directory created"`)
    })
  })

  it('sftp connection : Upload file from local system to remote server. ', () => {
    cy.task('sftpConnectionUsingPut', localPath).then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
      expect(`${JSON.stringify(p)}`).to.equal(`"${localPath} was successfully uploaded to ${remoteDirFile}!"`)
    })
  })

  it('sftp connection :put ', () => {
    cy.task('sftpConnectionUsingAppend').then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
      // expect(`${JSON.stringify(p)}`).to.equal('"/path/to/new/dir directory created"')
    })
  })

  it('sftp connection : Rename remote file ', () => {
    cy.task('sftpConnectionUsingRename').then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
      expect(`${JSON.stringify(p)}`).to.equal(`"Successfully renamed ${remoteDirFile} to ${newRemoteDir}"`)
    })
  })

  it('sftp connection : copy file from local to remote server. ', () => {
    cy.task('sftpConnectionUsingRCopy').then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
      expect(`${JSON.stringify(p)}`).to.equal(`"${newRemoteDir} copied to ${remoteDirCopy}"`)
    })
  })

  it('sftp connection : download file from remote server to Local.', () => {
    cy.task('sftpConnectionUsingFastGet', localPath2).then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
      expect(`${JSON.stringify(p)}`).to.equal(`"${newRemoteDir} was successfully download to ${localPath2}!"`)
    })
  })

  it('sftp connection :removes file and displays current remote working directory after deletion ', () => {
    cy.task('sftpConnectionUsingDelete', newRemoteDir).then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
      expect(`${JSON.stringify(p)}`).to.equal(`"Successfully deleted ${newRemoteDir}"`)
    })
  })

  it('sftp connection :removes directory and displays current remote working directory after deletion ', () => {
    cy.task('sftpConnectionUsingRmdir', remoteDirPath).then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
      expect(`${JSON.stringify(p)}`).to.equal('"Successfully removed directory"')
    })
  })

  afterEach(() => {
    cy.task('endSFTPConnection')
  })
})
