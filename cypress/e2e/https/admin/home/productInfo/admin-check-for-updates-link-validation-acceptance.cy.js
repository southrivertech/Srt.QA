import label from '../../../../../fixtures/label.json'
import dashboardSelectors from '../../../../../../selectors/dashboard-selectors.json'
import navigationSelectors from '../../../../../../selectors/navigation/left-navigation-selectors.json'
import htmlSelectors from '../../../../../../selectors/htlm-tag-selectors.json'

import { slowCypressDown } from 'cypress-slow-down'
/**
 * @description
 * This spec file contains test to verify check for updates link validation
 *
 * @file
 * cypress\e2e\admin\server\productinfo\admin-check-for-updates-link-validation.cy.js
 *
 * @breadcrumb
 * Login > home > product info tab > check for updates
 *
 * @assertions
 * verify link validation for check for updates
 *
 *  @prerequisites
 * Pre-Requisite data:
 * - admin user should have valid credentials
 */

slowCypressDown(100)

describe('Login > home > product info tab > check for updates', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }

  beforeEach('login', () => {
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
  })

  it('verify link validation for check for updates', () => {
    cy.get(navigationSelectors.textLabelSelector).contains(label.home).click()
    cy.get(dashboardSelectors.homeTabs).contains(label.productInfo).click()
    cy.get(htmlSelectors.tableRow).eq(1).within(() => {
      cy.get(htmlSelectors.tableData).eq(3).contains(label.download).should('have.attr', 'href').and('eq', label.ReleaseNotesURL)
      cy.get(htmlSelectors.tableData).eq(4).contains(label.download).should('have.attr', 'href').and('eq', label.downloadURL)
    })
  })
})
