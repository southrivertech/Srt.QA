import navigationSelectors from '../../../../../selectors/navigation/left-navigation-selectors.json'
import userSelectors from '../../../../../selectors/user/user-selectors.json'

/**
 * @description
 * This spec file contains test to verify that admin user can create users for an existing server
 *
 * @file
 * cypress/e2e/admin/server/users/admin-create-users-acceptance.cy.js
 *
 * @breadcrumb
 * Login > {existing server} > users
 *
 * @assertions
 * To verify that admin can create users
 *
 *  @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
 */

describe('Login > {existing server} > users', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }
  const lookForText = {
    homeUrlText: '/Console'
  }

  const userDetails = {
    userName: `qa-auto server ${Cypress.dayjs().format('ssmmhhMMYY')}`,
    password: 'testing123'
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
    cy.url().should('include', lookForText.homeUrlText)
    cy.waitApiResponseStatusCode('@postApiLogin', 200)
  })

  it('verify that admin can create users', () => {
    cy.get(navigationSelectors.textLabelSelector).contains('ws01').click()
    cy.get(navigationSelectors.textLabelSelector).contains('qa auto DO NOT DELETE').should('be.visible').click()
    cy.get(navigationSelectors.textLabelSelector).contains('Users').should('be.visible').click()
    cy.get(userSelectors.addButton).should('be.visible').click()
    cy.createUser(userDetails)
    cy.get(userSelectors.parentCell).contains(userDetails.userName).should('be.visible')
  })

  afterEach('deleting a user', () => {
    cy.delete(userDetails.userName)
    cy.get(userSelectors.parentCell).contains(userDetails.userName).should('not.exist')
  })
})
