import navigationSelectors from '../../../../../selectors/navigation/left-navigation-selectors.json'
import userSelectors from '../../../../../selectors/user/user-selectors.json'
import label from '../../../../fixtures/label.json'
import { slowCypressDown } from 'cypress-slow-down'
/**
 * @description
 * This spec file contains test to verify adhoc and native users disappearing bug
 *
 * @file
 * Srt.QA\cypress\e2e\admin\bugs\adhoc-native-users.cy.js
 *
 * @breadcrumb
 * Login > {existing server} > users
 *
 * @assertions
 * To verify that adhoc and native users are displayed successfully
 *
 * @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
 */

slowCypressDown(300)

describe('Login > {existing server} > users', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }

  beforeEach('login', () => {
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
    cy.get(navigationSelectors.textLabelSelector).contains(label.autoDomainName).click()
    cy.get(navigationSelectors.textLabelSelector).contains('MySite').should('be.visible').click()
    cy.get(navigationSelectors.textLabelSelector).contains(label.users).should('be.visible').click()
  })

  it('verify that admin can create groups', () => {
    cy.get(userSelectors.roleTab).eq(3).click()
    cy.get(userSelectors.roleTab).eq(0).click()
    cy.wait(5000)
    cy.get(userSelectors.parentCell).contains(label.bugUser).should('be.visible')
    cy.get(userSelectors.roleTab).eq(2).click()
    cy.get(userSelectors.roleTab).eq(4).click()
    cy.wait(5000)
    cy.get(userSelectors.parentCell).contains('sukhi.singh4424@gmail.com').should('be.visible')
  })
})
