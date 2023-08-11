import loginSelectors from '../../../../selectors/login-selectors.json'
/**
 * @description
 * This spec file contains tests to ensure that the submit button is enabled or disbled based on the 
 * credentials's validity
 *
 * @file
ui/cypress/e2e/login/submit-button/submit-button-working-acceptence.cy.js
 *
 * @breadcrumb
 * - Login to the application
 *
 * @assertions
 * - To verify that submit button is enabled only if user provide both username and password
 * - To verify that submit button is disabled if user does not provide both username and password
 *
 * @prerequisites
 * Pre-Requisite data:
 * - user should have valid and invalid credentials
 * 
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
  
    it('verify that submit button is enabled only if user provide both username and password', () => {
      cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
      cy.waitForNetworkIdle('@postApiLogin', 500).its('callCount').should('equal', 1)
      cy.url().should('include', homeUrlText)
    })
  
    it('verify that submit button is disabled if user does not provide both username and password', () => {
        cy.visit(adminData.adminBaseUrl)
        cy.get(loginSelectors.loginButton).should('be.disabled');
    })
  })