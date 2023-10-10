describe('example', () => {
  beforeEach(() => {
    cy.visit('https://beta.southrivertech.com')
  })
  const remoteDir = '/path'
  const localPath = './../fixtures/local.txt'

  it('as remoteDirFilea sftp user, I should be able to see the current working directory', () => {
    cy.task('sftpCurrentWorkingDirectory').then(p => {
      expect(`${JSON.stringify(p)}`).to.equal('"/"')
    })
  })

  it('as a sftp user, I should be able to create a directory', () => {
    cy.task('sftpCreateDirectory', remoteDir).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal(`"${remoteDir} directory created"`)
    })
  })

  it.only('as a sftp user, I should be able to upload a file', () => {
    for (let i = 0; i < 500; i++) {
      const remoteDirFile = `'/path/file${i}'`
      cy.task('sftpUplloadFile', { localPath, remoteDirFile }).then(p => {
        expect(`${JSON.stringify(p)}`).to.equal(`"${localPath} was successfully uploaded to ${remoteDirFile}!"`)
      })
    }
  })
  it('as remoteDirFilea sftp user, I should be able to see the current working directory', () => {
    cy.task('sftpCurrentWorkingDirectory').then(p => {
      expect(`${JSON.stringify(p)}`).to.equal('"/"')
    })
  })
  afterEach(() => {
    cy.task('endSFTPConnection')
  })
})
