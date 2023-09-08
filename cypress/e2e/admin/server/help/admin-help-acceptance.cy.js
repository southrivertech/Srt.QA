import label from '../../../../fixtures/label.json'
import dashboardSelectors from '../../../../../selectors/dashboard-selectors.json'

/**
 * @description
 * This spec file contains test to verify help menu options
 *
 * @file
 * cypress/e2e/admin/server/help/admin-help-acceptance.cy.js
 *
 * @breadcrumb
 * Login > help
 *
 * @assertions
 * verify help menu has options
 *
 *  @prerequisites
 * Pre-Requisite data:
 * - admin user should have valid credentials
 */

describe('Login > help', () => {
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
  })

  it('verify that help menu has three options', () => {
    cy.get(dashboardSelectors.dashboardButtonLabel).contains(label.helpEnglish).click()
    cy.checkTextVisibility(label.contents, dashboardSelectors.dashBoardList)
    cy.checkTextVisibility(label.releaseNotes, dashboardSelectors.dashBoardList)
    cy.checkTextVisibility(label.versionHistory, dashboardSelectors.dashBoardList)
  })
})
