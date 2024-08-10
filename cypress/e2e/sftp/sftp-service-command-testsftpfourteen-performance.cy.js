/**
 * @description
 * This spec file contains test to verify all sftp operations
 *
 * @file
 * cypress/e2e/sftp/sftp-service-command-testsftpfourteen-performance.cy.js
 */

describe('all sftp operations', () => {
  const username = 'testsftpfourteen'

  it('all sftp operations for user testsftpfourteen', () => {
    cy.runSftpOperations(username)
  })
})
