import loginSelectors from '../../../selectors/login-selectors.json'
/**
 * @description
 * This spec file contains tests to ensure that user stays in the site after prssing back button in the browser
 *
 * @file
 * ui/cypress/e2e/login/user-navigate-to-login.cy-acceptance.cy.js
 *
 * @breadcrumb
 * - Login to the application
 * - Press the back key in the browser
 *
 * @assertions
 * - To verify that admin user stays in the site after pressing the back button in the browser
 *
 * @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
 */

describe('Login Functionality Test', () => {
  const adminData = Cypress.env('admin')
  // These should come from secrets, I need admin permissions for that
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

  it('Press the back key button in the browser', () => {
    cy.window().then(win => {
        //? Simulate pressing the back button
        win.history.back()
    });
  })

  it('Check if the user stays in the site', () => {
    cy.url().should('include', homeUrlText)
  })

})
