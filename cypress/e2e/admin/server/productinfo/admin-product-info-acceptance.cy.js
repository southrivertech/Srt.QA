import label from '../../../../fixtures/label.json'
import dashboardSelectors from '../../../../../selectors/dashboard-selectors.json'
import navigationSelectors from '../../../../../selectors/navigation/left-navigation-selectors.json'
/**
 * @description
 * This spec file contains test to verify product info tab data
 *
 * @file
 * cypress/e2e/admin/server/productinfo/admin-product-info-acceptance.cy.js
 *
 * @breadcrumb
 * Login > home > product info
 *
 * @assertions
 * verify product info tab columns name
 *
 *  @prerequisites
 * Pre-Requisite data:
 * - admin user should have valid credentials
 */

describe('Login > home > product info', () => {
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

  it('verify product info tab columns name', () => {
    cy.get(navigationSelectors.textLabelSelector).contains(label.home).click()
    cy.get(dashboardSelectors.productInfoTab).contains(label.productInfo).click()
    cy.checkTextVisibility(label.product, dashboardSelectors.productInfoColName)
    cy.checkTextVisibility(label.version, dashboardSelectors.productInfoColName)
    cy.checkTextVisibility(label.productEdition, dashboardSelectors.productInfoColName)
    cy.checkTextVisibility(label.active, dashboardSelectors.productInfoColName)
    cy.checkTextVisibility(label.licenseType, dashboardSelectors.productInfoColName)
    cy.checkTextVisibility(label.licenseStatus, dashboardSelectors.productInfoColName)
    cy.checkTextVisibility(label.expiration, dashboardSelectors.productInfoColName)
    cy.checkTextVisibility(label.registrationCode, dashboardSelectors.productInfoColName)
    cy.checkTextVisibility(label.delete, dashboardSelectors.productInfoColName)
  })
})
