describe('example', () => {
  beforeEach(() => {
    cy.visit('https://beta.southrivertech.com')
  })

  it('sftp connection : displays current remote working directory ', () => {
    cy.task('sftpConnectionUsingCWD').then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
      expect(`${JSON.stringify(p)}`).to.equal('"/"')
    })
  })

  it('sftp connection :creates new directory and displays current remote working directory ', () => {
    const remoteDir = '/path/to/new/dir'
    cy.task('sftpConnectionUsingMkdir', remoteDir).then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
    })
  })

  it('sftp connection :creates new file remote working directory ', () => {
    const remoteDir = '/path/to/new/dir/file.txt'
    cy.task('sftpConnectionUsingMkdir', remoteDir).then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
    })
  })

  it.skip('sftp connection :appends ', () => {
    cy.task('sftpConnectionUsingAppend').then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
    })
  })

  it('sftp connection : Rename remote file ', () => {
    const remoteDir = '/path/to/new/dir/file.txt'
    const newRemoteDir = '/path/to/new/dir/file2.txt'
    cy.task('sftpConnectionUsingRename', remoteDir, newRemoteDir).then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
    })
  })

  it.skip('sftp connection : copy file from local system to remote server. ', () => {
    const remoteDir = '/path/to/new/dir/BUGS.txt'
    cy.task('sftpConnectionUsingRCopy', remoteDir).then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
    })
  })

  it('sftp connection : Upload file from local system to remote server. ', () => {
    const localPath = './../fixtures/local.txt'
    cy.task('sftpConnectionUsingPut', localPath).then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
    })
  })

  it('sftp connection :removes file and displays current remote working directory after deletion ', () => {
    const remoteDir = '/path/to/new/dir/file2.txt'
    cy.task('sftpConnectionUsingDelete', remoteDir).then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
    })
  })

  it.skip('sftp connection :removes directory and displays current remote working directory after deletion ', () => {
    const remoteDir = '/path'
    cy.task('sftpConnectionUsingRmdir', remoteDir).then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
    })
  })

  afterEach(() => {
    cy.task('endSFTPConnection')
  })
})
