describe('example', () => {
  beforeEach(() => {
    cy.visit('https://beta.southrivertech.com')
  })
  it.skip('displays two ult', () => {
    // const localFile = '/a.config.js'
    // const remoteFile = '/upload/testFile.json'
    cy.task('uploadPremiseFile').then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
    //   return sftp.end()
    })
  })

  it('sftp connection : displays current remote working directory ', () => {
    cy.task('sftpConnectionUsingCWD').then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
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

  it('sftp connection :appends ', () => {
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

  it('sftp connection : copy file from local system to remote server. ', () => {
    const remoteDir = '/path/to/new/dir/file2.txt'
    cy.task('sftpConnectionUsingRCopy', remoteDir).then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
    })
  })

  it('sftp connection : Upload file from local system to remote server. ', () => {
    cy.task('sftpConnectionUsingPut').then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
    })
  })

  it('sftp connection :removes file and displays current remote working directory after deletion ', () => {
    const remoteDir = '/path/to/new/dir/file2.txt'
    cy.task('sftpConnectionUsingDelete', remoteDir).then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
    })
  })

  it('sftp connection :removes directory and displays current remote working directory after deletion ', () => {
    const remoteDir = '/path/to/new/dir'
    cy.task('sftpConnectionUsingRmdir', remoteDir).then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
    })
  })

  afterEach(() => {
    cy.task('endSFTPConnection')
  })
})
