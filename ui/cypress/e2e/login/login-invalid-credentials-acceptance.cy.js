import loginSelectors from '../../../../selectors/login-selectors.json'
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
  /*  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  } */
  const invalidUsername = 'admin'
  const invalidPassword = 'password123'

  beforeEach(() => {
    cy.postApiLogin()
    cy.waitForNetworkIdlePrepare({
      method: 'POST',
      pattern: '**WebApi/Login**',
      alias: 'postApiLogin',
      log: false
    })
    cy.visit(adminData.adminBaseUrl)
  })

  it('verify that admin user cannot login with incorrect credentials', () => {
    cy.get(loginSelectors.inputUsername).type(invalidUsername)
    cy.get(loginSelectors.inputPassword).type(invalidPassword)
    cy.contains('Invalid username or password.').should('be.visible')
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
