import label from '../../../../fixtures/label.json'
import dashboardSelectors from '../../../../../selectors/dashboard-selectors.json'
import navigationSelectors from '../../../../../selectors/navigation/left-navigation-selectors.json'
import productInfoSelectors from '../../../../../selectors/productinfo/product-info-selectors.json'

/**
 * @description
 * This spec file contains test to verify product info tab data
 *
 * @file
 * cypress/e2e/admin/server/productinfo/admin-product-info-ui-validations-acceptance.cy
 *
 * @breadcrumb
 * Login > home > product info tab
 *
 * @assertions
 * verify product info tab columns name
 *
 *  @prerequisites
 * Pre-Requisite data:
 * - admin user should have valid credentials
 */

describe('Login > home > product info tab', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }

  beforeEach('login', () => {
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
  })

  it('verify product info tab columns name', () => {
    cy.get(navigationSelectors.textLabelSelector).contains(label.home).click()
    cy.get(dashboardSelectors.homeTabs).contains(label.productInfo).click()
    cy.get(productInfoSelectors.fabLabel).eq(1).click()
    cy.get(productInfoSelectors.registrationCodeField).type(label.helpEnglish)
    cy.get(productInfoSelectors.dashboardButtonLabel).contains(label.add).click()
    cy.checkTextVisibility(productInfoSelectors.registrationValidationText, label.regCodeValidationTextFormat)
    cy.get(productInfoSelectors.registrationValidationText).invoke('text').then((text) => {
      const splitText = text.split(':')
      cy.get(productInfoSelectors.registrationCodeField).clear()
      cy.get(productInfoSelectors.registrationCodeField).type(splitText[1])
      cy.get(productInfoSelectors.dashboardButtonLabel).contains(label.add).click()
      cy.checkTextVisibility(productInfoSelectors.registrationValidationText, label.regCodeValidationTextLength)
    })
  })
})
