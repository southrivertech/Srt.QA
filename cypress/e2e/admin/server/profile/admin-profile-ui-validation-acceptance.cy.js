import label from '../../../../fixtures/label.json'
import dashboardSelectors from '../../../../../selectors/dashboard-selectors.json'
/**
 * @description
 * This spec file contains test to verify that profile menu on dashboard have three options
 *
 * @file
 * cypress/e2e/admin/server/profile/admin-profile-ui-validation-acceptance.cy
 *
 * @breadcrumb
 * Login > {existing server} > profile
 *
 * @assertions
 * verify that profile menu should have options
 *
 *  @prerequisites
 * Pre-Requisite data:
 * - admin user should have valid credentials
 */

describe('Login > {existing server} > profile', () => {
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

  it('verify that profile menu should have options', () => {
    cy.get(dashboardSelectors.profileIcon).click()
    cy.checkTextVisibility(dashboardSelectors.dashBoardList, label.myProfile)
    cy.checkTextVisibility(dashboardSelectors.dashBoardList, label.changePassword)
    cy.checkTextVisibility(dashboardSelectors.dashBoardList, label.signOut)
  })
})
