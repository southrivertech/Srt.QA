import navigationSelectors from '../../../../../selectors/navigation/left-navigation-selectors.json'
import userSelectors from '../../../../../selectors/user/user-selectors.json'
import label from '../../../../fixtures/label.json'
import { slowCypressDown } from 'cypress-slow-down'

/**
 * @description
 * This spec file contains test to verify that admin user can create users with custom home directory
 *
 * @file
 * cypress\e2e\admin\server\users\admin-create-users-with-home-directory.cy.js
 *
 * @breadcrumb
 * Login > {existing server} > users > add new user
 *
 * @assertions
 * To verify that admin can enter home directory while creating new users
 *
 *  @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
 */

slowCypressDown(300)

describe('Login > {existing server} > users > add new user', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }

  const userDetails = {
    userName: `qa-auto user ${Cypress.dayjs().format('ssmmhhMMYY')}`,
    password: 'testing123',
    customDirPath: `C:/qa-auto user ${Cypress.dayjs().format('ssmmhhMMYY')}`,
    homeDirectory: `${label.customDir}`
  }

  beforeEach('login', () => {
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
    cy.get(navigationSelectors.textLabelSelector).contains(label.autoDomainName).click()
    cy.get(navigationSelectors.textLabelSelector).contains(label.autoServerName).should('be.visible').click()
    cy.get(navigationSelectors.textLabelSelector).contains(label.users).should('be.visible').click()
    cy.get(userSelectors.addButton).should('be.visible').click()
  })

  it('verify that admin can create users with custom home directory', () => {
    cy.createUser(userDetails)
    cy.get(userSelectors.successMessage).should('be.visible')
    cy.editUser(userDetails.userName, label.editUserFileDirectories, false)
    cy.contains('div', userDetails.customDirPath.replace(/\//g, '\\')).should('exist')
    cy.get(userSelectors.btnLabel).contains(label.closeText).click()
  })

  afterEach('deleting a user', () => {
    cy.delete(userDetails.userName)
    cy.get(userSelectors.parentCell).contains(userDetails.userName).should('not.exist')
  })
})
