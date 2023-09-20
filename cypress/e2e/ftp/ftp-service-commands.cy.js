describe('example', () => {
  beforeEach(() => {
    cy.visit('https://beta.southrivertech.com')
  })

  const remoteDir = '/path/to/new/dir'
  /*
  const remoteDirFile = '/path/to/new/dir/file.txt'
  const newRemoteDir = '/path/to/new/dir/file2.txt'
  const localPath = './../fixtures/local.txt'
  const localPath2 = './../fixtures/local2.txt'
  const remoteDirCopy = '/path/to/new/S.txt'
  const remoteDirPath = '/path'
 */

  it('as a ftp user, I should be able to see the current working directory', () => {
    cy.task('ftpCreateWorkingDirectory', remoteDir).then(p => {
      //     expect(`${JSON.stringify(p)}`).to.equal('"/"')
    })
  })
})
