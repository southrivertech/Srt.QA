import label from '../../../../cypress/fixtures/label.json'
/**
 * @description
 * This spec file contains tests to ensure that user doesn't redirected to the login page even after pressing back button in the browser
 *
 * @file
 * ui/cypress/e2e/login/user-navigate-to-login.cy-acceptance.cy.js
 *
 * @breadcrumb
 * - Login to the application
 *
 * @assertions
 * - To verify that admin user stays in the site after pressing the back button in the browser
 *
 * @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
 */

// This is skipped because the functionality of session login is coming in next release

describe.skip('Login Functionality Test', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }
  beforeEach(() => {
    cy.postApiLogin()
    cy.waitForNetworkIdlePrepare({
      method: 'POST',
      pattern: '**WebApi/Login**',
      alias: 'postApiLogin',
      log: false
    })
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
    cy.waitForNetworkIdle('@postApiLogin', 500).its('callCount').should('equal', 1)
    cy.url().should('include', label.homeUrlText)
    cy.waitApiResponseStatusCode('@postApiLogin', 200)
  })

  it('Press the back key button in the browser', () => {
    cy.go(label.back)
    cy.contains(label.login).should('not.be.visible')
  })
})
