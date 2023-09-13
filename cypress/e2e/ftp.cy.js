describe('example', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it.only('Ftp implicit connection : displays current remote working directory ', () => {
    cy.task('ftpImplicitConnectionUsingPwd').then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
    })
  })
  it('Ftp explicit connection : displays current remote working directory', () => {
    cy.task('ftpExplicitConnectionUsingCWD').then(p => {
      cy.log(`Remote working directory is ${JSON.stringify(p)}`)
    })
  })
  afterEach(() => {
    // cy.task('endSFTPConnection')
  })
})
