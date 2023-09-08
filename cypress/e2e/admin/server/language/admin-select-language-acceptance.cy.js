import label from '../../../../fixtures/label.json'
import dashboardSelectors from '../../../../../selectors/dashboard-selectors.json'

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

  it('verify that admin can select english language', () => {
    cy.get(dashboardSelectors.dashboardButtonLabel).contains(label.englishLang).click()
    cy.selectLanguage(label.englishLang)
    cy.checkTextVisibility(label.helpEnglish, dashboardSelectors.dashboardButtonLabel)
  })

  it('verify that admin can select spanish language', () => {
    cy.get(dashboardSelectors.dashboardButtonLabel).contains(label.englishLang).click()
    cy.selectLanguage(label.spanishLang)
    cy.checkTextVisibility(label.helpSpanish, dashboardSelectors.dashboardButtonLabel)
  })

  it('verify that admin can select deutsch language', () => {
    cy.get(dashboardSelectors.dashboardButtonLabel).contains(label.englishLang).click()
    cy.selectLanguage(label.deutschLang)
    cy.checkTextVisibility(label.helpDeutsch, dashboardSelectors.dashboardButtonLabel)
  })

  it('verify that admin can select japanese language', () => {
    cy.get(dashboardSelectors.dashboardButtonLabel).contains(label.englishLang).click()
    cy.selectLanguage(label.japaneseLang)
    cy.checkTextVisibility(label.helpJapanese, dashboardSelectors.dashboardButtonLabel)
  })
})
