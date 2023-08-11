/**
 * @description
 * This spec file contains tests to ensure that user is able to login successfully.
 *
 * @file
 ui/cypress/e2e/login-acceptance.cy.js
 *
 * @breadcrumb
 * - Login to the application
 *
 * @assertions
 * - To verify that admin user can login successfully with correct credentials
 *
 * @prerequisites
 * Pre-Requisite data:
 * - user should have valid and invalid credentials
 */

describe('Login Functionality Test', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }
  const homeUrlText = '/Console'

  beforeEach(() => {
    cy.postApiLogin()
    cy.waitForNetworkIdlePrepare({
      method: 'POST',
      pattern: '**WebApi/Login**',
      alias: 'postApiLogin',
      log: false
    })
  })

  it('verify that admin user cannot login with incorrect credentials', () => {
    cy.login(adminData.adminBaseUrl, userInfo.username, 'abcd')
    cy.waitForNetworkIdle('@postApiLogin', 500).its('callCount').should('equal', 1)
    cy.url().should('not.include', homeUrlText)
  })

  /* it('verify that submit button is enabled only if user provide both username and password', () => {
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
  })

  it('verify that submit button is disabled if user does not provide both username and password', () => {
    cy.login(adminData.adminBaseUrl, "", "")
  })

  it('verify that submit button is disabled if user does not provide password', () => {
    cy.login(adminData.adminBaseUrl, userInfo.username, "")
  }) */
})
