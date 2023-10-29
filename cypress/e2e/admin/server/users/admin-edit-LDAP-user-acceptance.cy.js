import navigationSelectors from '../../../../../selectors/navigation/left-navigation-selectors.json'
import userSelectors from '../../../../../selectors/user/user-selectors.json'
import htmlSelectors from '../../../../../selectors/htlm-tag-selectors.json'

import label from '../../../../fixtures/label.json'
import { slowCypressDown } from 'cypress-slow-down'
/**
 * @description
 * This spec file contains test to verify ad/ldap edit user bug
 *
 * @issueID - NX-i1088
 *
 * @breadcrumb
 * Login > {existing server} > users
 *
 * @assertions
 * To verify that adsi users can be edited successfully
 *
 * @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
 */

slowCypressDown(200)

describe.skip('Login > {existing server} > users', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }
  const qaEmail = 'qa-bug-user-email-@gmail.com'
  const qaAutoUser = 'test'
  beforeEach('login', () => {
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
    cy.get(navigationSelectors.textLabelSelector).contains(label.autoDomainName).click()
    cy.get(navigationSelectors.textLabelSelector).contains('MySite').should('be.visible').click()
    cy.get(navigationSelectors.textLabelSelector).contains(label.users).should('be.visible').click()
  })

  it('To verify that adsi users can be edited successfully', () => {
    cy.get(userSelectors.roleTab).eq(3).click()
    cy.contains(htmlSelectors.div, label.bugUser).parents(userSelectors.parentCell)
      .next(htmlSelectors.div).should('exist')
      .next(htmlSelectors.div).should('exist')
      .next(htmlSelectors.div).should('exist')
      .next(htmlSelectors.div).should('exist')
      .next(htmlSelectors.div).click({ force: true })
    cy.get(userSelectors.parentUsers).contains(label.editUserAssignedGroups).click()
    cy.get(qaAutoUser).type(qaEmail)
    cy.clickButton(label.next)
    cy.clickButton(label.next)
    cy.clickButton(label.finish)
    cy.contains(htmlSelectors.div, qaAutoUser).parents(userSelectors.parentCell)
      .next(htmlSelectors.div).should('exist')
      .next(htmlSelectors.div).contains(qaEmail).should('be.visible')
  })

  afterEach('reverting the changes', () => {
    cy.contains(htmlSelectors.div, qaAutoUser).parents(userSelectors.parentCell)
      .next(htmlSelectors.div).should('exist')
      .next(htmlSelectors.div).should('exist')
      .next(htmlSelectors.div).should('exist')
      .next(htmlSelectors.div).should('exist')
      .next(htmlSelectors.div).click()
    cy.get(userSelectors.parentUsers).contains(label.editUserAssignedGroups).click()
    cy.get("[id='Email Address']").clear()
    cy.clickButton(label.next)
    cy.clickButton(label.next)
    cy.clickButton(label.finish)
    cy.contains(htmlSelectors.div, qaAutoUser).parents(userSelectors.parentCell)
      .next(htmlSelectors.div).should('exist')
      .next(htmlSelectors.div).contains(qaEmail).should('not.be.visible')
  })
})
