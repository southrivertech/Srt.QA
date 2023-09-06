import label from '../../../../fixtures/label.json'
import userSelectors from '../../../../../selectors/user/user-selectors.json'
import navigationSelectors from '../../../../../selectors/navigation/left-navigation-selectors.json'
/**
 * @description
 * This spec file contains test to verify that admin user can send password reset email
 *
 * @file
 * cypress/e2e/admin/server/users/admin-send-password-reset-email-acceptance.cy.js
 *
 * @breadcrumb
 * Login > {existing server} > users
 *
 * @assertions
 * To Verify admin can send password reset email
 *  @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
 * - existing user should be exist for editing
 */

describe('Login > {existing server} > existing users', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }

  beforeEach('login', () => {
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
    cy.get(navigationSelectors.textLabelSelector).contains(label.autoDomainName).click()
    cy.get(navigationSelectors.textLabelSelector).contains(label.autoServerName).should('be.visible').click()
    cy.get(navigationSelectors.textLabelSelector).contains(label.users).should('be.visible').click()
    cy.editUser(label.autoUserName, label.sendPassResetEmail)
  })

  it('Verify admin can send password reset email', () => {
    cy.clickButton(label.sendResetEmailButtonText)
    cy.wait(2000)
    cy.get(userSelectors.successMessage).should('exist')
  })
})
