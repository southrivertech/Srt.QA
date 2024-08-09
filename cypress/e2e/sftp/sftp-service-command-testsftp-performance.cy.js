describe('example', () => {
  const username = 'testsftp'

  it.only('all sftp operations', () => {
    cy.runSftpOperations(username)
  })
})
