import navigationSelectors from '../../../../../../../selectors/navigation/left-navigation-selectors.json'
import userSelectors from '../../../../../../../selectors/user/user-selectors.json'
import htmlSelectors from '../../../../../../../selectors/htlm-tag-selectors.json'
import label from '../../../../../../fixtures/label.json'
import { slowCypressDown } from 'cypress-slow-down'

/**
 * @description
 * This spec file contains test to verify that admin user can create user for an existing server
 *
 * @file
 * cypress/e2e/admin/server/users/admin-create-users-acceptance.cy.js
 *
 * @breadcrumb
 * Login > {existing server} > users > add new user
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

slowCypressDown(100)

describe('Login > {existing server} > users > add new user', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }

  const userDetails = {
    userName: `qa-auto-user-${Cypress.dayjs().format('ssmmhhMMYY')}`,
    password: 'testing123',
    groupName: label.autoGroupName
  }

  beforeEach('login', () => {
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
    cy.get(navigationSelectors.textLabelSelector).contains(label.autoDomainName).click()
    cy.get(navigationSelectors.textLabelSelector).contains(label.autoServerName).should('be.visible').click()
    cy.get(navigationSelectors.textLabelSelector).contains(label.users).should('be.visible').click()
    cy.get(userSelectors.addButton).should('be.visible').click()
  })

  it('verify that admin can create a user without assigning a group', () => {
    cy.createUser(userDetails)
  })

  it('Verify that admin can create a user with assigning an existing group', () => {
    cy.createUser(userDetails)
  })

  afterEach('deleting a user', () => {
    cy.deleteUser(userDetails.userName)
    cy.get(htmlSelectors.tableData).contains(userDetails.userName).should('not.exist')
  })
})
