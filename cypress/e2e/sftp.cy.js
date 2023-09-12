describe('example', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('displays two ult', () => {
    // const localFile = '/a.config.js'
    // const remoteFile = '/upload/testFile.json'
    cy.task('uploadPremiseFile').then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
    //   return sftp.end()
    })
  })
})
