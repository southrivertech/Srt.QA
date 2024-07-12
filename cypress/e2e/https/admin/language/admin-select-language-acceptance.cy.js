import label from '../../../../fixtures/label.json'
import dashboardSelectors from '../../../../../selectors/dashboard-selectors.json'
import navigationSelectors from '../../../../../selectors/navigation/left-navigation-selectors.json'

import { slowCypressDown } from 'cypress-slow-down'
slowCypressDown(100)
/**
 * @description
 * This spec file contains test to verify that admin user can select languages
 *
 * @file
 * cypress/e2e/admin/server/language/admin-select-language-acceptance.cy.js
 *
 * @breadcrumb
 * Login > select language
 *
 * @assertions
 * To verify that admin can select english language
 * To verify that admin can select spanish language
 * To verify that admin can select deutsch language
 * To verify that admin can select japanese language
 *
 *  @prerequisites
 * Pre-Requisite data:
 * - admin user should have valid credentials
 */

describe('Login > select language', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }

  beforeEach('login', () => {
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
    cy.get(dashboardSelectors.dashboardButton).contains(label.englishLang).click({ force: true })
    cy.waitForNetworkIdle(1000, { log: false })
  })

  it('verify that admin can select english language', () => {
    cy.selectLanguage(label.englishLang)
    cy.checkTextVisibility(navigationSelectors.textLabelSelector, label.home)
  })

  it('verify that admin can select spanish language', () => {
    cy.selectLanguage(label.spanishLang)
    cy.checkTextVisibility(navigationSelectors.textLabelSelector, label.homeSpanish)
  })

  it('verify that admin can select deutsch language', () => {
    cy.selectLanguage(label.deutschLang)
    cy.checkTextVisibility(navigationSelectors.textLabelSelector, label.homeDeutsch)
  })

  it('verify that admin can select japanese language', () => {
    cy.selectLanguage(label.japaneseLang)
    cy.checkTextVisibility(navigationSelectors.textLabelSelector, label.homeJapanese)
  })
})
