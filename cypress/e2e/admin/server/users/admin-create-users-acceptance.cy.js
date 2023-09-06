import navigationSelectors from '../../../../../selectors/navigation/left-navigation-selectors.json'
import userSelectors from '../../../../../selectors/user/user-selectors.json'
import label from '../../../../fixtures/label.json'
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
 * To verify that during user creation, admin can assign an existing group to a user
 * To verify that admin can delete a user
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
    cy.url().should('include', label.homeUrlText)
    cy.waitApiResponseStatusCode('@postApiLogin', 200)
    cy.get(navigationSelectors.textLabelSelector).contains(label.autoDomainName).click()
    cy.get(navigationSelectors.textLabelSelector).contains(label.autoServerName).should('be.visible').click()
    cy.get(navigationSelectors.textLabelSelector).contains(label.users).should('be.visible').click()
    cy.get(userSelectors.addButton).should('be.visible').click()
  })

  it('verify that admin can create users', () => {
    cy.createUser(userDetails)
    cy.get(userSelectors.parentCell).contains(userDetails.userName).should('be.visible')
  })

  it('Verify that during user creation, admin can assign an existing group to a user', () => {
    cy.createUserAndAssignGroup(userDetails)
  })

  afterEach('deleting a user', () => {
    cy.delete(userDetails.userName)
    cy.get(userSelectors.parentCell).contains(userDetails.userName).should('not.exist')
  })
})
