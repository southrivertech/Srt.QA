/**
 * @description
 * This spec file contains tests to ensure that user is able to login successfully.
 *
 * @file
 * ui/cypress/e2e/login/login-valid-credentials-acceptance.cy.js
 *
 * @breadcrumb
 * - Login to the application
 *
 * @assertions
 * - To verify that admin user can login successfully with correct credentials
 *
 * @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
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

it('verify that admin user can login successfully with correct credentials', () => {
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
    cy.waitForNetworkIdle('@postApiLogin', 500).its('callCount').should('equal', 1)
    cy.url().should('include', homeUrlText)
    cy.waitApiResponseStatusCode('@postApiLogin', 200)
})

})
